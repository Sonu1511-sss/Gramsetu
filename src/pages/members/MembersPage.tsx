import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  X,
  Briefcase,
  FileText,
  Award,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { EmptyState } from '../../components/common/EmptyState';
import { memberService } from '../../services/memberService';
import { PanchayatMember } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export function MembersPage() {
  const [members, setMembers] = useState<PanchayatMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Selected member for profile drawer
  const [selectedMember, setSelectedMember] = useState<PanchayatMember | null>(null);

  // Add Member Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameHindi: '',
    designation: '',
    designationHindi: '',
    role: 'panch' as any,
    ward: 1,
    contact: '',
    email: '',
    qualification: '',
    address: '',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    attendanceRate: 95,
    status: 'active' as const,
    responsibilities: '',
    assignedProjectsCount: 1,
    joinedDate: new Date().toISOString().split('T')[0]
  });

  // Assign Work Modal State
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignTaskText, setAssignTaskText] = useState('');

  const { lang } = useLanguage();
  const { success } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const data = await memberService.getMembers();
      setMembers(data);
    } finally {
      setLoading(false);
    }
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const newM = await memberService.addMember({
      ...formData,
      responsibilities: formData.responsibilities
        ? formData.responsibilities.split(',').map((r) => r.trim())
        : ['Ward development coordination', 'Citizen grievance redressal']
    });
    setMembers((prev) => [newM, ...prev]);
    setShowAddModal(false);
    success('Member Registered', `${newM.name} added to Panchayat registry.`);
  };

  const handleAssignWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    success('Work Assigned', `Task allocated to ${selectedMember.name}`);
    setShowAssignModal(false);
    setAssignTaskText('');
  };

  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.contact.includes(search);
    const matchesRole = roleFilter === 'all' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const paginatedMembers = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'पंचायत सदस्य एवं प्रशासनिक स्टाफ' : 'Panchayat Members & Staff'}
        description={
          lang === 'hi'
            ? 'निर्वाचित सरपंच, उप-सरपंच, १२ वार्ड पंच, सचिव, रोजगार सहायक एवं उप-यंत्री का संपर्क व कार्य आवंटन।'
            : 'Directory of elected Panchayat members, administrative secretaries, technical sub-engineers, and CSC operators.'
        }
        badge={<StatusBadge status={`${members.length} Registered`} variant="info" dot={false} />}
        actions={
          currentUser.role === 'sarpanch' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Member</span>
            </button>
          )
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search member by name, ward, phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 bg-[#F5F7FA] border border-[#D0D5DD] rounded-lg text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-[#F5F7FA] border border-[#D0D5DD] rounded-lg text-xs font-medium text-gray-700 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="sarpanch">Sarpanch</option>
            <option value="up_sarpanch">Up-Sarpanch</option>
            <option value="secretary">Secretary (Sachiv)</option>
            <option value="panch">Ward Panch</option>
            <option value="technical_assistant">Technical Assistant</option>
            <option value="gram_rojgar_sahayak">Gram Rojgar Sahayak</option>
            <option value="operator">Operator</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No members match your search"
            description="Try adjusting your role filter or search keyword."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[#667085] font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Member Name & Role</th>
                  <th className="py-3.5 px-3">Designation</th>
                  <th className="py-3.5 px-3">Ward</th>
                  <th className="py-3.5 px-3">Contact Phone</th>
                  <th className="py-3.5 px-3">Attendance</th>
                  <th className="py-3.5 px-3">Supervised Works</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {paginatedMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-[#17212B] hover:text-[#1769AA] cursor-pointer"
                            onClick={() => setSelectedMember(m)}
                          >
                            {lang === 'hi' ? m.nameHindi : m.name}
                          </div>
                          <div className="text-[10px] text-[#667085] font-medium">
                            Joined: {m.joinedDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-gray-800">
                      {lang === 'hi' ? m.designationHindi : m.designation}
                    </td>
                    <td className="py-3.5 px-3">
                      {m.ward ? (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-bold text-[10px]">
                          Ward 0{m.ward}
                        </span>
                      ) : (
                        <span className="text-gray-400">Panchayat Wide</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-gray-700 font-medium">
                      {m.contact}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-14 bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#16865B] h-full rounded-full"
                            style={{ width: `${m.attendanceRate}%` }}
                          />
                        </div>
                        <span className="font-bold text-[#16865B]">{m.attendanceRate}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 font-bold text-[#1769AA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                        <Briefcase className="w-3 h-3" />
                        {m.assignedProjectsCount} Works
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status="Active" variant="success" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="px-3 py-1 text-xs font-semibold text-[#1769AA] hover:bg-blue-50 rounded transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          itemLabel="members"
        />
      </Card>

      {/* Member Profile Drawer */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slide-left">
            {/* Drawer Header */}
            <div className="p-5 bg-[#0F2747] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-xs text-blue-200">{selectedMember.designation}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-300 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold">Phone:</span>
                  <span className="font-mono">{selectedMember.contact}</span>
                </div>
                {selectedMember.email && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold">Gov Email:</span>
                    <span>{selectedMember.email}</span>
                  </div>
                )}
                {selectedMember.address && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold">Address:</span>
                    <span>{selectedMember.address}</span>
                  </div>
                )}
                {selectedMember.qualification && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold">Qualification:</span>
                    <span>{selectedMember.qualification}</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Assigned Administrative Responsibilities
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedMember.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="text-[11px] text-emerald-800 font-semibold">Attendance Rate</div>
                  <div className="text-xl font-extrabold text-emerald-950 mt-1">
                    {selectedMember.attendanceRate}%
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">Gram Sabha & meetings</div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-[11px] text-blue-800 font-semibold">Assigned Projects</div>
                  <div className="text-xl font-extrabold text-blue-950 mt-1">
                    {selectedMember.assignedProjectsCount} Works
                  </div>
                  <div className="text-[10px] text-blue-700 mt-0.5">Supervised on-site</div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white font-bold rounded-lg transition-colors text-xs"
              >
                Assign Work / Task
              </button>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Work Modal */}
      {showAssignModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-md w-full p-6">
            <h3 className="text-base font-bold text-[#17212B] mb-1">
              Assign Development Work to {selectedMember.name}
            </h3>
            <p className="text-xs text-[#667085] mb-4">
              Allocate a specific task, ward inspection, or community oversight assignment.
            </p>

            <form onSubmit={handleAssignWork} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inspect water pipeline valve leak in Ward 05"
                  value={assignTaskText}
                  onChange={(e) => setAssignTaskText(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Deadline Date</label>
                <input
                  type="date"
                  defaultValue="2026-11-15"
                  className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-3 py-1.5 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1769AA] text-white font-bold rounded-lg shadow-2xs"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-[#17212B]">
                Add Official Panchayat Member / Staff
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name (English)</label>
                  <input
                    type="text"
                    required
                    placeholder="Shri Ram..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Name (Hindi)</label>
                  <input
                    type="text"
                    placeholder="श्री राम..."
                    value={formData.nameHindi}
                    onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="Ward Panch..."
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Ward Number</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: parseInt(e.target.value) || 1 })}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98..."
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="Graduate, Secondary..."
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Responsibilities (comma separated)</label>
                <textarea
                  rows={2}
                  placeholder="Ward sanitation monitoring, citizen welfare, Gram Sabha mobilization"
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white font-bold rounded-lg shadow-2xs"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
