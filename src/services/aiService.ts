import { AIInsight } from '../types';
import { mockAIInsights, mockAIHealthScores } from '../mock-data/ai-insights';
import { projectService } from './projectService';
import { complaintService } from './complaintService';

export interface MonthlyAIReport {
  generatedDate: string;
  panchayatName: string;
  district: string;
  financialYear: string;
  month: string;
  healthScore: number;
  executiveSummary: string;
  developmentProgress: {
    totalProjects: number;
    ongoing: number;
    completed: number;
    delayed: number;
    totalBudget: number;
    totalSpent: number;
    utilizationRate: number;
  };
  projectRisks: {
    projectName: string;
    riskLevel: 'High' | 'Medium' | 'Low';
    delayDays: number;
    rootCause: string;
    correctiveAction: string;
  }[];
  complaintAnalysis: {
    totalReceived: number;
    resolved: number;
    resolutionRate: number;
    topCategory: string;
    criticalWard: string;
    averageResolutionDays: number;
  };
  budgetSummary: {
    allocatedGrant: string;
    expenditureRecorded: string;
    balanceAvailable: string;
    efficiencyRating: string;
  };
  wardPerformance: {
    ward: string;
    panchName: string;
    score: number;
    status: 'Excellent' | 'Good' | 'Needs Attention';
  }[];
  pendingWorks: string[];
  recommendations: string[];
}

export const aiService = {
  getInsights: async (): Promise<AIInsight[]> => {
    await new Promise((res) => setTimeout(res, 200));
    return mockAIInsights;
  },

  getHealthScores: async () => {
    await new Promise((res) => setTimeout(res, 150));
    return mockAIHealthScores;
  },

  generateMonthlyReport: async (month = 'November 2026'): Promise<MonthlyAIReport> => {
    // Simulating deterministic AI model reasoning over Panchayat datasets
    await new Promise((res) => setTimeout(res, 600));

    const projects = await projectService.getProjects();
    const complaints = await complaintService.getComplaints();

    const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
    const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
    const completedProjects = projects.filter((p) => p.status === 'completed').length;
    const ongoingProjects = projects.filter((p) => p.status === 'in_progress').length;
    const delayedProjects = projects.filter((p) => p.status === 'delayed').length;

    const resolvedComplaints = complaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length;

    return {
      generatedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      panchayatName: 'Gram Panchayat Rampur',
      district: 'Balaghat (M.P.)',
      financialYear: '2026-27',
      month,
      healthScore: 88,
      executiveSummary:
        'Overall administrative performance of Gram Panchayat Rampur remains very high (88/100). 15th Finance Commission physical milestones are advancing satisfactorily. Special focus is required on Ward 04 curbstone works and localized drinking water valve repairs before the upcoming winter harvest season.',
      developmentProgress: {
        totalProjects: projects.length,
        ongoing: ongoingProjects,
        completed: completedProjects,
        delayed: delayedProjects,
        totalBudget,
        totalSpent,
        utilizationRate: Math.round((totalSpent / totalBudget) * 100)
      },
      projectRisks: [
        {
          projectName: 'CC Road Construction – Ward 04',
          riskLevel: 'High',
          delayDays: 12,
          rootCause: 'Shortage of specialized curbstone curing supplies during October festive break.',
          correctiveAction: 'Mobilize 5 additional masons and issue contractor speed-up notice.'
        },
        {
          projectName: 'Solid Waste Segregation Shed – Ward 08',
          riskLevel: 'Medium',
          delayDays: 8,
          rootCause: 'Transportation strike delayed vermi-compost brick delivery.',
          correctiveAction: 'Procure bricks locally from Waraseoni kilns under emergency provision.'
        }
      ],
      complaintAnalysis: {
        totalReceived: complaints.length,
        resolved: resolvedComplaints,
        resolutionRate: Math.round((resolvedComplaints / complaints.length) * 100),
        topCategory: 'Drinking Water (35%)',
        criticalWard: 'Ward 04 & Ward 05',
        averageResolutionDays: 2.8
      },
      budgetSummary: {
        allocatedGrant: '₹40,70,000',
        expenditureRecorded: `₹${(totalSpent / 100000).toFixed(2)} Lakh`,
        balanceAvailable: `₹${((totalBudget - totalSpent) / 100000).toFixed(2)} Lakh`,
        efficiencyRating: 'Healthy (Zero overdraft risk)'
      },
      wardPerformance: [
        { ward: 'Ward 01 - Patel Mohalla', panchName: 'Shri Rameshwar Patel', score: 92, status: 'Excellent' },
        { ward: 'Ward 02 - Shanti Nagar', panchName: 'Smt. Geeta Bisen', score: 90, status: 'Excellent' },
        { ward: 'Ward 03 - Kranti Chowk', panchName: 'Shri Mukesh Bisen', score: 86, status: 'Good' },
        { ward: 'Ward 04 - Ambedkar Ward', panchName: 'Smt. Rekha Meshram', score: 76, status: 'Needs Attention' },
        { ward: 'Ward 05 - Jal Board Basti', panchName: 'Shri Ashok Dhurve', score: 81, status: 'Good' },
        { ward: 'Ward 06 - Saraswati Nagar', panchName: 'Smt. Maya Chandrawanshi', score: 95, status: 'Excellent' },
        { ward: 'Ward 07 - Kisan Colony', panchName: 'Shri Ramswaroop Lilhare', score: 89, status: 'Good' },
        { ward: 'Ward 08 - Bazar Ward', panchName: 'Shri Dinesh Gupta', score: 84, status: 'Good' }
      ],
      pendingWorks: [
        'Curbstone laying and curing on remaining 160m CC road',
        'Installation of 85 remaining functional household tap meters under JJM',
        'Backfilling of trench dug for optical fiber in Ward 04',
        'Panchayat Bhawan extension roof slab casting'
      ],
      recommendations: [
        'Host dedicated on-site grievance clinic in Ward 04 on Friday to clear all 4 pending complaints.',
        'Issue provisional completion certificate for 350m covered drainage in Ward 02.',
        'Conduct live mock run of solar overhead pump before public dedication at Gram Sabha.',
        'Ensure 100% Aadhaar-DBT linking for 24 newly identified Ladli Behna applicants.'
      ]
    };
  }
};

