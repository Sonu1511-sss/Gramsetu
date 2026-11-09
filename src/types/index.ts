export type UserRole =
  | 'sarpanch'
  | 'up_sarpanch'
  | 'secretary'
  | 'panch'
  | 'operator'
  | 'technical_assistant'
  | 'gram_rojgar_sahayak'
  | 'citizen';

export interface User {
  id: string;
  name: string;
  nameHindi: string;
  mobile: string;
  role: UserRole;
  designation: string;
  designationHindi: string;
  ward?: number;
  avatar: string;
  panchayatName: string;
  district: string;
  state: string;
}

export interface PanchayatMember {
  id: string;
  name: string;
  nameHindi: string;
  designation: string;
  designationHindi: string;
  role: UserRole;
  ward?: number;
  contact: string;
  email?: string;
  photo: string;
  attendanceRate: number; // percentage e.g. 94
  status: 'active' | 'on_leave' | 'inactive';
  responsibilities: string[];
  assignedProjectsCount: number;
  joinedDate: string;
  qualification?: string;
  address?: string;
}

export type ProjectCategory =
  | 'Road Construction'
  | 'Drainage'
  | 'Water Supply'
  | 'Street Lights'
  | 'Public Buildings'
  | 'School Development'
  | 'Health Infrastructure'
  | 'Sanitation'
  | 'Other Development Works';

export type ProjectStatus =
  | 'pending_approval'
  | 'work_order'
  | 'in_progress'
  | 'inspection'
  | 'completed'
  | 'delayed';

export interface ProjectTimelineItem {
  id: string;
  stage: string;
  date: string;
  completed: boolean;
  remarks?: string;
  officer?: string;
}

export interface ProjectInspection {
  id: string;
  date: string;
  inspectorName: string;
  designation: string;
  qualityRating: number; // 1-5
  notes: string;
  actionRequired?: string;
  status: 'Passed' | 'Action Needed' | 'Critical Issue';
}

export interface Project {
  id: string;
  code: string;
  title: string;
  titleHindi: string;
  category: ProjectCategory;
  ward: number;
  location: string;
  budget: number; // in INR
  spent: number; // in INR
  progress: number; // 0-100
  startDate: string;
  expectedCompletion: string;
  actualCompletion?: string;
  status: ProjectStatus;
  description: string;
  contractor: string;
  supervisor: string;
  workersEngaged: number;
  beneficiariesCount: number;
  beforePhoto: string;
  afterPhoto: string;
  recentPhotos: string[];
  timeline: ProjectTimelineItem[];
  inspections: ProjectInspection[];
  workRemainingDescription?: string;
  approvalOrderNo: string;
}

export interface Notice {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Notice Board' | 'Official Circulars' | 'Announcements' | 'Gram Sabha Notice' | 'Tender';
  description: string;
  publishDate: string;
  validUntil: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'All' | 'Ward Members' | 'Staff' | 'Citizens';
  attachmentName?: string;
  attachmentSize?: string;
  isRead?: boolean;
  author: string;
  authorRole: string;
}

export type ComplaintCategory =
  | 'Water'
  | 'Road'
  | 'Street Light'
  | 'Drainage'
  | 'Sanitation'
  | 'Electricity'
  | 'Public Building'
  | 'Other';

export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type ComplaintStatus =
  | 'New'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved'
  | 'Escalated'
  | 'Closed';

export interface ComplaintTimeline {
  id: string;
  status: ComplaintStatus;
  timestamp: string;
  note: string;
  updatedBy: string;
}

export interface Complaint {
  id: string; // GP-2026-00124
  citizenName: string;
  citizenMobile: string;
  ward: number;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  title: string;
  description: string;
  location: string;
  photoUrl?: string;
  resolvedPhotoUrl?: string;
  submittedDate: string;
  expectedResolutionDate: string;
  assignedOfficerName: string;
  assignedOfficerDesignation: string;
  timeline: ComplaintTimeline[];
  citizenFeedback?: {
    rating: number; // 1-5
    comment: string;
    submittedAt: string;
  };
}

