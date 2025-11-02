import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DashboardPage = () => {
  const [kpis, setKpis] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const kpiResponse = await axios.get(`${API}/data/kpis`);
      setKpis(kpiResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    <div data-testid="dashboard-page">
      {/* Hero Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl overflow-hidden shadow-2xl" data-testid="hero-section">
        <div className="relative h-80">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop)',
              opacity: 0.4
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: 'Work Sans'}}>
              Employability Analytics Dashboard
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl">
              Make data-driven hiring and workforce planning decisions with real-time U.S. market insights
            </p>
            <div className="text-xs text-blue-200 bg-black bg-opacity-30 inline-block px-3 py-1 rounded max-w-fit">
              Image: "Modern U.S. corporate office with analytics dashboards and diverse team collaborating"
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="kpi-cards-section">
        {kpis && (
          <>
            <div className="kpi-card" data-testid="kpi-time-to-hire">
              <div className="kpi-title">Time to Hire</div>
              <div className="kpi-value">{kpis.time_to_hire.value} days</div>
              <div className={`kpi-change ${kpis.time_to_hire.change < 0 ? 'positive' : 'negative'}`}>
                {kpis.time_to_hire.change > 0 ? '+' : ''}{kpis.time_to_hire.change}% (Target: {kpis.time_to_hire.target} days)
              </div>
            </div>

            <div className="kpi-card" style={{borderLeftColor: '#10b981'}} data-testid="kpi-offer-acceptance">
              <div className="kpi-title">Offer Acceptance Rate</div>
              <div className="kpi-value">{kpis.offer_acceptance.value}%</div>
              <div className={`kpi-change ${kpis.offer_acceptance.change > 0 ? 'positive' : 'negative'}`}>
                +{kpis.offer_acceptance.change}% (Target: {kpis.offer_acceptance.target}%)
              </div>
            </div>

            <div className="kpi-card" style={{borderLeftColor: '#f59e0b'}} data-testid="kpi-recruiter-productivity">
              <div className="kpi-title">Recruiter Productivity</div>
              <div className="kpi-value">{kpis.recruiter_productivity.value}%</div>
              <div className={`kpi-change ${kpis.recruiter_productivity.change > 0 ? 'positive' : 'negative'}`}>
                +{kpis.recruiter_productivity.change}% (Target: {kpis.recruiter_productivity.target}%)
              </div>
            </div>

            <div className="kpi-card" style={{borderLeftColor: '#8b5cf6'}} data-testid="kpi-skills-coverage">
              <div className="kpi-title">Skills Coverage</div>
              <div className="kpi-value">{kpis.skills_coverage.value}%</div>
              <div className={`kpi-change ${kpis.skills_coverage.change > 0 ? 'positive' : 'negative'}`}>
                +{kpis.skills_coverage.change}% (Target: {kpis.skills_coverage.target}%)
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="quick-links-section">
        <Link to="/job-market" className="enterprise-card group" data-testid="link-job-market">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Job Market Trends</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Analyze job posting trends across roles, industries, and U.S. regions with interactive visualizations.
          </p>
          <div className="text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
            Explore Trends →
          </div>
        </Link>

        <Link to="/salary" className="enterprise-card group" data-testid="link-salary">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Salary Benchmarking</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Compare compensation across roles and regions with median, quartile, and distribution data.
          </p>
          <div className="text-green-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
            View Salaries →
          </div>
        </Link>

        <Link to="/skills" className="enterprise-card group" data-testid="link-skills">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Skill Gap Analysis</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Identify critical skill shortages and get recommendations for training and hiring priorities.
          </p>
          <div className="text-purple-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
            Analyze Skills →
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
