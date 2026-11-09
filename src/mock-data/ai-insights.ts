import { AIInsight } from '../types';

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-001',
    type: 'risk',
    title: 'Project Risk Detected — Schedule Delay Anticipated',
    titleHindi: 'परियोजना जोखिम: कार्य पूर्णता में संभावित विलंब',
    severity: 'critical',
    summary: 'CC Road Construction – Ward 04 is currently tracking 12 days behind the approved baseline schedule.',
    detail: 'Current physical progress is 68% against a planned milestone of 82% for this date. The delay is primarily attributed to unseasonal moisture and delays in curbstone supply. If not accelerated, completion will slip beyond the targeted 25 November deadline into December.',
    affectedEntity: 'CC Road Construction – Ward 04 (GP-DEV-2026-001)',
    recommendedAction: 'Direct contractor M/s Balaghat Infra to deploy a second vibrator machine and 6 additional masons for parallel curbstone curing.',
    dateGenerated: '2026-11-09',
    metrics: {
      planned: 82,
      actual: 68,
      delta: '-14% gap (12 days delay)'
    }
  },
  {
    id: 'ai-002',
    type: 'complaint_trend',
    title: 'Complaint Trend Spike — Drinking Water Red Flags',
    titleHindi: 'शिकायत रुझान: पेयजल संबंधी शिकायतों में १८% की वृद्धि',
    severity: 'warning',
    summary: 'Water-related complaints have increased by 18% over the past 30 days, clustered in Ward 04 and Ward 05.',
    detail: 'Analysis of citizen grievance logs shows repeated mentions of pipeline leakage, motor trip frequency, and handpump chain breakdowns. The recent excavation work near Ward 05 appears to have caused micro-fissures in secondary distribution spurs.',
    affectedEntity: 'Ward 04 & Ward 05 Drinking Water Grid',
    recommendedAction: 'Schedule a joint inspection with PHE Sub-Division junior engineer within 48 hours and expedite valve replacement before the Gram Sabha.',
    dateGenerated: '2026-11-08',
    metrics: {
      planned: 4,
      actual: 9,
      delta: '+18% surge'
    }
  },
  {
    id: 'ai-003',
    type: 'ward_insight',
    title: 'Ward Attention Focus — Ward 04 Pending Backlog',
    titleHindi: 'वार्ड विश्लेषण: वार्ड ०४ में सर्वाधिक लंबित शिकायतें',
    severity: 'warning',
    summary: 'Ward 04 (Ambedkar Ward) currently accounts for 25% of all active citizen complaints in the Panchayat.',
    detail: 'With 4 unresolved grievances spanning road pothole, handpump chain and drainage siltation, citizen satisfaction score in Ward 04 has dropped to 3.8/5.0 compared to the village average of 4.4/5.0.',
    affectedEntity: 'Ward 04 (Panch: Smt. Rekha Meshram)',
    recommendedAction: 'Convene a ward-level on-site citizen grievance camp with Ward Panch Rekha Meshram and Secretary Patle on Friday.',
    dateGenerated: '2026-11-09',
    metrics: {
      planned: 1,
      actual: 4,
      delta: '4 pending issues'
    }
  },
  {
    id: 'ai-004',
    type: 'budget_insight',
    title: 'Budget Health Insight — Expenditure Velocity Warning',
    titleHindi: 'बजट अंतर्दृष्टि: २ परियोजनाओं का व्यय मासिक औसत से अधिक',
    severity: 'info',
    summary: '2 projects have expenditure above the planned monthly average, though within overall technical sanction limits.',
    detail: 'CC Road Ward 04 (₹5.20 Lakh spent vs ₹4.50 Lakh projected by Phase 1) and Covered Drainage Ward 02 (₹4.20 Lakh spent vs ₹3.80 Lakh projected) experienced frontloaded cement purchases due to anticipated price hikes. Overall financial solvency remains safe.',
    affectedEntity: '15th Finance Commission Tied Grants',
    recommendedAction: 'Verify that material receipts in store reconcile with Running Account Bill #02 measurement book records.',
    dateGenerated: '2026-11-07',
    metrics: {
      planned: 830000,
      actual: 940000,
      delta: '+₹1,10,000 frontloaded'
    }
  },
  {
    id: 'ai-005',
    type: 'operational',
    title: 'Gram Sabha Quorum Probability — High Turnout Predicted',
    titleHindi: 'ग्राम सभा गणपूर्ति पूर्वानुमान: उच्च जनसहभागिता संभावित',
    severity: 'positive',
    summary: 'Predictive mobilization model estimates an attendance of 340+ citizens for the 15 November meeting.',
    detail: 'Inclusion of PMAY-G priority list reading and Ladli Behna e-KYC agenda points has driven high community interest across female Self-Help Groups (SHGs) and agricultural beneficiaries.',
    affectedEntity: 'Upcoming Gram Sabha (15-Nov-2026)',
    recommendedAction: 'Ensure supplemental shamiana seating capacity is set up in Panchayat Bhawan courtyard to comfortably host over 350 attendees.',
    dateGenerated: '2026-11-09',
    metrics: {
      planned: 250,
      actual: 345,
      delta: '138% of mandatory quorum'
    }
  }
];

export const mockAIHealthScores = {
  developmentHealth: 88,
  complaintHealth: 82,
  projectRiskScore: 24, // low risk is good, 0-100
  budgetHealth: 91,
  citizenEngagement: 86,
  overallGovernanceIndex: 87.4
};

