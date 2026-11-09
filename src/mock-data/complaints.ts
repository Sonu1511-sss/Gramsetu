import { Complaint } from '../types';

export const mockComplaints: Complaint[] = [
  {
    id: 'GP-2026-00124',
    citizenName: 'Shri Ramcharan Gautam',
    citizenMobile: '+91 98270 12345',
    ward: 3,
    category: 'Street Light',
    priority: 'High',
    status: 'In Progress',
    title: 'Street light not working at Kranti Chowk near transformer',
    description: 'The street light on pole #B-14 has been blinking and completely switched off for the last 4 days. Creates safety hazard for women and night commuters.',
    location: 'Near Old Transformer, Kranti Chowk, Ward 03',
    photoUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=600&q=80',
    submittedDate: '2026-11-06 09:30 AM',
    expectedResolutionDate: '2026-11-10',
    assignedOfficerName: 'Shri Mukesh Bisen & Technician Shyam',
    assignedOfficerDesignation: 'Ward Panch & Line Technician',
    timeline: [
      { id: 'ct-1', status: 'New', timestamp: '2026-11-06 09:30 AM', note: 'Grievance submitted via Citizen Portal / WhatsApp Helpdesk', updatedBy: 'System Auto-Log' },
      { id: 'ct-2', status: 'Assigned', timestamp: '2026-11-06 11:15 AM', note: 'Assigned to Ward Panch Mukesh Bisen & Electrician Shyam', updatedBy: 'Shri Mahendra Singh Patle (Secretary)' },
      { id: 'ct-3', status: 'In Progress', timestamp: '2026-11-07 02:00 PM', note: 'Site inspected. Capacitor burnt due to voltage spike. Replacement part requisitioned from Block store.', updatedBy: 'Technician Shyam' }
    ]
  },
  {
    id: 'GP-2026-00125',
    citizenName: 'Smt. Shanti Bai Lilhare',
    citizenMobile: '+91 94243 56789',
    ward: 5,
    category: 'Water',
    priority: 'Urgent',
    status: 'In Progress',
    title: 'Drinking water pipe leakage causing low pressure in Jal Board Basti',
    description: 'Main underground 2-inch supply line cracked near public tap stand. Clean water overflowing onto road while 30 households receive trickle water.',
    location: 'Near House #42, Jal Board Basti, Ward 05',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    submittedDate: '2026-11-07 08:15 AM',
    expectedResolutionDate: '2026-11-09',
    assignedOfficerName: 'Shri Santosh Dhurve & Plumber Dilip',
    assignedOfficerDesignation: 'GRS & PHE Plumber',
    timeline: [
      { id: 'ct-21', status: 'New', timestamp: '2026-11-07 08:15 AM', note: 'Complaint lodged with photo attachment', updatedBy: 'Citizen Self-Service' },
      { id: 'ct-22', status: 'Assigned', timestamp: '2026-11-07 09:00 AM', note: 'Flagged as URGENT priority by Secretary', updatedBy: 'Shri Mahendra Singh Patle' },
      { id: 'ct-23', status: 'In Progress', timestamp: '2026-11-08 10:30 AM', note: 'Excavation done, pipe clamp replacement currently being welded.', updatedBy: 'Plumber Dilip' }
    ]
  },
  {
    id: 'GP-2026-00120',
    citizenName: 'Shri Devendra Baghel',
    citizenMobile: '+91 97551 88920',
    ward: 4,
    category: 'Drainage',
    priority: 'High',
    status: 'Resolved',
    title: 'Drainage choke and foul overflow in front of Primary School',
    description: 'Plastic bags and debris choked the box culvert causing foul water accumulation in front of school pathway.',
    location: 'Opposite Govt. Primary School, Ward 04',
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    resolvedPhotoUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80',
    submittedDate: '2026-11-01 10:00 AM',
    expectedResolutionDate: '2026-11-03',
    assignedOfficerName: 'Shri Santosh Dhurve',
    assignedOfficerDesignation: 'Gram Rojgar Sahayak & Sanitation Team',
    timeline: [
      { id: 'ct-31', status: 'New', timestamp: '2026-11-01 10:00 AM', note: 'Complaint logged', updatedBy: 'Citizen Portal' },
      { id: 'ct-32', status: 'Assigned', timestamp: '2026-11-01 11:30 AM', note: 'Assigned to Swachhata Taskforce team #2', updatedBy: 'Secretary Patle' },
      { id: 'ct-33', status: 'In Progress', timestamp: '2026-11-02 09:00 AM', note: 'Desilting and waste extraction machine engaged.', updatedBy: 'Santosh Dhurve' },
      { id: 'ct-34', status: 'Resolved', timestamp: '2026-11-02 04:30 PM', note: 'Culvert cleared completely, lime powder sprinkled. Photo uploaded.', updatedBy: 'Santosh Dhurve' },
      { id: 'ct-35', status: 'Closed', timestamp: '2026-11-03 01:00 PM', note: 'Citizen confirmed resolution with satisfaction.', updatedBy: 'System Auto-Close' }
    ],
    citizenFeedback: {
      rating: 5,
      comment: 'Very fast action by Panchayat sanitation team! The school road is now clean.',
      submittedAt: '2026-11-03 12:45 PM'
    }
  },
  {
    id: 'GP-2026-00122',
    citizenName: 'Smt. Sushila Bai Netam',
    citizenMobile: '+91 93021 34991',
    ward: 2,
    category: 'Sanitation',
    priority: 'Medium',
    status: 'Resolved',
    title: 'Irregular door-to-door garbage collection vehicle in lane 3',
    description: 'The Swachhata e-rickshaw missed lane 3 for two consecutive days. Dustbins are overflowing.',
    location: 'Lane 3, Shanti Nagar, Ward 02',
    submittedDate: '2026-11-03 11:45 AM',
    expectedResolutionDate: '2026-11-05',
    assignedOfficerName: 'Shri Rajesh Kumar Verma',
    assignedOfficerDesignation: 'Up-Sarpanch',
    timeline: [
      { id: 'ct-41', status: 'New', timestamp: '2026-11-03 11:45 AM', note: 'Complaint registered', updatedBy: 'Citizen' },
      { id: 'ct-42', status: 'Assigned', timestamp: '2026-11-03 01:00 PM', note: 'Assigned to Sanitation Incharge', updatedBy: 'Secretary' },
      { id: 'ct-43', status: 'Resolved', timestamp: '2026-11-04 09:30 AM', note: 'Route reassigned to Driver Mohan. 100% waste collected.', updatedBy: 'Up-Sarpanch Verma' }
    ],
    citizenFeedback: {
      rating: 4,
      comment: 'Driver came today morning on time. Good service.',
      submittedAt: '2026-11-04 11:00 AM'
    }
  },
  {
    id: 'GP-2026-00126',
    citizenName: 'Shri Balram Bisen',
    citizenMobile: '+91 98266 77112',
    ward: 4,
    category: 'Road',
    priority: 'High',
    status: 'New',
    title: 'Pothole and mud slush near veterinary center',
    description: 'Deep trench dug for optical fiber cable not backfilled properly, creating risk of two-wheelers slipping.',
    location: 'Near Veterinary Sub-center, Ward 04',
    submittedDate: '2026-11-08 04:20 PM',
    expectedResolutionDate: '2026-11-12',
    assignedOfficerName: 'Er. Amit Kumar Bisen',
    assignedOfficerDesignation: 'Technical Assistant',
    timeline: [
      { id: 'ct-51', status: 'New', timestamp: '2026-11-08 04:20 PM', note: 'Complaint registered with photo', updatedBy: 'Citizen App' }
    ]
  },
  {
    id: 'GP-2026-00127',
    citizenName: 'Shri Govind Patel',
    citizenMobile: '+91 94073 88120',
    ward: 1,
    category: 'Electricity',
    priority: 'Medium',
    status: 'Assigned',
    title: 'Loose low-hanging electric cable wire near agricultural field',
    description: 'High wind caused low hanging service cable over tractor crossing road. Needs tensioning.',
    location: 'Border of Ward 01 and Field #88',
    submittedDate: '2026-11-08 06:10 PM',
    expectedResolutionDate: '2026-11-11',
    assignedOfficerName: 'Shri Rameshwar Patel',
    assignedOfficerDesignation: 'Ward Panch - Ward 01',
    timeline: [
      { id: 'ct-61', status: 'New', timestamp: '2026-11-08 06:10 PM', note: 'Complaint logged', updatedBy: 'Citizen WhatsApp' },
      { id: 'ct-62', status: 'Assigned', timestamp: '2026-11-09 09:15 AM', note: 'Intimated to MPPKVVCL Waraseoni distribution engineer', updatedBy: 'Secretary Patle' }
    ]
  },
  {
    id: 'GP-2026-00118',
    citizenName: 'Smt. Anita Dhurve',
    citizenMobile: '+91 96918 22340',
    ward: 4,
    category: 'Water',
    priority: 'Urgent',
    status: 'Escalated',
    title: 'Borewell handpump chain broken and water turbid',
    description: 'Public handpump near community hall has broken handle chain and muddy water output.',
    location: 'Community Hall premises, Ward 04',
    submittedDate: '2026-10-28 10:00 AM',
    expectedResolutionDate: '2026-11-02',
    assignedOfficerName: 'PHE Sub-Division Assistant Engineer',
    assignedOfficerDesignation: 'PHE Sub-Division',
    timeline: [
      { id: 'ct-71', status: 'New', timestamp: '2026-10-28 10:00 AM', note: 'Complaint created', updatedBy: 'Citizen' },
      { id: 'ct-72', status: 'In Progress', timestamp: '2026-10-30 11:00 AM', note: 'Local mechanic inspected cylinder', updatedBy: 'GRS Santosh' },
      { id: 'ct-73', status: 'Escalated', timestamp: '2026-11-04 03:00 PM', note: 'Deep pipe collapse suspected; matter escalated to Block PHE Mobile Repair Van', updatedBy: 'Sarpanch Sunita Bai' }
    ]
  }
];

