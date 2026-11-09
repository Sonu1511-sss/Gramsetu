import { useState, useEffect } from 'react';
import {
  HardHat,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Briefcase,
  Users,
  Plus,
  X,
  Phone,
  Check,
  Award,
  DollarSign,
  TrendingUp,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { workerService } from '../../services/workerService';
import { Worker, WorkerCategory } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrencyINR } from '../../utils/formatters';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';

export function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [attendanceFilter, setAttendanceFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Assign Work Modal
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [assignTask, setAssignTask] = useState('');
  const [assignLocation, setAssignLocation] = useState('');
  const [assignDeadline, setAssignDeadline] = useState('2026-11-15');
  const [assignPriority, setAssignPriority] = useState<Worker['taskPriority']>('High');

  const { lang } = useLanguage();
  const { success } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    try {
      const data = await workerService.getWorkers();
      setWorkers(data);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleAttendance = async (
    workerId: string,
    newStatus: 'Present' | 'Absent' | 'Leave'
  ) => {
    const updated = await workerService.updateAttendance(workerId, newStatus);
    setWorkers((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
    success('Attendance Updated', `${updated.name} marked ${newStatus}`);
  };

  const handleAssignWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorker) return;
    const updated = await workerService.assignWork(selectedWorker.id, {
      task: assignTask,
      location: assignLocation,
      deadline: assignDeadline,
      priority: assignPriority
    });

    setWorkers((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
    setSelectedWorker(null);
    setAssignTask('');
    setAssignLocation('');
    success('Work Assigned', `Task allocated to ${updated.name}`);
  };

  const filteredWorkers = workers.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.workerCode.toLowerCase().includes(search.toLowerCase()) ||
      w.assignedTask.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || w.category === categoryFilter;
    const matchesAttendance = attendanceFilter === 'All' || w.todayAttendance === attendanceFilter;
    return matchesSearch && matchesCategory && matchesAttendance;
  });

  const total = workers.length;
  const presentCount = workers.filter((w) => w.todayAttendance === 'Present').length;
  const absentCount = workers.filter((w) => w.todayAttendance === 'Absent').length;
  const leaveCount = workers.filter((w) => w.todayAttendance === 'Leave').length;
  const presentPct = total > 0 ? Math.round((presentCount / total) * 100) : 0;
  const dailyWageTotal = workers
    .filter((w) => w.todayAttendance === 'Present')
    .reduce((sum, w) => sum + w.dailyWage, 0);

  // Pagination
  const totalPages = Math.ceil(filteredWorkers.length / pageSize) || 1;
  const paginatedWorkers = filteredWorkers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'श्रमिक प्रबंधन एवं दैनिक उपस्थिति' : 'Worker Directory & Attendance'}
        description="Daily muster roll, biometric attendance check, wage tracking and field duty assignment across 12 wards"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Today's Roll Active ({presentPct}% Present)
          </span>
        }
      />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Total Workforce</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">{total}</p>
                <p className="text-xs text-[#667085] mt-1">Across 4 departments</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Present Today</p>
                <p className="text-2xl font-bold text-[#16865B] mt-1">{presentCount}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">{presentPct}% biometric attendance</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#16865B] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Absent / On Leave</p>
                <p className="text-2xl font-bold text-[#DC3545] mt-1">{absentCount + leaveCount}</p>
                <p className="text-xs text-[#DC3545] font-medium mt-1">{absentCount} unexcused, {leaveCount} leave</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#DC3545] flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Today's Wage Outlay</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">{formatCurrencyINR(dailyWageTotal)}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Direct DBT disbursal</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#667085]" />
            <input
              type="text"
              placeholder="Search by worker name, code, or task..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B] focus:outline-none focus:border-[#1769AA] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter className="w-3.5 h-3.5 text-[#667085] shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#1769AA]"
            >
              <option value="All">All Categories</option>
              <option value="Sanitation">Sanitation (Safai)</option>
              <option value="Water Supply">Water Supply (Nal-Jal)</option>
              <option value="Street Light">Street Light</option>
              <option value="MGNREGA">MGNREGA Construction</option>
              <option value="Maintenance">General Maintenance</option>
            </select>

            <select
              value={attendanceFilter}
              onChange={(e) => {
                setAttendanceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#1769AA]"
            >
              <option value="All">All Attendance</option>
              <option value="Present">Present Only</option>
              <option value="Absent">Absent Only</option>
              <option value="Leave">On Leave</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Workers Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] text-[#667085] font-semibold uppercase tracking-wider border-b border-[#E4E7EC]">
              <tr>
                <th className="px-5 py-3.5">Worker Details</th>
                <th className="px-5 py-3.5">Category & Wage</th>
                <th className="px-5 py-3.5">Assigned Task & Ward</th>
                <th className="px-5 py-3.5">Today's Punch</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {paginatedWorkers.map((worker) => (
                <tr key={worker.id} className="hover:bg-[#F5F7FA]/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8F5EF] text-[#16865B] flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-200">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#17212B] text-sm">{worker.name}</div>
                        <div className="flex items-center gap-2 text-[11px] text-[#667085] mt-0.5">
                          <span className="font-mono">{worker.workerCode}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {worker.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <StatusBadge status={worker.category} />
                      <div className="text-xs text-[#667085] font-medium mt-1">
                        ₹{worker.dailyWage} / day
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="max-w-xs">
                      <div className="font-semibold text-[#17212B] truncate">{worker.assignedTask}</div>
                      <div className="flex items-center gap-2 text-[11px] text-[#667085] mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#1769AA]" />
                          {worker.location}
                        </span>
                        <span>•</span>
                        <span className={`font-semibold ${
                          worker.taskPriority === 'High' ? 'text-[#DC3545]' : 'text-amber-600'
                        }`}>
                          {worker.taskPriority} Priority
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleAttendance(worker.id, 'Present')}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                          worker.todayAttendance === 'Present'
                            ? 'bg-[#16865B] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => handleToggleAttendance(worker.id, 'Absent')}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                          worker.todayAttendance === 'Absent'
                            ? 'bg-[#DC3545] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => handleToggleAttendance(worker.id, 'Leave')}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                          worker.todayAttendance === 'Leave'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        L
                      </button>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedWorker(worker);
                        setAssignTask(worker.assignedTask);
                        setAssignLocation(worker.location);
                      }}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1769AA] font-bold rounded-lg text-xs transition-colors"
                    >
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredWorkers.length}
          pageSize={pageSize}
        />
      </Card>

      {/* Assign Work Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#17212B]">
                  Assign Duty: {selectedWorker.name}
                </h3>
                <p className="text-xs text-[#667085]">{selectedWorker.category} • {selectedWorker.workerCode}</p>
              </div>
              <button onClick={() => setSelectedWorker(null)} className="text-[#667085] hover:text-[#17212B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignWork} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#17212B] mb-1">Assigned Task Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ward 4 drain desilting & bleaching"
                  value={assignTask}
                  onChange={(e) => setAssignTask(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17212B] mb-1">Location / Ward</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ward 04, Ambedkar Chowk"
                  value={assignLocation}
                  onChange={(e) => setAssignLocation(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Priority</label>
                  <select
                    value={assignPriority}
                    onChange={(e) => setAssignPriority(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Target Completion</label>
                  <input
                    type="date"
                    value={assignDeadline}
                    onChange={(e) => setAssignDeadline(e.target.value)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedWorker(null)}
                  className="px-4 py-2 border border-[#E4E7EC] text-[#17212B] font-semibold rounded-lg text-xs hover:bg-[#F5F7FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769AA] hover:bg-[#135487] text-white font-bold rounded-lg text-xs shadow-xs"
                >
                  Save Duty Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
