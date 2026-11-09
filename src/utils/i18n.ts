export type Language = 'en' | 'hi';

export const translations = {
  en: {
    appName: 'GRAMSETU',
    appTagline: 'Panchayat ka har kaam, ek digital platform par.',
    demoData: 'DEMO DATA',
    namaste: 'Namaste',
    dashboardOverview: "Here's your Panchayat overview for today.",
    totalPopulation: 'Total Population',
    totalHouseholds: 'Total Households',
    activeProjects: 'Active Projects',
    completedProjects: 'Completed Projects',
    pendingWorks: 'Pending Works',
    openComplaints: 'Open Complaints',
    upcomingMeetings: 'Upcoming Meetings',
    schemeApplications: 'Scheme Applications',
    projectProgress: 'Project Progress',
    budgetVsExpenditure: 'Budget vs Expenditure',
    wardWiseComplaints: 'Ward-wise Complaints',
    complaintResolution: 'Complaint Resolution',
    workerAttendance: 'Worker Attendance',
    recentActivity: 'Recent Activity',
    upcomingEvents: 'Upcoming Events',
    aiInsightsTitle: 'AI Panchayat Insights',
    viewDetailedAiReport: 'View Detailed AI Report',
    generateMonthlyAiReport: 'Generate Monthly AI Report',
    // Navigation
    navDashboard: 'Dashboard',
    navAdministration: 'Administration & Members',
    navCommunication: 'Notices & Circulars',
    navProjects: 'Development Projects',
    navGramSabha: 'Gram Sabha & Meetings',
    navComplaints: 'Citizen Complaints',
    navSchemes: 'Government Schemes',
    navWorkers: 'Workers & Attendance',
    navVillageInfo: 'Village Information',
    navDocuments: 'Documents Repository',
    navReports: 'Reports & Analytics',
    navAiIntelligence: 'AI Intelligence',
    navNotifications: 'Notifications',
    navSettings: 'Settings',
    // Common actions
    searchPlaceholder: 'Search projects, complaints, members, schemes...',
    filter: 'Filter',
    exportPdf: 'Export PDF',
    exportExcel: 'Export Excel',
    addNew: 'Add New',
    save: 'Save Changes',
    cancel: 'Cancel',
    status: 'Status',
    actions: 'Actions',
    logout: 'Logout',
    switchRole: 'Switch Role',
    presentationMode: 'Sarpanch Presentation Mode'
  },
  hi: {
    appName: 'ग्रामसेतु',
    appTagline: 'पंचायत का हर काम, एक डिजिटल प्लेटफ़ॉर्म पर।',
    demoData: 'डेमो डेटा',
    namaste: 'नमस्ते',
    dashboardOverview: 'आज का ग्राम पंचायत अवलोकन एवं स्थिति।',
    totalPopulation: 'कुल जनसंख्या',
    totalHouseholds: 'कुल परिवार (घर)',
    activeProjects: 'प्रगतिरत विकास कार्य',
    completedProjects: 'पूर्ण विकास कार्य',
    pendingWorks: 'लंबित कार्य',
    openComplaints: 'सक्रिय शिकायतें',
    upcomingMeetings: 'आगामी ग्राम सभा/बैठक',
    schemeApplications: 'योजना आवेदन',
    projectProgress: 'विकास कार्य प्रगति',
    budgetVsExpenditure: 'बजट बनाम वास्तविक व्यय',
    wardWiseComplaints: 'वार्ड अनुसार शिकायतें',
    complaintResolution: 'शिकायत निवारण दर',
    workerAttendance: 'श्रमिक उपस्थिति',
    recentActivity: 'हालिया गतिविधियां',
    upcomingEvents: 'आगामी कार्यक्रम',
    aiInsightsTitle: 'एआई पंचायत अंतर्दृष्टि (AI Insights)',
    viewDetailedAiReport: 'विस्तृत एआई रिपोर्ट देखें',
    generateMonthlyAiReport: 'मासिक एआई रिपोर्ट बनाएं',
    // Navigation
    navDashboard: 'डैशबोर्ड',
    navAdministration: 'पंचायत सदस्य एवं स्टाफ',
    navCommunication: 'सूचना एवं परिपत्र',
    navProjects: 'विकास कार्य निगरानी',
    navGramSabha: 'ग्राम सभा एवं बैठकें',
    navComplaints: 'नागरिक शिकायत निवारण',
    navSchemes: 'शासकीय योजनाएं',
    navWorkers: 'श्रमिक एवं दैनिक उपस्थिति',
    navVillageInfo: 'ग्राम प्रोफाइल व जानकारी',
    navDocuments: 'दस्तावेज़ एवं आदेश',
    navReports: 'रिपोर्ट्स एवं विश्लेषण',
    navAiIntelligence: 'एआई पंचायत इंटेलिजेंस',
    navNotifications: 'सूचनाएं',
    navSettings: 'सेटिंग्स',
    // Common actions
    searchPlaceholder: 'परियोजना, शिकायत, सदस्य, योजना खोजें...',
    filter: 'फ़िल्टर',
    exportPdf: 'पीडीएफ डाउनलोड',
    exportExcel: 'एक्सेल डाउनलोड',
    addNew: 'नया जोड़ें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    status: 'स्थिति',
    actions: 'कार्यवाही',
    logout: 'लॉगआउट',
    switchRole: 'रोल बदलें',
    presentationMode: 'सरपंच प्रेजेंटेशन मोड'
  }
};

let currentLang: Language = (localStorage.getItem('gramsetu_lang') as Language) || 'en';

export function getLanguage(): Language {
  return currentLang;
}

export function setLanguage(lang: Language): void {
  currentLang = lang;
  localStorage.setItem('gramsetu_lang', lang);
  window.dispatchEvent(new Event('gramsetu_lang_change'));
}

export function t(key: keyof typeof translations['en']): string {
  return translations[currentLang]?.[key] || translations['en'][key] || key;
}

