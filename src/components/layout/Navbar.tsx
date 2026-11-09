import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  UserCheck,
  Building2,
  HelpCircle,
  ExternalLink,
  Presentation
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { mockNotifications } from '../../mock-data/notifications';
import { UserRole } from '../../types';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
}

export function Navbar({ onToggleSidebar, onOpenSearch }: NavbarProps) {
  const { currentUser, loginWithRole, logout } = useAuth();
  const { lang, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const rolesList: { role: UserRole; title: string; subtitle: string }[] = [
    { role: 'sarpanch', title: 'Sarpanch (Gram Pradhan)', subtitle: 'Full Super-Admin Access' },
    { role: 'secretary', title: 'Panchayat Secretary (Sachiv)', subtitle: 'Administrative Access' },
    { role: 'panch', title: 'Ward Panch (Ward 04)', subtitle: 'Ward-level Oversight' },
    { role: 'technical_assistant', title: 'Technical Assistant (Sub-Engineer)', subtitle: 'Projects & Inspections' },
    { role: 'operator', title: 'Panchayat Operator / CSC', subtitle: 'Data Entry & Schemes' },
    { role: 'gram_rojgar_sahayak', title: 'Gram Rojgar Sahayak (GRS)', subtitle: 'MGNREGA & Labor' },
    { role: 'citizen', title: 'Citizen (Public Portal)', subtitle: 'Complaints & Schemes' }
  ];

  const handleRoleChange = async (role: UserRole) => {
    await loginWithRole(role);
    setShowRoleMenu(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Generate breadcrumb page name
  const getPageTitle = () => {
    const p = location.pathname;
    if (p === '/') return lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard';
    if (p.includes('/members')) return lang === 'hi' ? 'पंचायत सदस्य व स्टाफ' : 'Members & Staff';
    if (p.includes('/projects')) return lang === 'hi' ? 'विकास कार्य निगरानी' : 'Development Projects';
    if (p.includes('/meetings')) return lang === 'hi' ? 'ग्राम सभा एवं बैठकें' : 'Gram Sabha & Meetings';
    if (p.includes('/complaints')) return lang === 'hi' ? 'नागरिक शिकायत निवारण' : 'Citizen Complaints';
    if (p.includes('/schemes')) return lang === 'hi' ? 'शासकीय योजनाएं' : 'Government Schemes';
    if (p.includes('/workers')) return lang === 'hi' ? 'श्रमिक व उपस्थिति' : 'Workers & Attendance';
    if (p.includes('/village')) return lang === 'hi' ? 'ग्राम प्रोफाइल व वार्ड' : 'Village Information';
    if (p.includes('/documents')) return lang === 'hi' ? 'दस्तावेज़ अभिलेख' : 'Documents Repository';
    if (p.includes('/reports')) return lang === 'hi' ? 'रिपोर्ट्स व विश्लेषण' : 'Reports & Analytics';
    if (p.includes('/ai-intelligence')) return lang === 'hi' ? 'एआई इंटेलिजेंस' : 'AI Panchayat Intelligence';
    if (p.includes('/notices')) return lang === 'hi' ? 'सूचनाएं व परिपत्र' : 'Notices & Circulars';
    if (p.includes('/notifications')) return lang === 'hi' ? 'सूचना केंद्र' : 'Notifications';
    if (p.includes('/settings')) return lang === 'hi' ? 'सेटिंग्स' : 'Settings';
    return 'GramSetu';
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E4E7EC] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Breadcrumb / Panchayat context */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-[#17212B] truncate tracking-tight">
                {getPageTitle()}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5EF] text-[#16865B] border border-[#16865B]/20">
                Gram Panchayat Rampur
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#667085]">
              <span>District: Balaghat</span>
              <span>•</span>
              <span>Madhya Pradesh</span>
              <span>•</span>
              <span className="text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 text-[10px]">
                Demo Data
              </span>
            </div>
          </div>
        </div>

        {/* Center: Clean Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-[#667085] bg-[#F5F7FA] hover:bg-gray-100 border border-[#E4E7EC] rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <span>Search projects, complaints, staff, schemes...</span>
            </span>
            <kbd className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#D0D5DD] text-[#344054] shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Actions: Mobile search, Lang toggle, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Bilingual Switcher */}
          <div className="flex items-center bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2.5 py-1 rounded transition-colors ${
                lang === 'en'
                  ? 'bg-white text-[#1769AA] font-bold shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('hi')}
              className={`px-2.5 py-1 rounded transition-colors ${
                lang === 'hi'
                  ? 'bg-white text-[#16865B] font-bold shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-[#344054]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#DC3545] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#E4E7EC] py-2 z-50 animate-fade-in">
                <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                  <div className="font-bold text-sm text-[#17212B]">
                    Notifications ({notifications.length})
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-[#1769AA] hover:underline font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.link) navigate(n.link);
                        setShowNotifMenu(false);
                      }}
                      className={`p-3 text-xs hover:bg-gray-50 cursor-pointer transition-colors ${
                        !n.isRead ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{n.title}</span>
                        <span className="text-[10px] text-gray-400">{n.timestamp}</span>
                      </div>
                      <p className="text-gray-600 line-clamp-2 text-[11px]">{n.message}</p>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <button
                    onClick={() => {
                      navigate('/notifications');
                      setShowNotifMenu(false);
                    }}
                    className="text-xs font-semibold text-[#1769AA] hover:text-[#0F2747]"
                  >
                    View All Notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#1769AA]/20 shrink-0"
              />
              <div className="hidden xl:block text-left min-w-0">
                <div className="text-xs font-bold text-[#17212B] truncate leading-tight">
                  {lang === 'hi' ? currentUser.nameHindi : currentUser.name}
                </div>
                <div className="text-[10px] text-[#667085] truncate font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{lang === 'hi' ? currentUser.designationHindi : currentUser.designation}</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E4E7EC] py-2 z-50 animate-fade-in">
                {/* Active User Header */}
                <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/70">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    Current Active Role
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">{currentUser.name}</div>
                  <div className="text-xs text-gray-600">{currentUser.designation}</div>
                  <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#16865B]/10 text-[#16865B] border border-[#16865B]/20">
                    Role: {currentUser.role.toUpperCase()}
                  </div>
                </div>

                {/* Role Switcher */}
                <div className="px-4 pt-2.5 pb-1 text-[11px] font-bold text-gray-500 uppercase flex items-center justify-between">
                  <span>Switch Demo Role</span>
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>

                <div className="max-h-56 overflow-y-auto px-2 py-1 space-y-1">
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => handleRoleChange(r.role)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                        currentUser.role === r.role
                          ? 'bg-[#EBF3FA] text-[#1769AA] font-bold border border-[#1769AA]/20'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-[10px] text-gray-500">{r.subtitle}</div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-2 px-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
