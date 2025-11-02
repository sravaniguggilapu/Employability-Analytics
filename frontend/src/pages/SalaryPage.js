import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SalaryPage = () => {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({ role: '', region: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.role) params.append('role', filters.role);
      if (filters.region) params.append('region', filters.region);

      const response = await axios.get(`${API}/data/salary?${params.toString()}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching salary data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div data-testid="salary-page">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Work Sans'}}>Salary Benchmarking</h1>
        <p className="text-gray-600">Compare compensation across roles and regions (USD)</p>
      </div>

      {/* Filters */}
      <div className="filter-section" data-testid="filter-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <Select value={filters.region} onValueChange={(value) => setFilters({...filters, region: value})}>
              <SelectTrigger data-testid="region-filter">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Regions</SelectItem>
                {data && data.regions && data.regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Salary Comparison Chart */}
      <div className="chart-container mb-6" data-testid="salary-comparison-chart">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Median Salary by Role and Region</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data?.salary_stats?.slice(0, 15) || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="role"
              angle={-45}
              textAnchor="end"
              height={120}
              stroke="#6b7280"
              style={{fontSize: '11px'}}
            />
            <YAxis stroke="#6b7280" style={{fontSize: '12px'}} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Bar dataKey="median" fill="#2563eb" name="Median Salary" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Salary Statistics Table */}
      <div className="chart-container" data-testid="salary-stats-table">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Salary Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Min</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Q1</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Median</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Q3</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Max</th>
              </tr>
            </thead>
            <tbody>
              {data && data.salary_stats && data.salary_stats.slice(0, 20).map((stat, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition" data-testid={`salary-stat-${index}`}>
                  <td className="py-3 px-4 text-gray-900 font-medium">{stat.role}</td>
                  <td className="py-3 px-4 text-gray-700">{stat.region}</td>
                  <td className="py-3 px-4 text-gray-900">${stat.min?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">${stat.q1?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">${stat.median?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">${stat.q3?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">${stat.max?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
