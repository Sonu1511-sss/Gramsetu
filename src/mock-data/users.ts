import { User } from '../types';

export const mockUsers: Record<string, User> = {
  sarpanch: {
    id: 'usr-sarpanch',
    name: 'Smt. Sunita Bai Maravi',
    nameHindi: 'श्रीमती सुनीता बाई मरावी',
    mobile: '9826144520',
    role: 'sarpanch',
    designation: 'Sarpanch (Gram Pradhan)',
    designationHindi: 'सरपंच',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  },
  up_sarpanch: {
    id: 'usr-upsarpanch',
    name: 'Shri Rajesh Kumar Verma',
    nameHindi: 'श्री राजेश कुमार वर्मा',
    mobile: '9425188390',
    role: 'up_sarpanch',
    ward: 7,
    designation: 'Up-Sarpanch',
    designationHindi: 'उप-सरपंच',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  },
  secretary: {
    id: 'usr-secretary',
    name: 'Shri Mahendra Singh Patle',
    nameHindi: 'श्री महेंद्र सिंह पटले',
    mobile: '9406722105',
    role: 'secretary',
    designation: 'Panchayat Secretary (Sachiv)',
    designationHindi: 'पंचायत सचिव',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  },
  panch: {
    id: 'usr-panch',
    name: 'Smt. Rekha Meshram',
    nameHindi: 'श्रीमती रेखा मेश्राम',
    mobile: '9301277114',
    role: 'panch',
    ward: 4,
    designation: 'Ward Panch - Ward 04',
    designationHindi: 'वार्ड पंच - वार्ड ०४',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  },
  operator: {
    id: 'usr-operator',
    name: 'Smt. Kavita Sharma',
    nameHindi: 'श्रीमती कविता शर्मा',
    mobile: '9131099421',
    role: 'operator',
    designation: 'Panchayat Operator / CSC Incharge',
    designationHindi: 'पंचायत ऑपरेटर',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  },
  technical_assistant: {
    id: 'usr-ta',
    name: 'Er. Amit Kumar Bisen',
    nameHindi: 'इंजी. अमित कुमार बिसेन',
    mobile: '9755231980',
    role: 'technical_assistant',
    designation: 'Technical Assistant (Sub-Engineer)',
    designationHindi: 'तकनीकी सहायक',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  },
  gram_rojgar_sahayak: {
    id: 'usr-grs',
    name: 'Shri Santosh Dhurve',
    nameHindi: 'श्री संतोष धुर्वे',
    mobile: '9691240590',
    role: 'gram_rojgar_sahayak',
    designation: 'Gram Rojgar Sahayak (GRS)',
    designationHindi: 'ग्राम रोजगार सहायक',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  },
  citizen: {
    id: 'usr-citizen',
    name: 'Shri Ramcharan Gautam',
    nameHindi: 'श्री रामचरण गौतम',
    mobile: '9827012345',
    role: 'citizen',
    ward: 3,
    designation: 'Citizen / Resident',
    designationHindi: 'नागरिक',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    panchayatName: 'Gram Panchayat Rampur',
    district: 'Balaghat',
    state: 'Madhya Pradesh'
  }
};

