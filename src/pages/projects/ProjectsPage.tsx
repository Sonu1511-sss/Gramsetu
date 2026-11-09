import { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Camera,
  X,
  Upload,
  FileCheck2,
  FileText,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';
import { EmptyState } from '../../components/common/EmptyState';
import { projectService } from '../../services/projectService';
import { Project, ProjectCategory, ProjectStatus } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrencyINR } from '../../utils/formatters';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [wardFilter, setWardFilter] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Selected Project for Detail Inspector View
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Progress Update Modal
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [updateProgressVal, setUpdateProgressVal] = useState<number>(68);
  const [updateSpentVal, setUpdateSpentVal] = useState<number>(50000);
  const [updateRemarks, setUpdateRemarks] = useState('');
  const [updateRemaining, setUpdateRemaining] = useState('');
  const [updatePhotoUrl, setUpdatePhotoUrl] = useState('');

  // Add Project Modal
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectCategory>('Road Construction');
  const [newWard, setNewWard] = useState<number>(4);
  const [newBudget, setNewBudget] = useState<number>(500000);
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const { lang } = useLanguage();
  const { success } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
      if (data.length > 0 && !selectedProject) {
        setSelectedProject(data[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const updated = await projectService.updateProjectProgress(selectedProject.id, {
      progress: updateProgressVal,
      spentAddition: updateSpentVal,
      remarks: updateRemarks || `Physical milestone recorded at ${updateProgressVal}% by ${currentUser.name}`,
      workRemainingDescription: updateRemaining,
      photoUrl: updatePhotoUrl || selectedProject.afterPhoto
    });

    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedProject(updated);
    setShowProgressModal(false);
    success('Progress Updated', `${updated.title} marked at ${updated.progress}%.`);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await projectService.addProject({
      title: newTitle,
      titleHindi: newTitle,
      category: newCategory,
      ward: newWard,
      location: newLocation,
      budget: newBudget,
      spent: 0,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletion: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      status: 'work_order',
      description: newDescription,
      contractor: 'Selected via e-Tender',
      supervisor: currentUser.name,
      workersEngaged: 10,
      beneficiariesCount: 650,
      beforePhoto: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1584463699039-38c231711200?auto=format&fit=crop&w=800&q=80',
      recentPhotos: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          stage: 'Work Order & Administrative Sanction',
          date: new Date().toISOString().split('T')[0],
          completed: true,
          remarks: 'Passed in Gram Sabha'
        }
      ],
      inspections: [],
      workRemainingDescription: 'Initial ground excavation and survey marking.',
      approvalOrderNo: `RES/WAR/2026/AS-${Math.floor(1000 + Math.random() * 9000)}`
    });

    setProjects((prev) => [created, ...prev]);
    setSelectedProject(created);
    setShowAddProjectModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');
    success('Project Sanctioned', `${created.title} added to register.`);
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesWard = wardFilter === 0 || p.ward === wardFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesWard;
  });

  const paginatedProjects = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Counts
  const totalCount = projects.length;
  const ongoingCount = projects.filter((p) => p.status === 'in_progress').length;
  const completedCount = projects.filter((p) => p.status === 'completed').length;
  const delayedCount = projects.filter((p) => p.status === 'delayed').length;
  const pendingCount = projects.filter((p) => p.status === 'pending_approval' || p.status === 'work_order').length;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'विकास कार्य निगरानी एवं भौतिक सत्यापन' : 'Development Projects'}
        description={
          lang === 'hi'
            ? 'सड़क, नाली, पेयजल, स्ट्रीट लाइट एवं स्कूल भवन परियोजनाओं की भौतिक एवं वित्तीय प्रगति की संपूर्ण निगरानी।'
            : 'Monitor and manage all Panchayat development projects, budgets, site inspections, and timelines.'
        }
        badge={<StatusBadge status={`${totalCount} Total Works`} variant="info" dot={false} />}
        actions={
          currentUser.role !== 'citizen' && (
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Project</span>
            </button>
          )
        }
      />

      {/* KPI Cards Row */}
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
          <div className="text-[11px] font-semibold text-[#667085]">Total Projects</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#17212B] mt-0.5">{totalCount}</div>
          <div className="text-[10px] text-gray-400 mt-1">All sanctioned heads</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('in_progress');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'in_progress' ? 'border-[#1769AA] ring-2 ring-blue-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#1769AA]">Ongoing Works</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#1769AA] mt-0.5">{ongoingCount}</div>
          <div className="text-[10px] text-blue-600 mt-1">Active on-site</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('completed');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'completed' ? 'border-[#16865B] ring-2 ring-emerald-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#16865B]">Completed</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#16865B] mt-0.5">{completedCount}</div>
          <div className="text-[10px] text-emerald-600 mt-1">Handover completed</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('delayed');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'delayed' ? 'border-[#DC3545] ring-2 ring-red-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#DC3545]">Delayed / At Risk</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#DC3545] mt-0.5">{delayedCount}</div>
          <div className="text-[10px] text-red-600 mt-1">Inspection notice issued</div>
        </Card>

        <Card
          hoverEffect
          onClick={() => {
            setStatusFilter('pending_approval');
            setCurrentPage(1);
          }}
          className={`p-4 cursor-pointer bg-[#F8FAFC] ${
            statusFilter === 'pending_approval' ? 'border-[#F59E0B] ring-2 ring-amber-100 shadow-sm' : ''
          }`}
        >
          <div className="text-[11px] font-semibold text-[#B54708]">Pending Approval</div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#B54708] mt-0.5">{pendingCount}</div>
          <div className="text-[10px] text-amber-600 mt-1">In sanction queue</div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E4E7EC] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by project name, ward or code..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 bg-[#F5F7FA] border border-[#D0D5DD] rounded-lg text-xs text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA]"
          />
        </div>

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
            <option value="Road Construction">Road Construction</option>
            <option value="Drainage">Drainage</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Street Lights">Street Lights</option>
            <option value="Public Buildings">Public Buildings</option>
            <option value="School Development">School Development</option>
            <option value="Sanitation">Sanitation</option>
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

      {/* Main Split Layout: Projects Table on Left (7 cols), Selected Project Inspector on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Column: 7 cols */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden">
            <CardHeader className="py-3 px-4 sm:px-5">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-sm sm:text-base font-bold">
                  Development Projects Register
                </CardTitle>
                <span className="text-xs text-[#667085]">
                  Showing {paginatedProjects.length} of {filtered.length}
                </span>
              </div>
            </CardHeader>

            {filtered.length === 0 ? (
              <EmptyState
                title="No projects found"
                description="Try changing your search terms or filters."
                actionText="+ Create Project"
                onAction={() => setShowAddProjectModal(true)}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[#667085] font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Project Title & Code</th>
                      <th className="py-3.5 px-3">Ward</th>
                      <th className="py-3.5 px-3">Budget / Spent</th>
                      <th className="py-3.5 px-3">Progress</th>
                      <th className="py-3.5 px-3">Status</th>
                      <th className="py-3.5 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7EC]">
                    {paginatedProjects.map((p) => {
                      const isSelected = selectedProject?.id === p.id;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedProject(p)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#EBF3FA]/70 font-medium'
                              : 'hover:bg-gray-50/70'
                          }`}
                        >
                          <td className="py-3.5 px-4 max-w-[200px]">
                            <div className="font-bold text-[#17212B] line-clamp-1">{p.title}</div>
                            <div className="text-[10px] text-[#667085] font-mono mt-0.5">
                              {p.code} • {p.category}
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px]">
                              W-0{p.ward}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="font-bold text-[#17212B]">
                              {formatCurrencyINR(p.budget)}
                            </div>
                            <div className="text-[10px] text-[#16865B] font-medium">
                              Spent: {formatCurrencyINR(p.spent)}
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-14 bg-[#EAECF0] h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    p.status === 'completed'
                                      ? 'bg-[#16865B]'
                                      : p.status === 'delayed'
                                      ? 'bg-[#DC3545]'
                                      : p.progress > 60
                                      ? 'bg-[#1769AA]'
                                      : 'bg-[#F59E0B]'
                                  }`}
                                  style={{ width: `${p.progress}%` }}
                                />
                              </div>
                              <span className="font-extrabold text-gray-800 text-[11px]">
                                {p.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <StatusBadge status={p.status} />
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(p);
                              }}
                              className="text-xs font-semibold text-[#1769AA] hover:underline"
                            >
                              Inspect →
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
              itemLabel="projects"
            />
          </Card>
        </div>

        {/* Selected Project Detailed Inspector: 5 cols */}
        {selectedProject ? (
          <div className="lg:col-span-5 space-y-5">
            <Card className="p-5 sm:p-6 space-y-5">
              {/* Header with Title and Update Button */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1769AA]">
                      {selectedProject.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-bold">
                      Ward {selectedProject.ward}
                    </span>
                    <StatusBadge status={selectedProject.status} />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#17212B] mt-1.5 leading-snug">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-[#667085] mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{selectedProject.location}</span>
                  </p>
                </div>

                {currentUser.role !== 'citizen' && (
                  <button
                    onClick={() => {
                      setUpdateProgressVal(selectedProject.progress);
                      setUpdateSpentVal(0);
                      setUpdateRemaining(selectedProject.workRemainingDescription || '');
                      setShowProgressModal(true);
                    }}
                    className="px-3.5 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors shrink-0"
                  >
                    Update Progress
                  </button>
                )}
              </div>

              {/* 4 Financial & Progress Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E4E7EC]">
                  <div className="text-[#667085] text-[10px] font-semibold">Total Budget</div>
                  <div className="text-sm font-extrabold text-[#17212B] mt-0.5">
                    {formatCurrencyINR(selectedProject.budget)}
                  </div>
                </div>
                <div className="p-3 bg-[#E8F5EF]/60 rounded-lg border border-[#16865B]/20">
                  <div className="text-[#16865B] text-[10px] font-semibold">Recorded Spent</div>
                  <div className="text-sm font-extrabold text-[#16865B] mt-0.5">
                    {formatCurrencyINR(selectedProject.spent)}
                  </div>
                </div>
                <div className="p-3 bg-[#EBF3FA]/60 rounded-lg border border-[#1769AA]/20">
                  <div className="text-[#1769AA] text-[10px] font-semibold">Balance Grant</div>
                  <div className="text-sm font-extrabold text-[#1769AA] mt-0.5">
                    {formatCurrencyINR(selectedProject.budget - selectedProject.spent)}
                  </div>
                </div>
                <div className="p-3 bg-[#FEF6E7]/60 rounded-lg border border-[#F59E0B]/30">
                  <div className="text-[#B54708] text-[10px] font-semibold">Physical Progress</div>
                  <div className="text-sm font-extrabold text-[#B54708] mt-0.5">
                    {selectedProject.progress}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-gray-700">
                  <span>Execution Milestone</span>
                  <span className="text-[#1769AA]">{selectedProject.progress}% Complete</span>
                </div>
                <div className="w-full bg-[#EAECF0] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedProject.status === 'completed'
                        ? 'bg-[#16865B]'
                        : selectedProject.status === 'delayed'
                        ? 'bg-[#DC3545]'
                        : selectedProject.progress > 60
                        ? 'bg-[#1769AA]'
                        : 'bg-[#F59E0B]'
                    }`}
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>

              {/* Before / After Photo Evidence */}
              <div>
                <div className="text-xs font-bold text-[#17212B] mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#1769AA]" />
                    <span>Visual Site Verification (Before vs Present)</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">Geo-tagged</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={selectedProject.beforePhoto}
                      alt="Before"
                      className="w-full h-28 object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5">
                      Before Project Start
                    </div>
                  </div>

                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={selectedProject.afterPhoto}
                      alt="Present"
                      className="w-full h-28 object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#16865B]/80 text-white text-[10px] font-bold px-2 py-0.5">
                      Current Milestone ({selectedProject.progress}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Remaining Description */}
              {selectedProject.workRemainingDescription && (
                <div className="p-3 bg-[#FEF6E7]/80 rounded-lg border border-[#F59E0B]/30 text-xs">
                  <span className="font-bold text-[#B54708] block mb-0.5">
                    Remaining Scope & Milestone Target:
                  </span>
                  <p className="text-[#93370D] leading-relaxed text-[11px]">
                    {selectedProject.workRemainingDescription}
                  </p>
                </div>
              )}

              {/* Project Lifecycle Timeline */}
              <div>
                <div className="text-xs font-bold text-[#17212B] mb-2.5 flex items-center justify-between">
                  <span>Project Lifecycle Stages</span>
                  <span className="text-[10px] text-gray-400">Order: {selectedProject.approvalOrderNo}</span>
                </div>

                <div className="space-y-2 border-l-2 border-blue-200 pl-3 ml-1 text-xs">
                  {selectedProject.timeline.map((step) => (
                    <div key={step.id} className="relative pb-2">
                      <span
                        className={`absolute -left-[19px] top-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          step.completed ? 'bg-[#16865B]' : 'bg-gray-300'
                        }`}
                      />
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${step.completed ? 'text-[#17212B]' : 'text-gray-400'}`}>
                          {step.stage}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{step.date}</span>
                      </div>
                      {step.remarks && (
                        <p className="text-[10px] text-[#667085] mt-0.5">{step.remarks}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Inspections */}
              {selectedProject.inspections.length > 0 && (
                <div className="pt-2 border-t border-gray-100 text-xs">
                  <div className="font-bold text-[#17212B] mb-2">Technical Sub-Engineer Inspections</div>
                  <div className="space-y-2">
                    {selectedProject.inspections.map((insp) => (
                      <div key={insp.id} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-[11px]">
                        <div className="flex items-center justify-between font-semibold text-[#17212B]">
                          <span>{insp.inspectorName} ({insp.designation})</span>
                          <span className="text-[#16865B] font-bold">{insp.status}</span>
                        </div>
                        <p className="text-gray-600 mt-1 italic">"{insp.notes}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        ) : null}
      </div>

      {/* Progress Update Modal */}
      {showProgressModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#17212B]">
                  Update Project Progress & Expenditure
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">{selectedProject.title}</p>
              </div>
              <button
                onClick={() => setShowProgressModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProgress} className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-gray-700">
                    Physical Progress: <span className="text-[#1769AA] font-bold">{updateProgressVal}%</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={updateProgressVal}
                  onChange={(e) => setUpdateProgressVal(parseInt(e.target.value))}
                  className="w-full accent-[#1769AA]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>0% (Commenced)</span>
                  <span>50%</span>
                  <span>100% (Handover)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Additional Expenditure Incurred (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={updateSpentVal}
                  onChange={(e) => setUpdateSpentVal(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Work Completed Description & Field Remarks
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 140m curbstone curing completed, base grade inspected"
                  value={updateRemarks}
                  onChange={(e) => setUpdateRemarks(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Remaining Scope Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Final top wearing coat and shoulder filling"
                  value={updateRemaining}
                  onChange={(e) => setUpdateRemaining(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Site Evidence Photo URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={updatePhotoUrl}
                  onChange={(e) => setUpdatePhotoUrl(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowProgressModal(false)}
                  className="px-3.5 py-2 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white font-bold rounded-lg shadow-2xs"
                >
                  Save Progress Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Proposal Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-[#17212B]">
                Create New Development Project
              </h3>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Interlocking Paver Pathway – Ward 06"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  >
                    <option value="Road Construction">Road Construction</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Street Lights">Street Lights</option>
                    <option value="Public Buildings">Public Buildings</option>
                    <option value="School Development">School Development</option>
                    <option value="Sanitation">Sanitation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Ward Number</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={newWard}
                    onChange={(e) => setNewWard(parseInt(e.target.value) || 1)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Sanctioned Budget (₹)</label>
                  <input
                    type="number"
                    required
                    value={newBudget}
                    onChange={(e) => setNewBudget(parseInt(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Site Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Shanti Nagar Main Lane"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Scope & Specifications</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide scope, dimensions and targeted beneficiaries..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-3.5 py-2 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white font-bold rounded-lg shadow-2xs"
                >
                  Issue Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
