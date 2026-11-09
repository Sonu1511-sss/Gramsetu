import { useState, useEffect } from 'react';
import {
  Award,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Users,
  ChevronRight,
  X,
  Sparkles,
  Ticket,
  Check,
  TrendingUp,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import { schemeService } from '../../services/schemeService';
import { Scheme } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';

export function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Selected scheme for View Details modal
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  // Eligibility Checker Modal
  const [eligibilityScheme, setEligibilityScheme] = useState<Scheme | null>(null);
  const [userIncome, setUserIncome] = useState('under_2.5L');
  const [ownsLand, setOwnsLand] = useState('under_5_acres');
  const [hasKutchaHouse, setHasKutchaHouse] = useState('yes');
  const [eligibilityResult, setEligibilityResult] = useState<boolean | null>(null);

  // Application Assistance Modal
  const [assistanceScheme, setAssistanceScheme] = useState<Scheme | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantMobile, setApplicantMobile] = useState('');
  const [applicantWard, setApplicantWard] = useState(3);
  const [applicantDocId, setApplicantDocId] = useState('');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const { lang } = useLanguage();
  const { success } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadSchemes();
  }, []);

  async function loadSchemes() {
    try {
      const data = await schemeService.getSchemes();
      setSchemes(data);
    } finally {
      setLoading(false);
    }
  }

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    let eligible = true;
    if (eligibilityScheme?.category === 'Women & Child' && userIncome === 'over_2.5L') {
      eligible = false;
    }
    if (eligibilityScheme?.category === 'Housing' && hasKutchaHouse === 'no') {
      eligible = false;
    }
    setEligibilityResult(eligible);
  };

  const handleRequestAssistance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistanceScheme) return;
    const res = await schemeService.submitAssistanceRequest(assistanceScheme.id, {
      name: applicantName,
      mobile: applicantMobile,
      ward: applicantWard,
      aadhaarOrSamagra: applicantDocId
    });
    setGeneratedToken(res.tokenNumber);
    success('Assistance Token Issued', `Token #${res.tokenNumber} created for ${assistanceScheme.name}`);
  };

  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.benefits.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalBeneficiaries = schemes.reduce((acc, s) => acc + s.enrolledBeneficiaries, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'शासकीय योजनाएं एवं हितग्राही सेवा' : 'Government Welfare Schemes'}
        description="Directory of central & state welfare schemes, online eligibility verification, DBT disbursements and CSC facilitation"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Direct Benefit Transfer (DBT) Active
          </span>
        }
      />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Active Schemes</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">{schemes.length}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">100% DBT enabled</p>
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
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Enrolled Citizens</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">{totalBeneficiaries.toLocaleString('en-IN')}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Across 12 Wards</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#16865B] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Sanctioned Outlay</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">₹3.42 Cr</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">Disbursed directly</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">CSC Facilitations</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">142</p>
                <p className="text-xs text-amber-600 font-medium mt-1">Free e-KYC camp active</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheme Awareness Camp Banner */}
      <div className="bg-[#0F2747] text-white rounded-xl p-5 border border-blue-900/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0F2747] flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">
              Special Ladli Behna Yojana e-KYC & PM Awas Verification Camp
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              CSC Operators available at Panchayat Bhawan counter from 12–13 November. Free biometric seeding for eligible residents.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            const ladli = schemes.find((s) => s.code === 'LADLI-BEHNA');
            if (ladli) setSelectedScheme(ladli);
          }}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs rounded-lg transition-colors shrink-0 shadow-xs"
        >
          View Scheme Guidelines →
        </button>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#667085]" />
            <input
              type="text"
              placeholder="Search scheme name, department or benefit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B] focus:outline-none focus:border-[#1769AA] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter className="w-3.5 h-3.5 text-[#667085] shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#1769AA]"
            >
              <option value="All">All Categories ({schemes.length})</option>
              <option value="Housing">Housing (PMAY-G)</option>
              <option value="Agriculture">Agriculture (PM Kisan)</option>
              <option value="Women & Child">Women & Child (Ladli Behna)</option>
              <option value="Employment">Employment (MGNREGA)</option>
              <option value="Health">Health (Ayushman)</option>
              <option value="Rural Development">Rural Development (Jal Jeevan)</option>
              <option value="Social Security">Social Security (Ujjwala)</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="flex flex-col justify-between hover:border-[#1769AA]/40 transition-all">
            <CardContent className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#1769AA] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {scheme.code}
                  </span>
                  <StatusBadge status={scheme.category} />
                </div>

                <h3 className="text-base font-bold text-[#17212B] leading-snug">
                  {lang === 'hi' ? scheme.nameHindi : scheme.name}
                </h3>

                <div className="text-xs text-[#667085] mt-1">{scheme.department}</div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg my-3.5 text-xs">
                  <span className="font-bold text-emerald-950 block mb-0.5">Key Benefit:</span>
                  <p className="text-emerald-900 leading-relaxed text-xs">{scheme.benefits}</p>
                </div>

                <div className="space-y-1.5 text-xs text-[#667085] pt-1">
                  <div className="flex items-center justify-between">
                    <span>Enrolled Beneficiaries:</span>
                    <span className="font-bold text-[#17212B]">{scheme.enrolledBeneficiaries} Citizens</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Disbursed Allocation:</span>
                    <span className="font-bold text-[#1769AA]">{scheme.sanctionedAmount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#E4E7EC] flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setEligibilityScheme(scheme);
                    setEligibilityResult(null);
                  }}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1769AA] font-bold rounded-lg text-xs transition-colors"
                >
                  Check Eligibility
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAssistanceScheme(scheme);
                      setApplicantName(currentUser.name);
                      setApplicantMobile(currentUser.mobile);
                      setGeneratedToken(null);
                    }}
                    className="px-3.5 py-1.5 bg-[#16865B] hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
                  >
                    Apply Assistance
                  </button>
                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className="px-3 py-1.5 border border-[#E4E7EC] text-[#17212B] font-semibold rounded-lg text-xs hover:bg-[#F5F7FA] transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-4">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-[#1769AA]">
                {selectedScheme.code} • {selectedScheme.category}
              </span>
              <button onClick={() => setSelectedScheme(null)} className="text-[#667085] hover:text-[#17212B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-[#17212B] leading-snug">
              {selectedScheme.name}
            </h2>
            <p className="text-xs text-[#667085] mt-1">{selectedScheme.department}</p>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 my-4 text-xs">
              <span className="font-bold text-emerald-950 block mb-1">Financial & Social Benefits:</span>
              <p className="text-emerald-900 leading-relaxed text-xs">{selectedScheme.benefits}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#17212B] mb-2">Eligibility Criteria:</h4>
                <ul className="space-y-1.5 pl-1">
                  {selectedScheme.eligibilityCriteria.map((crit, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#17212B] text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#16865B] shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#17212B] mb-2">Required Documents:</h4>
                <ul className="space-y-1.5 pl-1">
                  {selectedScheme.requiredDocuments.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#17212B] text-xs">
                      <FileText className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#17212B] mb-1.5">Application Process:</h4>
                <p className="text-[#17212B] bg-[#F5F7FA] p-3 rounded-lg border border-[#E4E7EC] leading-relaxed text-xs">
                  {selectedScheme.applicationProcess}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E4E7EC] mt-5">
              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2 bg-[#0F2747] text-white font-bold rounded-lg text-xs hover:bg-[#173359] transition-colors"
              >
                Close Guidelines
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Eligibility Checker Modal */}
      {eligibilityScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-3">
              <h3 className="text-base font-bold text-[#17212B]">
                Check Eligibility: {eligibilityScheme.code}
              </h3>
              <button onClick={() => setEligibilityScheme(null)} className="text-[#667085] hover:text-[#17212B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckEligibility} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#17212B] mb-1">
                  Annual Household Income:
                </label>
                <select
                  value={userIncome}
                  onChange={(e) => setUserIncome(e.target.value)}
                  className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                >
                  <option value="under_2.5L">Under ₹2.5 Lakh / year</option>
                  <option value="over_2.5L">Above ₹2.5 Lakh / year</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#17212B] mb-1">
                  Agricultural Landholding:
                </label>
                <select
                  value={ownsLand}
                  onChange={(e) => setOwnsLand(e.target.value)}
                  className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                >
                  <option value="under_5_acres">Less than 5 Acres (Marginal Farmer)</option>
                  <option value="over_5_acres">5 Acres or More</option>
                  <option value="landless">Landless Labourer</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#17212B] mb-1">
                  Housing Status (Does applicant live in kutcha shelter?):
                </label>
                <select
                  value={hasKutchaHouse}
                  onChange={(e) => setHasKutchaHouse(e.target.value)}
                  className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                >
                  <option value="yes">Yes (Kutcha mud / tin roof)</option>
                  <option value="no">No (Pucca concrete house)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1769AA] hover:bg-[#135487] text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
              >
                Run AI Eligibility Check
              </button>

              {eligibilityResult !== null && (
                <div
                  className={`p-3.5 rounded-lg border text-xs mt-3 ${
                    eligibilityResult
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-red-50 border-red-200 text-red-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {eligibilityResult ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#16865B]" />
                        <span>ELIGIBLE: Beneficiary passes basic qualification rules!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-[#DC3545]" />
                        <span>NOT ELIGIBLE: Income or landholding exceeds statutory limit.</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs opacity-90 mt-1">
                    {eligibilityResult
                      ? 'You can now proceed to generate an application assistance token for the CSC counter.'
                      : 'Applicant may consult the Panchayat Secretary for discretionary or state relaxation clauses.'}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Application Assistance Token Modal */}
      {assistanceScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-3">
              <h3 className="text-base font-bold text-[#17212B]">
                Panchayat CSC Assistance: {assistanceScheme.code}
              </h3>
              <button onClick={() => setAssistanceScheme(null)} className="text-[#667085] hover:text-[#17212B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!generatedToken ? (
              <form onSubmit={handleRequestAssistance} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Applicant Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#17212B] mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={applicantMobile}
                      onChange={(e) => setApplicantMobile(e.target.value)}
                      className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17212B] mb-1">Ward Number</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={applicantWard}
                      onChange={(e) => setApplicantWard(parseInt(e.target.value) || 1)}
                      className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">
                    Samagra ID or Aadhaar (Last 4 Digits)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 19283746"
                    value={applicantDocId}
                    onChange={(e) => setApplicantDocId(e.target.value)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#16865B] hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
                >
                  Generate Token & Notify Operator
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3 text-xs animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#16865B] mx-auto flex items-center justify-center font-bold">
                  <Ticket className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-2xl text-[#17212B] font-mono tracking-wider">
                  {generatedToken}
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Assistance request registered! Show this token to Smt. Kavita Sharma (Panchayat Operator) at the CSC counter for priority e-KYC filing.
                </p>
                <button
                  onClick={() => setAssistanceScheme(null)}
                  className="px-4 py-2 bg-[#0F2747] text-white font-bold rounded-lg text-xs hover:bg-[#173359] transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
