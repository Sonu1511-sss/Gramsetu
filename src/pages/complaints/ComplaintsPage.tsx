import { useState, useEffect } from 'react';
import {
  AlertCircle,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  ArrowRight,
  Camera,
  Star,
  X,
  Send,
  ShieldAlert,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { EmptyState } from '../../components/common/EmptyState';
import { complaintService } from '../../services/complaintService';
import { Complaint, ComplaintCategory, ComplaintPriority, ComplaintStatus } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [wardFilter, setWardFilter] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Selected complaint for detailed inspector
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Quick Tracking Search by ID
  const [trackIdInput, setTrackIdInput] = useState('');

  // Register New Complaint Modal
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newWard, setNewWard] = useState<number>(3);
  const [newCategory, setNewCategory] = useState<ComplaintCategory>('Street Light');
  const [newPriority, setNewPriority] = useState<ComplaintPriority>('High');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');

  // Status Update Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<ComplaintStatus>('Resolved');
  const [updateNote, setUpdateNote] = useState('');
  const [updateOfficer, setUpdateOfficer] = useState('');

  // Citizen Feedback Rating Modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState('');

  const { lang } = useLanguage();
  const { success, error } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadComplaints();
  }, []);

  async function loadComplaints() {
    try {
      const data = await complaintService.getComplaints();
      setComplaints(data);
      if (data.length > 0 && !selectedComplaint) {
        setSelectedComplaint(data[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleRegisterComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await complaintService.createComplaint({
      citizenName: newName,
      citizenMobile: newMobile,
      ward: newWard,
      category: newCategory,
      priority: newPriority,
      title: newTitle,
      description: newDescription,
      location: newLocation
    });

    setComplaints((prev) => [created, ...prev]);
    setSelectedComplaint(created);
    setShowRegisterModal(false);
    setNewName('');
    setNewMobile('');
    setNewTitle('');
    setNewDescription('');
    setNewLocation('');
    success('Grievance Registered', `Ticket #${created.id} generated.`);
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    const updated = await complaintService.updateComplaintStatus(
      selectedComplaint.id,
      updateStatus,
      updateNote || `Status updated to ${updateStatus} by ${currentUser.name}`,
      updateOfficer || currentUser.name
    );

    setComplaints((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setSelectedComplaint(updated);
    setShowStatusModal(false);
    setUpdateNote('');
    success('Status Updated', `Grievance #${updated.id} marked as ${updateStatus}`);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    const updated = await complaintService.addCitizenFeedback(
      selectedComplaint.id,
      feedbackRating,
      feedbackComment || 'Citizen confirmed problem resolved.'
    );

    setComplaints((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setSelectedComplaint(updated);
    setShowFeedbackModal(false);
    setFeedbackComment('');
    success('Feedback Logged', 'Thank you for rating resolution quality.');
  };

  const handleTrackById = async () => {
    if (!trackIdInput.trim()) return;
    const found = await complaintService.getComplaintById(trackIdInput);
    if (found) {
      setSelectedComplaint(found);
      success('Ticket Found', `Loaded record for ${found.id}`);
    } else {
      error('Not Found', `No complaint record found matching "${trackIdInput}".`);
    }
  };

  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesWard = wardFilter === 0 || c.ward === wardFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesWard;
  });

  const paginatedComplaints = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Compact 5 KPI Cards: Total, New, In Progress, Resolved, Escalated
  const totalCount = complaints.length;
  const countNew = complaints.filter((c) => c.status === 'New').length;
  const countInProgress = complaints.filter((c) => c.status === 'In Progress' || c.status === 'Assigned').length;
  const countResolved = complaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length;
  const countEscalated = complaints.filter((c) => c.status === 'Escalated').length;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'नागरिक शिकायत निवारण प्रणाली' : 'Citizen Grievance Redressal'}
        description={
          lang === 'hi'
            ? 'पेयजल, स्ट्रीट लाइट, पक्की नाली एवं स्वच्छता संबंधी शिकायतों का पारदर्शी समयबद्ध निवारण।'
            : 'Track, assign, and resolve village grievances with time-bound SLA monitoring and citizen feedback.'
        }
        badge={<StatusBadge status={`${countNew} New Tickets`} variant="danger" dot={false} />}
        actions={
          <button
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register Complaint</span>
          </button>
        }
      />

      {/* 5 Compact KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('all');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer ${
            statusFilter === 'all' ? 'border-[#1769AA] ring-2 ring-blue-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#667085]">Total Complaints</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#17212B] mt-0.5">{totalCount}</div>
          <div className="text-[10px] text-gray-400 mt-1">Logged on portal</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('New');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'New' ? 'border-[#1769AA] ring-2 ring-blue-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#1769AA]">New Unassigned</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#1769AA] mt-0.5">{countNew}</div>
          <div className="text-[10px] text-blue-600 mt-1">Awaiting review</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('In Progress');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'In Progress' ? 'border-[#F59E0B] ring-2 ring-amber-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#B54708]">In Progress</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#B54708] mt-0.5">{countInProgress}</div>
          <div className="text-[10px] text-amber-600 mt-1">Field team deployed</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('Resolved');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'Resolved' ? 'border-[#16865B] ring-2 ring-emerald-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#16865B]">Resolved & Closed</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#16865B] mt-0.5">{countResolved}</div>
          <div className="text-[10px] text-emerald-600 mt-1">Citizen verified</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('Escalated');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'Escalated' ? 'border-[#DC3545] ring-2 ring-red-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#DC3545]">Escalated</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#DC3545] mt-0.5">{countEscalated}</div>
          <div className="text-[10px] text-red-600 mt-1">Block level notice</div>
        </Card>
      </div>

      {/* Citizen Live Tracking Bar & Filter Controls */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E4E7EC] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Track by Ticket ID */}
        <div className="flex items-center gap-2 w-full md:w-80">
          <input
            type="text"
            placeholder="Track Ticket ID (e.g. GP-2026-00124)"
            value={trackIdInput}
            onChange={(e) => setTrackIdInput(e.target.value)}
            className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#D0D5DD] rounded-lg text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA]"
          />
          <button
            onClick={handleTrackById}
            className="px-3.5 py-2 bg-[#1769AA] text-white rounded-lg text-xs font-semibold shrink-0 hover:bg-[#0F2747] transition-colors"
          >
            Track
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-2 bg-[#F5F7FA] border border-[#D0D5DD] rounded-lg text-xs font-medium text-gray-700 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Water">Water Supply</option>
            <option value="Road">Road Damage</option>
            <option value="Street Light">Street Light</option>
            <option value="Drainage">Drainage</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Electricity">Electricity</option>
          </select>

          <select
            value={wardFilter}
            onChange={(e) => {
              setWardFilter(parseInt(e.target.value) || 0);
              setCurrentPage(1);
            }}
            className="px-2.5 py-2 bg-[#F5F7FA] border border-[#D0D5DD] rounded-lg text-xs font-medium text-gray-700 focus:outline-none"
          >
            <option value={0}>All Wards (1-12)</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((w) => (
              <option key={w} value={w}>
                Ward {w.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Split Table & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table: 7 cols */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden">
            <CardHeader className="py-3 px-4 sm:px-5">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-sm sm:text-base font-bold">
                  Citizen Grievances Register
                </CardTitle>
                <span className="text-xs text-[#667085]">
                  Showing {paginatedComplaints.length} of {filtered.length}
                </span>
              </div>
            </CardHeader>

            {filtered.length === 0 ? (
              <EmptyState
                title="No grievances found"
                description="Try changing your search terms or filters."
                actionText="+ Register Grievance"
                onAction={() => setShowRegisterModal(true)}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[#667085] font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Ticket ID & Title</th>
                      <th className="py-3.5 px-3">Citizen & Ward</th>
                      <th className="py-3.5 px-3">Priority</th>
                      <th className="py-3.5 px-3">Date</th>
                      <th className="py-3.5 px-3">Status</th>
                      <th className="py-3.5 px-4 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7EC]">
                    {paginatedComplaints.map((c) => {
                      const isSelected = selectedComplaint?.id === c.id;
                      return (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedComplaint(c)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#EBF3FA]/70 font-medium'
                              : 'hover:bg-gray-50/70'
                          }`}
                        >
                          <td className="py-3.5 px-4 max-w-[200px]">
                            <div className="font-mono font-bold text-[#17212B]">{c.id}</div>
                            <div className="text-[11px] text-[#667085] line-clamp-1 mt-0.5">
                              {c.title}
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="font-semibold text-[#17212B] line-clamp-1">{c.citizenName}</div>
                            <div className="text-[10px] text-[#667085]">Ward 0{c.ward}</div>
                          </td>
                          <td className="py-3.5 px-3">
                            <StatusBadge status={c.priority} />
                          </td>
                          <td className="py-3.5 px-3 text-gray-500 font-mono text-[11px]">
                            {c.submittedDate.split(' ')[0]}
                          </td>
                          <td className="py-3.5 px-3">
                            <StatusBadge status={c.status} />
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedComplaint(c);
                              }}
                              className="text-xs font-semibold text-[#1769AA] hover:underline"
                            >
                              Details →
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalItems={filtered.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
              itemLabel="complaints"
            />
          </Card>
        </div>

        {/* Selected Complaint Detailed Inspector: 5 cols */}
        {selectedComplaint ? (
          <div className="lg:col-span-5 space-y-5">
            <Card className="p-5 sm:p-6 space-y-5">
              {/* Header with Title and Action to update */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-[#1769AA]">
                      {selectedComplaint.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                      Ward 0{selectedComplaint.ward}
                    </span>
                    <StatusBadge status={selectedComplaint.status} />
                  </div>
                  <h3 className="text-base font-bold text-[#17212B] mt-1.5 leading-snug">
                    {selectedComplaint.title}
                  </h3>
                </div>

                {currentUser.role !== 'citizen' && (
                  <button
                    onClick={() => setShowStatusModal(true)}
                    className="px-3.5 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors shrink-0"
                  >
                    Update Status
                  </button>
                )}
              </div>

              {/* Citizen Information Card */}
              <div className="p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E4E7EC] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Complainant:</span>
                  <span className="font-bold text-[#17212B]">{selectedComplaint.citizenName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Mobile Phone:</span>
                  <span className="font-mono font-bold text-[#17212B]">{selectedComplaint.citizenMobile}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Specific Location:</span>
                  <span className="font-medium text-gray-800">{selectedComplaint.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Assigned Team:</span>
                  <span className="font-semibold text-[#1769AA]">{selectedComplaint.assignedOfficerName}</span>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs">
                <div className="font-bold text-gray-700 mb-1">Problem Description:</div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 leading-relaxed text-[11px]">
                  {selectedComplaint.description}
                </p>
              </div>

              {/* Site Evidence Photos */}
              {selectedComplaint.photoUrl && (
                <div>
                  <div className="text-xs font-bold text-[#17212B] mb-2 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#1769AA]" />
                    <span>Photographic Site Evidence</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={selectedComplaint.photoUrl}
                        alt="Issue Reported"
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5">
                        Issue Reported
                      </div>
                    </div>
                    {selectedComplaint.resolvedPhotoUrl && (
                      <div className="relative rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={selectedComplaint.resolvedPhotoUrl}
                          alt="Resolved site"
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-[#16865B]/90 text-white text-[9px] font-bold px-1.5 py-0.5">
                          Resolved & Cleared
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Vertical Audit Timeline */}
              <div>
                <div className="text-xs font-bold text-[#17212B] mb-2">Resolution Audit Timeline</div>
                <div className="space-y-2 border-l-2 border-blue-200 pl-3 ml-1 text-xs">
                  {selectedComplaint.timeline.map((step) => (
                    <div key={step.id} className="relative pb-2">
                      <span className="absolute -left-[19px] top-0.5 w-3 h-3 rounded-full bg-[#16865B] border-2 border-white" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#17212B]">{step.status}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#667085] mt-0.5">{step.note}</p>
                      <div className="text-[10px] text-gray-400 italic mt-0.5">
                        Recorded by: {step.updatedBy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citizen Feedback */}
              {selectedComplaint.citizenFeedback ? (
                <div className="p-3.5 bg-[#E8F5EF] rounded-lg border border-[#16865B]/20 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#16865B]">Citizen Satisfaction Rating</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(selectedComplaint.citizenFeedback.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#0E583C] italic mt-1 text-[11px]">
                    "{selectedComplaint.citizenFeedback.comment}"
                  </p>
                </div>
              ) : (
                selectedComplaint.status === 'Resolved' && (
                  <button
                    onClick={() => setShowFeedbackModal(true)}
                    className="w-full py-2 bg-[#FEF6E7] hover:bg-[#FCEFD6] text-[#B54708] border border-[#F59E0B]/30 rounded-lg text-xs font-bold transition-colors"
                  >
                    Submit Citizen Satisfaction Rating
                  </button>
                )
              )}
            </Card>
          </div>
        ) : null}
      </div>

      {/* Register Complaint Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-[#17212B]">
                Register Citizen Grievance
              </h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterComplaint} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Citizen Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Shri..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Ward</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={newWard}
                    onChange={(e) => setNewWard(parseInt(e.target.value) || 1)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  >
                    <option value="Water">Water Supply</option>
                    <option value="Road">Road Damage</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Electricity">Electricity</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Street light pole #B-14 dark near chowk"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Location Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Transformer, Kranti Chowk"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Complete Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the problem, hazard level, and exact spot..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-3.5 py-2 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white font-bold rounded-lg shadow-2xs"
                >
                  Generate Ticket & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-md w-full p-6">
            <h3 className="text-base font-bold text-[#17212B] mb-1">
              Update Status of {selectedComplaint.id}
            </h3>
            <p className="text-xs text-[#667085] mb-4">{selectedComplaint.title}</p>

            <form onSubmit={handleStatusUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">New Resolution Status</label>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value as any)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs font-semibold"
                >
                  <option value="Assigned">Assigned to Field Technician</option>
                  <option value="In Progress">In Progress (Work Ongoing)</option>
                  <option value="Resolved">Resolved & Cleared</option>
                  <option value="Escalated">Escalated to Janpad / PHE Sub-Division</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Assigned Officer / Technician</label>
                <input
                  type="text"
                  placeholder="Officer Name..."
                  value={updateOfficer}
                  onChange={(e) => setUpdateOfficer(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Action Remarks & Log</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe resolution action taken..."
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="px-3.5 py-1.5 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1769AA] text-white font-bold rounded-lg shadow-2xs"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Citizen Feedback Rating Modal */}
      {showFeedbackModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-md w-full p-6">
            <h3 className="text-base font-bold text-[#17212B] mb-1">
              Rate Complaint Resolution
            </h3>
            <p className="text-xs text-[#667085] mb-4">{selectedComplaint.id}</p>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Satisfaction Score: {feedbackRating} / 5 Stars
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${star <= feedbackRating ? 'fill-current' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Citizen Feedback Comment</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How was the resolution quality and technician response?"
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-3.5 py-1.5 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#16865B] text-white font-bold rounded-lg shadow-2xs"
                >
                  Submit Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
