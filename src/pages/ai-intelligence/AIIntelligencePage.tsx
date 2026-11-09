import { useState, useEffect } from 'react';
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Download,
  X,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { aiService, MonthlyAIReport } from '../../services/aiService';
import { AIInsight } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { formatCurrencyINR } from '../../utils/formatters';

export function AIIntelligencePage() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [healthScores, setHealthScores] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Monthly AI Report Modal
  const [generatedReport, setGeneratedReport] = useState<MonthlyAIReport | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const { lang } = useLanguage();
  const { success } = useToast();

  useEffect(() => {
    async function load() {
      const [ins, scores] = await Promise.all([
        aiService.getInsights(),
        aiService.getHealthScores()
      ]);
      setInsights(ins);
      setHealthScores(scores);
      setLoading(false);
    }
    load();
  }, []);

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    try {
      const report = await aiService.generateMonthlyReport('November 2026');
      setGeneratedReport(report);
      success('AI Report Synthesized', 'Autonomous governance analysis ready.');
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <PageHeader
        title="AI Panchayat Intelligence"
        description="Data-driven insights for better village administration. Predictive risk modeling, complaint anomaly tracking, and automated audit summaries."
        badge={<StatusBadge status="Deterministic AI Engine" variant="purple" dot={false} />}
        actions={
          <button
            onClick={handleGenerateReport}
            disabled={generatingReport}
            className="flex items-center gap-2 px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white font-semibold text-xs rounded-lg shadow-2xs transition-colors shrink-0 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{generatingReport ? 'Synthesizing Data...' : 'Generate Monthly Report'}</span>
          </button>
        }
      />

      {/* 4 Clean Health Scorecards */}
      {healthScores && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085] font-semibold">
              <span>Development Health</span>
              <StatusBadge status="Good" variant="success" dot={false} />
            </div>
            <div className="my-3">
              <div className="text-3xl font-black text-[#17212B] tracking-tight">
                {healthScores.developmentHealth}<span className="text-sm font-semibold text-gray-400">/100</span>
              </div>
            </div>
            <div className="text-[11px] text-[#16865B] font-medium pt-2 border-t border-gray-100">
              Top quartile development index
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085] font-semibold">
              <span>Complaint Health</span>
              <StatusBadge status="Healthy" variant="info" dot={false} />
            </div>
            <div className="my-3">
              <div className="text-3xl font-black text-[#17212B] tracking-tight">
                {healthScores.complaintHealth}<span className="text-sm font-semibold text-gray-400">/100</span>
              </div>
            </div>
            <div className="text-[11px] text-[#1769AA] font-medium pt-2 border-t border-gray-100">
              2.8 days average turnaround
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085] font-semibold">
              <span>Project Risk</span>
              <StatusBadge status="Low Risk" variant="warning" dot={false} />
            </div>
            <div className="my-3">
              <div className="text-3xl font-black text-[#17212B] tracking-tight">
                {healthScores.projectRiskScore}%
              </div>
            </div>
            <div className="text-[11px] text-[#B54708] font-medium pt-2 border-t border-gray-100">
              1 work flagged for schedule delay
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085] font-semibold">
              <span>Budget Health</span>
              <StatusBadge status="Excellent" variant="success" dot={false} />
            </div>
            <div className="my-3">
              <div className="text-3xl font-black text-[#17212B] tracking-tight">
                {healthScores.budgetHealth}<span className="text-sm font-semibold text-gray-400">/100</span>
              </div>
            </div>
            <div className="text-[11px] text-[#16865B] font-medium pt-2 border-t border-gray-100">
              Zero overdraft risk detected
            </div>
          </Card>
        </div>
      )}

      {/* AI Insights & Advisories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-[#17212B] flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#1769AA]" />
            <span>Algorithmic Pattern Detection & Advisories</span>
          </h2>
          <span className="text-xs text-[#667085] font-medium">Real-time Rampur GP datasets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {insights.map((ins) => (
            <Card
              key={ins.id}
              className={`p-5 sm:p-6 space-y-3.5 ${
                ins.severity === 'critical'
                  ? 'border-red-300 ring-1 ring-red-100'
                  : ins.severity === 'warning'
                  ? 'border-amber-300 ring-1 ring-amber-100'
                  : 'border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <StatusBadge status={ins.type.replace('_', ' ')} variant={ins.severity === 'critical' ? 'danger' : ins.severity === 'warning' ? 'warning' : 'info'} />
                <span className="text-[10px] text-gray-400 font-mono">
                  Synthesized: {ins.dateGenerated}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-[#17212B] leading-snug">
                  {lang === 'hi' ? ins.titleHindi : ins.title}
                </h3>
                <p className="text-xs font-semibold text-gray-800 mt-1">{ins.summary}</p>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">{ins.detail}</p>
              </div>

              {/* Actionable recommendation */}
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E4E7EC] text-xs">
                <div className="font-bold text-[#17212B] mb-0.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16865B]" />
                  <span>Recommended Administrative Action:</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-[11px] mt-1">
                  {ins.recommendedAction}
                </p>
              </div>

              {ins.metrics && (
                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100 font-mono">
                  <span>Planned: {ins.metrics.planned}</span>
                  <span>Recorded: {ins.metrics.actual}</span>
                  <span className="font-bold text-[#1769AA]">{ins.metrics.delta}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Generated Monthly AI Report Modal */}
      {generatedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E4E7EC] max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1769AA] text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#17212B]">
                    Monthly AI Executive Panchayat Report
                  </h2>
                  <div className="text-xs text-[#667085]">
                    {generatedReport.panchayatName} • {generatedReport.district} • {generatedReport.month}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setGeneratedReport(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 my-6 text-xs text-gray-800">
              <div className="p-4 bg-[#EBF3FA] rounded-xl border border-[#1769AA]/20">
                <h4 className="font-extrabold text-[#1769AA] text-sm mb-1">
                  1. Executive Summary & Composite Score ({generatedReport.healthScore}/100)
                </h4>
                <p className="text-[#175CD3] leading-relaxed text-[11px]">
                  {generatedReport.executiveSummary}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#17212B] mb-2 border-b pb-1">
                  2. Development Progress & Grant Utilization
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-gray-400">Total Sanctioned</div>
                    <div className="font-bold text-gray-900 mt-0.5">
                      {formatCurrencyINR(generatedReport.developmentProgress.totalBudget)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Recorded Spent</div>
                    <div className="font-bold text-[#16865B] mt-0.5">
                      {formatCurrencyINR(generatedReport.developmentProgress.totalSpent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Utilization Rate</div>
                    <div className="font-bold text-[#1769AA] mt-0.5">
                      {generatedReport.developmentProgress.utilizationRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Active / Completed</div>
                    <div className="font-bold text-gray-900 mt-0.5">
                      {generatedReport.developmentProgress.ongoing} Ongoing • {generatedReport.developmentProgress.completed} Done
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#17212B] mb-2 border-b pb-1">
                  3. Project Schedule Risks
                </h4>
                <div className="space-y-2">
                  {generatedReport.projectRisks.map((pr, i) => (
                    <div key={i} className="p-3 bg-red-50/60 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between font-bold text-red-950">
                        <span>{pr.projectName}</span>
                        <span>Delay: {pr.delayDays} Days</span>
                      </div>
                      <p className="text-red-900 mt-1 text-[11px]">{pr.rootCause}</p>
                      <div className="text-emerald-900 font-semibold mt-1 text-[11px]">
                        Action: {pr.correctiveAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#17212B] mb-2 border-b pb-1">
                  4. Governance Recommendations
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {generatedReport.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] mt-1.5 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => setGeneratedReport(null)}
                className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold text-xs"
              >
                Close Report
              </button>
              <button
                onClick={() => {
                  window.print();
                  success('Report Printed', 'Sent to printer.');
                }}
                className="px-4 py-2 bg-[#0F2747] text-white font-bold rounded-lg text-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
