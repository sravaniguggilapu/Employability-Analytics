# Employability Analytics Application
## Project Charter

**Project Title:** Employability Analytics – Data-Driven Workforce Intelligence Platform

**Semester and Year:** Fall 2025

**Course:** XX 5960 - Master's Research Project

**Team Members (Group 3):**
- Akhila Dande – Product Lead
- Rakesh Madasani – Backend Developer / Data Engineer  
- Satish Mattam – Front-End Developer / UI Designer
- Sravani Mudunuri – Data Analyst / Research
- Sharath Chand Mukku – DevOps / QA Engineer

**Institution:** Saint Louis University

---

## Executive Summary

The Employability Analytics Application is a web-based decision support system designed to empower U.S. recruiters, HR managers, and C-level executives with data-driven insights for strategic workforce planning. The application addresses critical challenges in talent acquisition including time-to-hire optimization, salary benchmarking, skill gap identification, and predictive hiring trend analysis.

---

## Project Background

### Problem Statement

Organizations in the United States face significant challenges in making informed hiring decisions due to:

1. **Fragmented Market Intelligence:** Job market data scattered across multiple sources
2. **Reactive Hiring:** Lack of predictive insights leading to reactive rather than strategic talent acquisition
3. **Salary Misalignment:** Difficulty benchmarking compensation against regional and role-specific market rates
4. **Skills Shortage:** Inability to identify and address critical skill gaps proactively
5. **Data Overload:** Abundance of data without actionable insights

### Project Goals

1. **Centralize Workforce Intelligence:** Aggregate job market trends, salary data, and skills analysis into a single platform
2. **Enable Predictive Planning:** Provide 6-12 month forecasts for strategic workforce planning
3. **Optimize Compensation Strategy:** Deliver real-time salary benchmarking across roles and U.S. regions
4. **Identify Skill Gaps:** Highlight critical talent shortages with actionable recommendations
5. **Improve Decision Speed:** Reduce time-to-hire through data-driven insights

---

## Target Users

### Primary Users

#### 1. Chief Human Resources Officers (CHROs)
- **Organizational Level:** C-Suite Executive
- **Decision Scope:** Strategic workforce planning, budget allocation, organizational talent strategy
- **Key Needs:** High-level KPI tracking, predictive trends, ROI on hiring investments

#### 2. HR Managers / Talent Acquisition Leaders
- **Organizational Level:** Middle Management
- **Decision Scope:** Hiring strategies, team productivity, compensation planning
- **Key Needs:** Detailed analytics, regional insights, skill gap identification

#### 3. Recruiters / Talent Specialists
- **Organizational Level:** Operational
- **Decision Scope:** Day-to-day hiring decisions, candidate sourcing, salary negotiations
- **Key Needs:** Real-time market data, salary benchmarks, trending roles

### User Personas

**Persona 1: Sarah Chen - CHRO at Tech Company**
- Age: 45
- Experience: 20+ years in HR leadership
- Goals: Reduce hiring costs by 20%, improve offer acceptance rate to 85%
- Pain Points: Lacks predictive insights, struggles to justify budget increases
- Tech Proficiency: Moderate (uses PowerBI, Excel)

**Persona 2: Michael Rodriguez - HR Manager at Healthcare System**
- Age: 35
- Experience: 10 years in talent acquisition
- Goals: Fill critical roles faster, stay within salary budgets
- Pain Points: Competitive market, difficulty assessing fair compensation
- Tech Proficiency: High (familiar with HRIS, ATS systems)

**Persona 3: Priya Patel - Technical Recruiter**
- Age: 28
- Experience: 5 years in IT recruiting
- Goals: Source qualified candidates, negotiate competitive offers
- Pain Points: Candidate expectations vs. budget, skill mismatches
- Tech Proficiency: Expert (uses LinkedIn Recruiter, ATS, sourcing tools)

---

## Scope

### In Scope

1. **Data Analytics Features**
   - Job market trends analysis (2020-2025)
   - Salary benchmarking by role and region
   - Skill gap analysis with severity ratings
   - Predictive hiring trends (6-12 month forecasts)
   - KPI dashboard (Time-to-Hire, Offer Acceptance, Productivity, Skills Coverage)

2. **Geographic Coverage**
   - United States (4 regions: Northeast, Midwest, South, West)

3. **Role Coverage**
   - 10 job roles spanning technology, management, and analytics

4. **Industry Coverage**
   - 5 industries: Technology, Finance, Healthcare, Retail, Manufacturing

