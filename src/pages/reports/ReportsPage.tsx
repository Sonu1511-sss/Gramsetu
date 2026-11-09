import { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  FileSpreadsheet,
  FileText,
  Printer,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Building2,
  X,
  Landmark,
  ShieldCheck,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { reportService } from '../../services/reportService';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { formatCurrencyINR } from '../../utils/formatters';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';

export function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fy, setFy] = useState('2026-27');
  const [quarter, setQuarter] = useState('Q3');
  const [month, setMonth] = useState('November');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const { lang } = useLanguage();
  const { success } = useToast();

  useEffect(() => {
    async function load() {
      const res = await reportService.getAnalyticsSummary();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleExportExcel = () => {
    success('Excel Spreadsheet Exported', 'Gram_Panchayat_Rampur_Report_Q3_2026.xlsx downloaded');
  };

  const handleExportPDF = () => {
    setShowPrintModal(true);
  };

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'प्रशासनिक रिपोर्ट्स एवं एनालिटिक्स' : 'Reports & Governance Analytics'}
        description="Official quarterly financial audit reporting, budget velocity, citizen redressal SLAs, and ward scorecards"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            FY 2026-27 Audit Verified
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#16865B] hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0F2747] hover:bg-[#173359] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Report</span>
            </button>
          </div>
        }
      />

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-4 h-4 text-[#667085]" />
            <span className="font-bold text-[#17212B]">Filter Period:</span>
            <select
              value={fy}
              onChange={(e) => setFy(e.target.value)}
              className="px-3 py-1.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg font-medium text-[#17212B] text-xs focus:outline-none focus:border-[#1769AA]"
            >
              <option value="2026-27">Financial Year 2026-27</option>
              <option value="2025-26">Financial Year 2025-26</option>
            </select>

            <select
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              className="px-3 py-1.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg font-medium text-[#17212B] text-xs focus:outline-none focus:border-[#1769AA]"
            >
              <option value="Q3">Q3 (Oct - Dec)</option>
              <option value="Q2">Q2 (Jul - Sep)</option>
              <option value="Q1">Q1 (Apr - Jun)</option>
            </select>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-3 py-1.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg font-medium text-[#17212B] text-xs focus:outline-none focus:border-[#1769AA]"
            >
              <option value="November">November 2026</option>
              <option value="October">October 2026</option>
              <option value="September">September 2026</option>
            </select>
          </div>

          <div className="text-xs text-[#667085] font-medium">
            Last Synced: 09-Nov-2026 • Auditor General Certified
          </div>
        </CardContent>
      </Card>

      {/* Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Sanctioned Grant</p>
                <p className="text-2xl font-bold text-[#1769AA] mt-1">{formatCurrencyINR(data.totalBudget)}</p>
                <p className="text-xs text-[#667085] mt-1">15th Finance Commission + SBM</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Booked Expenditure</p>
                <p className="text-2xl font-bold text-[#16865B] mt-1">{formatCurrencyINR(data.totalSpent)}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">{data.utilizationRate}% Utilization Efficiency</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#16865B] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Complaint Redressal</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">
                  {data.resolvedComplaints} / {data.totalComplaints}
                </p>
                <p className="text-xs text-[#667085] mt-1">Avg turnaround 2.8 days</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">DBT Scheme Reach</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">{data.totalBeneficiaries}</p>
                <p className="text-xs text-purple-600 font-medium mt-1">Across 8 Flagship Schemes</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Development Performance Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Expenditure Velocity (₹ Lakhs)</CardTitle>
            <p className="text-xs text-[#667085]">Sanctioned allocation vs physical MB book entries</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.budgetVsExpenditureByMonth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EC" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#667085' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#667085' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                  <Tooltip formatter={(v: any) => formatCurrencyINR(v)} />
                  <Area type="monotone" dataKey="spent" name="Spent" stroke="#16865B" fill="#16865B" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ward-wise Complaints Analysis */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ward Performance & Complaint Resolution</CardTitle>
            <p className="text-xs text-[#667085]">Total received vs resolved per ward cluster</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.complaintsByWard} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EC" />
                  <XAxis dataKey="ward" tick={{ fontSize: 11, fill: '#667085' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#667085' }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Received" fill="#1769AA" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#16865B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Official Printable Report Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto print:p-0">
            {/* Gov Header */}
            <div className="text-center pb-4 border-b-2 border-gray-900 mb-6">
              <div className="text-xs font-bold tracking-widest text-[#667085] uppercase">
                GOVERNMENT OF MADHYA PRADESH • PANCHAYATI RAJ DEPARTMENT
              </div>
              <h2 className="text-2xl font-black text-[#17212B] mt-1">
                GRAM PANCHAYAT RAMPUR
              </h2>
              <div className="text-xs text-[#667085]">
                Tehsil Waraseoni, District Balaghat (M.P.) • PIN: 481331
              </div>
              <div className="mt-3 inline-block bg-gray-100 px-4 py-1.5 rounded text-xs font-bold text-[#17212B] uppercase">
                Official Monthly Administrative & Governance Audit Report — {month} {fy}
              </div>
            </div>

            {/* Content summary */}
            <div className="space-y-6 text-xs text-[#17212B]">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F5F7FA] rounded-lg border border-[#E4E7EC]">
                <div>
                  <div><strong>Total Population:</strong> 8,420 (1,735 Households)</div>
                  <div className="mt-1"><strong>Elected Sarpanch:</strong> Smt. Sunita Bai Maravi</div>
                  <div className="mt-1"><strong>Panchayat Secretary:</strong> Shri Mahendra Singh Patle</div>
                </div>
                <div>
                  <div><strong>Active Sanctioned Works:</strong> 12 Development Projects</div>
                  <div className="mt-1"><strong>Total Sanctioned Grant:</strong> ₹40,70,000/-</div>
                  <div className="mt-1"><strong>Recorded Expenditure:</strong> {formatCurrencyINR(data.totalSpent)}/-</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#17212B] mb-2 border-b border-[#E4E7EC] pb-1">
                  I. Physical Milestones of Ongoing Works
                </h4>
                <table className="w-full text-left border-collapse border border-[#E4E7EC] text-xs">
                  <thead>
                    <tr className="bg-[#F5F7FA] border-b border-[#E4E7EC] font-bold text-[#17212B]">
                      <th className="p-2.5 border-r border-[#E4E7EC]">Project Name</th>
                      <th className="p-2.5 border-r border-[#E4E7EC]">Ward</th>
                      <th className="p-2.5 border-r border-[#E4E7EC]">Budget</th>
                      <th className="p-2.5 border-r border-[#E4E7EC]">Progress</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E4E7EC]">
                      <td className="p-2.5 border-r border-[#E4E7EC] font-medium">CC Road Construction</td>
                      <td className="p-2.5 border-r border-[#E4E7EC]">Ward 04</td>
                      <td className="p-2.5 border-r border-[#E4E7EC]">₹8,50,000</td>
                      <td className="p-2.5 border-r border-[#E4E7EC] font-bold">68%</td>
                      <td className="p-2.5 text-[#16865B] font-semibold">Curbstone Curing</td>
                    </tr>
                    <tr className="border-b border-[#E4E7EC]">
                      <td className="p-2.5 border-r border-[#E4E7EC] font-medium">Covered Drainage Channel</td>
                      <td className="p-2.5 border-r border-[#E4E7EC]">Ward 02</td>
                      <td className="p-2.5 border-r border-[#E4E7EC]">₹4,50,000</td>
                      <td className="p-2.5 border-r border-[#E4E7EC] font-bold">95%</td>
                      <td className="p-2.5 text-[#16865B] font-semibold">Near Completion</td>
                    </tr>
                    <tr className="border-b border-[#E4E7EC]">
                      <td className="p-2.5 border-r border-[#E4E7EC] font-medium">Community Water Tank (ESR)</td>
                      <td className="p-2.5 border-r border-[#E4E7EC]">Ward 05</td>
                      <td className="p-2.5 border-r border-[#E4E7EC]">₹12,50,000</td>
                      <td className="p-2.5 border-r border-[#E4E7EC] font-bold">72%</td>
                      <td className="p-2.5 text-[#1769AA] font-semibold">Solar Staging</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#17212B] mb-2 border-b border-[#E4E7EC] pb-1">
                  II. Citizen Grievance Redressal Performance
                </h4>
                <p className="text-[#667085] leading-relaxed">
                  During this reporting cycle, 16 grievances were logged on the Gramsetu portal. 12 complaints have been satisfactorily resolved, 2 are in-progress with line technicians, and 2 were escalated to the Block PHE engineering division. The average redressal time is 2.8 days, within the 4-day statutory Citizen Charter SLA.
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-10 grid grid-cols-2 text-center text-xs">
                <div>
                  <div className="font-bold text-[#17212B]">Shri Mahendra Singh Patle</div>
                  <div className="text-[#667085]">Panchayat Secretary (Sachiv)</div>
                  <div className="text-[11px] text-[#667085] mt-0.5">Gram Panchayat Rampur</div>
                </div>
                <div>
                  <div className="font-bold text-[#17212B]">Smt. Sunita Bai Maravi</div>
                  <div className="text-[#667085]">Sarpanch (Gram Pradhan)</div>
                  <div className="text-[11px] text-[#667085] mt-0.5">Gram Panchayat Rampur</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-6 border-t border-[#E4E7EC] mt-6 print:hidden">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 border border-[#E4E7EC] rounded-lg text-[#17212B] font-semibold text-xs hover:bg-[#F5F7FA]"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  window.print();
                  success('Print Initiated', 'Sending to printer.');
                }}
                className="px-4 py-2 bg-[#0F2747] hover:bg-[#173359] text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
