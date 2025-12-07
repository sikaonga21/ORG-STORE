import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Plus } from 'lucide-react';
import { projectService } from '../services/project.service';
import { organizationService } from '../services/organization.service';
import { Project, ProjectStatus, Organization } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projectsData, orgsData] = await Promise.all([
        projectService.getAll(),
        organizationService.getAll(),
      ]);
      setProjects(projectsData);
      setOrganizations(orgsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOrgName = (orgId: number) => {
    return organizations.find((org) => org.id === orgId)?.name || 'Unknown';
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects</h1>
            <p className="text-slate-600">Manage your projects</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card p-6 card-hover">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.name}</h3>
              <p className="text-sm text-slate-600">Organization: {getOrgName(project.organization_id)}</p>
              <p className="text-sm text-slate-600 mt-2">Status: {project.status}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Projects;