5. **Export Capabilities**
   - CSV export for detailed analysis
   - PDF reports for executive presentations

6. **User Interface**
   - Web-based responsive application
   - Interactive charts and visualizations
   - Filter-based exploration

### Out of Scope

1. **Applicant Tracking System (ATS)** integration
2. **Resume parsing** or candidate management
3. **Real-time job posting** integration from external APIs
4. **International markets** (non-U.S. data)
5. **Salary negotiation tools** or candidate communication features
6. **HRIS integration** with existing enterprise systems
7. **Custom reporting builder** (uses predefined report formats)

---

## Data Sources and Methodology

### Data Generation Approach

Due to proprietary nature of real job market data, this project utilizes **synthetic data** generated using statistical models that reflect real-world U.S. labor market characteristics.

### Synthetic Data Specifications

**Dataset Size:** 1,500 job posting records

**Dimensions:**
- **Temporal:** Monthly data from January 2020 to December 2025 (72 months)
- **Geographic:** 4 U.S. regions (Northeast, Midwest, South, West)
- **Occupational:** 10 job roles
- **Industrial:** 5 industry sectors
- **Skills:** 16 technical and soft skills

**Data Fields:**
1. **Unique ID:** UUID for each record
2. **Role:** Job title (Data Scientist, ML Engineer, etc.)
3. **Region:** U.S. geographic region
4. **Industry:** Business sector
5. **Date:** Job posting date
6. **Salary:** Annual compensation in USD
7. **Skills:** 3-6 required skills per posting
8. **Demand Score:** Market demand (40-100 scale)
9. **Supply Score:** Talent availability (30-95 scale)
10. **Job Postings Count:** Number of similar postings (5-50)

### Data Validation Rules

1. **Salary Realism:** Based on 2024 U.S. Bureau of Labor Statistics data
   - Regional adjustments (West Coast 10-15% premium, Midwest 10-15% discount)
   - Role-specific ranges ($60k for Data Analyst to $220k for Cloud Architect)

2. **Temporal Distribution:** Uniform distribution across 2,191 days

3. **Skill Assignment:** Random sampling ensuring 3-6 skills per record

4. **Demand/Supply Scores:** Independent random generation within validated ranges

5. **Data Integrity:** No null values, all foreign keys validated

---

## Key Features and Functionality

### 1. Dashboard / Overview
**Purpose:** Executive-level KPI monitoring

**Components:**
- Hero section with application overview
- 4 KPI cards:
  - Time to Hire (target: 20 days)
  - Offer Acceptance Rate (target: 85%)
  - Recruiter Productivity (target: 90%)
  - Skills Coverage (target: 90%)
- Quick links to detailed analytics pages

**Decision Support:** Rapid assessment of hiring performance against targets

### 2. Job Market Trends
**Purpose:** Analyze demand patterns across roles, industries, and regions

**Components:**
- Multi-filter system (Role, Industry, Region, Date Range)
- Time series line chart showing monthly job postings by role
- Top 10 trending roles table with growth percentages
- Total postings counter

**Decision Support:** 
- Identify high-growth roles for proactive recruitment
- Detect seasonal hiring patterns
- Compare regional demand variations

### 3. Salary Benchmarking
**Purpose:** Competitive compensation analysis

**Components:**
- Role and region filters
- Bar chart comparing median salaries
- Detailed statistics table (Min, Q1, Median, Q3, Max)
- Sample size indicators for statistical confidence

**Decision Support:**
- Ensure competitive salary offers
- Budget planning for new positions
- Salary negotiation guidance
- Regional cost-of-living adjustments

### 4. Skill Gap Analysis
**Purpose:** Identify critical talent shortages

**Components:**
- Top 5 skill gaps with severity ratings (High/Medium/Low)
- Horizontal bar chart: Demand vs. Supply comparison
- Auto-generated recommendations for training and hiring

**Decision Support:**
- Prioritize training budget allocation
- Focus recruitment on high-gap skills
- Strategic workforce development planning

### 5. Predictive Hiring Trends
**Purpose:** Forecast future hiring needs

**Components:**
- Horizon selector (6 or 12 months)
- Area chart with confidence bands (±15%)
- Forecast values table with upper/lower bounds
- Model explanation panel

**Decision Support:**
- Proactive capacity planning
- Budget forecasting
- Strategic headcount planning
- Risk assessment (best/worst case scenarios)

### 6. Export & Reports
**Purpose:** Share insights with stakeholders

