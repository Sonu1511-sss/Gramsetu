import { projectService } from './projectService';
import { complaintService } from './complaintService';
import { workerService } from './workerService';
import { schemeService } from './schemeService';

export const reportService = {
  getAnalyticsSummary: async (_filter?: { period?: string; ward?: number }) => {
    await new Promise((res) => setTimeout(res, 250));
    const projects = await projectService.getProjects();
    const complaints = await complaintService.getComplaints();
    const workers = await workerService.getWorkers();
    const schemes = await schemeService.getSchemes();

    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);

    const complaintsByWard = [
      { ward: 'Ward 01', count: 2, resolved: 2 },
      { ward: 'Ward 02', count: 3, resolved: 2 },
      { ward: 'Ward 03', count: 4, resolved: 1 },
      { ward: 'Ward 04', count: 6, resolved: 2 },
      { ward: 'Ward 05', count: 3, resolved: 1 },
      { ward: 'Ward 06', count: 1, resolved: 1 },
      { ward: 'Ward 07', count: 2, resolved: 1 },
      { ward: 'Ward 08', count: 3, resolved: 1 }
    ];

    const budgetVsExpenditureByMonth = [
      { month: 'Jun', allocated: 450000, spent: 380000 },
      { month: 'Jul', allocated: 600000, spent: 540000 },
      { month: 'Aug', allocated: 850000, spent: 780000 },
      { month: 'Sep', allocated: 720000, spent: 690000 },
      { month: 'Oct', allocated: 950000, spent: 890000 },
      { month: 'Nov (Proj)', allocated: 800000, spent: 520000 }
    ];

    const resolutionTimeline = [
      { category: 'Street Light', avgDays: 1.8, targetDays: 2 },
      { category: 'Sanitation', avgDays: 1.2, targetDays: 1 },
      { category: 'Water Supply', avgDays: 3.1, targetDays: 2 },
      { category: 'Road Damage', avgDays: 4.5, targetDays: 5 },
      { category: 'Drainage', avgDays: 2.2, targetDays: 3 }
    ];

    return {
      totalBudget,
      totalSpent,
      utilizationRate: Math.round((totalSpent / totalBudget) * 100),
      totalProjects: projects.length,
      activeProjects: projects.filter((p) => p.status === 'in_progress').length,
      completedProjects: projects.filter((p) => p.status === 'completed').length,
      delayedProjects: projects.filter((p) => p.status === 'delayed').length,
      totalComplaints: complaints.length,
      resolvedComplaints: complaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length,
      openComplaints: complaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Closed').length,
      workerCount: workers.length,
      workerPresentToday: workers.filter((w) => w.todayAttendance === 'Present').length,
      workerAttendanceRate: 92,
      totalBeneficiaries: schemes.reduce((sum, s) => sum + s.enrolledBeneficiaries, 0),
      budgetVsExpenditureByMonth,
      complaintsByWard,
      resolutionTimeline
    };
  }
};

