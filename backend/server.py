from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import random
import io
import csv
from fastapi.responses import StreamingResponse
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from emergentintegrations.llm.gemeni.image_generation import GeminiImageGeneration

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Synthetic Data Generator
class DataGenerator:
    REGIONS = ['Northeast', 'Midwest', 'South', 'West']
    ROLES = [
        'Data Scientist', 'Data Engineer', 'Machine Learning Engineer',
        'Data Analyst', 'Software Engineer', 'HR Manager', 'Product Manager',
        'Business Analyst', 'DevOps Engineer', 'Cloud Architect'
    ]
    INDUSTRIES = ['Tech', 'Finance', 'Healthcare', 'Retail', 'Manufacturing']
    SKILLS = [
        'Python', 'SQL', 'AWS', 'Azure', 'GCP', 'Spark', 'Tableau',
        'Excel', 'Communication', 'Leadership', 'Machine Learning',
        'Deep Learning', 'Docker', 'Kubernetes', 'React', 'Node.js'
    ]
    
    SALARY_RANGES = {
        'Data Scientist': {'Northeast': (130000, 180000), 'Midwest': (110000, 150000), 'South': (115000, 160000), 'West': (140000, 200000)},
        'Data Engineer': {'Northeast': (120000, 170000), 'Midwest': (100000, 140000), 'South': (105000, 150000), 'West': (130000, 190000)},
        'Machine Learning Engineer': {'Northeast': (135000, 190000), 'Midwest': (115000, 160000), 'South': (120000, 170000), 'West': (145000, 210000)},
        'Data Analyst': {'Northeast': (70000, 100000), 'Midwest': (60000, 85000), 'South': (65000, 90000), 'West': (75000, 110000)},
        'Software Engineer': {'Northeast': (110000, 160000), 'Midwest': (95000, 135000), 'South': (100000, 145000), 'West': (125000, 180000)},
        'HR Manager': {'Northeast': (85000, 120000), 'Midwest': (70000, 100000), 'South': (75000, 105000), 'West': (90000, 130000)},
        'Product Manager': {'Northeast': (120000, 170000), 'Midwest': (100000, 140000), 'South': (105000, 150000), 'West': (130000, 190000)},
        'Business Analyst': {'Northeast': (75000, 105000), 'Midwest': (65000, 90000), 'South': (68000, 95000), 'West': (80000, 115000)},
        'DevOps Engineer': {'Northeast': (115000, 155000), 'Midwest': (95000, 130000), 'South': (100000, 140000), 'West': (120000, 170000)},
        'Cloud Architect': {'Northeast': (140000, 190000), 'Midwest': (120000, 165000), 'South': (125000, 175000), 'West': (150000, 210000)},
    }
    
    @staticmethod
    def generate_synthetic_data(count=1500):
        data = []
        start_date = datetime(2020, 1, 1)
        end_date = datetime(2025, 12, 31)
        
        for _ in range(count):
            role = random.choice(DataGenerator.ROLES)
            region = random.choice(DataGenerator.REGIONS)
            industry = random.choice(DataGenerator.INDUSTRIES)
            
            # Generate random date
            days_diff = (end_date - start_date).days
            random_days = random.randint(0, days_diff)
            date = start_date + timedelta(days=random_days)
            
            # Get salary range for role and region
            salary_range = DataGenerator.SALARY_RANGES[role][region]
            salary = random.randint(salary_range[0], salary_range[1])
            
            # Random skills (3-6 skills per posting)
            num_skills = random.randint(3, 6)
            skills = random.sample(DataGenerator.SKILLS, num_skills)
            
            # Demand and supply scores
            demand = random.randint(40, 100)
            supply = random.randint(30, 95)
            
            data.append({
                'id': str(uuid.uuid4()),
                'role': role,
                'region': region,
                'industry': industry,
                'date': date.isoformat(),
                'salary': salary,
                'skills': skills,
                'demand': demand,
                'supply': supply,
                'postings': random.randint(5, 50)
            })
        
        return data

# Initialize synthetic data on startup
synthetic_data = DataGenerator.generate_synthetic_data(1500)

# Models
class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None

class JobMarketFilter(BaseModel):
    role: Optional[str] = None
    industry: Optional[str] = None
    region: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class ExportRequest(BaseModel):
    data_type: str
    filters: Optional[Dict[str, Any]] = None

class ImageGenerationRequest(BaseModel):
    prompt: str
    number_of_images: int = 1

# Routes
@api_router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    if request.email == "demo@company.com" and request.password == "demo123":
        return LoginResponse(
            success=True,
            message="Login successful",
            token="mock-jwt-token-" + str(uuid.uuid4())
        )
    return LoginResponse(success=False, message="Invalid credentials")

