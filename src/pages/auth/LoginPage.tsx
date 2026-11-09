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
  Sparkles
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
      <div className="bg-[#0F2747] text-white px-4 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider">GOVERNMENT OF MADHYA PRADESH</span>
          <span className="text-gray-400">|</span>
          <span>Panchayat & Rural Development Department</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300 font-semibold">
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
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              GRAMSETU
            </h1>
            <p className="text-sm font-medium text-blue-100 mt-1">
              "Panchayat ka har kaam, ek digital platform par."
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-xs text-amber-300 border border-amber-300/30">
              <span>Gram Panchayat Rampur • Balaghat (M.P.)</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Standard Mobile & OTP Form */}
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium pb-1 border-b border-gray-100">
                <span>Official Staff / Citizen Login</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLoginMode('otp')}
                    className={`font-semibold ${loginMode === 'otp' ? 'text-[#1769AA]' : 'text-gray-400'}`}
                  >
                    OTP
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setLoginMode('password')}
                    className={`font-semibold ${loginMode === 'password' ? 'text-[#1769AA]' : 'text-gray-400'}`}
                  >
                    Password
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    {loginMode === 'otp' ? 'One-Time Password (OTP)' : 'Security Password'}
                  </label>
                  {loginMode === 'otp' && (
                    <span className="text-[11px] text-[#1769AA] font-semibold cursor-pointer">
                      Resend OTP (Demo: 123456)
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={loginMode === 'otp' ? 'text' : 'password'}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0F2747] hover:bg-[#1769AA] text-white text-sm font-bold rounded-lg shadow transition-all"
              >
                <span>Sign In to Panchayat Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Role Login Section */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instant 1-Click Demo Login
                </span>
                <span className="text-[11px] text-gray-400">Click any role to test</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('sarpanch', 'Sarpanch')}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-amber-300 bg-amber-50/70 hover:bg-amber-100/90 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    सर
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 group-hover:text-amber-900">
                      Login as Sarpanch
                    </div>
                    <div className="text-[10px] text-gray-600 truncate">
                      Smt. Sunita Bai (Full Admin)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('secretary', 'Panchayat Secretary')}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100/90 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1769AA] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    सचि
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-900">
                      Login as Secretary
                    </div>
                    <div className="text-[10px] text-gray-600 truncate">
                      Shri Mahendra Singh (Admin)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('panch', 'Ward Panch')}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/90 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#16865B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    पंच
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-900">
                      Login as Panch Member
                    </div>
                    <div className="text-[10px] text-gray-600 truncate">
                      Smt. Rekha (Ward 04)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('technical_assistant', 'Technical Assistant')}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/90 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    उप
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 group-hover:text-indigo-900">
                      Login as Sub-Engineer
                    </div>
                    <div className="text-[10px] text-gray-600 truncate">
                      Er. Amit Bisen (Projects)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('citizen', 'Citizen')}
                  className="sm:col-span-2 flex items-center justify-between p-2.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ना
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Login as Citizen (Public View)
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Shri Ramcharan Gautam — Track complaints, view Gram Sabha & schemes
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-800" />
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Confidential Demo Environment:</strong> All citizen names, complaint records and numbers are simulated mock data prepared specifically for the Panchayat presentation.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white border-t border-[#E4E7EC] py-3 px-4 text-center text-xs text-gray-500">
        GRAMSETU Digital Panchayat Platform • National Informatics & e-Governance Best Practice
      </div>
    </div>
  );
}

