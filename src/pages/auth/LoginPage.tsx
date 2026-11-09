import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Smartphone,
  KeyRound,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  Landmark
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { UserRole } from '../../types';

export function LoginPage() {
  const [mobile, setMobile] = useState('9826144520');
  const [otp, setOtp] = useState('123456');
  const [loginMode, setLoginMode] = useState<'otp' | 'password'>('otp');
  const [loading, setLoading] = useState(false);

  const { loginWithRole } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithRole('sarpanch');
      success('Logged In Successfully', 'Welcome to Gramsetu Panchayat Platform');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: UserRole, roleName: string) => {
    setLoading(true);
    try {
      await loginWithRole(role);
      success(`Logged in as ${roleName}`, 'Demo Session Initialized');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-between">
      {/* Top Govt Bar */}
      <div className="bg-[#0F2747] text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-blue-950">
        <div className="flex items-center gap-2 max-w-full truncate">
          <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-bold tracking-wider">GOVERNMENT OF MADHYA PRADESH</span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="text-gray-300 hidden sm:inline">Panchayat & Rural Development Department</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300 font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Digital Demo</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#E4E7EC] overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0F2747] via-[#1769AA] to-[#16865B] p-6 sm:p-8 text-white text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center mb-3 border border-white/20 shadow-inner">
              <Building2 className="w-8 h-8 text-amber-300" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              GRAMSETU
            </h1>
            <p className="text-sm font-medium text-blue-100 mt-1">
              "Panchayat ka har kaam, ek digital platform par."
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-black/20 px-3.5 py-1 rounded-full text-xs text-amber-300 border border-amber-300/30">
              <span>Gram Panchayat Rampur • Waraseoni, Balaghat (M.P.)</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Standard Mobile & OTP Form */}
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#667085] font-medium pb-1.5 border-b border-[#E4E7EC]">
                <span className="font-bold text-[#17212B]">Official Staff / Citizen Sign In</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLoginMode('otp')}
                    className={`font-bold transition-colors ${loginMode === 'otp' ? 'text-[#1769AA]' : 'text-[#667085] hover:text-[#17212B]'}`}
                  >
                    OTP
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setLoginMode('password')}
                    className={`font-bold transition-colors ${loginMode === 'password' ? 'text-[#1769AA]' : 'text-[#667085] hover:text-[#17212B]'}`}
                  >
                    Password
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#667085]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-sm text-[#17212B] focus:outline-none focus:border-[#1769AA] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#17212B]">
                    {loginMode === 'otp' ? 'One-Time Password (OTP)' : 'Security Password'}
                  </label>
                  {loginMode === 'otp' && (
                    <span className="text-xs text-[#1769AA] font-semibold cursor-pointer">
                      Demo OTP: <strong className="font-mono">123456</strong>
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#667085]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={loginMode === 'otp' ? 'text' : 'password'}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-sm text-[#17212B] focus:outline-none focus:border-[#1769AA] transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0F2747] hover:bg-[#173359] text-white text-sm font-bold rounded-lg shadow-xs transition-colors"
              >
                <span>Sign In to Panchayat Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Role Login Section */}
            <div className="pt-4 border-t border-[#E4E7EC]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#17212B] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instant 1-Click Demo Login
                </span>
                <span className="text-xs text-[#667085]">Switch roles instantly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('sarpanch', 'Sarpanch')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    सर
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#17212B] group-hover:text-amber-900">
                      Login as Sarpanch
                    </div>
                    <div className="text-[11px] text-[#667085] truncate">
                      Smt. Sunita Bai (Full Admin)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('secretary', 'Panchayat Secretary')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1769AA] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    सचि
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#17212B] group-hover:text-blue-900">
                      Login as Secretary
                    </div>
                    <div className="text-[11px] text-[#667085] truncate">
                      Shri Mahendra Singh (Admin)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('panch', 'Ward Panch')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#16865B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    पंच
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#17212B] group-hover:text-emerald-900">
                      Login as Panch Member
                    </div>
                    <div className="text-[11px] text-[#667085] truncate">
                      Smt. Rekha (Ward 04)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('technical_assistant', 'Technical Assistant')}
                  className="flex items-center gap-3 p-3 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    उप
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#17212B] group-hover:text-indigo-900">
                      Login as Sub-Engineer
                    </div>
                    <div className="text-[11px] text-[#667085] truncate">
                      Er. Amit Bisen (Works TA)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('citizen', 'Citizen')}
                  className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-gray-100 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0F2747] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ना
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17212B]">
                        Login as Citizen (Public View)
                      </div>
                      <div className="text-[11px] text-[#667085]">
                        Shri Ramcharan Gautam — Track complaints, view Gram Sabha & schemes
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#17212B]" />
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Confidential Demo Environment:</strong> All citizen names, complaint records and figures are simulated mock data prepared specifically for the Panchayat digital governance presentation.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white border-t border-[#E4E7EC] py-3.5 px-4 text-center text-xs text-[#667085]">
        GRAMSETU Digital Panchayat Platform • Built for Panchayat & Rural Development Department
      </div>
    </div>
  );
}
