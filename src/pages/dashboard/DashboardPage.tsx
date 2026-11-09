import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  FolderGit2,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  MessageSquareText,
  Building2,
  ShieldAlert,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { reportService } from '../../services/reportService';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { formatCurrencyINR, formatNumberIN } from '../../utils/formatters';

export function DashboardPage() {
  const { currentUser } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [reportData, projects] = await Promise.all([
          reportService.getAnalyticsSummary(),
          projectService.getProjects()
        ]);
        setAnalytics(reportData);
        setRecentProjects(projects.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 4 Core KPI Cards for Row 1
  const kpiCards = [
    {
      title: 'Total Population',
      titleHindi: 'कुल जनसंख्या',
      value: '8,420',
      change: '+2.4% from last year',
      trend: 'up',
      icon: Users,
      iconColor: 'text-[#1769AA]',
      iconBg: 'bg-[#EBF3FA]',
      link: '/village'
    },
    {
      title: 'Active Projects',
      titleHindi: 'सक्रिय विकास कार्य',
      value: '12',
      change: '3 require attention',
      trend: 'warning',
      icon: FolderGit2,
      iconColor: 'text-[#16865B]',
      iconBg: 'bg-[#E8F5EF]',
      link: '/projects'
    },
    {
      title: 'Open Complaints',
      titleHindi: 'सक्रिय नागरिक शिकायतें',
      value: '16',
      change: '5 high priority',
      trend: 'danger',
      icon: AlertCircle,
      iconColor: 'text-[#DC3545]',
      iconBg: 'bg-[#FEF3F2]',
      link: '/complaints'
    },
    {
      title: 'Upcoming Meetings',
      titleHindi: 'आगामी ग्राम सभा/बैठक',
      value: '2',
      change: 'Next: 15 Nov (Gram Sabha)',
      trend: 'neutral',
      icon: Calendar,
      iconColor: 'text-[#5925DC]',
      iconBg: 'bg-[#F4F3FF]',
      link: '/meetings'
    }
  ];

  // Recent operational activity
  const recentActivities = [
    {
      id: 1,
      title: 'CC Road Ward 04 progress updated to 68%',
      subtitle: 'Sub-base compaction verified and curbstone curing initiated by Er. Amit Bisen',
      time: '2 hours ago',
      type: 'project'
    },
    {
      id: 2,
      title: 'New Complaint #GP-2026-00124 received (Street Light)',
      subtitle: 'Citizen Ramcharan Gautam reported pole #B-14 dark at Kranti Chowk, Ward 03',
      time: '4 hours ago',
      type: 'complaint'
    },
    {
      id: 3,
      title: 'Special Gram Sabha scheduled for 15 November',
      subtitle: 'Public notice published: PMAY-G beneficiary priority list & Jal Jeevan Mission',
      time: '1 day ago',
      type: 'meeting'
    },
    {
      id: 4,
      title: 'Government Scheme awareness notification published',
      subtitle: 'Special camp for Ladli Behna Yojana e-KYC scheduled at CSC Centre',
      time: '1 day ago',
      type: 'scheme'
    },
    {
      id: 5,
      title: 'Morning muster roll submitted',
      subtitle: '9 out of 10 registered Panchayat laborers reported present on duty',
      time: '2 days ago',
      type: 'worker'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-14 w-1/3 bg-gray-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header with Compact Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
            {lang === 'hi' ? 'नमस्ते' : 'Namaste'},{' '}
            {lang === 'hi' ? currentUser.nameHindi : currentUser.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1 font-normal">
            {lang === 'hi'
              ? 'ग्राम पंचायत रामपुर में आज की स्थिति एवं महत्वपूर्ण विकास कार्यों की समीक्षा।'
              : "Here's what's happening in your Panchayat today."}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Project</span>
          </button>
          <button
            onClick={() => navigate('/notices')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#D0D5DD] hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <MessageSquareText className="w-4 h-4 text-gray-500" />
            <span>Create Notice</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* ROW 1: 4 STATISTICS KPI CARDS                        */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.title}
              hoverEffect
              onClick={() => navigate(kpi.link)}
              className="p-5 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#667085]">
                  {lang === 'hi' ? kpi.titleHindi : kpi.title}
                </span>
                <div className={`p-2 rounded-lg ${kpi.iconBg}`}>
                  <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
                </div>
              </div>

              <div className="my-2.5">
                <div className="text-2xl sm:text-[28px] font-extrabold text-[#17212B] tracking-tight leading-none">
                  {kpi.value}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#F2F4F7]">
                <span
                  className={`font-medium ${
                    kpi.trend === 'warning'
                      ? 'text-[#B54708]'
                      : kpi.trend === 'danger'
                      ? 'text-[#B42318]'
                      : 'text-[#027A48]'
                  }`}
                >
                  {kpi.change}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* ROW 2: PROJECT PROGRESS (2/3) + AI INSIGHTS (1/3)    */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Project Progress: 2/3 width */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>
                {lang === 'hi' ? 'विकास कार्य प्रगति स्थिति' : 'Project Progress Overview'}
              </CardTitle>
              <CardDescription>
                Live physical milestone and expenditure tracking of active works
              </CardDescription>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs font-semibold text-[#1769AA] hover:underline flex items-center gap-1"
            >
              <span>View All 12 Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </CardHeader>

          <CardContent className="space-y-4">
            {recentProjects.map((proj) => {
              const statusColor =
                proj.status === 'completed'
                  ? 'bg-[#16865B]'
                  : proj.status === 'delayed'
                  ? 'bg-[#DC3545]'
                  : proj.progress > 60
                  ? 'bg-[#1769AA]'
                  : 'bg-[#F59E0B]';

              return (
                <div key={proj.id} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#17212B] hover:text-[#1769AA] cursor-pointer"
                        onClick={() => navigate('/projects')}
                      >
                        {proj.title}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded">
                        Ward 0{proj.ward}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[#667085] hidden sm:inline">
                        Spent: {formatCurrencyINR(proj.spent)}
                      </span>
                      <span className="font-extrabold text-gray-900">{proj.progress}%</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#EAECF0] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${statusColor}`}
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Insights: 1/3 width */}
        <Card className="flex flex-col justify-between border-purple-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#5925DC] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm sm:text-base">AI Panchayat Insights</CardTitle>
                <CardDescription>Automated risk detection</CardDescription>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4F3FF] text-[#5925DC] border border-[#5925DC]/20">
              Active
            </span>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-[#FEF3F2] border border-[#DC3545]/20 text-xs">
              <div className="font-bold text-[#B42318] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>3 projects require attention</span>
              </div>
              <p className="text-[#7A271A] text-[11px] mt-1 leading-relaxed">
                CC Road Ward 04 is currently 12 days behind scheduled curing milestone.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#FEF6E7] border border-[#F59E0B]/30 text-xs">
              <div className="font-bold text-[#B54708] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Water complaints up by 18%</span>
              </div>
              <p className="text-[#93370D] text-[11px] mt-1 leading-relaxed">
                Localized pipeline pressure drops flagged in Ward 04 & 05 grid.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#EBF3FA] border border-[#1769AA]/20 text-xs">
              <div className="font-bold text-[#1769AA]">Ward 04 pending backlog</div>
              <p className="text-[#175CD3] text-[11px] mt-0.5 leading-relaxed">
                Highest concentration of pending citizen grievances (4 issues).
              </p>
            </div>
          </CardContent>

          <div className="p-4 bg-[#FAFAFC] border-t border-[#F2F4F7] rounded-b-xl">
            <button
              onClick={() => navigate('/ai-intelligence')}
              className="w-full py-2 bg-[#5925DC] hover:bg-[#4E1DBC] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Detailed AI Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>
      </div>

      {/* ==================================================== */}
      {/* ROW 3: BUDGET VS EXPENDITURE (1/2) + COMPLAINTS (1/2)*/}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
        {/* Budget vs Expenditure Area Chart */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>
                {lang === 'hi' ? 'बजट बनाम व्यय (₹)' : 'Budget vs Expenditure Trends'}
              </CardTitle>
              <CardDescription>
                Sanctioned allocations vs audited expenditure under 15th FC
              </CardDescription>
            </div>
            <span className="text-xs font-bold text-[#16865B] bg-[#E8F5EF] px-2.5 py-1 rounded-full border border-[#16865B]/20">
              72% Booked
            </span>
          </CardHeader>

          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analytics?.budgetVsExpenditureByMonth || []}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="areaAllocated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1769AA" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1769AA" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="areaSpent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16865B" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#16865B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#667085' }} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#667085' }}
                    tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    formatter={(val: any) => [formatCurrencyINR(val), '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E4E7EC' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="allocated"
                    name="Sanctioned"
                    stroke="#1769AA"
                    strokeWidth={2}
                    fill="url(#areaAllocated)"
                  />
                  <Area
                    type="monotone"
                    dataKey="spent"
                    name="Recorded Spent"
                    stroke="#16865B"
                    strokeWidth={2.5}
                    fill="url(#areaSpent)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-[#667085]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1769AA]" />
                <span>Sanctioned Grant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#16865B]" />
                <span>Audited Expenditure</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ward-wise Complaints Bar Chart */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>
                {lang === 'hi' ? 'वार्ड अनुसार नागरिक शिकायतें' : 'Ward-wise Complaint Distribution'}
              </CardTitle>
              <CardDescription>Received vs Resolved complaints across 12 Wards</CardDescription>
            </div>
            <button
              onClick={() => navigate('/complaints')}
              className="text-xs font-semibold text-[#1769AA] hover:underline"
            >
              Grievance Cell →
            </button>
          </CardHeader>

          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics?.complaintsByWard || []}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                  <XAxis dataKey="ward" tick={{ fontSize: 10, fill: '#667085' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#667085' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E4E7EC' }} />
                  <Bar dataKey="count" name="Total Received" fill="#1769AA" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#16865B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-[#667085]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1769AA]" />
                <span>Total Received</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#16865B]" />
                <span>Satisfactorily Resolved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ==================================================== */}
      {/* ROW 4: RECENT PROJECTS (2/3) + UPCOMING MEETINGS (1/3)*/}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Recent Projects Table: 2/3 width */}
        <Card className="lg:col-span-2 flex flex-col justify-between overflow-hidden">
          <CardHeader>
            <div>
              <CardTitle>Recent Priority Projects</CardTitle>
              <CardDescription>Ongoing works requiring active supervisor oversight</CardDescription>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs font-semibold text-[#1769AA] hover:underline"
            >
              All Projects →
            </button>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[#667085] font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Ward</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {recentProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#17212B] line-clamp-1">{p.title}</div>
                      <div className="text-[10px] text-[#667085] font-mono mt-0.5">{p.code}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px]">
                        W-0{p.ward}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#17212B]">
                      {formatCurrencyINR(p.budget)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#1769AA]">
                      {p.progress}%
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigate('/projects')}
                        className="text-xs font-semibold text-[#1769AA] hover:underline"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Upcoming Meeting Spotlight: 1/3 width */}
        <Card className="flex flex-col justify-between bg-gradient-to-br from-[#0F2747] to-[#133763] text-white border-0 shadow-md">
          <CardContent className="p-6">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded-full font-bold text-[10px] mb-3">
              <Calendar className="w-3 h-3 text-gray-950" />
              <span>UPCOMING GRAM SABHA</span>
            </div>

            <h3 className="text-base font-extrabold text-white leading-snug">
              Special Gram Sabha on Winter Development Works
            </h3>

            <div className="space-y-2 mt-4 text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Date:</strong> 15 November 2026 (Sunday)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Time:</strong> 10:30 AM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Venue:</strong> Panchayat Bhawan Main Hall</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Quorum:</strong> 250 Citizens required</span>
              </div>
            </div>
          </CardContent>

          <div className="p-4 bg-black/20 border-t border-white/10 rounded-b-xl flex items-center justify-between">
            <span className="text-xs text-gray-300">4 Key Agendas</span>
            <button
              onClick={() => navigate('/meetings')}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-gray-950 rounded-lg text-xs font-bold transition-colors shadow-2xs"
            >
              View Agenda →
            </button>
          </div>
        </Card>
      </div>

      {/* ==================================================== */}
      {/* ROW 5: RECENT ACTIVITY AUDIT TRAIL (FULL WIDTH)      */}
      {/* ==================================================== */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Recent Panchayat Activity</CardTitle>
            <CardDescription>System activity log across development, grievances, and schemes</CardDescription>
          </div>
          <span className="text-xs font-semibold text-gray-500">Live Audit Trail</span>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-[#E4E7EC]">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-4 sm:px-6 flex items-start gap-3.5 text-xs hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#1769AA] shrink-0 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#17212B]">{act.title}</div>
                  <div className="text-[#667085] mt-0.5 line-clamp-1">{act.subtitle}</div>
                </div>
                <div className="text-[11px] text-gray-400 font-medium shrink-0">
                  {act.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