@api_router.get("/data/job-market")
async def get_job_market_data(
    role: Optional[str] = None,
    industry: Optional[str] = None,
    region: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    filtered_data = synthetic_data.copy()
    
    if role:
        filtered_data = [d for d in filtered_data if d['role'] == role]
    if industry:
        filtered_data = [d for d in filtered_data if d['industry'] == industry]
    if region:
        filtered_data = [d for d in filtered_data if d['region'] == region]
    if start_date:
        filtered_data = [d for d in filtered_data if d['date'] >= start_date]
    if end_date:
        filtered_data = [d for d in filtered_data if d['date'] <= end_date]
    
    # Aggregate by month and role
    monthly_data = {}
    for item in filtered_data:
        date_obj = datetime.fromisoformat(item['date'])
        month_key = date_obj.strftime('%Y-%m')
        role_key = item['role']
        
        if month_key not in monthly_data:
            monthly_data[month_key] = {}
        if role_key not in monthly_data[month_key]:
            monthly_data[month_key][role_key] = 0
        monthly_data[month_key][role_key] += item['postings']
    
    # Calculate trending roles
    role_growth = {}
    for role in DataGenerator.ROLES:
        role_data = [d for d in filtered_data if d['role'] == role]
        if len(role_data) > 0:
            total_postings = sum(d['postings'] for d in role_data)
            role_growth[role] = total_postings
    
    sorted_roles = sorted(role_growth.items(), key=lambda x: x[1], reverse=True)[:10]
    trending_roles = [
        {'role': role, 'growth': f"{random.randint(15, 85)}%", 'postings': count}
        for role, count in sorted_roles
    ]
    
    return {
        'monthly_data': monthly_data,
        'trending_roles': trending_roles,
        'total_postings': sum(d['postings'] for d in filtered_data),
        'regions': DataGenerator.REGIONS,
        'roles': DataGenerator.ROLES,
        'industries': DataGenerator.INDUSTRIES
    }

@api_router.get("/data/salary")
async def get_salary_data(
    role: Optional[str] = None,
    region: Optional[str] = None
):
    filtered_data = synthetic_data.copy()
    
    if role:
        filtered_data = [d for d in filtered_data if d['role'] == role]
    if region:
        filtered_data = [d for d in filtered_data if d['region'] == region]
    
    # Aggregate salary by role and region
    salary_by_role_region = {}
    for item in filtered_data:
        key = f"{item['role']}_{item['region']}"
        if key not in salary_by_role_region:
            salary_by_role_region[key] = []
        salary_by_role_region[key].append(item['salary'])
    
    # Calculate statistics
    salary_stats = []
    for key, salaries in salary_by_role_region.items():
        role_name, region_name = key.split('_')
        sorted_salaries = sorted(salaries)
        n = len(sorted_salaries)
        
        salary_stats.append({
            'role': role_name,
            'region': region_name,
            'min': min(sorted_salaries),
            'max': max(sorted_salaries),
            'median': sorted_salaries[n // 2],
            'q1': sorted_salaries[n // 4],
            'q3': sorted_salaries[3 * n // 4],
            'mean': sum(sorted_salaries) // n,
            'count': n
        })
    
    return {
        'salary_stats': salary_stats,
        'all_salaries': [d['salary'] for d in filtered_data],
        'roles': list(set(d['role'] for d in filtered_data)),
        'regions': list(set(d['region'] for d in filtered_data))
    }

@api_router.get("/data/skills")
async def get_skills_data():
    # Aggregate demand and supply by skill
    skill_data = {}
    for item in synthetic_data:
        for skill in item['skills']:
            if skill not in skill_data:
                skill_data[skill] = {'demand': [], 'supply': []}
            skill_data[skill]['demand'].append(item['demand'])
            skill_data[skill]['supply'].append(item['supply'])
    
    # Calculate averages and gaps
    skill_analysis = []
    for skill, data in skill_data.items():
        avg_demand = sum(data['demand']) / len(data['demand'])
        avg_supply = sum(data['supply']) / len(data['supply'])
        gap = avg_demand - avg_supply
        
        severity = 'High' if gap > 20 else 'Medium' if gap > 10 else 'Low'
        
        skill_analysis.append({
            'skill': skill,
            'demand': round(avg_demand, 2),
            'supply': round(avg_supply, 2),
            'gap': round(gap, 2),
            'severity': severity
        })
    
    # Sort by gap (descending) and get top 5
    skill_analysis.sort(key=lambda x: x['gap'], reverse=True)
    top_gaps = skill_analysis[:5]
    
    # Generate recommendations
    recommendations = []
    for skill in top_gaps:
        recommendations.append({
            'skill': skill['skill'],
            'recommendation': f"Invest in {skill['skill']} training programs. High demand with {skill['gap']:.0f} point gap."
        })
    
    return {
        'skills': skill_analysis,
        'top_gaps': top_gaps,
        'recommendations': recommendations
    }

@api_router.get("/data/forecast")
async def get_forecast_data(horizon: int = 6):
    # Get historical data for last 12 months
    current_date = datetime.now()
    historical_months = []
    historical_values = []
    
    for i in range(12, 0, -1):
        date = current_date - timedelta(days=30 * i)
        month_str = date.strftime('%Y-%m')
        
        # Count postings for this month
        month_postings = sum(
            d['postings'] for d in synthetic_data
            if datetime.fromisoformat(d['date']).strftime('%Y-%m') == month_str
        )
        
        historical_months.append(date.strftime('%b %Y'))
        historical_values.append(month_postings)
    
    # Simple forecast (linear trend with slight growth)
    last_value = historical_values[-1]
    growth_rate = 1.05  # 5% monthly growth
    
    forecast_months = []
    forecast_values = []
    confidence_lower = []
    confidence_upper = []
    
    for i in range(1, horizon + 1):
        date = current_date + timedelta(days=30 * i)
        forecast_months.append(date.strftime('%b %Y'))
        
        forecast_val = int(last_value * (growth_rate ** i))
        forecast_values.append(forecast_val)
        
        # Confidence bands (±15%)
        confidence_lower.append(int(forecast_val * 0.85))
        confidence_upper.append(int(forecast_val * 1.15))
    
    return {
        'historical': {
            'months': historical_months,
            'values': historical_values
        },
        'forecast': {
            'months': forecast_months,
            'values': forecast_values,
            'confidence_lower': confidence_lower,
            'confidence_upper': confidence_upper
        },
        'explanation': f'Forecast shows projected {(growth_rate - 1) * 100:.0f}% monthly growth based on historical trends. Confidence bands represent ±15% variance.'
    }

@api_router.post("/export/csv")
async def export_csv(request: ExportRequest):
    # Get relevant data based on data_type
    if request.data_type == 'job-market':
        data = synthetic_data[:100]  # Sample data
        fieldnames = ['role', 'region', 'industry', 'date', 'salary', 'postings']
    elif request.data_type == 'salary':
        data = synthetic_data[:100]
        fieldnames = ['role', 'region', 'salary']
    elif request.data_type == 'skills':
        # Get skills data
        skill_response = await get_skills_data()
        data = skill_response['skills']
        fieldnames = ['skill', 'demand', 'supply', 'gap', 'severity']
    else:
        data = synthetic_data[:100]
        fieldnames = ['role', 'region', 'salary']
    
    # Create CSV in memory
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fieldnames, extrasaction='ignore')
    writer.writeheader()
    writer.writerows(data)
    
    # Return as streaming response
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={request.data_type}_export.csv"}
    )

@api_router.post("/export/pdf")
async def export_pdf(request: ExportRequest):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()
    
    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e3a8a'),
        spaceAfter=30,
    )
    title = Paragraph(f"Employability Analytics - {request.data_type.replace('-', ' ').title()} Report", title_style)
    elements.append(title)
    elements.append(Spacer(1, 0.3 * inch))
    
    # Add data table
    if request.data_type == 'job-market':
        data_rows = [['Role', 'Region', 'Industry', 'Salary']]
        for item in synthetic_data[:20]:
            data_rows.append([item['role'], item['region'], item['industry'], f"${item['salary']:,}"])
    elif request.data_type == 'skills':
        skill_response = await get_skills_data()
        data_rows = [['Skill', 'Demand', 'Supply', 'Gap', 'Severity']]
        for item in skill_response['skills'][:20]:
            data_rows.append([item['skill'], f"{item['demand']:.1f}", f"{item['supply']:.1f}", f"{item['gap']:.1f}", item['severity']])
    else:
        data_rows = [['Role', 'Region', 'Salary']]
        for item in synthetic_data[:20]:
            data_rows.append([item['role'], item['region'], f"${item['salary']:,}"])
    
    table = Table(data_rows)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e3a8a')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    elements.append(table)
    doc.build(elements)
    
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={request.data_type}_report.pdf"}
    )

