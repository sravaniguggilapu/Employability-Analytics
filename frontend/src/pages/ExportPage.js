import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ExportPage = () => {
  const [dataType, setDataType] = useState('job-market');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      const endpoint = format === 'csv' ? '/export/csv' : '/export/pdf';
      const response = await axios.post(`${API}${endpoint}`, { data_type: dataType }, {
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${dataType}_export.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success(`Successfully exported as ${format.toUpperCase()}!`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div data-testid="export-page">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Work Sans'}}>Export & Reports</h1>
        <p className="text-gray-600">Export your analytics data to CSV or PDF format</p>
      </div>

      {/* Export Configuration */}
      <div className="enterprise-card mb-6" data-testid="export-config">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Configuration</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Data Type</label>
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger data-testid="data-type-selector">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="job-market">Job Market Trends</SelectItem>
              <SelectItem value="salary">Salary Benchmarking</SelectItem>
              <SelectItem value="skills">Skill Gap Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="export-csv-button"
          >
            {isExporting ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner border-2 border-white border-t-transparent w-5 h-5 mr-2"></div>
                Exporting...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to CSV
              </div>
            )}
          </button>

          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="export-pdf-button"
          >
            {isExporting ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner border-2 border-white border-t-transparent w-5 h-5 mr-2"></div>
                Exporting...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Export to PDF
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Power BI Integration (Placeholder) */}
      <div className="enterprise-card" data-testid="powerbi-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Power BI Integration</h3>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Power BI Dashboard</h4>
          <p className="text-sm text-gray-600 mb-4">
            Connect your data to Microsoft Power BI for advanced visualizations and enterprise reporting.
          </p>
          <button className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
