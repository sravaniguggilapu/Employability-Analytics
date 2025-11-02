import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SkillsPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/data/skills`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching skills data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
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
    <div data-testid="skills-page">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Work Sans'}}>Skill Gap Analysis</h1>
        <p className="text-gray-600">Identify critical skill shortages and training opportunities</p>
      </div>

      {/* Top Skill Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6" data-testid="top-gaps-section">
        {data && data.top_gaps && data.top_gaps.map((skill, index) => (
          <div key={index} className="enterprise-card" style={{borderLeftColor: getSeverityColor(skill.severity), borderLeftWidth: '4px'}} data-testid={`top-gap-${index}`}>
            <div className="text-sm font-medium text-gray-600 mb-1">#{index + 1} Gap</div>
            <div className="text-xl font-bold text-gray-900 mb-1">{skill.skill}</div>
            <div className="text-sm text-gray-600 mb-2">Gap: {skill.gap.toFixed(1)} points</div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold`} style={{
              backgroundColor: skill.severity === 'High' ? '#fee2e2' : skill.severity === 'Medium' ? '#fef3c7' : '#d1fae5',
              color: getSeverityColor(skill.severity)
            }}>
              {skill.severity}
            </span>
          </div>
        ))}
      </div>

      {/* Demand vs Supply Chart */}
      <div className="chart-container mb-6" data-testid="demand-supply-chart">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Demand vs Supply by Skill</h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data?.skills || []} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" style={{fontSize: '12px'}} />
            <YAxis dataKey="skill" type="category" width={150} stroke="#6b7280" style={{fontSize: '12px'}} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Bar dataKey="demand" fill="#2563eb" name="Demand" />
            <Bar dataKey="supply" fill="#10b981" name="Supply" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      <div className="chart-container" data-testid="recommendations-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
        <div className="space-y-3">
          {data && data.recommendations && data.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start p-4 bg-blue-50 border-l-4 border-blue-500 rounded" data-testid={`recommendation-${index}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{rec.skill}</h4>
                <p className="text-sm text-gray-700">{rec.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
