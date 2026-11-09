import { Project, ProjectStatus } from '../types';
import { mockProjects } from '../mock-data/projects';

const PROJECTS_KEY = 'gramsetu_projects';

export const projectService = {
  getProjects: async (filter?: { category?: string; status?: ProjectStatus | 'all'; ward?: number }): Promise<Project[]> => {
    await new Promise((res) => setTimeout(res, 200));
    let list: Project[] = [];
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      list = stored ? JSON.parse(stored) : mockProjects;
    } catch {
      list = mockProjects;
    }

    if (filter) {
      if (filter.category && filter.category !== 'all') {
        list = list.filter((p) => p.category === filter.category);
      }
      if (filter.status && filter.status !== 'all') {
        list = list.filter((p) => p.status === filter.status);
      }
      if (filter.ward && filter.ward !== 0) {
        list = list.filter((p) => p.ward === filter.ward);
      }
    }

    return list;
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    const list = await projectService.getProjects();
    return list.find((p) => p.id === id);
  },

  updateProjectProgress: async (
    id: string,
    payload: {
      progress: number;
      spentAddition: number;
      remarks: string;
      photoUrl?: string;
      workRemainingDescription?: string;
    }
  ): Promise<Project> => {
    await new Promise((res) => setTimeout(res, 350));
    const list = await projectService.getProjects();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Project not found');

    const project = list[index];
    const newProgress = Math.min(100, Math.max(0, payload.progress));
    const newSpent = project.spent + (payload.spentAddition || 0);
    const newStatus = newProgress >= 100 ? 'completed' : 'in_progress';

    const newTimelineItem = {
      id: `tl-update-${Date.now()}`,
      stage: `Progress update to ${newProgress}%`,
      date: new Date().toISOString().split('T')[0],
      completed: true,
      remarks: payload.remarks
    };

    const updatedProject: Project = {
      ...project,
      progress: newProgress,
      spent: newSpent,
      status: newStatus,
      workRemainingDescription: payload.workRemainingDescription || project.workRemainingDescription,
      timeline: [...project.timeline, newTimelineItem],
      recentPhotos: payload.photoUrl ? [payload.photoUrl, ...project.recentPhotos] : project.recentPhotos,
      actualCompletion: newProgress >= 100 ? new Date().toISOString().split('T')[0] : project.actualCompletion
    };

    list[index] = updatedProject;
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list));
    return updatedProject;
  },

  addProject: async (project: Omit<Project, 'id' | 'code'>): Promise<Project> => {
    await new Promise((res) => setTimeout(res, 400));
    const list = await projectService.getProjects();
    const count = list.length + 1;
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now().toString().slice(-4)}`,
      code: `GP-DEV-2026-${count.toString().padStart(3, '0')}`
    };

    const updated = [newProject, ...list];
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    return newProject;
  }
};

