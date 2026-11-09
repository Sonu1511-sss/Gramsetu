import { Scheme } from '../types';

export const mockSchemes: Scheme[] = [
  {
    id: 'sch-001',
    code: 'PMAY-G',
    name: 'Pradhan Mantri Awas Yojana – Gramin (PMAY-G)',
    nameHindi: 'प्रधानमंत्री आवास योजना - ग्रामीण',
    category: 'Housing',
    department: 'Ministry of Rural Development, Govt. of India',
    benefits: 'Financial assistance of ₹1,20,000 in 3 installments + 90 days MGNREGA wages (approx ₹20,400) + ₹12,000 for toilet construction under SBM-G.',
    eligibilityCriteria: [
      'Households living in kutcha or dilapidated houses',
      'Listed in Awaas+ / SECC 2011 priority list',
      'Should not own a motorized 3/4 wheeler or agricultural equipment (tractor/harvester)',
      'No family member in regular government service or paying income tax'
    ],
    requiredDocuments: [
      'Aadhaar Card of head and family members',
      'Bank Passbook linked to Aadhaar (DBT active)',
      'Job Card number (MGNREGA)',
      'Consent form & Affidavit of land ownership',
      'Photograph of existing kutcha shelter'
    ],
    applicationProcess: 'Verification by Gram Rojgar Sahayak & Panchayat Secretary → Gram Sabha social approval → Geo-tagging of kutcha house on AwaasApp → Approval by Janpad Panchayat Waraseoni → Installment disbursement directly to Aadhaar bank account.',
    officialPortalUrl: 'https://pmayg.nic.in',
    enrolledBeneficiaries: 246,
    pendingApplications: 38,
    sanctionedAmount: '₹2.95 Crore',
    isNew: false
  },
  {
    id: 'sch-002',
    code: 'PM-KISAN',
    name: 'PM Kisan Samman Nidhi Yojana',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    category: 'Agriculture',
    department: 'Ministry of Agriculture and Farmers Welfare',
    benefits: 'Direct income support of ₹6,000 per year in 3 equal installments of ₹2,000 each every 4 months directly into bank accounts.',
    eligibilityCriteria: [
      'Small and marginal farmer families with cultivable landholding in revenue records',
      'Completed e-KYC on PM-Kisan portal',
      'Bank account seeded with Aadhaar and NPCI DBT enabled',
      'Excludes institutional landholders and professional tax payers'
    ],
    requiredDocuments: [
      'Land Ownership Document (Khasra / Khatauni / B-1)',
      'Aadhaar Card',
      'Bank Account Passbook (IFSC & Account number)',
      'Active Mobile number linked with Aadhaar OTP'
    ],
    applicationProcess: 'Self-registration on PM-Kisan portal or through Panchayat CSC Operator → Patwari verification of land records → State nodal officer approval → Direct transfer via DBT.',
    officialPortalUrl: 'https://pmkisan.gov.in',
    enrolledBeneficiaries: 685,
    pendingApplications: 19,
    sanctionedAmount: '₹41.10 Lakh / yr',
    isNew: false
  },
  {
    id: 'sch-003',
    code: 'LADLI-BEHNA',
    name: 'Mukhyamantri Ladli Behna Yojana (MP)',
    nameHindi: 'मुख्यमंत्री लाड़ली बहना योजना',
    category: 'Women & Child',
    department: 'Department of Women & Child Development, Govt. of MP',
    benefits: 'Monthly financial assistance of ₹1,250 deposited directly into the bank accounts of eligible women on the 10th of every month.',
    eligibilityCriteria: [
      'Resident woman of Madhya Pradesh aged 21 to 60 years',
      'Married, widowed, divorced, or abandoned woman',
      'Combined annual family income less than ₹2.5 Lakh',
      'Family must own less than 5 acres of agricultural land'
    ],
    requiredDocuments: [
      'Samagra Family ID and Individual Member ID',
      'Aadhaar Card with biometric e-KYC',
      'Personal Bank Account linked with DBT (joint accounts not accepted)',
      'Active Mobile number for OTP verification'
    ],
    applicationProcess: 'Camp organized at Panchayat Bhawan → Operator enters Samagra and Aadhaar details → Live photo capture → e-KYC verification → Final acknowledgement issued.',
    officialPortalUrl: 'https://cmladlibahna.mp.gov.in',
    enrolledBeneficiaries: 890,
    pendingApplications: 24,
    sanctionedAmount: '₹1.33 Crore / yr',
    isNew: true
  },
  {
    id: 'sch-004',
    code: 'MGNREGA',
    name: 'Mahatma Gandhi NREGA (Rural Employment Guarantee)',
    nameHindi: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना',
    category: 'Employment',
    department: 'Department of Panchayat and Rural Development',
    benefits: 'Guaranteed 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work at ₹243/day wage rate.',
    eligibilityCriteria: [
      'Adult members of any rural household residing in Rampur GP',
      'Willing to do manual unskilled work',
      'Possessing an active MGNREGA Job Card issued by Rampur Panchayat'
    ],
    requiredDocuments: [
      'Passport size photograph of adult applicants',
      'Aadhaar Card',
      'Bank / Post Office account details',
      'Ration Card / Voter ID for address verification'
    ],
    applicationProcess: 'Submit written or verbal demand for work to Gram Rojgar Sahayak (GRS) → Muster roll entry generated on NregaSoft → SMS notification to worker → Weekly bank payment directly to Aadhaar account.',
    officialPortalUrl: 'https://nrega.nic.in',
    enrolledBeneficiaries: 1140,
    pendingApplications: 12,
    sanctionedAmount: '₹84.60 Lakh',
    isNew: false
  },
  {
    id: 'sch-005',
    code: 'AB-PMJAY',
    name: 'Ayushman Bharat PM Jan Arogya Yojana (AB-PMJAY)',
    nameHindi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना',
    category: 'Health',
    department: 'National Health Authority & MP State Health Agency',
    benefits: 'Cashless secondary and tertiary hospitalization cover of up to ₹5,00,000 per family per year in empanelled public and private hospitals across India.',
    eligibilityCriteria: [
      'Families identified in SECC rural deprivation criteria (D1 to D7)',
      'All senior citizens aged 70 years and above (Ayushman Vay Vandana Card with ₹5 Lakh separate cover)',
      'Holders of NFSA Priority Household ration cards'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Ration Card (Samagra BPL / Priority card)',
      'Active mobile number'
    ],
    applicationProcess: 'Visit Panchayat CSC or Sub-Health Center Rampur → Biometric or Iris e-KYC verification → Instant Golden Card PVC generation → Present at any empanelled hospital for cashless treatment.',
    officialPortalUrl: 'https://beneficiary.nha.gov.in',
    enrolledBeneficiaries: 2450,
    pendingApplications: 45,
    sanctionedAmount: '₹5 Lakh coverage/family',
    isNew: false
  },
  {
    id: 'sch-006',
    code: 'JAL-JEEVAN',
    name: 'Jal Jeevan Mission (Har Ghar Jal)',
    nameHindi: 'जल जीवन मिशन - हर घर जल',
    category: 'Rural Development',
    department: 'Public Health Engineering Department (PHED)',
    benefits: 'Functional Household Tap Connection (FHTC) providing 55 litres per capita per day (lpcd) of potable drinking water on a regular and long-term basis.',
    eligibilityCriteria: [
      'All permanent residential households situated in all 12 Wards of Gram Panchayat Rampur',
      'Schools, Anganwadi centres and Community buildings'
    ],
    requiredDocuments: [
      'Property / House tax assessment number',
      'Aadhaar Card of household head',
      'Consent declaration for water metering / maintenance user fee'
    ],
    applicationProcess: 'Village Water & Sanitation Committee (VWSC) survey → Pipeline extension to lane → Free meter and tap installation → Water quality testing by village Jal Sakhi kit.',
    officialPortalUrl: 'https://jaljeevanmission.gov.in',
    enrolledBeneficiaries: 1240,
    pendingApplications: 85,
    sanctionedAmount: '₹1.15 Crore',
    isNew: false
  },
  {
    id: 'sch-007',
    code: 'PM-UJJWALA',
    name: 'Pradhan Mantri Ujjwala Yojana 2.0 (Free LPG)',
    nameHindi: 'प्रधानमंत्री उज्ज्वला योजना २.०',
    category: 'Social Security',
    department: 'Ministry of Petroleum and Natural Gas',
    benefits: 'Deposit-free LPG cylinder connection + first refill free + free gas stove (chulha) to adult women of poor households.',
    eligibilityCriteria: [
      'Adult woman from BPL/SC/ST household without existing LPG connection',
      'Not possessing any domestic LPG connection in the same household'
    ],
    requiredDocuments: [
      'Aadhaar Card of applicant and adult family members',
      'Ration Card / BPL certificate',
      'Bank Passbook with DBT active',
      'Declaration of 14-point exclusion criteria'
    ],
    applicationProcess: 'Submit application through Panchayat Operator to Waraseoni Indane Gas Agency → Physical address verification → Delivery of gas cylinder kit at Panchayat Bhawan.',
    officialPortalUrl: 'https://www.pmuy.gov.in',
    enrolledBeneficiaries: 410,
    pendingApplications: 14,
    sanctionedAmount: '₹1,600 / connection subsidy',
    isNew: false
  },
  {
    id: 'sch-008',
    code: 'SAMAGRA-SHIKSHA',
    name: 'Free Uniform, Bicycle & Textbook Scheme for Rural Students',
    nameHindi: 'निःशुल्क पाठ्यपुस्तक, गणवेश एवं साइकिल योजना',
    category: 'Education',
    department: 'School Education Department, Govt. of MP',
    benefits: 'Free textbooks, 2 sets of uniform annually, and free bicycles to Class 6 & Class 9 rural students residing more than 2km from school.',
    eligibilityCriteria: [
      'Enrolled students in Govt. Primary, Middle and High School Rampur',
      'Bicycle eligibility for students travelling from hamlets like Talab Para & Purani Basti'
    ],
    requiredDocuments: [
      'Student Samagra ID',
      'School Admission Number / Scholar No.',
      'Bank account of student / parent'
    ],
    applicationProcess: 'Automated through Shiksha Portal verified by Headmaster and Panchayat Education Committee.',
    officialPortalUrl: 'https://shikshaportal.mp.gov.in',
    enrolledBeneficiaries: 380,
    pendingApplications: 8,
    sanctionedAmount: '₹12.40 Lakh',
    isNew: false
  }
];

