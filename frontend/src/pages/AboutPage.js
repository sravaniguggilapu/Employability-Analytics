import React from 'react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Akhila Dande',
      role: 'Product Lead',
      bio: 'Strategic vision and product roadmap leadership'
    },
    {
      name: 'Rakesh Madasani',
      role: 'Backend Developer / Data Engineer',
      bio: 'API architecture and data pipeline development'
    },
    {
      name: 'Satish Mattam',
      role: 'Front-End Developer / UI Designer',
      bio: 'User interface design and interactive experiences'
    },
    {
      name: 'Sravani Mudunuri',
      role: 'Data Analyst / Research',
      bio: 'Data analysis and market research insights'
    },
    {
      name: 'Sharath Chand Mukku',
      role: 'DevOps / QA Engineer',
      bio: 'System reliability and quality assurance'
    }
  ];

  return (
    <div data-testid="about-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Work Sans'}}>About Employability Analytics</h1>
        <p className="text-gray-600">Our mission, team, and technology</p>
      </div>

      {/* Mission Section */}
      <div className="enterprise-card mb-6" data-testid="mission-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Work Sans'}}>Project Purpose</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The Employability Analytics Application is designed to help U.S. recruiters, HR managers, and executives make data-driven hiring 
          and workforce planning decisions. Our platform provides comprehensive dashboards for job market trends, salary benchmarking, 
          and skill gap analysis, complemented by predictive insights and exportable reports.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This prototype demonstrates how synthetic U.S. labor market data can be leveraged to provide actionable insights for talent 
          acquisition strategies, compensation planning, and skills development initiatives.
        </p>
      </div>

      {/* University Badge */}
      <div className="bg-gradient-to-r from-blue-900 to-red-700 rounded-2xl p-8 mb-6 text-center" data-testid="university-badge">
        <div className="text-white">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Saint Louis University</h3>
          <p className="text-blue-100">Graduate Project • Group 3 • 2025</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-6" data-testid="team-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Work Sans'}}>Our Team</h2>
        
        {/* Team Image Placeholder */}
        <div className="mb-6 bg-gradient-to-r from-slate-800 to-blue-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-64">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop)',
                opacity: 0.5
              }}
            />
            <div className="relative z-10 h-full flex items-center justify-center px-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">Collaborative Excellence</h3>
                <p className="text-blue-100">A diverse team bringing together expertise in product, engineering, design, data, and operations</p>
                <div className="text-xs text-blue-200 bg-black bg-opacity-30 inline-block px-3 py-1 rounded mt-4">
                  Image: "Professional diverse U.S. team collaborating in modern corporate setting"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="enterprise-card" data-testid={`team-member-${index}`}>
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-blue-600">{member.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Demonstrates Section */}
      <div className="enterprise-card" data-testid="demonstration-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Work Sans'}}>How This Demonstrates Employability Analytics</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Synthetic U.S. Labor Market Data</h4>
              <p className="text-sm text-gray-700">
                Our prototype uses 1,500+ synthetically generated job posting records across U.S. regions (Northeast, Midwest, South, West), 
                multiple industries, and key technology roles with realistic salary ranges ($60k-$220k).
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Interactive Analytics Dashboards</h4>
              <p className="text-sm text-gray-700">
                Real-time filtering, interactive charts, and comprehensive visualizations provide recruiters with the tools needed 
                to understand job market dynamics, benchmark salaries, and identify skill gaps.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Predictive Insights & Recommendations</h4>
              <p className="text-sm text-gray-700">
                Our forecasting models project hiring trends 6-12 months ahead, while skill gap analysis provides actionable 
                recommendations for training and recruitment priorities.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Enterprise-Ready Export & Reporting</h4>
              <p className="text-sm text-gray-700">
                Export capabilities to CSV and PDF formats enable seamless integration with existing HR systems and stakeholder reporting workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
