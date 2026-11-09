import { GramSabhaMeeting } from '../types';

export const mockMeetings: GramSabhaMeeting[] = [
  {
    id: 'mtg-001',
    title: 'Special Gram Sabha on Winter Development Works & Social Audit',
    titleHindi: 'शीतकालीन विकास कार्य एवं सामाजिक अंकेक्षण विशेष ग्राम सभा',
    meetingType: 'Regular Gram Sabha',
    date: '2026-11-15',
    time: '10:30 AM',
    venue: 'Panchayat Bhawan Main Hall, Rampur',
    status: 'upcoming',
    chairperson: 'Smt. Sunita Bai Maravi (Sarpanch)',
    secretary: 'Shri Mahendra Singh Patle (Secretary)',
    quorumRequired: 250,
    agenda: [
      {
        id: 'ag-1',
        order: 1,
        title: 'Review of ongoing CC Road and Drainage construction progress in Ward 04 & 02',
        description: 'Physical and financial verification of expenditure incurred under 15th Finance Commission grant.',
        proposedBy: 'Sarpanch Smt. Sunita Bai Maravi'
      },
      {
        id: 'ag-2',
        order: 2,
        title: 'Selection of remaining eligible beneficiaries for PM Awas Yojana Gramin (PMAY-G Phase 3)',
        description: 'Verification of priority list as per SECC survey data and Gram Sabha public reading.',
        proposedBy: 'Shri Santosh Dhurve (GRS)'
      },
      {
        id: 'ag-3',
        order: 3,
        title: 'Drinking water distribution management under Jal Jeevan Mission Har Ghar Jal',
        description: 'Discussion on user committee formation for operation and maintenance of solar overhead tank Ward 05.',
        proposedBy: 'Shri Rajesh Kumar Verma (Up-Sarpanch)'
      },
      {
        id: 'ag-4',
        order: 4,
        title: 'Annual Action Plan (GPDP 2027-28) prioritization and proposals from all 12 Wards',
        description: 'Receipt of new community demand proposals from respective Ward Panches.',
        proposedBy: 'Shri Mahendra Singh Patle (Secretary)'
      }
    ],
    resolutions: [
      {
        id: 'res-draft-1',
        resolutionNumber: 'RES-DRAFT-2026-08',
        title: 'Approval of supplementary estimate for CC Road berm metalling',
        decision: 'Passed Unanimously',
        responsiblePerson: 'Er. Amit Kumar Bisen',
        deadline: '2026-11-25',
        status: 'Pending'
      }
    ],
    actionItems: [
      {
        id: 'act-1',
        task: 'Publish printed notice across all 12 Wards and announce via loudspeaker',
        assignedTo: 'Panchayat Operator & Peon',
        deadline: '2026-11-11',
        priority: 'High',
        status: 'In Progress'
      },
      {
        id: 'act-2',
        task: 'Prepare verified beneficiary list of PMAY-G and MGNREGA muster roll abstract',
        assignedTo: 'Shri Santosh Dhurve (GRS)',
        deadline: '2026-11-13',
        priority: 'High',
        status: 'Open'
      },
      {
        id: 'act-3',
        task: 'Arrange seating, drinking water, public address microphone system and CCTV recording',
        assignedTo: 'Shri Mahendra Singh Patle (Secretary)',
        deadline: '2026-11-14',
        priority: 'Medium',
        status: 'Open'
      }
    ],
    minutesSummary: 'Notice duly issued vide dispatch #GP/2026/GS-NOTICE/118 dated 05-Nov-2026. Quorum mobilization underway through Anganwadi workers and Self Help Groups (SHGs).'
  },
  {
    id: 'mtg-002',
    title: 'Quarterly Gram Sabha & Monsoon Preparedness Review',
    titleHindi: 'त्रैमासिक ग्राम सभा एवं वर्षाकाल पूर्व समीक्षा बैठक',
    meetingType: 'Regular Gram Sabha',
    date: '2026-08-15',
    time: '11:00 AM',
    venue: 'Govt. Higher Secondary School Ground, Rampur',
    status: 'completed',
    chairperson: 'Smt. Sunita Bai Maravi (Sarpanch)',
    secretary: 'Shri Mahendra Singh Patle (Secretary)',
    quorumRequired: 250,
    actualAttendance: 318,
    agenda: [
      {
        id: 'ag-201',
        order: 1,
        title: 'Independence Day Celebrations and National Flag hoisting ceremony',
        description: 'Tribute to freedom fighters and felicitation of meritorious village students.',
        proposedBy: 'Sarpanch Smt. Sunita Bai'
      },
      {
        id: 'ag-202',
        order: 2,
        title: 'Sanction of CC Road Ward 04 and Covered Drainage Ward 02 under 15th FC tied funds',
        description: 'Approval of administrative estimates amounting to Rs. 13,00,000/- total.',
        proposedBy: 'Er. Amit Kumar Bisen'
      },
      {
        id: 'ag-203',
        order: 3,
        title: 'Vector Borne Disease Prevention and Bleaching Powder spray in public water bodies',
        description: 'Deployment of 10 Swachhata workers for weekly drain cleaning during monsoon.',
        proposedBy: 'Shri Rajesh Kumar Verma'
      }
    ],
    resolutions: [
      {
        id: 'res-101',
        resolutionNumber: 'GS-2026-03',
        title: 'Unanimous sanction for 420m CC Road Ward 04 (Budget: ₹8,50,000)',
        decision: 'Passed Unanimously',
        responsiblePerson: 'Er. Amit Kumar Bisen',
        deadline: '2026-11-30',
        status: 'In Progress'
      },
      {
        id: 'res-102',
        resolutionNumber: 'GS-2026-04',
        title: 'Covered Drainage channel construction Ward 02 (Budget: ₹4,50,000)',
        decision: 'Passed Unanimously',
        responsiblePerson: 'Shri Rajesh Verma (Up-Sarpanch)',
        deadline: '2026-10-31',
        status: 'Implemented'
      },
      {
        id: 'res-103',
        resolutionNumber: 'GS-2026-05',
        title: 'Plastic ban in Rampur Haat Bazaar and spot fine of ₹100 on littering',
        decision: 'Passed by Majority',
        responsiblePerson: 'Shri Dinesh Gupta (Ward Panch)',
        deadline: '2026-09-01',
        status: 'Implemented'
      }
    ],
    actionItems: [
      {
        id: 'act-201',
        task: 'Issue work orders after technical sanction approval from Janpad Panchayat Waraseoni',
        assignedTo: 'Secretary Patle',
        deadline: '2026-08-25',
        priority: 'High',
        status: 'Completed'
      },
      {
        id: 'act-202',
        task: 'Procure 5 quintals of lime powder and 200kg bleaching powder for all 12 Wards',
        assignedTo: 'GRS Santosh Dhurve',
        deadline: '2026-08-20',
        priority: 'High',
        status: 'Completed'
      }
    ],
    minutesSummary: 'The meeting commenced at 11:00 AM with 318 citizens present including 142 women. All 3 resolutions were formally signed and documented in the official Gram Sabha Proceedings Register (Volume 14, Pages 42-49).'
  },
  {
    id: 'mtg-003',
    title: 'Panchayat Standing Committee on Health, Education & Women Welfare',
    titleHindi: 'स्वास्थ्य, शिक्षा एवं महिला कल्याण स्थायी समिति बैठक',
    meetingType: 'Panchayat Standing Committee',
    date: '2026-10-08',
    time: '02:30 PM',
    venue: 'Panchayat Bhawan Meeting Hall',
    status: 'completed',
    chairperson: 'Smt. Rekha Meshram (Committee Head)',
    secretary: 'Shri Mahendra Singh Patle',
    quorumRequired: 15,
    actualAttendance: 18,
    agenda: [
      {
        id: 'ag-301',
        order: 1,
        title: 'Immunization camp coordination with ASHA & ANM health workers',
        description: 'Review of Mission Indradhanush child vaccination records across 6 Anganwadi centres.',
        proposedBy: 'ANM Smt. Sunita Tiwari'
      },
      {
        id: 'ag-302',
        order: 2,
        title: 'Sanitary Napkin vending machine installation in Govt Girls High School',
        description: 'Fund allocation of Rs. 35,000 from untied basic grant.',
        proposedBy: 'Smt. Rekha Meshram'
      }
    ],
    resolutions: [
      {
        id: 'res-301',
        resolutionNumber: 'PSC-2026-09',
        title: 'Fund sanction of ₹35,000 for Girls School Health hygiene corner',
        decision: 'Passed Unanimously',
        responsiblePerson: 'Panchayat Secretary',
        deadline: '2026-10-25',
        status: 'Implemented'
      }
    ],
    actionItems: [
      {
        id: 'act-301',
        task: 'Purchase and install automatic sanitary vending unit at High School',
        assignedTo: 'Smt. Rekha Meshram',
        deadline: '2026-10-22',
        priority: 'Medium',
        status: 'Completed'
      }
    ],
    minutesSummary: 'Resolved to conduct bi-monthly adolescent health checkups. Principal praised Panchayat prompt assistance.'
  }
];

