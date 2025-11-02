# Employability Analytics - Complete Dataset & Formula Documentation

## 📊 Table of Contents
1. [Synthetic Data Structure](#synthetic-data-structure)
2. [Data Generation Logic](#data-generation-logic)
3. [Job Market Trends Calculations](#job-market-trends-calculations)
4. [Salary Benchmarking Formulas](#salary-benchmarking-formulas)
5. [Skill Gap Analysis](#skill-gap-analysis)
6. [Predictive Forecasting Model](#predictive-forecasting-model)
7. [KPI Calculations](#kpi-calculations)

---

## 1. Synthetic Data Structure

### Master Dataset (1,500 Records)
Each record in `synthetic_data` contains:

```python
{
    'id': 'uuid-string',              # Unique identifier
    'role': 'Data Scientist',         # Job role (10 types)
    'region': 'Northeast',            # U.S. Region (4 types)
    'industry': 'Tech',               # Industry (5 types)
    'date': '2023-05-15T00:00:00',   # ISO date string (2020-2025)
    'salary': 145000,                 # Annual salary in USD
    'skills': ['Python', 'SQL'],      # 3-6 skills per posting
    'demand': 85,                     # Demand score (40-100)
    'supply': 65,                     # Supply score (30-95)
    'postings': 25                    # Number of job postings (5-50)
}
```

### Data Dimensions

**Regions (4):**
- Northeast (NY, MA, PA, NJ, CT)
- Midwest (IL, OH, MI, WI, MN)
- South (TX, FL, GA, NC, VA)
- West (CA, WA, OR, CO, AZ)

**Roles (10):**
1. Data Scientist
2. Data Engineer
3. Machine Learning Engineer
4. Data Analyst
5. Software Engineer
6. HR Manager
7. Product Manager
8. Business Analyst
9. DevOps Engineer
10. Cloud Architect

**Industries (5):**
- Tech
- Finance
- Healthcare
- Retail
- Manufacturing

**Skills (16):**
Python, SQL, AWS, Azure, GCP, Spark, Tableau, Excel, Communication, Leadership, Machine Learning, Deep Learning, Docker, Kubernetes, React, Node.js

---

## 2. Data Generation Logic

### Date Generation
```python
# Formula for random dates
start_date = datetime(2020, 1, 1)
end_date = datetime(2025, 12, 31)
days_diff = (end_date - start_date).days  # 2191 days
random_days = random.randint(0, days_diff)
date = start_date + timedelta(days=random_days)
```

**Result:** Uniform distribution across 2,191 days (Jan 2020 - Dec 2025)

### Salary Generation

**Formula:**
```python
salary_range = SALARY_RANGES[role][region]
salary = random.randint(salary_range[0], salary_range[1])
```

**Salary Matrix (Role × Region in USD):**

| Role | Northeast | Midwest | South | West |
|------|-----------|---------|-------|------|
| Data Scientist | $130k-$180k | $110k-$150k | $115k-$160k | $140k-$200k |
| ML Engineer | $135k-$190k | $115k-$160k | $120k-$170k | $145k-$210k |
| Data Engineer | $120k-$170k | $100k-$140k | $105k-$150k | $130k-$190k |
| Data Analyst | $70k-$100k | $60k-$85k | $65k-$90k | $75k-$110k |
| Software Engineer | $110k-$160k | $95k-$135k | $100k-$145k | $125k-$180k |
| HR Manager | $85k-$120k | $70k-$100k | $75k-$105k | $90k-$130k |
| Product Manager | $120k-$170k | $100k-$140k | $105k-$150k | $130k-$190k |
| Business Analyst | $75k-$105k | $65k-$90k | $68k-$95k | $80k-$115k |
| DevOps Engineer | $115k-$155k | $95k-$130k | $100k-$140k | $120k-$170k |
| Cloud Architect | $140k-$190k | $120k-$165k | $125k-$175k | $150k-$210k |

**Regional Salary Difference:**
- West pays 10-15% more (tech hub premium)
- Northeast pays 5-10% more (NYC/Boston premium)
- Midwest pays 10-15% less (lower cost of living)
- South pays 5-10% less to median

### Skills Assignment
```python
num_skills = random.randint(3, 6)  # Each posting has 3-6 skills
skills = random.sample(SKILLS, num_skills)  # Random selection without replacement
```

### Demand/Supply Scores
```python
demand = random.randint(40, 100)  # 40-100 scale
supply = random.randint(30, 95)   # 30-95 scale
```

**Gap Formula:**
```
gap = demand - supply  # Can be negative (oversupply) or positive (shortage)
```

---

## 3. Job Market Trends Calculations

### Monthly Aggregation Formula

**Input:** Filtered dataset based on role/industry/region
**Process:**
```python
monthly_data = {}
for item in filtered_data:
    month_key = datetime.fromisoformat(item['date']).strftime('%Y-%m')  # "2023-05"
    role_key = item['role']
    
    if month_key not in monthly_data:
        monthly_data[month_key] = {}
    if role_key not in monthly_data[month_key]:
        monthly_data[month_key][role_key] = 0
    
    monthly_data[month_key][role_key] += item['postings']
```

**Output Structure:**
```json
{
  "2023-01": {
    "Data Scientist": 450,
    "Data Engineer": 380,
    "ML Engineer": 290
  },
  "2023-02": {
    "Data Scientist": 475,
    "Data Engineer": 405,
    "ML Engineer": 310
  }
}
```

**Chart Data Transformation:**
```python
# Convert to array for Recharts
chart_data = [
    {
        "month": "2023-01",
        "Data Scientist": 450,
        "Data Engineer": 380,
        "ML Engineer": 290
    },
    {
        "month": "2023-02",
        "Data Scientist": 475,
        "Data Engineer": 405,
        "ML Engineer": 310
    }
]
```

### Trending Roles Calculation

**Formula:**
```python
role_growth = {}
for role in ALL_ROLES:
    role_data = [d for d in filtered_data if d['role'] == role]
    total_postings = sum(d['postings'] for d in role_data)
    role_growth[role] = total_postings

# Sort by total postings (descending)
sorted_roles = sorted(role_growth.items(), key=lambda x: x[1], reverse=True)[:10]

# Add simulated growth percentage (15-85% range)
trending_roles = [
    {
        'role': role,
        'growth': f"{random.randint(15, 85)}%",  # Simulated YoY growth
        'postings': count
    }
    for role, count in sorted_roles
]
```

**Example Output:**
```json
[
  {"role": "Data Scientist", "growth": "67%", "postings": 5420},
  {"role": "ML Engineer", "growth": "82%", "postings": 4890},
  {"role": "Data Engineer", "growth": "45%", "postings": 4560}
]
```

---

## 4. Salary Benchmarking Formulas

### Salary Statistics by Role & Region

**Aggregation:**
```python
salary_by_role_region = {}
for item in filtered_data:
    key = f"{item['role']}_{item['region']}"  # "Data Scientist_Northeast"
    if key not in salary_by_role_region:
        salary_by_role_region[key] = []
    salary_by_role_region[key].append(item['salary'])
```

**Statistical Calculations:**
```python
for key, salaries in salary_by_role_region.items():
    sorted_salaries = sorted(salaries)
    n = len(sorted_salaries)
    
    statistics = {
        'min': min(sorted_salaries),
        'max': max(sorted_salaries),
        'median': sorted_salaries[n // 2],           # 50th percentile
        'q1': sorted_salaries[n // 4],               # 25th percentile
        'q3': sorted_salaries[3 * n // 4],           # 75th percentile
        'mean': sum(sorted_salaries) // n,           # Average
        'count': n                                    # Sample size
    }
```

**Percentile Formulas:**
- **Q1 (25th percentile):** `sorted_salaries[n // 4]`
- **Q2 (Median):** `sorted_salaries[n // 2]`
- **Q3 (75th percentile):** `sorted_salaries[3 * n // 4]`
- **IQR (Interquartile Range):** `Q3 - Q1`

**Box Plot Representation:**
```
|----[====|====]----| 
min   Q1  Q2  Q3  max
```

**Example Calculation:**
For Data Scientist in Northeast with 150 records:
- Sorted salaries: [130000, 132000, ..., 178000, 180000]
- n = 150
- min = 130000
- Q1 = sorted_salaries[37] ≈ 145000
- median = sorted_salaries[75] ≈ 155000
- Q3 = sorted_salaries[112] ≈ 167000
- max = 180000
- mean = sum(all_salaries) / 150 ≈ 155333

---

## 5. Skill Gap Analysis

### Demand & Supply Aggregation

**Step 1: Collect all demand/supply values per skill**
```python
skill_data = {}
for item in synthetic_data:
    for skill in item['skills']:  # Each posting has 3-6 skills
        if skill not in skill_data:
            skill_data[skill] = {'demand': [], 'supply': []}
        skill_data[skill]['demand'].append(item['demand'])
        skill_data[skill]['supply'].append(item['supply'])
```

**Step 2: Calculate averages**
```python
for skill, data in skill_data.items():
    avg_demand = sum(data['demand']) / len(data['demand'])
    avg_supply = sum(data['supply']) / len(data['supply'])
    gap = avg_demand - avg_supply
```

**Gap Formulas:**
```
avg_demand = Σ(demand_scores) / n
avg_supply = Σ(supply_scores) / n
gap = avg_demand - avg_supply
```

**Example Calculation for Python:**
```
Python appears in ~800 job postings
demand_scores = [85, 92, 78, ..., 88]  (800 values)
supply_scores = [65, 70, 58, ..., 62]  (800 values)

avg_demand = (85 + 92 + 78 + ... + 88) / 800 = 71.5
avg_supply = (65 + 70 + 58 + ... + 62) / 800 = 62.3
gap = 71.5 - 62.3 = 9.2
```

### Severity Classification

**Formula:**
```python
if gap > 20:
    severity = 'High'
elif gap > 10:
    severity = 'Medium'
else:
    severity = 'Low'
```

**Severity Thresholds:**
- **High:** Gap > 20 points (Critical shortage)
- **Medium:** Gap 10-20 points (Moderate shortage)
- **Low:** Gap < 10 points (Manageable or balanced)

**Example Results:**
```json
[
  {"skill": "AWS", "demand": 75.2, "supply": 52.8, "gap": 22.4, "severity": "High"},
  {"skill": "Python", "demand": 71.5, "supply": 62.3, "gap": 9.2, "severity": "Low"},
  {"skill": "Docker", "demand": 68.9, "supply": 54.1, "gap": 14.8, "severity": "Medium"}
]
```

---

## 6. Predictive Forecasting Model

### Historical Data Collection (Last 12 Months)

**Formula:**
```python
current_date = datetime.now()
for i in range(12, 0, -1):
    date = current_date - timedelta(days=30 * i)
    month_str = date.strftime('%Y-%m')
    
    # Count postings for this month
    month_postings = sum(
        d['postings'] for d in synthetic_data
        if datetime.fromisoformat(d['date']).strftime('%Y-%m') == month_str
    )
```

**Example Historical Data:**
```
Month        | Postings
-------------|----------
Nov 2023     | 2,450
Dec 2023     | 2,680
Jan 2024     | 2,820
...
Oct 2024     | 3,890
```

### Forecast Formula (Exponential Growth)

**Model:**
```python
growth_rate = 1.05  # 5% monthly growth
last_value = historical_values[-1]  # Most recent month

for i in range(1, horizon + 1):
    forecast_value = int(last_value * (growth_rate ** i))
```

**Mathematical Formula:**
```
F(t) = L × r^t

Where:
F(t) = Forecast value at time t
L = Last historical value
r = Growth rate (1.05 = 5% growth)
t = Time periods ahead (1, 2, 3, ... horizon)
```

**Example Calculation (6-month forecast):**
```
Last value (Oct 2024): 3,890 postings
Growth rate: 5% monthly

Month 1 (Nov 2024): 3,890 × 1.05^1 = 4,085
Month 2 (Dec 2024): 3,890 × 1.05^2 = 4,289
Month 3 (Jan 2025): 3,890 × 1.05^3 = 4,503
Month 4 (Feb 2025): 3,890 × 1.05^4 = 4,729
Month 5 (Mar 2025): 3,890 × 1.05^5 = 4,965
Month 6 (Apr 2025): 3,890 × 1.05^6 = 5,213
```

### Confidence Bands (±15%)

**Formulas:**
```python
confidence_lower = int(forecast_value * 0.85)
confidence_upper = int(forecast_value * 1.15)
```

**Example with Confidence Bands:**
```
Month       | Forecast | Lower (-15%) | Upper (+15%)
------------|----------|--------------|-------------
Nov 2024    | 4,085    | 3,472        | 4,698
Dec 2024    | 4,289    | 3,646        | 4,932
Jan 2025    | 4,503    | 3,828        | 5,178
```

**Interpretation:**
- Central forecast assumes 5% consistent growth
- 85% confidence interval means actual value will likely fall between lower and upper bounds
- Wider bands in distant months reflect increasing uncertainty

---

## 7. KPI Calculations

### Time to Hire
```python
kpi = {
    'value': 28,      # Current: 28 days
    'target': 20,     # Target: 20 days
    'unit': 'days',
    'change': -15     # 15% reduction YoY (positive trend)
}
```

**Formula:**
```
% Change = ((Current - Previous) / Previous) × 100
-15% = ((28 - 33) / 33) × 100  # Improvement from 33 to 28 days
```

### Offer Acceptance Rate
```python
kpi = {
    'value': 72,      # Current: 72%
    'target': 85,     # Target: 85%
    'unit': '%',
    'change': 8       # 8% increase YoY
}
```

**Formula:**
```
Offer Acceptance Rate = (Offers Accepted / Offers Made) × 100
Change = ((72 - 66.7) / 66.7) × 100 = 8%
```

### Recruiter Productivity
```python
kpi = {
    'value': 85,      # Current: 85%
    'target': 90,     # Target: 90%
    'unit': '%',
    'change': 12      # 12% increase YoY
}
```

**Formula:**
```
Productivity = (Placements / (Recruiter Hours × Target Rate)) × 100
```

### Skills Coverage
```python
kpi = {
    'value': 82,      # Current: 82%
    'target': 90,     # Target: 90%
    'unit': '%',
    'change': 5       # 5% increase YoY
}
```

**Formula:**
```
Skills Coverage = (Candidates with Required Skills / Total Requirements) × 100
```

---

## 8. Chart-Specific Data Transformations

### Line Chart (Job Market Trends)
**Input:** Monthly aggregated data
**Output:** Array of objects with month + role columns
```javascript
[
  { month: "2023-01", "Data Scientist": 450, "Data Engineer": 380 },
  { month: "2023-02", "Data Scientist": 475, "Data Engineer": 405 }
]
```

### Bar Chart (Salary Comparison)
**Input:** Salary statistics by role/region
**Output:** Array with median values
```javascript
[
  { role: "Data Scientist", median: 155000, region: "Northeast" },
  { role: "Data Engineer", median: 142000, region: "Northeast" }
]
```

### Horizontal Bar Chart (Skills Gap)
**Input:** Skill analysis with demand/supply
**Output:** Array with skill + demand/supply values
```javascript
[
  { skill: "AWS", demand: 75.2, supply: 52.8 },
  { skill: "Python", demand: 71.5, supply: 62.3 }
]
```

### Area Chart (Forecast)
**Input:** Historical + forecast arrays
**Output:** Combined array with confidence bands
```javascript
[
  { month: "Oct 2024", value: 3890, type: "Historical" },
  { month: "Nov 2024", value: 4085, lower: 3472, upper: 4698, type: "Forecast" }
]
```

---

## Summary Statistics

**Total Dataset Size:** 1,500 records
**Time Span:** 2,191 days (Jan 2020 - Dec 2025)
**Roles:** 10 distinct job titles
**Regions:** 4 U.S. geographic areas
**Industries:** 5 business sectors
**Skills:** 16 technical and soft skills
**Salary Range:** $60,000 - $220,000
**Average Record per Month:** ~25 postings
**Total Estimated Postings:** 1,500 records × avg(27.5 postings) = ~41,250 job postings

**Data Distribution:**
- Records per region: ~375 each
- Records per role: ~150 each
- Records per industry: ~300 each
- Skills per posting: 3-6 (avg 4.5)
- Monthly postings: 5-50 per record

---

## Export Formats

### CSV Export
**Fields:** role, region, industry, date, salary, postings
**Sample size:** First 100 records
**Format:** Standard comma-separated values

### PDF Export
**Layout:** ReportLab-generated PDF
**Sections:**
- Title with data type
- Data table (first 20 records)
- Formatted with headers, borders, alternating row colors

---

## Data Quality Notes

1. **Randomization:** All data uses Python's `random` module with uniform distributions
2. **Date Spread:** Even distribution across 5+ years ensures no temporal bias
3. **Salary Realism:** Based on 2024 U.S. market data for tech roles
4. **Regional Variation:** Reflects actual cost-of-living differences
5. **Skill Correlation:** Skills randomly assigned (no role-specific correlation implemented)
6. **Demand/Supply:** Independent random scores (could be enhanced with role-based weights)

---

## Future Enhancement Opportunities

1. **Seasonal Trends:** Add quarterly hiring patterns
2. **Skill Correlation:** Link skills to roles (e.g., Python more common for Data Scientists)
3. **Experience Levels:** Add junior/mid/senior with salary adjustments
4. **Company Size:** Include startup/mid/enterprise tiers
5. **Remote Factor:** Add remote/hybrid/onsite with regional adjustments
6. **Education Requirements:** Add degree requirements affecting supply
7. **Certification Impact:** Track specific certifications (AWS, GCP)
8. **Time Series Models:** Use ARIMA/SARIMA for better forecasting

---

*This document provides complete transparency into all data generation, processing, and visualization formulas used in the Employability Analytics application.*
