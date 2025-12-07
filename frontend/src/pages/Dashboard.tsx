import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import StatsCard from '../components/Dashboard/StatsCard';
import { Building2, FolderKanban, Activity, TrendingUp } from 'lucide-react';
import { analyticsService } from '../services/analytics.service';
import { Analytics } from '../types';

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await analyticsService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading analytics...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Overview of your organization data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Organizations"
            value={analytics?.total_organizations || 0}
            icon={Building2}
            color="primary"
          />
          <StatsCard
            title="Total Projects"
            value={analytics?.total_projects || 0}
            icon={FolderKanban}
            color="secondary"
          />
          <StatsCard
            title="Ongoing Projects"
            value={analytics?.ongoing_projects || 0}
            icon={TrendingUp}
            color="info"
          />
          <StatsCard
            title="Total Activities"
            value={analytics?.total_activities || 0}
            icon={Activity}
            color="success"
            subtitle={`${analytics?.recent_activities_count || 0} in last 30 days`}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