export interface GramSabhaMeeting {
  id: string;
  title: string;
  titleHindi: string;
  meetingType: 'Regular Gram Sabha' | 'Special Gram Sabha' | 'Panchayat Standing Committee' | 'Social Audit';
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'draft';
  chairperson: string;
  secretary: string;
  quorumRequired: number;
  actualAttendance?: number;
  agenda: {
    id: string;
    order: number;
    title: string;
    description: string;
    proposedBy: string;
  }[];
  resolutions: {
    id: string;
    resolutionNumber: string;
    title: string;
    decision: 'Passed Unanimously' | 'Passed by Majority' | 'Deferred' | 'Rejected';
    responsiblePerson: string;
    deadline: string;
    status: 'In Progress' | 'Implemented' | 'Pending';
  }[];
  actionItems: {
    id: string;
    task: string;
    assignedTo: string;
    deadline: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'In Progress' | 'Completed';
  }[];
  minutesSummary?: string;
  attendeesList?: {
    name: string;
    ward: number;
    role: string;
    attended: boolean;
  }[];
}

export interface Scheme {
  id: string;
  code: string;
  name: string;
  nameHindi: string;
  category:
  | 'Agriculture'
  | 'Housing'
  | 'Education'
  | 'Employment'
  | 'Women & Child'
  | 'Health'
  | 'Social Security'
  | 'Rural Development';
  department: string;
  benefits: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationProcess: string;
  officialPortalUrl: string;
  enrolledBeneficiaries: number;
  pendingApplications: number;
  sanctionedAmount: string;
  deadlineDate?: string;
  isNew?: boolean;
}

export type WorkerCategory =
  | 'Construction Workers'
  | 'Sanitation Workers'
  | 'Water Supply Workers'
  | 'Street Light Workers'
  | 'MGNREGA Workers'
  | 'Other Panchayat Workers';

export interface Worker {
  id: string;
  workerCode: string;
  name: string;
  category: WorkerCategory;
  ward: number;
  phone: string;
  dailyWage: number;
  todayAttendance: 'Present' | 'Absent' | 'Leave';
  attendanceRate: number; // percentage
  assignedTask: string;
  taskLocation: string;
  taskDeadline: string;
  taskPriority: 'High' | 'Medium' | 'Low';
  taskStatus: 'Not Started' | 'In Progress' | 'Supervisor Review' | 'Completed';
  supervisorName: string;
}

export interface VillageProfile {
  name: string;
  gramPanchayat: string;
  block: string;
  district: string;
  state: string;
  pincode: string;
  sarpanchName: string;
  secretaryName: string;
  totalPopulation: number;
  totalHouseholds: number;
  malePopulation: number;
  femalePopulation: number;
  childrenPopulation: number;
  seniorCitizens: number;
  totalWards: number;
  literacyRate: number;
  bplHouseholds: number;
  facilities: {
    schools: number;
    anganwadiCentres: number;
    subHealthCentre: number;
    veterinaryClinic: number;
    communityHalls: number;
    waterTanks: number;
    tubeWells: number;
    pavedRoadKm: number;
    streetLights: number;
    wasteSegregationSheds: number;
  };
  landUse: {
    agriculturalLandAcres: number;
    forestCoverAcres: number;
    residentialAcres: number;
    waterBodiesAcres: number;
  };
  wardDetails: {
    wardNumber: number;
    wardName: string;
    panchName: string;
    households: number;
    population: number;
    activeProjects: number;
    openComplaints: number;
  }[];
}

export interface PanchayatDocument {
  id: string;
  documentName: string;
  category:
  | 'Government Orders'
  | 'Meeting Minutes'
  | 'Project Documents'
  | 'Bills & Vouchers'
  | 'Approvals'
  | 'Notices'
  | 'Reports'
  | 'Certificates';
  uploadedBy: string;
  uploadedRole: string;
  date: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'IMAGE';
  version: string;
  status: 'Approved' | 'Pending Review' | 'Archived';
  description?: string;
  downloadUrl?: string;
}

export interface AIInsight {
  id: string;
  type: 'risk' | 'complaint_trend' | 'ward_insight' | 'budget_insight' | 'operational';
  title: string;
  titleHindi: string;
  severity: 'critical' | 'warning' | 'info' | 'positive';
  summary: string;
  detail: string;
  affectedEntity: string;
  recommendedAction: string;
  dateGenerated: string;
  metrics?: {
    planned?: number;
    actual?: number;
    delta?: string;
  };
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'project' | 'meeting' | 'complaint' | 'scheme' | 'worker' | 'system';
  isRead: boolean;
  link?: string;
}