**Components:**
- Data type selector (Job Market / Salary / Skills)
- CSV export for detailed analysis
- PDF reports for executive presentations
- Power BI integration placeholder (future enhancement)

**Decision Support:**
- Board presentations
- Budget justification documents
- Strategic planning documentation

### 7. About / Team
**Purpose:** Context and attribution

**Components:**
- Project mission statement
- Team member profiles
- Saint Louis University branding
- How the application demonstrates employability analytics

---

## Technical Architecture

### Technology Stack

**Frontend:**
- React 19 (JavaScript framework)
- Recharts (data visualization library)
- Shadcn UI (component library)
- Tailwind CSS (styling framework)
- React Router (navigation)

**Backend:**
- FastAPI (Python web framework)
- Motor (async MongoDB driver)
- Pydantic (data validation)
- ReportLab (PDF generation)
- Python 3.11+

**Database:**
- MongoDB (NoSQL document database)

**Deployment:**
- Docker containers
- Kubernetes orchestration
- Nginx reverse proxy

### System Architecture

```
┌─────────────┐
│   Browser   │
│  (React UI) │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────┐
│  Backend API    │
│   (FastAPI)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    MongoDB      │
│  (Synthetic     │
│   Data Store)   │
└─────────────────┘
```

### API Endpoints

1. `POST /api/auth/login` - Authentication
2. `GET /api/data/kpis` - Dashboard KPIs
3. `GET /api/data/job-market` - Job market trends
4. `GET /api/data/salary` - Salary benchmarking
5. `GET /api/data/skills` - Skill gap analysis
6. `GET /api/data/forecast` - Predictive trends
7. `POST /api/export/csv` - CSV export
8. `POST /api/export/pdf` - PDF report generation

---

## Success Metrics

### Quantitative Metrics

1. **User Adoption:**
   - Target: 50+ users within first 3 months
   - Measure: Active user count, session duration

2. **Decision Impact:**
   - Target: 20% reduction in time-to-hire
   - Target: 15% improvement in offer acceptance rate
   - Measure: Pre/post implementation comparison

3. **System Performance:**
   - Target: Page load time < 2 seconds
   - Target: 99.5% uptime
   - Measure: Application monitoring logs

4. **Data Accuracy:**
   - Target: Salary predictions within ±10% of market rates
   - Measure: External benchmarking against Glassdoor, LinkedIn data

### Qualitative Metrics

1. **User Satisfaction:**
   - Measure: User surveys (Net Promoter Score)
   - Target: NPS > 50

2. **Feature Utilization:**
   - Measure: Page view analytics
   - Target: All 7 pages accessed by 80% of users

3. **Decision Confidence:**
   - Measure: User feedback surveys
   - Target: 85% report increased confidence in hiring decisions

---

## Project Timeline

### Phase 1: Planning & Research (Weeks 1-2)
- ✅ Define project charter
- ✅ Identify target users and decision needs
- ✅ Research U.S. job market data characteristics
- ✅ Finalize feature specifications

### Phase 2: Data Preparation (Weeks 3-4)
- ✅ Design synthetic data generation algorithms
- ✅ Implement data validation rules
- ✅ Generate 1,500 record dataset
- ✅ Create data dictionary and documentation

### Phase 3: Backend Development (Weeks 5-6)
- ✅ Set up FastAPI server
- ✅ Implement data generation logic
- ✅ Build API endpoints
- ✅ Develop export functionality (CSV/PDF)

### Phase 4: Frontend Development (Weeks 7-9)
- ✅ Create React application structure
- ✅ Build 8 pages with navigation
- ✅ Implement interactive charts (Recharts)
- ✅ Design enterprise UI (Power BI-style)
- ✅ Develop filter systems

### Phase 5: Integration & Testing (Weeks 10-11)
- ✅ Connect frontend to backend APIs
- ✅ End-to-end functionality testing
- ✅ Performance optimization
- ✅ Cross-browser testing

### Phase 6: Documentation & Deployment (Week 12)
- ✅ Write user documentation
- ✅ Create technical documentation
- ✅ Deploy to production environment
- ✅ Prepare presentation materials

---

## Risk Management

### Technical Risks

**Risk 1: Data Generation Quality**
- Impact: High
- Probability: Medium
- Mitigation: Validation against BLS statistics, peer review of algorithms
- Status: Mitigated through statistical modeling

**Risk 2: Performance with Large Datasets**
- Impact: Medium
- Probability: Low
- Mitigation: Database indexing, API pagination, caching
- Status: Handled through MongoDB aggregation pipelines

