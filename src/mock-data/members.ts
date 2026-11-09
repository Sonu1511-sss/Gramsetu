import { PanchayatMember } from '../types';

export const mockMembers: PanchayatMember[] = [
  {
    id: 'mem-001',
    name: 'Smt. Sunita Bai Maravi',
    nameHindi: 'श्रीमती सुनीता बाई मरावी',
    designation: 'Sarpanch (Gram Pradhan)',
    designationHindi: 'सरपंच (ग्राम प्रधान)',
    role: 'sarpanch',
    contact: '+91 98261 44520',
    email: 'sarpanch.rampur@mp.gov.in',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 98,
    status: 'active',
    responsibilities: [
      'Presiding over Gram Sabha and Panchayat meetings',
      'Overall administrative and financial sanctioning',
      'Village development master planning',
      'Government flagship schemes supervision'
    ],
    assignedProjectsCount: 12,
    joinedDate: '2022-07-15',
    qualification: 'Higher Secondary, Social Worker',
    address: 'Ward 04, Rampur, Tehsil Waraseoni, Balaghat'
  },
  {
    id: 'mem-002',
    name: 'Shri Rajesh Kumar Verma',
    nameHindi: 'श्री राजेश कुमार वर्मा',
    designation: 'Up-Sarpanch',
    designationHindi: 'उप-सरपंच',
    role: 'up_sarpanch',
    ward: 7,
    contact: '+91 94251 88390',
    email: 'upsarpanch.rampur@mp.gov.in',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 94,
    status: 'active',
    responsibilities: [
      'Assisting Sarpanch in daily administration',
      'Sanitation and public health committee head',
      'Public grievance redressal coordination'
    ],
    assignedProjectsCount: 5,
    joinedDate: '2022-07-15',
    qualification: 'Graduate (B.A.)',
    address: 'Ward 07, Kisan Colony, Rampur'
  },
  {
    id: 'mem-003',
    name: 'Shri Mahendra Singh Patle',
    nameHindi: 'श्री महेंद्र सिंह पटले',
    designation: 'Panchayat Secretary (Sachiv)',
    designationHindi: 'पंचायत सचिव',
    role: 'secretary',
    contact: '+91 94067 22105',
    email: 'sachiv.rampur.balaghat@mp.gov.in',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 96,
    status: 'active',
    responsibilities: [
      'Maintenance of Panchayat accounts, cashbooks and ledgers',
      'Recording Gram Sabha proceedings and issuing notices',
      'Liaison between Block Development Office (BDO) and Panchayat',
      'Statutory compliance and birth/death registration'
    ],
    assignedProjectsCount: 12,
    joinedDate: '2019-03-10',
    qualification: 'M.Com, Govt. Certified Secretary',
    address: 'Govt. Quarters, Waraseoni / Rampur'
  },
  {
    id: 'mem-004',
    name: 'Er. Amit Kumar Bisen',
    nameHindi: 'इंजी. अमित कुमार बिसेन',
    designation: 'Technical Assistant (Sub-Engineer)',
    designationHindi: 'तकनीकी सहायक (उप-यंत्री)',
    role: 'technical_assistant',
    contact: '+91 97552 31980',
    email: 'amit.bisen.res@mp.gov.in',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 92,
    status: 'active',
    responsibilities: [
      'Technical estimates and Detailed Project Reports (DPR)',
      'Physical inspection of civil and road works',
      'Measurement book (MB) recording and bill verification',
      'Quality compliance reporting'
    ],
    assignedProjectsCount: 8,
    joinedDate: '2021-08-01',
    qualification: 'B.E. Civil Engineering',
    address: 'RES Sub-Division, Waraseoni'
  },
  {
    id: 'mem-005',
    name: 'Shri Santosh Dhurve',
    nameHindi: 'श्री संतोष धुर्वे',
    designation: 'Gram Rojgar Sahayak (GRS)',
    designationHindi: 'ग्राम रोजगार सहायक',
    role: 'gram_rojgar_sahayak',
    contact: '+91 96912 40590',
    email: 'grs.rampur@mp.gov.in',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 95,
    status: 'active',
    responsibilities: [
      'MGNREGA muster roll maintenance and wage calculations',
      'Job card registration and renewal',
      'Daily site work allocations for rural labour',
      'Geo-tagging of completed rural infrastructure'
    ],
    assignedProjectsCount: 6,
    joinedDate: '2020-01-15',
    qualification: 'DCA, Higher Secondary',
    address: 'Ward 05, Jal Board Basti, Rampur'
  },
  {
    id: 'mem-006',
    name: 'Smt. Kavita Sharma',
    nameHindi: 'श्रीमती कविता शर्मा',
    designation: 'Panchayat Operator / CSC Incharge',
    designationHindi: 'पंचायत ऑपरेटर / सीएससी प्रभारी',
    role: 'operator',
    contact: '+91 91310 99421',
    email: 'operator.rampur@mp.gov.in',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 97,
    status: 'active',
    responsibilities: [
      'Gramsetu portal data entry and circular uploads',
      'Citizen scheme application assistance',
      'Samagra ID and e-KYC service provision',
      'Certificates generation (Income, Domicile, Caste application)'
    ],
    assignedProjectsCount: 0,
    joinedDate: '2022-11-01',
    qualification: 'BCA, PGDCA',
    address: 'Ward 08, Rampur'
  },
  {
    id: 'mem-007',
    name: 'Smt. Rekha Meshram',
    nameHindi: 'श्रीमती रेखा मेश्राम',
    designation: 'Ward Panch - Ward 04',
    designationHindi: 'वार्ड पंच - वार्ड ०४',
    role: 'panch',
    ward: 4,
    contact: '+91 93012 77114',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 91,
    status: 'active',
    responsibilities: [
      'Ward 04 development supervision',
      'Citizen grievance reporting for Ward 04',
      'Drinking water and drainage maintenance supervision'
    ],
    assignedProjectsCount: 2,
    joinedDate: '2022-07-15',
    qualification: 'Secondary School',
    address: 'Ward 04, Ambedkar Ward, Rampur'
  },
  {
    id: 'mem-008',
    name: 'Shri Mukesh Bisen',
    nameHindi: 'श्री मुकेश बिसेन',
    designation: 'Ward Panch - Ward 03',
    designationHindi: 'वार्ड पंच - वार्ड ०३',
    role: 'panch',
    ward: 3,
    contact: '+91 98934 66129',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 88,
    status: 'active',
    responsibilities: [
      'Ward 03 Kranti Chowk area development',
      'Street lighting and sanitation monitoring'
    ],
    assignedProjectsCount: 1,
    joinedDate: '2022-07-15',
    qualification: 'Higher Secondary',
    address: 'Ward 03, Kranti Chowk, Rampur'
  }
];

