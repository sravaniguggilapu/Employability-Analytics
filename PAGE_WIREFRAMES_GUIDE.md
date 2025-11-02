# Employability Analytics - Complete Page Wireframes & Explanations

## 📋 Table of Contents
1. [Login Page](#1-login-page)
2. [Dashboard / Overview Page](#2-dashboard--overview-page)
3. [Job Market Trends Page](#3-job-market-trends-page)
4. [Salary Benchmarking Page](#4-salary-benchmarking-page)
5. [Skill Gap Analysis Page](#5-skill-gap-analysis-page)
6. [Predictive Hiring Trends Page](#6-predictive-hiring-trends-page)
7. [Export & Reports Page](#7-export--reports-page)
8. [About / Team Page](#8-about--team-page)
9. [Common Navigation Elements](#9-common-navigation-elements)

---

## 1. Login Page

### Visual Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│     Gradient Background (Purple → Blue)         │
│                                                 │
│         ┌──────────────────────┐               │
│         │  [Analytics Icon]    │               │
│         │                      │               │
│         │ Employability        │               │
│         │    Analytics         │               │
│         │ Data-driven hiring   │               │
│         │   insights for U.S.  │               │
│         │                      │               │
│         │ ┌──────────────────┐│               │
│         │ │ Demo Credentials ││               │
│         │ │ Email: demo@..   ││               │
│         │ │ Password: demo123││               │
│         │ │ [Use Demo]       ││               │
│         │ └──────────────────┘│               │
│         │                      │               │
│         │ Email Address        │               │
│         │ [Input Field]        │               │
│         │                      │               │
│         │ Password             │               │
│         │ [Input Field]        │               │
│         │                      │               │
│         │   [Sign In Button]   │               │
│         │                      │               │
│         │ © 2025 Employability │               │
│         │   Analytics | SLU    │               │
│         └──────────────────────┘               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Components Explained

#### 1.1 Background
- **Element:** Full-page gradient background
- **Colors:** Purple to blue gradient (667eea → 764ba2)
- **Purpose:** Creates an inviting, modern first impression
- **Design Choice:** Enterprise-friendly colors that convey professionalism and trust

#### 1.2 Login Card
- **Element:** White rounded card (centered)
- **Size:** Max-width 400px
- **Shadow:** Large drop shadow for elevation
- **Purpose:** Focuses attention on login form

#### 1.3 Application Icon
- **Element:** Blue gradient square with chart icon
- **Size:** 64×64 pixels
- **Purpose:** Brand identity and visual anchor
- **Icon:** Bar chart representing analytics

#### 1.4 Title & Subtitle
- **Title:** "Employability Analytics"
  - Font: Work Sans (bold)
  - Size: 32px
  - Color: Dark gray (#1f2937)
- **Subtitle:** "Data-driven hiring insights for U.S. organizations"
  - Font: Inter
  - Size: 14px
  - Color: Medium gray (#6b7280)

#### 1.5 Demo Credentials Banner
- **Element:** Blue information box
- **Background:** Light blue (#eff6ff)
- **Border:** Blue border (#3b82f6)
- **Contents:**
  - Info icon
  - Text: "Demo Credentials"
  - Email: demo@company.com
  - Password: demo123
  - Clickable link: "Click to use demo credentials →"
- **Purpose:** Makes testing easy for reviewers/demo users
- **Functionality:** Auto-fills credentials when clicked

#### 1.6 Email Input Field
- **Label:** "Email Address"
- **Placeholder:** "your@email.com"
- **Type:** Email validation
- **Border:** Gray with blue focus ring
- **Required:** Yes

#### 1.7 Password Input Field
- **Label:** "Password"
- **Placeholder:** "Enter your password"
- **Type:** Password (masked input)
- **Border:** Gray with blue focus ring
- **Required:** Yes

#### 1.8 Sign In Button
- **Text:** "Sign In"
- **Style:** Full-width gradient button
- **Colors:** Blue to purple gradient
- **Hover Effect:** Darker gradient + shadow
- **Loading State:** Shows spinner and "Logging in..." text
- **Purpose:** Submits authentication request

#### 1.9 Footer Text
- **Text:** "© 2025 Employability Analytics | Saint Louis University"
- **Size:** 12px
- **Color:** Gray
- **Purpose:** Attribution and copyright

### Functionality

**Authentication Flow:**
1. User enters email and password OR clicks "Use demo credentials"
2. Form validates inputs (email format, non-empty password)
3. POST request to `/api/auth/login`
4. Backend checks credentials:
   - demo@company.com + demo123 = SUCCESS
   - Any other combination = FAILURE
5. On success:
   - Token stored in localStorage
   - User redirected to /dashboard
6. On failure:
   - Error toast notification displayed

**API Call:**
```javascript
POST /api/auth/login
Body: { email: "demo@company.com", password: "demo123" }
Response: { success: true, token: "mock-jwt-token-uuid" }
```

**State Management:**
- `isAuthenticated` state determines page access
- Token persists in localStorage for session continuity
- Protected routes redirect to login if not authenticated

---

## 2. Dashboard / Overview Page

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ [Header with Logo + Title]              [Sign Out Button]  │
├─────────────────────────────────────────────────────────────┤
│ [Navigation: Overview | Job Market | Salary | Skills | ...]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │         HERO SECTION (Background Image)               │ │
│  │                                                       │ │
│  │   Employability Analytics Dashboard                  │ │
│  │   Make data-driven hiring decisions...               │ │
│  │                                                       │ │
│  │   Image: "Modern U.S. corporate office..."           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │Time to  │ │ Offer   │ │Recruiter│ │ Skills  │        │
│  │  Hire   │ │Acceptance│ │Producti-│ │Coverage │        │
│  │  28 days│ │   72%   │ │ vity 85%│ │   82%   │        │
│  │  -15%   │ │   +8%   │ │   +12%  │ │   +5%   │        │
│  │Target:20│ │Target:85│ │Target:90│ │Target:90│        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                    │
│  │  📈     │ │   💰    │ │   🎯    │                    │
│  │Job Mkt  │ │ Salary  │ │ Skills  │                    │
│  │ Trends  │ │Benchmark│ │   Gap   │                    │
│  │Analyze  │ │Compare  │ │Identify │                    │
│  │trends..│ │comp... │ │critical.│                    │
│  │Explore→│ │View →  │ │Analyze→│                    │
│  └─────────┘ └─────────┘ └─────────┘                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│          © 2025 Employability Analytics – Group 3 | SLU    │
└─────────────────────────────────────────────────────────────┘
```

### Components Explained

#### 2.1 Hero Section
- **Element:** Large banner with background image overlay
- **Height:** 320px
- **Background:** 
  - Base: Dark gradient (blue-900 to purple-900)
  - Image: Modern office/analytics workspace (40% opacity)
  - Source: Placeholder from Unsplash
- **Content:**
  - **Main Heading:** "Employability Analytics Dashboard"
    - Font: Work Sans, 48px (60px on desktop)
    - Color: White
    - Weight: Bold
  - **Subtitle:** "Make data-driven hiring and workforce planning decisions with real-time U.S. market insights"
    - Font: Inter, 20px
    - Color: Light blue (#bfdbfe)
  - **Image Credit:** Small text showing AI image prompt
    - Text: "Image: Modern U.S. corporate office with analytics dashboards..."
    - Color: Light blue with dark overlay
    - Size: 12px
- **Purpose:** 
  - Establishes the application's purpose immediately
  - Creates professional, enterprise feel
  - Sets the tone for data-driven decision making

#### 2.2 KPI Cards Section (4 Cards)

**Card 1: Time to Hire**
```
┌────────────────┐
│ Time to Hire   │ ← Title (gray, small)
│                │
│   28 days      │ ← Value (large, bold)
│                │
│ -15% ↑         │ ← Change % (green = good)
│ (Target: 20)   │ ← Target value
└────────────────┘
```
- **Left Border:** Blue (4px)
- **Background:** White with subtle gradient
- **Hover Effect:** Shadow increases, card lifts slightly
- **Data Source:** `/api/data/kpis`
- **Calculation:** 
  - Current: 28 days (average time from job posting to hire)
  - Change: -15% (improvement from 33 days last year)
  - Target: 20 days (company goal)
- **Interpretation:** 
  - Lower is better
  - Negative change percentage is GOOD (faster hiring)
  - Still 8 days away from target

**Card 2: Offer Acceptance Rate**
```
┌────────────────┐
│ Offer Accept   │
│                │
│      72%       │
│                │
│ +8% ↑          │ ← Green (positive)
│ (Target: 85%)  │
└────────────────┘
```
- **Left Border:** Green
- **Data:** Percentage of job offers accepted by candidates
- **Calculation:** (Accepted Offers / Total Offers) × 100
- **Current:** 72% acceptance rate
- **Change:** +8% improvement (was 66.7% last year)
- **Target:** 85% (industry benchmark)
- **Interpretation:** Trending upward but still 13% below target

**Card 3: Recruiter Productivity**
```
┌────────────────┐
│ Recruiter Prod │
│                │
│      85%       │
│                │
│ +12% ↑         │
│ (Target: 90%)  │
└────────────────┘
```
- **Left Border:** Orange
- **Metric:** Efficiency of recruiting team
- **Calculation:** (Successful Placements / Total Recruiting Hours) × Efficiency Factor
- **Current:** 85% productivity
- **Change:** +12% improvement
- **Target:** 90%
- **Interpretation:** Strong improvement, close to target

**Card 4: Skills Coverage**
```
┌────────────────┐
│ Skills Coverage│
│                │
│      82%       │
│                │
│ +5% ↑          │
│ (Target: 90%)  │
└────────────────┘
```
- **Left Border:** Purple
- **Metric:** How well candidate pool matches required skills
- **Calculation:** (Candidates with Required Skills / Total Requirements) × 100
- **Current:** 82%
- **Change:** +5% improvement
- **Target:** 90%
- **Interpretation:** Slight skills gap exists, steady improvement

**KPI Card Styling:**
- **Card Size:** Flexible, equal width in 4-column grid
- **Padding:** 20px
- **Border Radius:** 10px
- **Shadow:** Subtle on default, stronger on hover
- **Animation:** Transform translateY(-4px) on hover

#### 2.3 Quick Links Section (3 Cards)

**Card Layout:**
```
┌────────────────────┐
│ [Icon] Card Title  │ ← Header with icon
│                    │
│ Short description  │ ← 2-3 line summary
│ of the page and    │
│ what users can do  │
│                    │
│ Action Link →      │ ← Call to action
└────────────────────┘
```

**Quick Link 1: Job Market Trends**
- **Icon:** 📈 Blue chart icon (48×48px background circle)
- **Title:** "Job Market Trends"
- **Description:** "Analyze job posting trends across roles, industries, and U.S. regions with interactive visualizations."
- **Link:** "Explore Trends →"
- **Link Color:** Blue (#2563eb)
- **Destination:** `/job-market`
- **Hover Effect:** Arrow moves right 8px

**Quick Link 2: Salary Benchmarking**
- **Icon:** 💰 Green dollar icon
- **Title:** "Salary Benchmarking"
- **Description:** "Compare compensation across roles and regions with median, quartile, and distribution data."
- **Link:** "View Salaries →"
- **Link Color:** Green (#10b981)
- **Destination:** `/salary`

**Quick Link 3: Skill Gap Analysis**
- **Icon:** 🎯 Purple target icon
- **Title:** "Skill Gap Analysis"
- **Description:** "Identify critical skill shortages and get recommendations for training and hiring priorities."
- **Link:** "Analyze Skills →"
- **Link Color:** Purple (#8b5cf6)
- **Destination:** `/skills`

**Card Styling:**
- **Layout:** 3-column grid (responsive to 1 column on mobile)
- **Background:** White
- **Border:** 1px light gray
- **Padding:** 24px
- **Border Radius:** 12px
- **Hover:** 
  - Shadow: 0 8px 24px rgba(0,0,0,0.12)
  - Transform: translateY(-2px)
  - Arrow animation

**Purpose:**
- Provides direct navigation to most important features
- Explains value proposition of each section
- Encourages exploration of the platform

---

## 3. Job Market Trends Page

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Job Market Trends                                           │
│ Analyze job posting trends across U.S. roles, industries... │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Filters                                               │   │
│ │ [Role ▼] [Industry ▼] [Region ▼]                     │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Total Job Postings: 41,250                     [📄]   │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Monthly Job Postings Trend                            │   │
│ │                                                       │   │
│ │  Postings                                             │   │
│ │    5000│      ╱─────                                  │   │
│ │        │    ╱                                         │   │
│ │    4000│  ╱                                           │   │
│ │        │╱                                             │   │
│ │    3000│                                              │   │
│ │        └────────────────────────                     │   │
│ │         Jan  Mar  May  Jul  Sep  Nov                 │   │
│ │                                                       │   │
│ │ Legend: — Data Scientist  — Data Engineer            │   │
│ │         — ML Engineer      — Software Engineer       │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Top 10 Trending Roles                                 │   │
│ │ ┌──────┬──────────────────┬────────┬──────────────┐  │   │
│ │ │ Rank │ Role             │ Growth │ Postings     │  │   │
│ │ ├──────┼──────────────────┼────────┼──────────────┤  │   │
│ │ │  #1  │ Data Scientist   │  67%   │ 5,420       │  │   │
│ │ │  #2  │ ML Engineer      │  82%   │ 4,890       │  │   │
│ │ │  #3  │ Data Engineer    │  45%   │ 4,560       │  │   │
│ │ │ ...  │ ...              │  ...   │ ...         │  │   │
│ │ └──────┴──────────────────┴────────┴──────────────┘  │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components Explained

#### 3.1 Page Header
- **Title:** "Job Market Trends"
  - Font: Work Sans, 36px, Bold
- **Subtitle:** "Analyze job posting trends across U.S. roles, industries, and regions"
  - Font: Inter, 16px, Gray

#### 3.2 Filter Section

**Filter Panel:**
```
┌────────────────────────────────────┐
│ Filters                            │
│ ┌──────────┐ ┌──────────┐ ┌──────┐│
│ │Role      │ │Industry  │ │Region││
│ │All Roles▼│ │All Ind. ▼│ │All ▼ ││
│ └──────────┘ └──────────┘ └──────┘│
└────────────────────────────────────┘
```

**Role Filter:**
- **Type:** Dropdown (shadcn Select component)
- **Options:**
  - All Roles (default)
  - Data Scientist
  - Data Engineer
  - Machine Learning Engineer
  - Data Analyst
  - Software Engineer
  - HR Manager
  - Product Manager
  - Business Analyst
  - DevOps Engineer
  - Cloud Architect
- **Purpose:** Filter data to show only selected role
- **Effect:** Reloads monthly chart and trending table with filtered data

**Industry Filter:**
- **Options:**
  - All Industries (default)
  - Tech
  - Finance
  - Healthcare
  - Retail
  - Manufacturing
- **Purpose:** Segment data by business sector

**Region Filter:**
- **Options:**
  - All Regions (default)
  - Northeast (NY, MA, PA, NJ, CT)
  - Midwest (IL, OH, MI, WI, MN)
  - South (TX, FL, GA, NC, VA)
  - West (CA, WA, OR, CO, AZ)
- **Purpose:** Geographic segmentation

**Filter Behavior:**
- Filters are cumulative (AND logic)
- Example: Role="Data Scientist" + Region="West" shows only Data Scientist jobs in Western U.S.
- Real-time update: Charts refresh immediately on filter change
- API call: `/api/data/job-market?role=X&industry=Y&region=Z`

#### 3.3 Total Postings Card

**Layout:**
```
┌────────────────────────────────────┐
│ Total Job Postings          [Icon]│
│ 41,250                            │
└────────────────────────────────────┘
```

- **Display:** Large number with comma formatting
- **Icon:** Document icon (blue background circle)
- **Purpose:** Immediate quantification of dataset size
- **Calculation:** Sum of all `postings` values in filtered dataset
- **Updates:** Real-time when filters change

#### 3.4 Monthly Trends Chart (Line Chart)

**Chart Type:** Multi-line time series
**Library:** Recharts (LineChart component)

**Data Structure:**
```javascript
[
  {
    month: "2023-01",
    "Data Scientist": 450,
    "Data Engineer": 380,
    "ML Engineer": 290,
    "Software Engineer": 520
  },
  {
    month: "2023-02",
    "Data Scientist": 475,
    "Data Engineer": 405,
    ...
  }
]
```

**Visual Elements:**
- **X-Axis:** Month labels (MMM YYYY format)
  - Color: Gray (#6b7280)
  - Font: 12px
- **Y-Axis:** Number of postings
  - Color: Gray
  - Auto-scaled based on data range
- **Grid:** Dashed horizontal lines (#e5e7eb)
- **Lines:** One per role (when no role filter applied)
  - Colors: Blue, Green, Orange, Red, Purple, Pink (cycling)
  - Width: 2px
  - Style: Smooth curves (monotone interpolation)
- **Data Points:** 
  - Circles (4px radius)
  - Larger on hover (6px)
- **Tooltip:** 
  - White background
  - Border: Light gray
  - Shadow: Subtle
  - Shows: Month, Role, Value

**Interaction:**
- **Hover:** Highlights specific data point
- **Legend:** Click to show/hide specific role lines
- **Responsive:** Scales to container width

**Data Aggregation:**
```python
# Backend calculation
monthly_data = {}
for item in filtered_data:
    month = item['date'].strftime('%Y-%m')
    role = item['role']
    monthly_data[month][role] += item['postings']
```

**Interpretation:**
- Upward trends indicate growing demand
- Seasonal patterns visible
- Compare multiple roles simultaneously
- Identify which roles are growing fastest

#### 3.5 Top 10 Trending Roles Table

**Table Structure:**
```
┌──────┬─────────────────────┬────────┬──────────┐
│ Rank │ Role                │ Growth │ Postings │
├──────┼─────────────────────┼────────┼──────────┤
│  #1  │ Data Scientist      │  67%   │  5,420   │
│  #2  │ ML Engineer         │  82%   │  4,890   │
│  #3  │ Data Engineer       │  45%   │  4,560   │
│  #4  │ Software Engineer   │  54%   │  4,230   │
│  #5  │ Product Manager     │  61%   │  3,890   │
│  #6  │ Data Analyst        │  38%   │  3,670   │
│  #7  │ DevOps Engineer     │  49%   │  3,450   │
│  #8  │ Cloud Architect     │  73%   │  3,120   │
│  #9  │ Business Analyst    │  29%   │  2,980   │
│ #10  │ HR Manager          │  22%   │  2,750   │
└──────┴─────────────────────┴────────┴──────────┘
```

**Column Details:**

**Rank:**
- Format: #1, #2, #3...
- Font: Medium weight, gray
- Purpose: Quick visual hierarchy

**Role:**
- Format: Full job title
- Font: Regular, dark gray
- Purpose: Identify position

**Growth:**
- Format: Percentage with % symbol
- Style: Green badge background
- Font: Medium weight, green text
- Calculation: Simulated YoY growth (15-85% range)
- Purpose: Show trending momentum
- Note: In production, would compare current period vs. previous period

**Postings:**
- Format: Comma-separated number
- Font: Regular, gray
- Purpose: Show absolute volume

**Sorting:**
- Primary: Total postings (descending)
- Top 10 only
- Updates when filters change

**Hover Effect:**
- Row: Light gray background on hover
- Transition: Smooth 150ms

**Purpose:**
- Identify hottest job markets
- Compare relative demand
- Strategic hiring decisions

---

## 4. Salary Benchmarking Page

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Salary Benchmarking                                         │
│ Compare compensation across roles and regions (USD)         │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Filters                                               │   │
│ │ [Role ▼] [Region ▼]                                   │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Median Salary by Role and Region                      │   │
│ │                                                       │   │
│ │  Salary                                               │   │
│ │ $180k│     ██                                         │   │
│ │      │     ██      ██                                 │   │
│ │ $120k│     ██      ██      ██                         │   │
│ │      │     ██      ██      ██      ██                 │   │
│ │  $60k│     ██      ██      ██      ██                 │   │
│ │      └──────────────────────────────                  │   │
│ │       Data    ML    Data   SW                         │   │
│ │     Scientist Eng Engineer Eng                        │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Detailed Salary Statistics                            │   │
│ │ ┌──────────┬────────┬────────┬────────┬────────┬─────┐│   │
│ │ │ Role     │ Region │ Min    │ Q1     │ Median │ Q3  ││   │
│ │ ├──────────┼────────┼────────┼────────┼────────┼─────┤│   │
│ │ │Data Sci. │ NE     │$130k   │$145k   │$155k   │$167k││   │
│ │ │Data Sci. │ West   │$140k   │$155k   │$170k   │$185k││   │
│ │ │ML Eng    │ NE     │$135k   │$150k   │$162k   │$175k││   │
│ │ │...       │ ...    │...     │...     │...     │...  ││   │
│ │ └──────────┴────────┴────────┴────────┴────────┴─────┘│   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components Explained

#### 4.1 Page Header
- **Title:** "Salary Benchmarking"
  - Font: Work Sans, 36px
- **Subtitle:** "Compare compensation across roles and regions (USD)"

#### 4.2 Filter Section

**Role Filter:**
- Same options as Job Market page
- Default: "All Roles"
- Effect: Shows salary data for selected role only

**Region Filter:**
- Same 4 U.S. regions
- Default: "All Regions"
- Effect: Narrows data to selected geographic area

**Combined Filtering:**
- Example: Role="Data Scientist" + Region="West"
- Shows only Data Scientist salaries in Western states

#### 4.3 Salary Comparison Chart (Bar Chart)

**Chart Type:** Vertical bar chart
**Library:** Recharts (BarChart component)

**Data Structure:**
```javascript
[
  {
    role: "Data Scientist",
    region: "Northeast",
    median: 155000
  },
  {
    role: "Data Scientist",
    region: "West",
    median: 170000
  }
]
```

**Visual Elements:**
- **X-Axis:** Role names
  - Angled at -45 degrees for readability
  - Height: 120px to accommodate labels
  - Font: 11px
- **Y-Axis:** Salary in USD
  - Auto-scaled
  - Formatted with commas
- **Bars:** 
  - Color: Blue (#2563eb)
  - Width: Auto (based on data count)
  - Hover: Slightly darker shade
- **Tooltip:**
  - Format: "$XXX,XXX"
  - Shows exact median value

**Display Logic:**
- Shows first 15 role-region combinations
- Sorted by median salary (descending)
- When filtered: Shows only matching combinations

**Purpose:**
- Quick visual comparison of compensation
- Identify highest/lowest paying roles and regions
- Spot regional salary disparities

#### 4.4 Detailed Statistics Table

**Table Structure:**
```
┌──────────────┬────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Role         │ Region │ Min     │ Q1      │ Median  │ Q3      │ Max     │
├──────────────┼────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│Data Scientist│Northeast│$130,000│$145,000│$155,000 │$167,000│$180,000│
│Data Scientist│Midwest │$110,000│$125,000│$135,000 │$142,000│$150,000│
│Data Scientist│South   │$115,000│$130,000│$140,000 │$150,000│$160,000│
│Data Scientist│West    │$140,000│$155,000│$170,000 │$185,000│$200,000│
│ML Engineer   │Northeast│$135,000│$150,000│$162,000 │$175,000│$190,000│
│...           │...     │...     │...     │...      │...     │...     │
└──────────────┴────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

**Column Definitions:**

**Role:**
- Full job title
- Font: Medium weight
- Purpose: Identify position

**Region:**
- Northeast, Midwest, South, West
- Font: Regular
- Purpose: Geographic segmentation

**Min (Minimum):**
- Lowest salary in dataset
- Format: $XXX,XXX
- Calculation: `min(all_salaries)`
- Interpretation: Entry-level or lowest market rate

**Q1 (First Quartile / 25th Percentile):**
- 25% of salaries are below this
- Format: $XXX,XXX
- Calculation: `sorted_salaries[n // 4]`
- Interpretation: Lower-mid range compensation

**Median (Q2 / 50th Percentile):**
- Middle value (50% above, 50% below)
- Format: $XXX,XXX (bold, blue text)
- Calculation: `sorted_salaries[n // 2]`
- **Most Important:** True market center
- Interpretation: Typical/average compensation

**Q3 (Third Quartile / 75th Percentile):**
- 75% of salaries are below this
- Format: $XXX,XXX
- Calculation: `sorted_salaries[3 * n // 4]`
- Interpretation: Upper-mid to senior compensation

**Max (Maximum):**
- Highest salary in dataset
- Format: $XXX,XXX
- Calculation: `max(all_salaries)`
- Interpretation: Senior/expert level or outlier

**Box Plot Visualization (conceptual):**
```
    Min      Q1    Median    Q3        Max
     |-------|======|======|-------|
  $130k  $145k  $155k  $167k    $180k

|-------| = Lower whisker (Min to Q1)
|======|  = Lower box (Q1 to Median)
|======|  = Upper box (Median to Q3)
|-------| = Upper whisker (Q3 to Max)
```

**Statistical Calculations:**
```python
# Backend process
for key, salaries in salary_by_role_region.items():
    sorted_salaries = sorted(salaries)
    n = len(sorted_salaries)
    
    stats = {
        'min': min(sorted_salaries),
        'q1': sorted_salaries[n // 4],
        'median': sorted_salaries[n // 2],
        'q3': sorted_salaries[3 * n // 4],
        'max': max(sorted_salaries),
        'mean': sum(sorted_salaries) // n,
        'count': n
    }
```

**Sample Size (Count):**
- Not shown in table but available
- Important for statistical confidence
- Larger samples = more reliable statistics

**Interpretation Guide:**

**IQR (Interquartile Range):**
- Formula: `Q3 - Q1`
- Example: $167k - $145k = $22k
- Meaning: Middle 50% of salaries span $22k
- Tight IQR = consistent pay; Wide IQR = variable pay

**Salary Negotiation Insights:**
- Below Q1: Below market rate
- Q1-Median: Fair for entry/mid-level
- Median-Q3: Competitive for experienced
- Above Q3: Premium compensation

**Regional Comparison Example:**
Data Scientist in West Coast earns ~$15k more than Northeast (median comparison)

**Display Features:**
- First 20 rows displayed
- Scroll for more
- Hover: Light gray background
- Responsive: Horizontal scroll on mobile

---

## 5. Skill Gap Analysis Page

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Skill Gap Analysis                                          │
│ Identify critical skill shortages and training opportunities│
│                                                             │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│ │#1 Gap  │ │#2 Gap  │ │#3 Gap  │ │#4 Gap  │ │#5 Gap  │  │
│ │  AWS   │ │ Docker │ │  Azure │ │  GCP   │ │ K8s    │  │
│ │Gap:22.4│ │Gap:18.9│ │Gap:16.2│ │Gap:14.1│ │Gap:12.7│  │
│ │  HIGH  │ │ MEDIUM │ │ MEDIUM │ │ MEDIUM │ │ MEDIUM │  │
│ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Demand vs Supply by Skill                             │   │
│ │                                                       │   │
│ │ AWS        █████████████░░░░░░░░░░                   │   │
│ │            Demand: 75.2  Supply: 52.8                │   │
│ │                                                       │   │
│ │ Docker     ████████████░░░░░░░░░░░                   │   │
│ │            Demand: 68.9  Supply: 54.1                │   │
│ │                                                       │   │
│ │ Python     ███████████████░░░░░░░                    │   │
│ │            Demand: 71.5  Supply: 62.3                │   │
│ │                                                       │   │
│ │ SQL        ████████████████░░░░░░                    │   │
│ │            Demand: 69.8  Supply: 58.2                │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Recommended Actions                                   │   │
│ │ ✅ AWS: Invest in AWS training programs. High demand │   │
│ │    with 22 point gap.                                │   │
│ │ ✅ Docker: Expand Docker certification. Medium gap.  │   │
│ │ ✅ Azure: Prioritize Azure cloud training...         │   │
│ │ ...                                                   │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components Explained

#### 5.1 Page Header
- **Title:** "Skill Gap Analysis"
- **Subtitle:** "Identify critical skill shortages and training opportunities"

#### 5.2 Top 5 Skill Gaps Cards

**Card Structure:**
```
┌─────────────────┐
│ #1 Gap          │ ← Rank
│                 │
│   AWS           │ ← Skill name (large, bold)
│                 │
│ Gap: 22.4 pts   │ ← Numeric gap
│                 │
│ [  HIGH  ]      │ ← Severity badge
└─────────────────┘
```

**Card 1: Highest Gap**
- **Border:** Red (4px left border)
- **Rank:** "#1 Gap"
- **Skill:** "AWS" (or highest gap skill from data)
- **Gap Value:** "Gap: 22.4 points"
  - Font: Medium, gray
- **Severity Badge:** "HIGH"
  - Background: Light red (#fee2e2)
  - Text: Red (#ef4444)
  - Padding: 8px, rounded pill shape

**Cards 2-5:** Similar structure, severity varies

**Severity Color Coding:**
- **High (Gap > 20):**
  - Background: Light red
  - Text: Red
  - Border: Red
- **Medium (Gap 10-20):**
  - Background: Light orange
  - Text: Orange
  - Border: Orange
- **Low (Gap < 10):**
  - Background: Light green
  - Text: Green
  - Border: Green

**Data Source:**
```python
# Backend calculation
skill_analysis.sort(key=lambda x: x['gap'], reverse=True)
top_gaps = skill_analysis[:5]
```

**Purpose:**
- Immediate identification of critical shortages
- Visual hierarchy (most critical first)
- Quick scanning for HR decision-makers

#### 5.3 Demand vs Supply Chart (Horizontal Bar Chart)

**Chart Type:** Grouped horizontal bar chart
**Library:** Recharts (BarChart with layout="vertical")

**Data Structure:**
```javascript
[
  {
    skill: "AWS",
    demand: 75.2,
    supply: 52.8,
    gap: 22.4
  },
  {
    skill: "Docker",
    demand: 68.9,
    supply: 54.1,
    gap: 14.8
  }
]
```

**Visual Elements:**
- **Y-Axis:** Skill names (vertical)
  - Width: 150px
  - Font: 12px
  - Color: Gray
- **X-Axis:** Score (0-100)
  - Position: Bottom
  - Ticks: Every 20 points
- **Bars:**
  - **Demand Bar:** Blue (#2563eb)
  - **Supply Bar:** Green (#10b981)
  - Both bars for same skill are side-by-side
- **Grid:** Light gray dashed lines

**Interpretation Guide:**
```
AWS:
████████████████ Demand: 75.2
██████████░░░░░░ Supply: 52.8
             ↑
         22.4 point gap (shortage)

Python:
██████████████░░ Demand: 71.5
█████████████░░░ Supply: 62.3
           ↑
      9.2 point gap (manageable)
```

**Visual Patterns:**
- **Long blue bar, short green bar:** High demand, low supply (SHORTAGE)
- **Bars of equal length:** Balanced market
- **Short blue bar, long green bar:** Oversupply (rare but possible)

**Calculations:**
```python
# For each skill:
all_demand_scores = [item['demand'] for item in records if skill in item['skills']]
all_supply_scores = [item['supply'] for item in records if skill in item['skills']]

avg_demand = sum(all_demand_scores) / len(all_demand_scores)
avg_supply = sum(all_supply_scores) / len(all_supply_scores)
gap = avg_demand - avg_supply
```

**Example Data Point:**
- **Python** appears in 800 job postings
- Each posting has demand score (40-100) and supply score (30-95)
- Average demand: 71.5
- Average supply: 62.3
- Gap: 9.2 (Low severity)

**Interaction:**
- **Hover:** Shows exact values
- **Tooltip:** "Demand: 75.2, Supply: 52.8"
- **Responsive:** Adjusts height based on skill count

#### 5.4 Recommendations Section

**Layout:**
```
┌────────────────────────────────────────────┐
│ Recommended Actions                        │
│                                            │
│ ┌────────────────────────────────────────┐│
│ │ ✅                                     ││
│ │ AWS                                    ││
│ │ Invest in AWS training programs.       ││
│ │ High demand with 22 point gap.         ││
│ └────────────────────────────────────────┘│
│                                            │
│ ┌────────────────────────────────────────┐│
│ │ ✅                                     ││
│ │ Docker                                 ││
│ │ Expand Docker certification programs.  ││
│ │ Medium demand with 15 point gap.       ││
│ └────────────────────────────────────────┘│
└────────────────────────────────────────────┘
```

**Recommendation Card:**
- **Background:** Light blue (#eff6ff)
- **Border:** Blue left border (4px)
- **Icon:** Blue checkmark circle
- **Heading:** Skill name (bold)
- **Description:** Auto-generated recommendation
- **Spacing:** 12px between cards

**Recommendation Generation Logic:**
```python
for skill in top_gaps:
    recommendation = f"Invest in {skill['skill']} training programs. "
    
    if skill['severity'] == 'High':
        recommendation += f"High demand with {skill['gap']:.0f} point gap."
    elif skill['severity'] == 'Medium':
        recommendation += f"Moderate gap requires attention."
    else:
        recommendation += f"Monitor for future trends."
```

**Types of Recommendations:**
1. **Training Programs:** For skills with high gaps
2. **Recruitment Focus:** Hire externally for critical skills
3. **Certification Incentives:** Encourage existing staff upskilling
4. **Partnership Opportunities:** Collaborate with training providers

**Actionability:**
- Clear, specific guidance
- Prioritized by severity
- Quantified gaps for budget justification
- Links to strategic workforce planning

---

## 6. Predictive Hiring Trends Page

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Predictive Hiring Trends                                    │
│ Simulated forecast for job market trends                    │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Forecast Horizon:              [6 Months ▼]           │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ ℹ️ Forecast Model Explanation                          │   │
│ │ Forecast shows projected 5% monthly growth based on    │   │
│ │ historical trends. Confidence bands represent ±15%...  │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Job Posting Forecast (Next 6 Months)                  │   │
│ │                                                       │   │
│ │  5500│                  ╱ ═══════                     │   │
│ │      │              ╱ ═══░░░░░░░░░░                   │   │
│ │  5000│          ╱ ═══░░░░░░░░░░░░░░░                  │   │
│ │      │      ╱ ═══░░░░░░░░░░░░░░░░░░░                  │   │
│ │  4500│  ─══░░░░░░░░░░░░░░░░░░░░░░░░░                  │   │
│ │      │──░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                 │   │
│ │  4000│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                 │   │
│ │      └────|────|────|────|────|────|                  │   │
│ │         Oct  Nov  Dec  Jan  Feb  Mar                 │   │
│ │                                                       │   │
│ │ Legend: — Job Postings  ░ Confidence Band            │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Forecast Values                                       │   │
│ │ ┌───────┬──────────┬────────────┬────────────┐       │   │
│ │ │ Month │ Predicted│ Lower Bound│ Upper Bound│       │   │
│ │ ├───────┼──────────┼────────────┼────────────┤       │   │
│ │ │Nov'24 │   4,085  │   3,472    │   4,698    │       │   │
│ │ │Dec'24 │   4,289  │   3,646    │   4,932    │       │   │
│ │ │Jan'25 │   4,503  │   3,828    │   5,178    │       │   │
│ │ │...    │   ...    │   ...      │   ...      │       │   │
│ │ └───────┴──────────┴────────────┴────────────┘       │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components Explained

#### 6.1 Page Header
- **Title:** "Predictive Hiring Trends"
- **Subtitle:** "Simulated forecast for job market trends"

#### 6.2 Forecast Horizon Selector

**Layout:**
```
┌────────────────────────────────────┐
│ Forecast Horizon: [6 Months ▼]    │
└────────────────────────────────────┘
```

**Dropdown Options:**
- **6 Months** (default)
- **12 Months**

**Purpose:** Toggle between short-term and long-term forecast

**Effect:**
- Changes chart x-axis range
- Updates forecast table
- Recalculates confidence bands

**Technical:**
- API: `/api/data/forecast?horizon=6` or `?horizon=12`
- Re-renders all forecast visualizations

#### 6.3 Model Explanation Card

**Layout:**
```
┌──────────────────────────────────────┐
│ ℹ️ Forecast Model Explanation        │
│                                      │
│ Forecast shows projected 5% monthly  │
│ growth based on historical trends.   │
│ Confidence bands represent ±15%      │
│ variance.                            │
└──────────────────────────────────────┘
```

**Styling:**
- Blue left border (4px)
- Light blue background
- Info icon (blue circle)

**Content Breakdown:**
- **Model Type:** Exponential growth
- **Growth Rate:** 5% monthly
- **Confidence Level:** 85% (±15% bands)
- **Basis:** Historical 12-month trends

**Purpose:**
- Transparency about methodology
- Set expectations about accuracy
- Educational for non-technical users

#### 6.4 Forecast Chart (Area Chart with Confidence Bands)

**Chart Type:** Combined line + area chart
**Library:** Recharts (AreaChart component)

**Data Structure:**
```javascript
[
  // Historical data
  { month: "Oct 2024", value: 3890, type: "Historical" },
  { month: "Nov 2024", value: 4085, lower: 3472, upper: 4698, type: "Forecast" },
  { month: "Dec 2024", value: 4289, lower: 3646, upper: 4932, type: "Forecast" }
]
```

**Visual Components:**

**1. Historical Section:**
- **Line:** Solid blue (#2563eb), 3px width
- **Points:** Green circles (4px)
- **Months:** Last 12 months of actual data
- **Purpose:** Show trend leading up to forecast

**2. Forecast Section:**
- **Line:** Solid blue (#2563eb), 3px width
- **Points:** Blue circles (4px)
- **Months:** Next 6 or 12 months
- **Purpose:** Projected future values

**3. Confidence Band (Shaded Area):**
- **Fill:** Light blue gradient (rgba(147, 197, 253, 0.4))
- **Boundary:** Upper and lower bounds
- **Purpose:** Visualize uncertainty

**Chart Anatomy:**
```
     Upper Bound (+15%)
          ╱ ═════════════════
      ╱ ══░░░░░░░░░░░░░░░░░░░  ← Confidence band
  ╱ ══░░░░░░░░░░░░░░░░░░░░░░░
──░░░░░░░░░░░░░░░░░░░░░░░░░░░  ← Central forecast
░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░      ← Historical data
     Lower Bound (-15%)
```

**Mathematical Model:**
```python
# Historical: Actual data from synthetic dataset
historical_values = [month_postings for last 12 months]

# Forecast: Exponential growth
growth_rate = 1.05  # 5% monthly
last_value = historical_values[-1]

for month in range(1, horizon + 1):
    forecast = last_value * (growth_rate ** month)
    lower = forecast * 0.85  # -15%
    upper = forecast * 1.15  # +15%
```

**Example Calculation:**
```
Last actual value: 3,890 postings (Oct 2024)

Month 1 (Nov):
  Forecast = 3,890 × 1.05^1 = 4,085
  Lower = 4,085 × 0.85 = 3,472
  Upper = 4,085 × 1.15 = 4,698

Month 2 (Dec):
  Forecast = 3,890 × 1.05^2 = 4,289
  Lower = 4,289 × 0.85 = 3,646
  Upper = 4,289 × 1.15 = 4,932
```

**Interaction:**
- **Hover:** Shows month, value, bounds
- **Legend:** Toggle historical vs forecast
- **Responsive:** Scales to container

**Interpretation:**
- **Upward trend:** Growing demand
- **Widening bands:** Increasing uncertainty over time
- **Band width:** Represents forecast confidence

#### 6.5 Forecast Values Table

**Table Structure:**
```
┌─────────┬──────────────┬──────────────┬──────────────┐
│ Month   │ Predicted    │ Lower Bound  │ Upper Bound  │
├─────────┼──────────────┼──────────────┼──────────────┤
│ Nov 2024│    4,085     │    3,472     │    4,698     │
│ Dec 2024│    4,289     │    3,646     │    4,932     │
│ Jan 2025│    4,503     │    3,828     │    5,178     │
│ Feb 2025│    4,729     │    4,020     │    5,438     │
│ Mar 2025│    4,965     │    4,220     │    5,710     │
│ Apr 2025│    5,213     │    4,431     │    5,995     │
└─────────┴──────────────┴──────────────┴──────────────┘
```

**Column Details:**

**Month:**
- Format: "MMM YYYY" (e.g., "Nov 2024")
- Font: Medium weight

**Predicted Value:**
- Central forecast
- Font: Bold, blue text
- Format: Comma-separated (e.g., "4,085")
- Formula: `last_value × (1.05^month)`

**Lower Bound (-15%):**
- Pessimistic scenario
- Font: Regular, gray
- Formula: `predicted × 0.85`
- Interpretation: Worst-case within confidence interval

**Upper Bound (+15%):**
- Optimistic scenario
- Font: Regular, gray
- Formula: `predicted × 1.15`
- Interpretation: Best-case within confidence interval

**Statistical Meaning:**
- 85% confidence: Actual value will likely fall within bounds
- Central estimate: Most probable outcome
- Range width: Measure of uncertainty

**Business Use:**
- **Hiring Planning:** Budget for predicted value
- **Risk Management:** Plan for lower bound
- **Capacity Planning:** Prepare for upper bound

**Hover Effect:**
- Row highlights on hover
- Smooth transition

---

## 7. Export & Reports Page

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Export & Reports                                            │
│ Export your analytics data to CSV or PDF format             │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Export Configuration                                  │   │
│ │                                                       │   │
│ │ Select Data Type                                      │   │
│ │ [Job Market Trends ▼]                                 │   │
│ │                                                       │   │
│ │ ┌─────────────────┐   ┌─────────────────┐           │   │
│ │ │ 📥 Export CSV   │   │ 📄 Export PDF   │           │   │
│ │ └─────────────────┘   └─────────────────┘           │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Power BI Integration                                  │   │
│ │                                                       │   │
│ │         ┌──────────────┐                              │   │
│ │         │   [Power BI  │                              │   │
│ │         │     Logo]    │                              │   │
│ │         └──────────────┘                              │   │
│ │                                                       │   │
│ │   Power BI Dashboard                                  │   │
│ │   Connect your data to Microsoft Power BI...          │   │
│ │                                                       │   │
│ │   [  Coming Soon  ]                                   │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components Explained

#### 7.1 Page Header
- **Title:** "Export & Reports"
- **Subtitle:** "Export your analytics data to CSV or PDF format"

#### 7.2 Export Configuration Card

**Data Type Selector:**
```
┌────────────────────────────────┐
│ Select Data Type               │
│ [Job Market Trends      ▼]     │
└────────────────────────────────┘
```

**Dropdown Options:**
- **Job Market Trends** (default)
- **Salary Benchmarking**
- **Skill Gap Analysis**

**Purpose:** Choose which dataset to export

**Technical:**
- State: `dataType` (string)
- Values: "job-market", "salary", "skills"

#### 7.3 Export Buttons

**CSV Export Button:**
```
┌──────────────────────┐
│  📥 Export to CSV    │
└──────────────────────┘
```

**Styling:**
- Background: Green (#16a34a)
- Hover: Darker green (#15803d)
- Width: 50% (side-by-side with PDF)
- Icon: Download icon
- Text: White, bold

**Loading State:**
```
┌──────────────────────┐
│  ⏳ Exporting...     │
└──────────────────────┘
```
- Spinner replaces icon
- Button disabled
- Text: "Exporting..."

**Functionality:**
1. User clicks button
2. POST request to `/api/export/csv`
3. Body: `{ data_type: "job-market" }`
4. Backend generates CSV
5. Response: Blob of CSV data
6. Frontend creates download link
7. Browser downloads file: `job-market_export.csv`
8. Success toast: "Successfully exported as CSV!"

**CSV Format:**
```csv
role,region,industry,date,salary,postings
Data Scientist,Northeast,Tech,2023-05-15,155000,25
Data Engineer,West,Finance,2023-05-16,142000,18
...
```

**Sample Size:**
- First 100 records of selected dataset
- Includes key columns only (not all 9 fields)

---

**PDF Export Button:**
```
┌──────────────────────┐
│  📄 Export to PDF    │
└──────────────────────┘
```

**Styling:**
- Background: Red (#dc2626)
- Hover: Darker red (#b91c1c)
- Width: 50%
- Icon: Document icon
- Text: White, bold

**Functionality:**
1. User clicks button
2. POST request to `/api/export/pdf`
3. Backend generates PDF using ReportLab
4. Response: Blob of PDF data
5. Frontend creates download
6. File: `job-market_report.pdf`

**PDF Structure:**
```
┌────────────────────────────────┐
│ Employability Analytics        │
│ Job Market Report              │
│                                │
│ ┌────────────────────────────┐ │
│ │ Role   | Region  | Salary  │ │
│ ├────────┼─────────┼─────────┤ │
│ │ Data   | NE      | $155k   │ │
│ │ Scientist                   │ │
│ │ ...    | ...     | ...     │ │
│ └────────────────────────────┘ │
│                                │
│ © 2025 Employability Analytics │
└────────────────────────────────┘
```

**PDF Features:**
- **Header:** Title with data type
- **Table:** First 20 records
- **Styling:**
  - Header row: Blue background, white text
  - Data rows: Alternating beige/white
  - Grid lines: Black, 1px
  - Font: Helvetica, 12pt
- **Footer:** Copyright notice

**Technical Details:**
```python
# Backend PDF generation
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

doc = SimpleDocTemplate(buffer, pagesize=letter)
elements = []

# Title
title = Paragraph("Employability Analytics Report", title_style)
elements.append(title)

# Data table
data_rows = [['Role', 'Region', 'Salary'], ...]
table = Table(data_rows)
table.setStyle(TableStyle([...]))
elements.append(table)

doc.build(elements)
```

#### 7.4 Power BI Integration Section

**Layout:**
```
┌─────────────────────────────────┐
│ Power BI Integration            │
│                                 │
│      ┌──────────────┐           │
│      │ [Power BI    │           │
│      │   Icon]      │           │
│      └──────────────┘           │
│                                 │
│  Power BI Dashboard             │
│  Connect your data to Microsoft │
│  Power BI for advanced...       │
│                                 │
│    [  Coming Soon  ]            │
└─────────────────────────────────┘
```

**Components:**

**Power BI Icon:**
- Background: Yellow-orange gradient
- Size: 80×80px
- Icon: Bar chart (white)
- Purpose: Visual brand recognition

**Description Text:**
- "Power BI Dashboard"
- "Connect your data to Microsoft Power BI for advanced visualizations and enterprise reporting."
- Font: Inter, 14px
- Color: Gray

**Coming Soon Button:**
- Background: Gray (#d1d5db)
- Text: Gray (#6b7280)
- Cursor: Not-allowed
- State: Disabled
- Purpose: Placeholder for future feature

**Future Enhancement (Not Implemented):**
- Direct Power BI connector
- OAuth integration
- Real-time data sync
- Embedded dashboards

**Purpose of Section:**
- Show roadmap/future capabilities
- Enterprise credibility
- Competitive feature parity

---

## 8. About / Team Page

### Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ About Employability Analytics                               │
│ Our mission, team, and technology                           │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ Project Purpose                                       │   │
│ │                                                       │   │
│ │ The Employability Analytics Application is designed   │   │
│ │ to help U.S. recruiters, HR managers, and executives  │   │
│ │ make data-driven hiring and workforce planning        │   │
│ │ decisions...                                          │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │       🎓 Saint Louis University                        │   │
│ │       Graduate Project • Group 3 • 2025                │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │            [Team Photo Background]                     │   │
│ │       Collaborative Excellence                         │   │
│ │  A diverse team bringing together expertise...         │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│ │   A    │ │   R    │ │   S    │ │   S    │ │   S    │  │
│ │ Akhila │ │ Rakesh │ │ Satish │ │Sravani │ │Sharath │  │
│ │ Dande  │ │Madasani│ │ Mattam │ │Mudunuri│ │ Mukku  │  │
│ │Product │ │Backend │ │Frontend│ │  Data  │ │DevOps/ │  │
│ │ Lead   │ │ Dev    │ │ Dev    │ │Analyst │ │  QA    │  │
│ │Strategic│ │API arch│ │UI/UX   │ │Analysis│ │Testing │  │
│ │ vision │ │& data  │ │design  │ │& research│ │& ops  │  │
│ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ How This Demonstrates Employability Analytics          │   │
│ │ ✓ Synthetic U.S. Labor Market Data                     │   │
│ │ ✓ Interactive Analytics Dashboards                     │   │
│ │ ✓ Predictive Insights & Recommendations                │   │
│ │ ✓ Enterprise-Ready Export & Reporting                  │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components Explained

#### 8.1 Page Header
- **Title:** "About Employability Analytics"
- **Subtitle:** "Our mission, team, and technology"

#### 8.2 Mission Section

**Card Layout:**
```
┌──────────────────────────────────────┐
│ Project Purpose                      │
│                                      │
│ The Employability Analytics          │
│ Application is designed to help U.S. │
│ recruiters, HR managers, and         │
│ executives make data-driven hiring   │
│ and workforce planning decisions.    │
│                                      │
│ Our platform provides comprehensive  │
│ dashboards for job market trends...  │
└──────────────────────────────────────┘
```

**Content:**
- **Paragraph 1:** Application purpose and target users
- **Paragraph 2:** Prototype capabilities and synthetic data explanation
- **Font:** Inter, 16px, line-height 1.6
- **Color:** Dark gray (#374151)

**Purpose:**
- Establish context
- Explain prototype nature
- Set expectations

#### 8.3 University Badge

**Layout:**
```
┌────────────────────────────────────┐
│   [Gradient Background]            │
│       Blue-900 → Red-700           │
│                                    │
│   ┌──────────┐                     │
│   │ [Book    │                     │
│   │  Icon]   │                     │
│   └──────────┘                     │
│                                    │
│   Saint Louis University           │
│   Graduate Project • Group 3 • 2025│
└────────────────────────────────────┘
```

**Styling:**
- Background: Gradient (blue to red)
- Icon: White circle with book icon
- Text: White, centered
- Font: Work Sans (title), Inter (subtitle)
- Padding: 32px vertical
- Border-radius: 16px

**Purpose:**
- Academic attribution
- Professional credibility
- Project context

#### 8.4 Team Image Section

**Layout:**
```
┌──────────────────────────────────────┐
│    [Background: Team Photo]          │
│    (Opacity: 50%)                    │
│                                      │
│    Collaborative Excellence          │
│    A diverse team bringing together  │
│    expertise in product, engineering,│
│    design, data, and operations      │
│                                      │
│    Image: "Professional diverse U.S. │
│    team collaborating..."            │
└──────────────────────────────────────┘
```

**Styling:**
- Height: 256px
- Background: Dark gradient + image overlay
- Text: Centered, white
- Image credit: Small text at bottom

**Purpose:**
- Humanize the project
- Show team collaboration
- Professional presentation

#### 8.5 Team Member Cards

**Card Structure:**
```
┌────────────────────┐
│  ┌─┐               │
│  │A│  Akhila Dande │ ← Name
│  └─┘  Product Lead │ ← Role
│                    │
│  Strategic vision  │ ← Bio (1 line)
│  and product...    │
└────────────────────┘
```

**Card 1: Akhila Dande**
- **Avatar:** Blue-purple gradient circle with "A"
- **Name:** "Akhila Dande" (bold, dark)
- **Role:** "Product Lead" (blue)
- **Bio:** "Strategic vision and product roadmap leadership"

**Card 2: Rakesh Madasani**
- **Avatar:** Gradient with "R"
- **Role:** "Backend Developer / Data Engineer"
- **Bio:** "API architecture and data pipeline development"

**Card 3: Satish Mattam**
- **Avatar:** Gradient with "S"
- **Role:** "Front-End Developer / UI Designer"
- **Bio:** "User interface design and interactive experiences"

**Card 4: Sravani Mudunuri**
- **Avatar:** Gradient with "S"
- **Role:** "Data Analyst / Research"
- **Bio:** "Data analysis and market research insights"

**Card 5: Sharath Chand Mukku**
- **Avatar:** Gradient with "S"
- **Role:** "DevOps / QA Engineer"
- **Bio:** "System reliability and quality assurance"

**Card Styling:**
- Background: White
- Border: Light gray
- Shadow: Subtle
- Hover: Lift and shadow increase
- Layout: 3-column grid (responsive to 1-column)

#### 8.6 Demonstration Section

**Layout:**
```
┌──────────────────────────────────────┐
│ How This Demonstrates Employability  │
│ Analytics                            │
│                                      │
│ ┌─────────────────────────────────┐  │
│ │ ✓ Synthetic U.S. Labor Market   │  │
│ │   Data                          │  │
│ │   Our prototype uses 1,500+...  │  │
│ └─────────────────────────────────┘  │
│                                      │
│ ┌─────────────────────────────────┐  │
│ │ ✓ Interactive Analytics...      │  │
│ │   Real-time filtering...        │  │
│ └─────────────────────────────────┘  │
│                                      │
│ ... (4 total points)                 │
└──────────────────────────────────────┘
```

**4 Key Points:**

**1. Synthetic U.S. Labor Market Data**
- Icon: Blue checkmark
- Description: 1,500+ records, 4 regions, realistic salaries

**2. Interactive Analytics Dashboards**
- Icon: Green checkmark
- Description: Real-time filtering, interactive charts

**3. Predictive Insights & Recommendations**
- Icon: Purple checkmark
- Description: 6-12 month forecasts, skill gap recommendations

**4. Enterprise-Ready Export & Reporting**
- Icon: Orange checkmark
- Description: CSV/PDF export, Power BI integration roadmap

**Styling:**
- Each point: Flex layout with icon + text
- Icon: Colored circle with checkmark
- Background: Light color matching icon
- Spacing: 16px between points

**Purpose:**
- Highlight key features
- Show value proposition
- Demonstrate completeness

---

## 9. Common Navigation Elements

### Header (All Pages)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Employability Analytics        [Sign Out Button]    │
│        U.S. Workforce Insights                              │
└─────────────────────────────────────────────────────────────┘
```

**Components:**

**Logo:**
- Blue-purple gradient square
- Chart icon
- Size: 40×40px

**Title:**
- "Employability Analytics" (bold, 20px)
- "U.S. Workforce Insights" (small, 12px, gray)

**Sign Out Button:**
- Text: "Sign Out"
- Style: Gray text, hover shows gray background
- Position: Right-aligned
- Functionality: Clears localStorage, redirects to /login

### Navigation Bar (All Pages)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ 📊Overview | 📈Job Market | 💰Salary | 🎯Skills | 🔮Forecast│
│ | 📥Export | ℹ️About                                         │
└─────────────────────────────────────────────────────────────┘
```

**7 Navigation Items:**
1. Overview (📊)
2. Job Market (📈)
3. Salary (💰)
4. Skills (🎯)
5. Forecast (🔮)
6. Export (📥)
7. About (ℹ️)

**Active State:**
- Background: Light blue (#dbeafe)
- Text: Blue (#1e40af)

**Inactive State:**
- Background: Transparent
- Text: Gray (#6b7280)
- Hover: Light gray background

**Responsive:**
- Desktop: Horizontal scroll if needed
- Mobile: Wraps to multiple rows

### Footer (All Pages)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│    © 2025 Employability Analytics – Group 3 | Saint Louis   │
│                        University                            │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: White
- Border-top: Light gray
- Text: Centered, gray, 14px
- Padding: 24px vertical

**Content:**
- Copyright symbol
- Year: 2025
- Project name
- Group number
- University name

---

## Design System Summary

### Color Palette
- **Primary Blue:** #2563eb
- **Green:** #10b981
- **Orange:** #f59e0b
- **Red:** #ef4444
- **Purple:** #8b5cf6
- **Gray Scale:** #1f2937, #6b7280, #9ca3af, #e5e7eb

### Typography
- **Headings:** Work Sans (600-700 weight)
- **Body:** Inter (400-500 weight)
- **Sizes:** 12px (small) → 16px (body) → 24-48px (headings)

### Spacing
- **Card padding:** 20-24px
- **Section gaps:** 24-32px
- **Component spacing:** 12-16px

### Shadows
- **Cards:** 0 2px 8px rgba(0,0,0,0.08)
- **Hover:** 0 8px 24px rgba(0,0,0,0.12)

### Border Radius
- **Cards:** 12px
- **Buttons:** 8px
- **Badges:** 16px (pill shape)

---

This comprehensive guide covers every page, component, data point, and interaction in your Employability Analytics application!
