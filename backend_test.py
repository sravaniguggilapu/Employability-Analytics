#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class EmployabilityAnalyticsAPITester:
    def __init__(self, base_url="https://workforce-insights-4.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=30)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}, Expected: {expected_status}"
            
            if success and response.headers.get('content-type', '').startswith('application/json'):
                try:
                    response_data = response.json()
                    details += f", Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}"
                except:
                    details += ", Response: Non-JSON"
            
            self.log_test(name, success, details)
            return success, response.json() if success and response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, {}

    def test_authentication(self):
        """Test login functionality"""
        print("\n🔐 Testing Authentication...")
        
        # Test valid login
        success, response = self.run_test(
            "Valid Login (demo@company.com)",
            "POST",
            "auth/login",
            200,
            data={"email": "demo@company.com", "password": "demo123"}
        )
        
        if success and 'token' in response:
            self.token = response['token']
            self.log_test("Token received", True, f"Token: {self.token[:20]}...")
        else:
            self.log_test("Token received", False, "No token in response")
        
        # Test invalid login
        self.run_test(
            "Invalid Login",
            "POST", 
            "auth/login",
            200,  # API returns 200 with success: false
            data={"email": "invalid@test.com", "password": "wrong"}
        )

    def test_kpis_endpoint(self):
        """Test KPIs data endpoint"""
        print("\n📊 Testing KPIs Endpoint...")
        
        success, response = self.run_test(
            "Get KPIs Data",
            "GET",
            "data/kpis",
            200
        )
        
        if success:
            expected_kpis = ['time_to_hire', 'offer_acceptance', 'recruiter_productivity', 'skills_coverage']
            missing_kpis = [kpi for kpi in expected_kpis if kpi not in response]
            if not missing_kpis:
                self.log_test("KPIs structure validation", True, "All expected KPIs present")
            else:
                self.log_test("KPIs structure validation", False, f"Missing KPIs: {missing_kpis}")

    def test_job_market_endpoint(self):
        """Test job market data endpoint"""
        print("\n📈 Testing Job Market Endpoint...")
        
        # Test without filters
        success, response = self.run_test(
            "Get Job Market Data (no filters)",
            "GET",
            "data/job-market",
            200
        )
        
        if success:
            expected_keys = ['monthly_data', 'trending_roles', 'total_postings', 'regions', 'roles', 'industries']
            missing_keys = [key for key in expected_keys if key not in response]
            if not missing_keys:
                self.log_test("Job Market structure validation", True, "All expected keys present")
            else:
                self.log_test("Job Market structure validation", False, f"Missing keys: {missing_keys}")
        
        # Test with filters
        self.run_test(
            "Get Job Market Data (with role filter)",
            "GET",
            "data/job-market?role=Data Scientist",
            200
        )
        
        self.run_test(
            "Get Job Market Data (with region filter)",
            "GET",
            "data/job-market?region=West",
            200
        )
        
        self.run_test(
            "Get Job Market Data (with industry filter)",
            "GET",
            "data/job-market?industry=Tech",
            200
        )

    def test_salary_endpoint(self):
        """Test salary data endpoint"""
        print("\n💰 Testing Salary Endpoint...")
        
        # Test without filters
        success, response = self.run_test(
            "Get Salary Data (no filters)",
            "GET",
            "data/salary",
            200
        )
        
        if success:
            expected_keys = ['salary_stats', 'all_salaries', 'roles', 'regions']
            missing_keys = [key for key in expected_keys if key not in response]
            if not missing_keys:
                self.log_test("Salary structure validation", True, "All expected keys present")
            else:
                self.log_test("Salary structure validation", False, f"Missing keys: {missing_keys}")
        
        # Test with filters
        self.run_test(
            "Get Salary Data (with role filter)",
            "GET",
            "data/salary?role=Data Engineer",
            200
        )
        
        self.run_test(
            "Get Salary Data (with region filter)",
            "GET",
            "data/salary?region=Northeast",
            200
        )

    def test_skills_endpoint(self):
        """Test skills data endpoint"""
        print("\n🎯 Testing Skills Endpoint...")
        
        success, response = self.run_test(
            "Get Skills Data",
            "GET",
            "data/skills",
            200
        )
        
        if success:
            expected_keys = ['skills', 'top_gaps', 'recommendations']
            missing_keys = [key for key in expected_keys if key not in response]
            if not missing_keys:
                self.log_test("Skills structure validation", True, "All expected keys present")
            else:
                self.log_test("Skills structure validation", False, f"Missing keys: {missing_keys}")

    def test_forecast_endpoint(self):
        """Test forecast data endpoint"""
        print("\n🔮 Testing Forecast Endpoint...")
        
        # Test 6 month forecast
        success, response = self.run_test(
            "Get Forecast Data (6 months)",
            "GET",
            "data/forecast?horizon=6",
            200
        )
        
        if success:
            expected_keys = ['historical', 'forecast', 'explanation']
            missing_keys = [key for key in expected_keys if key not in response]
            if not missing_keys:
                self.log_test("Forecast structure validation", True, "All expected keys present")
            else:
                self.log_test("Forecast structure validation", False, f"Missing keys: {missing_keys}")
        
        # Test 12 month forecast
        self.run_test(
            "Get Forecast Data (12 months)",
            "GET",
            "data/forecast?horizon=12",
            200
        )

    def test_export_endpoints(self):
        """Test export functionality"""
        print("\n📄 Testing Export Endpoints...")
        
        # Test CSV export
        success, response = self.run_test(
            "Export CSV (job-market)",
            "POST",
            "export/csv",
            200,
            data={"data_type": "job-market"}
        )
        
        self.run_test(
            "Export CSV (salary)",
            "POST",
            "export/csv",
            200,
            data={"data_type": "salary"}
        )
        
        self.run_test(
            "Export CSV (skills)",
            "POST",
            "export/csv",
            200,
            data={"data_type": "skills"}
        )
        
        # Test PDF export
        self.run_test(
            "Export PDF (job-market)",
            "POST",
            "export/pdf",
            200,
            data={"data_type": "job-market"}
        )
        
        self.run_test(
            "Export PDF (skills)",
            "POST",
            "export/pdf",
            200,
            data={"data_type": "skills"}
        )

    def test_image_generation(self):
        """Test image generation endpoint"""
        print("\n🖼️ Testing Image Generation...")
        
        success, response = self.run_test(
            "Generate Image",
            "POST",
            "images/generate",
            200,
            data={"prompt": "Modern office analytics dashboard", "number_of_images": 1}
        )
        
        if success:
            if 'success' in response and 'images' in response:
                self.log_test("Image generation structure", True, f"Success: {response.get('success')}")
            else:
                self.log_test("Image generation structure", False, "Missing success or images key")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Employability Analytics API Tests")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)
        
        # Run all test suites
        self.test_authentication()
        self.test_kpis_endpoint()
        self.test_job_market_endpoint()
        self.test_salary_endpoint()
        self.test_skills_endpoint()
        self.test_forecast_endpoint()
        self.test_export_endpoints()
        self.test_image_generation()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️ Some tests failed. Check the details above.")
            return 1

def main():
    tester = EmployabilityAnalyticsAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())