import React from 'react';
import { Layout } from '../../components/layout/Layout';

export const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Dashboard content will go here */}
        </div>
        
        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart components will go here */}
        </div>
      </div>
    </Layout>
  );
};