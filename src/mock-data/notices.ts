import { Notice } from '../types';

export const mockNotices: Notice[] = [
  {
    id: 'not-001',
    title: 'Gram Sabha Meeting Scheduled for 15 November 2026 at Panchayat Bhawan',
    titleHindi: 'दिनांक १५ नवंबर २०२६ को ग्राम पंचायत भवन में विशेष ग्राम सभा बैठक की सूचना',
    category: 'Gram Sabha Notice',
    description: 'All citizens, ward panches and self-help group members of Gram Panchayat Rampur are hereby informed that a special Gram Sabha meeting is scheduled on Sunday, 15 November 2026 at 10:30 AM to discuss ongoing development projects, PM Awas beneficiary list and GPDP action plans.',
    publishDate: '2026-11-05',
    validUntil: '2026-11-15',
    priority: 'urgent',
    targetAudience: 'All',
    attachmentName: 'GramSabha_Agenda_Notice_15Nov2026.pdf',
    attachmentSize: '1.2 MB',
    isRead: false,
    author: 'Shri Mahendra Singh Patle',
    authorRole: 'Panchayat Secretary'
  },
  {
    id: 'not-002',
    title: 'Special Registration Camp for Ladli Behna Yojana e-KYC and Bank DBT Linking',
    titleHindi: 'लाड़ली बहना योजना ई-केवाईसी एवं बैंक डीबीटी लिंकेज हेतु विशेष शिविर',
    category: 'Announcements',
    description: 'A 2-day special camp will be organized at CSC Centre Rampur on 12-13 November from 10:00 AM to 5:00 PM for all eligible women whose Aadhaar bank seeding or Samagra e-KYC is pending.',
    publishDate: '2026-11-08',
    validUntil: '2026-11-13',
    priority: 'high',
    targetAudience: 'Citizens',
    attachmentName: 'LadliBehna_Camp_Guidelines.pdf',
    attachmentSize: '840 KB',
    isRead: false,
    author: 'Smt. Kavita Sharma',
    authorRole: 'Panchayat Operator'
  },
  {
    id: 'not-003',
    title: 'Mandatory Submission of MB Measurement Books and RA Bills for 15th FC Works',
    titleHindi: '१५वें वित्त आयोग कार्यों की माप पुस्तिका (एमबी) एवं आरए देयक प्रस्तुत करने बाबत',
    category: 'Official Circulars',
    description: 'Technical Assistants and Site Supervisors must submit physical measurement books and geo-tagged inspection photos for CC road and drainage works prior to the upcoming audit team visit on 20 November.',
    publishDate: '2026-11-04',
    validUntil: '2026-11-20',
    priority: 'medium',
    targetAudience: 'Staff',
    attachmentName: 'Circular_Audit_Directives_2026.pdf',
    attachmentSize: '650 KB',
    isRead: true,
    author: 'Smt. Sunita Bai Maravi',
    authorRole: 'Sarpanch'
  },
  {
    id: 'not-004',
    title: 'Ward Level Sanitation and Mosquito Larvicide Spray Schedule',
    titleHindi: 'वार्ड स्तरीय स्वच्छता एवं कीटनाशक छिड़काव समय सारणी',
    category: 'Notice Board',
    description: 'Weekly schedule for fogging and drain larvicide spraying across Ward 01 to Ward 12. Citizens are requested to keep water vessels covered and report any localized drainage stagnant pools.',
    publishDate: '2026-11-02',
    validUntil: '2026-11-30',
    priority: 'medium',
    targetAudience: 'All',
    attachmentName: 'Spray_Schedule_Nov2026.pdf',
    attachmentSize: '420 KB',
    isRead: true,
    author: 'Shri Rajesh Kumar Verma',
    authorRole: 'Up-Sarpanch'
  }
];

