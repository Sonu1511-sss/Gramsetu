import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    code: 'GP-DEV-2026-001',
    title: 'CC Road Construction & Paver Pavement – Ward 04',
    titleHindi: 'सीसी सड़क निर्माण एवं पेवर पेवमेंट - वार्ड ०४',
    category: 'Road Construction',
    ward: 4,
    location: 'From Ambedkar Chowk to Primary School Gate, Ward 04',
    budget: 850000,
    spent: 520000,
    progress: 68,
    startDate: '2026-08-10',
    expectedCompletion: '2026-11-25',
    status: 'in_progress',
    description: 'Construction of 420-meter cement concrete (CC) durable all-weather motorable road with 3-meter width and curb stones to prevent monsoon waterlogging.',
    contractor: 'M/s Balaghat Infra & Construction Corp',
    supervisor: 'Er. Amit Kumar Bisen (Technical Assistant)',
    workersEngaged: 18,
    beneficiariesCount: 810,
    beforePhoto: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1584463699039-38c231711200?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { id: 'tl-1', stage: 'Project Proposal & Gram Sabha Approval', date: '2026-06-15', completed: true, remarks: 'Passed in Resolution #GS-2026-03' },
      { id: 'tl-2', stage: 'Technical Sanction (TS) & Administrative Approval (AS)', date: '2026-07-02', completed: true, remarks: 'Approved by RES Waraseoni' },
      { id: 'tl-3', stage: 'Tender Allotment & Work Order Issued', date: '2026-07-28', completed: true, remarks: 'Work Order #WO-889' },
      { id: 'tl-4', stage: 'Excavation & Base Layer Laying', date: '2026-08-25', completed: true, remarks: 'Sub-base inspected by Er. Bisen' },
      { id: 'tl-5', stage: 'Concrete Pouring & Leveling (Phase 1)', date: '2026-09-30', completed: true, remarks: '260 meters completed' },
      { id: 'tl-6', stage: 'Curing & Curbstone Installation (Phase 2)', date: '2026-11-15', completed: false, remarks: 'Ongoing; currently 68% total milestone' },
      { id: 'tl-7', stage: 'Final Quality Audit & Handover', date: '2026-11-25', completed: false, remarks: 'Target completion' }
    ],
    inspections: [
      {
        id: 'insp-1',
        date: '2026-09-18',
        inspectorName: 'Er. Amit Kumar Bisen',
        designation: 'Sub-Engineer, RES',
        qualityRating: 4,
        notes: 'Concrete mix ratio (M20) maintained according to specification. Curing water supply verified satisfactory.',
        status: 'Passed'
      },
      {
        id: 'insp-2',
        date: '2026-10-24',
        inspectorName: 'Shri Mahendra Singh Patle',
        designation: 'Panchayat Secretary',
        qualityRating: 4,
        notes: 'Material stock verified at site. Shoulder filling work initiated on west side.',
        status: 'Passed'
      }
    ],
    workRemainingDescription: 'Final 160-meter top concrete slab laying, side berm filling with murrum, curing for 14 days, and installation of speed breakers near school gate.',
    approvalOrderNo: 'RES/WAR/2026/AS-4412'
  },
  {
    id: 'proj-002',
    code: 'GP-DEV-2026-002',
    title: 'Covered Drainage & Waste Water Channel – Ward 02',
    titleHindi: 'भूमिगत पक्की नाली निर्माण - वार्ड ०२',
    category: 'Drainage',
    ward: 2,
    location: 'Shanti Nagar Main Gali connecting to Outfall Drain',
    budget: 450000,
    spent: 420000,
    progress: 95,
    startDate: '2026-07-05',
    expectedCompletion: '2026-11-15',
    status: 'in_progress',
    description: 'RCC covered box drain of 350 meters to eliminate open wastewater stagnancy and vector-borne diseases in Shanti Nagar locality.',
    contractor: 'Gram Panchayat Self-Execution (VDC)',
    supervisor: 'Shri Rajesh Kumar Verma (Up-Sarpanch)',
    workersEngaged: 12,
    beneficiariesCount: 740,
    beforePhoto: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [
      'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { id: 'tl-201', stage: 'Gram Sabha Sanction', date: '2026-05-10', completed: true },
      { id: 'tl-202', stage: 'Trench Excavation', date: '2026-07-15', completed: true },
      { id: 'tl-203', stage: 'Base PCC & Wall Masonry', date: '2026-08-30', completed: true },
      { id: 'tl-204', stage: 'Precast Slab Cover Placement', date: '2026-10-20', completed: true },
      { id: 'tl-205', stage: 'Final Silt Trap Inspection', date: '2026-11-12', completed: false }
    ],
    inspections: [
      {
        id: 'insp-201',
        date: '2026-10-15',
        inspectorName: 'Er. Amit Kumar Bisen',
        designation: 'Technical Assistant',
        qualityRating: 5,
        notes: 'Precast covers tested with load tolerance. Proper slope maintained towards outfall.',
        status: 'Passed'
      }
    ],
    workRemainingDescription: 'Final connection of 15 household graywater pipelines and cleaning remaining debris.',
    approvalOrderNo: 'SBM-G/2026/DN-1029'
  },
  {
    id: 'proj-003',
    code: 'GP-DEV-2026-003',
    title: 'High-Efficiency LED Street Light Network – Ward 01 & 03',
    titleHindi: 'ऊर्जा दक्ष एलईडी स्ट्रीट लाइट परियोजना - वार्ड ०१ एवं ०३',
    category: 'Street Lights',
    ward: 1,
    location: 'Patel Mohalla Main Road & Kranti Chowk Market',
    budget: 320000,
    spent: 320000,
    progress: 100,
    startDate: '2026-06-01',
    expectedCompletion: '2026-08-15',
    actualCompletion: '2026-08-10',
    status: 'completed',
    description: 'Installation of 65 energy-saving 45W automatic timer-based LED street light fixtures on existing electric poles with surge protection.',
    contractor: 'Urja Vikas Nigam Authorized Agency',
    supervisor: 'Shri Mukesh Bisen (Ward Panch)',
    workersEngaged: 6,
    beneficiariesCount: 1390,
    beforePhoto: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { id: 'tl-301', stage: 'Material Delivery & Testing', date: '2026-06-10', completed: true },
      { id: 'tl-302', stage: 'Bracket Mounting & Cabling', date: '2026-07-05', completed: true },
      { id: 'tl-303', stage: 'Luminaire Installation & Earthing', date: '2026-07-25', completed: true },
      { id: 'tl-304', stage: 'Commissioning & Handover', date: '2026-08-10', completed: true }
    ],
    inspections: [
      {
        id: 'insp-301',
        date: '2026-08-12',
        inspectorName: 'Er. Amit Kumar Bisen',
        designation: 'Technical Assistant',
        qualityRating: 5,
        notes: 'All 65 street lights tested across both day and night automatic switching cycles. Excellent illumination.',
        status: 'Passed'
      }
    ],
    workRemainingDescription: 'None. Project completed and entered maintenance warranty phase.',
    approvalOrderNo: '15th-FC/2026/SL-338'
  },
  {
    id: 'proj-004',
    code: 'GP-DEV-2026-004',
    title: 'Community Over-Head Water Tank & Solar Pump – Ward 05',
    titleHindi: 'सामुदायिक ओवरहेड जल मीनार एवं सोलर पंप - वार्ड ०५',
    category: 'Water Supply',
    ward: 5,
    location: 'Jal Board Basti Hillock, Ward 05',
    budget: 1250000,
    spent: 890000,
    progress: 72,
    startDate: '2026-06-15',
    expectedCompletion: '2026-12-10',
    status: 'in_progress',
    description: 'Under Jal Jeevan Mission, construction of 50,000 Litre elevated storage reservoir (ESR) with 5HP solar submersible pump and 1,800m piped distribution pipeline.',
    contractor: 'PHE Sub-Division Waraseoni Joint Venture',
    supervisor: 'Er. Amit Kumar Bisen',
    workersEngaged: 14,
    beneficiariesCount: 690,
    beforePhoto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { id: 'tl-401', stage: 'Deep Borewell Drilling (320 ft)', date: '2026-07-01', completed: true },
      { id: 'tl-402', stage: 'Staging Foundation & RCC Columns', date: '2026-08-20', completed: true },
      { id: 'tl-403', stage: 'Tank Bottom Dome & Cylindrical Wall', date: '2026-10-15', completed: true },
      { id: 'tl-404', stage: 'Top Dome Slab & Solar Panel Grid', date: '2026-11-20', completed: false },
      { id: 'tl-405', stage: 'Household Tap Connection Fitting', date: '2026-12-05', completed: false }
    ],
    inspections: [
      {
        id: 'insp-401',
        date: '2026-10-22',
        inspectorName: 'Er. R. S. Meshram, EE PHED',
        designation: 'Executive Engineer, PHE',
        qualityRating: 4,
        notes: 'Water yield tested at 7,200 LPH. Concrete strength test cube passed.',
        status: 'Passed'
      }
    ],
    workRemainingDescription: 'Solar panel roof mounting, chlorination feeder equipment, and connecting 85 remaining functional household tap connections (FHTC).',
    approvalOrderNo: 'JJM/BGT/2026/WTR-918'
  },
  {
    id: 'proj-005',
    code: 'GP-DEV-2026-005',
    title: 'Model Anganwadi Kendra Renovation & Smart Toys – Ward 03',
    titleHindi: 'मॉडल आंगनवाड़ी केंद्र का जीर्णोद्धार एवं सुदृढ़ीकरण - वार्ड ०३',
    category: 'School Development',
    ward: 3,
    location: 'Near Primary Health Center, Ward 03',
    budget: 350000,
    spent: 345000,
    progress: 100,
    startDate: '2026-05-15',
    expectedCompletion: '2026-08-30',
    actualCompletion: '2026-08-25',
    status: 'completed',
    description: 'Bala (Building as Learning Aid) wall paintings, child-friendly sanitary toilets, purified RO drinking water unit, and smart educational play kits.',
    contractor: 'Panchayat Nidhi Special Project',
    supervisor: 'Smt. Rekha Meshram',
    workersEngaged: 8,
    beneficiariesCount: 85,
    beforePhoto: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { id: 'tl-501', stage: 'Structural Repair & Waterproofing', date: '2026-06-05', completed: true },
      { id: 'tl-502', stage: 'Child Toilet Construction', date: '2026-07-02', completed: true },
      { id: 'tl-503', stage: 'BaLA Concept Educational Painting', date: '2026-08-10', completed: true },
      { id: 'tl-504', stage: 'Dedication to Children by Sarpanch', date: '2026-08-25', completed: true }
    ],
    inspections: [
      {
        id: 'insp-501',
        date: '2026-08-28',
        inspectorName: 'Smt. Anuradha Tiwari, CDPO',
        designation: 'Child Development Project Officer',
        qualityRating: 5,
        notes: 'Exemplary child-friendly learning environment created. All nutrition facilities functional.',
        status: 'Passed'
      }
    ],
    workRemainingDescription: 'Nil. Operational and serving 42 children and 18 lactating mothers daily.',
    approvalOrderNo: 'WCD/2026/BALA-772'
  },
  {
    id: 'proj-006',
    code: 'GP-DEV-2026-006',
    title: 'Solid Waste Segregation Shed & Compost Pits – Ward 08',
    titleHindi: 'ठोस अपशिष्ट पृथक्करण शेड एवं खाद गड्ढे - वार्ड ०८',
    category: 'Sanitation',
    ward: 8,
    location: 'Gram Panchayat Boundary land, Ward 08',
    budget: 680000,
    spent: 410000,
    progress: 55,
    startDate: '2026-07-20',
    expectedCompletion: '2026-11-30',
    status: 'delayed',
    description: 'Segregation shed for dry & wet garbage collection, vermi-composting unit, and e-rickshaw charging bay for Swachhata workers under SBM-Gramin Phase II.',
    contractor: 'Shri Krishna Builders',
    supervisor: 'Shri Dinesh Gupta (Ward Panch)',
    workersEngaged: 10,
    beneficiariesCount: 1735,
    beforePhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1611288870280-4a8069502b48?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { id: 'tl-601', stage: 'Boundary Wall & Site Clearing', date: '2026-08-10', completed: true },
      { id: 'tl-602', stage: 'Fabrication of Tubular Steel Roof Shed', date: '2026-09-15', completed: true },
      { id: 'tl-603', stage: 'Vermi-compost brick chambers', date: '2026-10-10', completed: false, remarks: 'Delayed due to material transport strike' },
      { id: 'tl-604', stage: 'Electrical fitting & machinery setup', date: '2026-11-20', completed: false }
    ],
    inspections: [
      {
        id: 'insp-601',
        date: '2026-10-25',
        inspectorName: 'Er. Amit Kumar Bisen',
        designation: 'Technical Assistant',
        qualityRating: 3,
        notes: 'Contractor warned for slow progress on brick masonry of composting bins. Speed up needed.',
        actionRequired: 'Deploy 5 additional skilled masons immediately.',
        status: 'Action Needed'
      }
    ],
    workRemainingDescription: 'Completion of 6 vermi-compost pits, roofing sheet laying, concrete flooring of sorting platform.',
    approvalOrderNo: 'SBM-G/MP/2026/SWM-554'
  },
  {
    id: 'proj-007',
    code: 'GP-DEV-2026-007',
    title: 'Panchayat Bhawan Digital Citizen Service Extension – Ward 06',
    titleHindi: 'पंचायत भवन डिजिटल नागरिक सेवा विस्तार - वार्ड ०६',
    category: 'Public Buildings',
    ward: 6,
    location: 'Main Panchayat Bhawan premises, Ward 06',
    budget: 520000,
    spent: 120000,
    progress: 25,
    startDate: '2026-09-15',
    expectedCompletion: '2026-12-30',
    status: 'in_progress',
    description: 'Construction of dedicated citizen waiting hall, computerized token system, CSC counter, and solar inverter backup room.',
    contractor: 'Panchayat Nidhi & 15th FC tied grant',
    supervisor: 'Shri Mahendra Singh Patle (Secretary)',
    workersEngaged: 8,
    beneficiariesCount: 8420,
    beforePhoto: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { id: 'tl-701', stage: 'Plinth level construction', date: '2026-10-05', completed: true },
      { id: 'tl-702', stage: 'Lintel level brickwork', date: '2026-11-05', completed: true },
      { id: 'tl-703', stage: 'Roof slab casting', date: '2026-11-28', completed: false },
      { id: 'tl-704', stage: 'Interior wiring & computer desks', date: '2026-12-20', completed: false }
    ],
    inspections: [
      {
        id: 'insp-701',
        date: '2026-11-02',
        inspectorName: 'Er. Amit Kumar Bisen',
        designation: 'Technical Assistant',
        qualityRating: 4,
        notes: 'Brick masonry checked. Curing being done twice daily.',
        status: 'Passed'
      }
    ],
    workRemainingDescription: 'Shuttering for roof RCC casting, plastering inside and outside, tile flooring.',
    approvalOrderNo: 'MP-PRD/2026/PB-219'
  },
  {
    id: 'proj-008',
    code: 'GP-DEV-2026-008',
    title: 'Upgradation of Ayushman Arogya Mandir (Sub-Health Center)',
    titleHindi: 'आयुष्मान आरोग्य मंदिर (उप-स्वास्थ्य केंद्र) उन्नयन',
    category: 'Health Infrastructure',
    ward: 3,
    location: 'Rampur Sub Health Centre, Ward 03',
    budget: 600000,
    spent: 0,
    progress: 0,
    startDate: '2026-11-20',
    expectedCompletion: '2027-02-28',
    status: 'pending_approval',
    description: 'Addition of maternal checkup room, telemedicine terminal, medicine dispensary store and solar water heater for 24x7 institutional emergency care.',
    contractor: 'Pending e-Tender',
    supervisor: 'Er. Amit Kumar Bisen',
    workersEngaged: 0,
    beneficiariesCount: 8420,
    beforePhoto: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    recentPhotos: [],
    timeline: [
      { id: 'tl-801', stage: 'Gram Sabha Resolution', date: '2026-09-20', completed: true },
      { id: 'tl-802', stage: 'DPR Submission to CMHO Balaghat', date: '2026-10-15', completed: true },
      { id: 'tl-803', stage: 'Administrative Approval Expected', date: '2026-11-18', completed: false }
    ],
    inspections: [],
    workRemainingDescription: 'Awaiting formal financial allocation transfer from National Health Mission.',
    approvalOrderNo: 'NHM/BGT/2026/SHC-PROPOSED'
  }
];