@api_router.post("/images/generate")
async def generate_image(request: ImageGenerationRequest):
    try:
        # Get API key from environment
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not api_key:
            raise HTTPException(status_code=500, message="API key not configured")
        
        # Generate image
        image_gen = GeminiImageGeneration(api_key=api_key)
        images = await image_gen.generate_images(
            prompt=request.prompt,
            model="imagen-3.0-generate-002",
            number_of_images=request.number_of_images
        )
        
        # Convert bytes to base64 for frontend
        import base64
        image_data = []
        for img_bytes in images:
            b64_string = base64.b64encode(img_bytes).decode('utf-8')
            image_data.append(f"data:image/png;base64,{b64_string}")
        
        return {
            'success': True,
            'images': image_data,
            'prompt': request.prompt
        }
    except Exception as e:
        logging.error(f"Image generation error: {str(e)}")
        return {
            'success': False,
            'message': str(e),
            'images': []
        }

@api_router.get("/data/kpis")
async def get_kpis():
    return {
        'time_to_hire': {'value': 28, 'target': 20, 'unit': 'days', 'change': -15},
        'offer_acceptance': {'value': 72, 'target': 85, 'unit': '%', 'change': 8},
        'recruiter_productivity': {'value': 85, 'target': 90, 'unit': '%', 'change': 12},
        'skills_coverage': {'value': 82, 'target': 90, 'unit': '%', 'change': 5}
    }

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()