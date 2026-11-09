import { useState } from 'react';
import {
  Settings,
  Building2,
  User,
  ShieldCheck,
  Bell,
  Globe,
  RotateCcw,
  CheckCircle2,
  Save,
  Lock,
  Key,
  Shield
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';

export function SettingsPage() {
  const { currentUser } = useAuth();
  const { lang, changeLanguage } = useLanguage();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState<'panchayat' | 'user' | 'rbac' | 'preferences'>('panchayat');

  // Panchayat Profile form state
  const [gpName, setGpName] = useState('Gram Panchayat Rampur');
  const [block, setBlock] = useState('Waraseoni');
  const [district, setDistrict] = useState('Balaghat');
  const [state, setState] = useState('Madhya Pradesh');
  const [pincode, setPincode] = useState('481331');

  // Notification Preferences
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [gramSabhaReminders, setGramSabhaReminders] = useState(true);
  const [complaintEscalationAlerts, setComplaintEscalationAlerts] = useState(true);

  const handleSavePanchayat = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Panchayat institutional profile updated.');
  };

  const handleResetDemoData = () => {
    localStorage.clear();
    success('Demo Reset Complete', 'All localStorage data reset to factory demo values.');
    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'सेटिंग्स एवं प्रशासनिक प्राथमिकताएं' : 'Settings & System Preferences'}
        description="Institutional Panchayat credentials, user profile, role-based access control (RBAC), and notifications"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            Platform Configuration v2.0
          </span>
        }
        actions={
          <button
            onClick={handleResetDemoData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        }
      />

      {/* Navigation Tabs Card */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-2 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('panchayat')}
              className={`py-2 px-4 rounded-lg flex items-center gap-2 shrink-0 transition-all ${
                activeTab === 'panchayat'
                  ? 'bg-[#1769AA] text-white shadow-xs font-bold'
                  : 'text-[#667085] hover:text-[#17212B] hover:bg-[#F5F7FA]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Panchayat Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('user')}
              className={`py-2 px-4 rounded-lg flex items-center gap-2 shrink-0 transition-all ${
                activeTab === 'user'
                  ? 'bg-[#1769AA] text-white shadow-xs font-bold'
                  : 'text-[#667085] hover:text-[#17212B] hover:bg-[#F5F7FA]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>User Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('rbac')}
              className={`py-2 px-4 rounded-lg flex items-center gap-2 shrink-0 transition-all ${
                activeTab === 'rbac'
                  ? 'bg-[#1769AA] text-white shadow-xs font-bold'
                  : 'text-[#667085] hover:text-[#17212B] hover:bg-[#F5F7FA]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Role Permissions (RBAC)</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-2 px-4 rounded-lg flex items-center gap-2 shrink-0 transition-all ${
                activeTab === 'preferences'
                  ? 'bg-[#1769AA] text-white shadow-xs font-bold'
                  : 'text-[#667085] hover:text-[#17212B] hover:bg-[#F5F7FA]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Language & Alerts</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab 1: Panchayat Profile */}
      {activeTab === 'panchayat' && (
        <Card className="max-w-3xl">
          <CardHeader className="pb-3 border-b border-[#E4E7EC]">
            <CardTitle>Institutional Gram Panchayat Details</CardTitle>
            <p className="text-xs text-[#667085]">Statutory location, block codes and district administrative alignment</p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSavePanchayat} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#17212B] mb-1">Panchayat Name</label>
                <input
                  type="text"
                  value={gpName}
                  onChange={(e) => setGpName(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Block / Tehsil</label>
                  <input
                    type="text"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Postal PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs font-mono text-[#17212B]"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0F2747] hover:bg-[#173359] text-white font-bold rounded-lg text-xs shadow-xs flex items-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Institutional Profile</span>
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: User Profile */}
      {activeTab === 'user' && (
        <Card className="max-w-3xl">
          <CardHeader className="pb-3 border-b border-[#E4E7EC]">
            <CardTitle>Current Authenticated User Profile</CardTitle>
            <p className="text-xs text-[#667085]">Active session credentials and administrative designation</p>
          </CardHeader>
          <CardContent className="p-6 space-y-5 text-xs">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#1769AA]"
              />
              <div>
                <div className="text-lg font-bold text-[#17212B]">{currentUser.name}</div>
                <div className="text-xs text-[#667085] mt-0.5">{currentUser.designation}</div>
                <div className="mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#1769AA]">
                  Role: {currentUser.role.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E4E7EC]">
              <div>
                <span className="text-[#667085] block text-xs">Mobile Number</span>
                <span className="font-mono font-bold text-[#17212B] text-sm mt-0.5 block">{currentUser.mobile}</span>
              </div>
              <div>
                <span className="text-[#667085] block text-xs">Assigned Administrative Jurisdiction</span>
                <span className="font-semibold text-[#17212B] text-sm mt-0.5 block">
                  {currentUser.ward ? `Ward 0${currentUser.ward}` : 'Entire Gram Panchayat (All 12 Wards)'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: RBAC Matrix */}
      {activeTab === 'rbac' && (
        <Card>
          <CardHeader className="pb-3 border-b border-[#E4E7EC]">
            <CardTitle>Role-Based Access Control (RBAC) Matrix</CardTitle>
            <p className="text-xs text-[#667085]">Institutional security permissions enforced across 6 elected and administrative roles</p>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#667085] font-semibold uppercase tracking-wider border-b border-[#E4E7EC]">
                <tr>
                  <th className="px-5 py-3.5">Role Title</th>
                  <th className="px-5 py-3.5">Admin Access</th>
                  <th className="px-5 py-3.5">Development Works</th>
                  <th className="px-5 py-3.5">Grievance Actions</th>
                  <th className="px-5 py-3.5">Financial Reports</th>
                  <th className="px-5 py-3.5">AI Insights</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                <tr className="hover:bg-[#F5F7FA]/60">
                  <td className="px-5 py-4 font-bold text-[#17212B]">Sarpanch</td>
                  <td className="px-5 py-4 text-[#16865B] font-bold">Full Super-Admin</td>
                  <td className="px-5 py-4 text-[#16865B]">Sanction & Approve</td>
                  <td className="px-5 py-4 text-[#16865B]">Full Redressal</td>
                  <td className="px-5 py-4 text-[#16865B]">Full Access</td>
                  <td className="px-5 py-4 text-[#16865B] font-bold">Full Access</td>
                </tr>
                <tr className="hover:bg-[#F5F7FA]/60">
                  <td className="px-5 py-4 font-bold text-[#17212B]">Panchayat Secretary</td>
                  <td className="px-5 py-4 text-[#16865B] font-bold">Administrative</td>
                  <td className="px-5 py-4 text-[#16865B]">MB Verification</td>
                  <td className="px-5 py-4 text-[#16865B]">Assign & Resolve</td>
                  <td className="px-5 py-4 text-[#16865B]">Full Access</td>
                  <td className="px-5 py-4 text-[#16865B]">Full Access</td>
                </tr>
                <tr className="hover:bg-[#F5F7FA]/60">
                  <td className="px-5 py-4 font-bold text-[#17212B]">Ward Panch</td>
                  <td className="px-5 py-4 text-[#667085]">Ward Scope</td>
                  <td className="px-5 py-4 text-[#1769AA]">Ward Monitoring</td>
                  <td className="px-5 py-4 text-[#1769AA]">Ward Grievances</td>
                  <td className="px-5 py-4 text-[#667085]">Read Only</td>
                  <td className="px-5 py-4 text-[#1769AA]">Ward Insights</td>
                </tr>
                <tr className="hover:bg-[#F5F7FA]/60">
                  <td className="px-5 py-4 font-bold text-[#17212B]">Technical Assistant</td>
                  <td className="px-5 py-4 text-[#667085]">Technical</td>
                  <td className="px-5 py-4 text-[#16865B] font-bold">DPR & Inspection</td>
                  <td className="px-5 py-4 text-[#1769AA]">Engineering Issues</td>
                  <td className="px-5 py-4 text-[#16865B]">Technical Audit</td>
                  <td className="px-5 py-4 text-[#1769AA]">Risk Matrix</td>
                </tr>
                <tr className="hover:bg-[#F5F7FA]/60">
                  <td className="px-5 py-4 font-bold text-[#17212B]">Panchayat Operator</td>
                  <td className="px-5 py-4 text-[#667085]">Data Entry</td>
                  <td className="px-5 py-4 text-[#667085]">View Only</td>
                  <td className="px-5 py-4 text-[#1769AA]">Log Grievances</td>
                  <td className="px-5 py-4 text-[#667085]">Read Only</td>
                  <td className="px-5 py-4 text-[#667085]">View Only</td>
                </tr>
                <tr className="hover:bg-[#F5F7FA]/60">
                  <td className="px-5 py-4 font-bold text-[#17212B]">Citizen</td>
                  <td className="px-5 py-4 text-[#667085]">Public Portal</td>
                  <td className="px-5 py-4 text-[#667085]">Public Works</td>
                  <td className="px-5 py-4 text-[#1769AA] font-bold">Lodge & Track</td>
                  <td className="px-5 py-4 text-[#667085]">Social Audit</td>
                  <td className="px-5 py-4 text-[#667085]">Citizen Insights</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Preferences & Language */}
      {activeTab === 'preferences' && (
        <Card className="max-w-3xl">
          <CardHeader className="pb-3 border-b border-[#E4E7EC]">
            <CardTitle>System Localization & Notification Automations</CardTitle>
            <p className="text-xs text-[#667085]">Multilingual configuration and civic citizen dispatch gateways</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6 text-xs">
            <div>
              <h3 className="font-bold text-sm text-[#17212B] mb-2">Display Language</h3>
              <p className="text-xs text-[#667085] mb-3">
                Switch entire interface labels and data displays between English and Hindi.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    changeLanguage('en');
                    success('Language Changed', 'Switched to English interface');
                  }}
                  className={`px-4 py-2 rounded-lg font-bold transition-all text-xs ${
                    lang === 'en'
                      ? 'bg-[#1769AA] text-white shadow-xs'
                      : 'bg-gray-100 text-[#17212B] hover:bg-gray-200'
                  }`}
                >
                  English (Default)
                </button>
                <button
                  onClick={() => {
                    changeLanguage('hi');
                    success('भाषा बदली गई', 'हिंदी इंटरफ़ेस सक्रिय');
                  }}
                  className={`px-4 py-2 rounded-lg font-bold transition-all text-xs ${
                    lang === 'hi'
                      ? 'bg-[#16865B] text-white shadow-xs'
                      : 'bg-gray-100 text-[#17212B] hover:bg-gray-200'
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E7EC]">
              <h3 className="font-bold text-sm text-[#17212B] mb-3">Automated Citizen Communication Gateways</h3>
              <div className="space-y-3.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#1769AA] rounded mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-[#17212B]">SMS Gateway Alerts to Citizens</div>
                    <div className="text-xs text-[#667085]">
                      Send automated SMS notifications when grievance ticket is registered or resolved
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gramSabhaReminders}
                    onChange={(e) => setGramSabhaReminders(e.target.checked)}
                    className="w-4 h-4 text-[#1769AA] rounded mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-[#17212B]">Gram Sabha Automated 7-Day & 24-Hr Reminders</div>
                    <div className="text-xs text-[#667085]">
                      Dispatch WhatsApp / SMS broadcast to all registered ward residents
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={complaintEscalationAlerts}
                    onChange={(e) => setComplaintEscalationAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#1769AA] rounded mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-[#17212B]">Auto-Escalation for High Priority Grievances</div>
                    <div className="text-xs text-[#667085]">
                      Alert Sarpanch mobile directly if an urgent water or power complaint remains unresolved past 48 hours
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