**Risk 3: Browser Compatibility**
- Impact: Low
- Probability: Medium
- Mitigation: Cross-browser testing, responsive design
- Status: Tested on Chrome, Firefox, Safari, Edge

### Project Risks

**Risk 1: Scope Creep**
- Impact: High
- Probability: High
- Mitigation: Strict adherence to project charter, regular scope reviews
- Status: Controlled through weekly team meetings

**Risk 2: Team Member Availability**
- Impact: Medium
- Probability: Medium
- Mitigation: Cross-training, documentation, flexible task assignment
- Status: Managed through clear role definitions

**Risk 3: Technical Skill Gaps**
- Impact: Medium
- Probability: Medium
- Mitigation: Online tutorials, peer mentoring, proof-of-concept prototyping
- Status: Addressed through iterative learning

---

## Team Roles and Responsibilities

### Akhila Dande – Product Lead
- Define product vision and feature requirements
- Coordinate between technical and business perspectives
- Manage project timeline and deliverables
- Conduct user research and validation
- Prepare project documentation

### Rakesh Madasani – Backend Developer / Data Engineer
- Design and implement FastAPI backend
- Create synthetic data generation algorithms
- Build API endpoints and business logic
- Implement export functionality (CSV/PDF)
- Database schema design and optimization

### Satish Mattam – Front-End Developer / UI Designer
- Develop React application architecture
- Design enterprise-style user interface
- Implement interactive visualizations (Recharts)
- Ensure responsive and accessible design
- Create consistent design system

### Sravani Mudunuri – Data Analyst / Research
- Research U.S. labor market characteristics
- Validate data generation algorithms
- Perform statistical analysis and testing
- Create data dictionary and documentation
- Quality assurance for analytics accuracy

### Sharath Chand Mukku – DevOps / QA Engineer
- Set up development and production environments
- Configure CI/CD pipelines
- Perform system integration testing
- Monitor application performance
- Ensure deployment readiness

---

## Deliverables

### 1. Application
- ✅ Live web application deployed at production URL
- ✅ Demo credentials: demo@company.com / demo123

### 2. Data Files
- ✅ employability_data_full.csv (1,500 records)
- ✅ salary_summary.csv (40 role-region combinations)
- ✅ skills_analysis.csv (16 skills with gap analysis)
- ✅ monthly_trends.csv (72 months of aggregated data)
- ✅ data_dictionary.csv (column definitions)

### 3. Code Repository
- ✅ Backend Python code (FastAPI server)
- ✅ Frontend React code (UI components)
- ✅ Data generation scripts
- ✅ Documentation (README, API docs)

### 4. Documentation
- ✅ Project Charter (this document)
- ✅ Experiential Report (see separate document)
- ✅ Data Dictionary and Formulas Guide
- ✅ Page Wireframes Guide
- ✅ Deployment Readiness Report

### 5. Presentation Materials
- ✅ PowerPoint slides (8-minute presentation)
- ✅ Demo script (2-3 minutes)
- ✅ Screenshots of all pages

---

## Future Enhancements

### Phase 2 (Post-Launch)

1. **Real-Time Data Integration**
   - Connect to LinkedIn API, Indeed API, Glassdoor API
   - Replace synthetic data with live job postings

2. **Advanced Analytics**
   - Machine learning models for skill demand prediction
   - Sentiment analysis on job descriptions
   - Competitive intelligence (company-specific hiring trends)

3. **Collaboration Features**
   - Team workspaces
   - Shared dashboards
   - Commenting and annotation

4. **Mobile Application**
   - iOS and Android native apps
   - Push notifications for trend alerts

5. **Power BI Integration**
   - Direct connector for embedded dashboards
   - Custom report builder

6. **HRIS Integration**
   - Two-way sync with Workday, SAP SuccessFactors
   - ATS integration (Greenhouse, Lever)

---

## Conclusion

The Employability Analytics Application successfully demonstrates how data-driven insights can transform strategic workforce planning. By providing recruiters, HR managers, and executives with actionable intelligence on job market trends, salary benchmarking, skill gaps, and predictive forecasts, the application addresses critical decision-making needs in talent acquisition.

This project showcases the application of academic knowledge in data analytics, user experience design, software engineering, and project management to solve a real-world business problem. The synthetic data approach ensures scalability and privacy while maintaining statistical validity and real-world applicability.

---

**Project Charter Approved By:**

Team Lead: Akhila Dande  
Date: December 2, 2025

---

**Saint Louis University**  
Graduate School  
Master's Research Project  
Fall 2025
