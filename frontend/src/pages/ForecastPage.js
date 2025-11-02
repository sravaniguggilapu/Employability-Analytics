import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ForecastPage = () => {
  const [data, setData] = useState(null);
  const [horizon, setHorizon] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [horizon]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/data/forecast?horizon=${horizon}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const prepareChartData = () => {
    if (!data) return [];

    const historicalData = data.historical.months.map((month, index) => ({
      month,
      value: data.historical.values[index],
      type: 'Historical'
    }));

    const forecastData = data.forecast.months.map((month, index) => ({
      month,
      value: data.forecast.values[index],
      lower: data.forecast.confidence_lower[index],
      upper: data.forecast.confidence_upper[index],
      type: 'Forecast'
    }));

    return [...historicalData, ...forecastData];
  };

  const chartData = prepareChartData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div data-testid="forecast-page">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Work Sans'}}>Predictive Hiring Trends</h1>
        <p className="text-gray-600">Simulated forecast for job market trends</p>
      </div>

      {/* Forecast Horizon Selector */}
      <div className="filter-section mb-6" data-testid="horizon-selector">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Forecast Horizon</h3>
          <Select value={horizon.toString()} onValueChange={(value) => setHorizon(Number(value))}>
            <SelectTrigger className="w-48" data-testid="horizon-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Explanation */}
      <div className="enterprise-card mb-6" style={{borderLeftColor: '#2563eb', borderLeftWidth: '4px'}} data-testid="forecast-explanation">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Forecast Model Explanation</h4>
            <p className="text-sm text-gray-700">{data?.explanation}</p>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="chart-container" data-testid="forecast-chart">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Posting Forecast (Next {horizon} Months)</h3>
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{fontSize: '12px'}} />
            <YAxis stroke="#6b7280" style={{fontSize: '12px'}} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            
            {/* Confidence Band */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#colorConfidence)"
              name="Confidence Band"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="white"
            />
            
            {/* Main Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (payload.type === 'Forecast') {
                  return <circle cx={cx} cy={cy} r={4} fill="#2563eb" stroke="white" strokeWidth={2} />;
                }
                return <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="white" strokeWidth={2} />;
              }}
              name="Job Postings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast Values Table */}
      <div className="chart-container mt-6" data-testid="forecast-values-table">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecast Values</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Month</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Predicted Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Lower Bound</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Upper Bound</th>
              </tr>
            </thead>
            <tbody>
              {data && data.forecast && data.forecast.months.map((month, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition" data-testid={`forecast-row-${index}`}>
                  <td className="py-3 px-4 text-gray-900 font-medium">{month}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">{data.forecast.values[index]?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700">{data.forecast.confidence_lower[index]?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700">{data.forecast.confidence_upper[index]?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;
