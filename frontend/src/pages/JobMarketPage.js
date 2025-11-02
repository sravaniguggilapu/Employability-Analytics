import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const JobMarketPage = () => {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    role: '',
    industry: '',
    region: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.role) params.append('role', filters.role);
      if (filters.industry) params.append('industry', filters.industry);
      if (filters.region) params.append('region', filters.region);

      const response = await axios.get(`${API}/data/job-market?${params.toString()}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching job market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const prepareChartData = () => {
    if (!data || !data.monthly_data) return [];

    const months = Object.keys(data.monthly_data).sort();
    return months.map(month => {
      const monthData = { month: month.substring(0, 7) };
      Object.keys(data.monthly_data[month]).forEach(role => {
        monthData[role] = data.monthly_data[month][role];
      });
      return monthData;
    });
  };

  const chartData = prepareChartData();
  const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div data-testid="job-market-page">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Work Sans'}}>Job Market Trends</h1>
        <p className="text-gray-600">Analyze job posting trends across U.S. roles, industries, and regions</p>
      </div>

      {/* Filters */}
      <div className="filter-section" data-testid="filter-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <Select value={filters.role} onValueChange={(value) => setFilters({...filters, role: value})}>
              <SelectTrigger data-testid="role-filter">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {data && data.roles && data.roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <Select value={filters.industry} onValueChange={(value) => setFilters({...filters, industry: value})}>
              <SelectTrigger data-testid="industry-filter">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {data && data.industries && data.industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <Select value={filters.region} onValueChange={(value) => setFilters({...filters, region: value})}>
              <SelectTrigger data-testid="region-filter">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {data && data.regions && data.regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Total Postings */}
      <div className="enterprise-card mb-6" data-testid="total-postings-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Job Postings</h3>
            <p className="text-3xl font-bold text-gray-900">{data?.total_postings?.toLocaleString()}</p>
          </div>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="chart-container mb-6" data-testid="monthly-trends-chart">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Job Postings Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
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
            {data && Object.keys(data.monthly_data[Object.keys(data.monthly_data)[0]] || {}).map((role, index) => (
              <Line
                key={role}
                type="monotone"
                dataKey={role}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trending Roles */}
      <div className="chart-container" data-testid="trending-roles-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Trending Roles</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Postings</th>
              </tr>
            </thead>
            <tbody>
              {data && data.trending_roles && data.trending_roles.map((role, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition" data-testid={`trending-role-${index}`}>
                  <td className="py-3 px-4 text-gray-900 font-medium">#{index + 1}</td>
                  <td className="py-3 px-4 text-gray-900">{role.role}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {role.growth}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{role.postings?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobMarketPage;
