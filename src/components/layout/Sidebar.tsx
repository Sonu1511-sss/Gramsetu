import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquareText,
  FolderGit2,
  Calendar,
  AlertCircle,
  Award,
  HardHat,
  MapPin,
  FileText,
  BarChart3,
  BrainCircuit,
  Bell,
  Settings,
  X,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavSection {
  title: string;
  titleHindi: string;
  items: {
    name: string;
    nameHindi: string;
    path: string;
    icon: any;
    allowedRoles?: UserRole[];
    badge?: string;
    badgeVariant?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  }[];
}

export function Sidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const { currentUser } = useAuth();
  const { lang } = useLanguage();

  const navSections: NavSection[] = [
    {
      title: 'MAIN',
      titleHindi: 'मुख्य',
      items: [
        {
          name: 'Dashboard',
          nameHindi: 'डैशबोर्ड',
          path: '/',
          icon: LayoutDashboard
        }
      ]
    },
    {
      title: 'PANCHAYAT',
      titleHindi: 'पंचायत प्रशासन',
      items: [
        {
          name: 'Members & Staff',
          nameHindi: 'सदस्य एवं स्टाफ',
          path: '/members',
          icon: Users,
          allowedRoles: ['sarpanch', 'up_sarpanch', 'secretary', 'operator', 'technical_assistant']
        },
        {
          name: 'Village Information',
          nameHindi: 'ग्राम प्रोफाइल व वार्ड',
          path: '/village',
          icon: MapPin
        }
      ]
    },
    {
      title: 'DEVELOPMENT',
      titleHindi: 'विकास कार्य',
      items: [
        {
          name: 'Projects',
          nameHindi: 'विकास कार्य निगरानी',
          path: '/projects',
          icon: FolderGit2,
          badge: '12',
          badgeVariant: 'green'
        },
        {
          name: 'Workers & Attendance',
          nameHindi: 'श्रमिक व उपस्थिति',
          path: '/workers',
          icon: HardHat,
          allowedRoles: ['sarpanch', 'up_sarpanch', 'secretary', 'gram_rojgar_sahayak', 'operator', 'technical_assistant']
        },
        {
          name: 'Gram Sabha',
          nameHindi: 'ग्राम सभा व बैठकें',
          path: '/meetings',
          icon: Calendar,
          badge: '15 Nov',
          badgeVariant: 'amber'
        }
      ]
    },
    {
      title: 'CITIZEN SERVICES',
      titleHindi: 'नागरिक सेवाएं',
      items: [
        {
          name: 'Complaints',
          nameHindi: 'नागरिक शिकायतें',
          path: '/complaints',
          icon: AlertCircle,
          badge: '16',
          badgeVariant: 'red'
        },
        {
          name: 'Government Schemes',
          nameHindi: 'शासकीय योजनाएं',
          path: '/schemes',
          icon: Award
        }
      ]
    },
    {
      title: 'REPORTS',
      titleHindi: 'रिपोर्ट्स व विश्लेषण',
      items: [
        {
          name: 'Reports & Analytics',
          nameHindi: 'रिपोर्ट्स व ऑडिट',
          path: '/reports',
          icon: BarChart3,
          allowedRoles: ['sarpanch', 'up_sarpanch', 'secretary', 'technical_assistant', 'operator']
        },
        {
          name: 'AI Intelligence',
          nameHindi: 'एआई इंटेलिजेंस',
          path: '/ai-intelligence',
          icon: BrainCircuit,
          badge: 'AI',
          badgeVariant: 'purple'
        }
      ]
    },
    {
      title: 'SYSTEM',
      titleHindi: 'सिस्टम',
      items: [
        {
          name: 'Notices & Circulars',
          nameHindi: 'सूचनाएं व परिपत्र',
          path: '/notices',
          icon: MessageSquareText
        },
        {
          name: 'Documents',
          nameHindi: 'दस्तावेज़ अभिलेख',
          path: '/documents',
          icon: FileText
        },
        {
          name: 'Notifications',
          nameHindi: 'सूचनाएं',
          path: '/notifications',
          icon: Bell
        },
        {
          name: 'Settings',
          nameHindi: 'सेटिंग्स',
          path: '/settings',
          icon: Settings
        }
      ]
    }
  ];

  const getBadgeClass = (variant?: string) => {
    switch (variant) {
      case 'green':
        return 'bg-[#E8F5EF] text-[#16865B] border border-[#16865B]/20';
      case 'amber':
        return 'bg-[#FEF6E7] text-[#B54708] border border-[#F59E0B]/30';
      case 'red':
        return 'bg-[#FEF3F2] text-[#B42318] border border-[#DC3545]/20';
      case 'purple':
        return 'bg-[#F4F3FF] text-[#5925DC] border border-[#5925DC]/20';
      default:
        return 'bg-[#EBF3FA] text-[#1769AA] border border-[#1769AA]/20';
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-[#0F2747] text-white flex flex-col border-r border-[#173860] transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}`}
      >
        {/* Logo and Brand Header */}
        <div className="h-16 px-4 border-b border-[#1A3860] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1769AA] to-[#16865B] flex items-center justify-center font-black text-white text-base shadow-sm shrink-0 border border-white/20">
              ग
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[17px] tracking-tight text-white">
                    GramSetu
                  </span>
                </div>
                <div className="text-[10px] text-gray-300 font-medium tracking-wide">
                  Digital Gram Panchayat
                </div>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Card (Desktop Expanded only) */}
        {!isCollapsed && (
          <div className="px-3 py-2.5 mx-3 my-2.5 rounded-lg bg-[#0A1D36] border border-[#1A3860] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <div className="truncate text-xs">
                <div className="font-semibold text-gray-200 truncate">
                  {currentUser.role.replace('_', ' ').toUpperCase()}
                </div>
                <div className="text-[10px] text-gray-400 truncate">Rampur GP • Balaghat</div>
              </div>
            </div>
          </div>
        )}

        {/* Grouped Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4 scrollbar-thin">
          {navSections.map((section) => {
            // Filter section items by role
            const visibleItems = section.items.filter((item) => {
              if (currentUser.role === 'sarpanch') return true;
              if (!item.allowedRoles) return true;
              return item.allowedRoles.includes(currentUser.role);
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={section.title} className="space-y-1">
                {!isCollapsed ? (
                  <div className="px-3 pt-1 pb-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    {lang === 'hi' ? section.titleHindi : section.title}
                  </div>
                ) : (
                  <div className="h-px bg-[#1A3860] my-2" />
                )}

                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      title={isCollapsed ? item.name : undefined}
                      className={({ isActive }) =>
                        `group relative flex items-center ${
                          isCollapsed ? 'justify-center px-2' : 'justify-between px-3'
                        } py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                          isActive
                            ? 'bg-[#1769AA] text-white font-semibold shadow-sm'
                            : 'text-gray-300 hover:bg-[#163359] hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active Left Indicator Pill */}
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-amber-400" />
                          )}

                          <div className="flex items-center gap-3 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                              }`}
                            />
                            {!isCollapsed && (
                              <span className="truncate">
                                {lang === 'hi' ? item.nameHindi : item.name}
                              </span>
                            )}
                          </div>

                          {!isCollapsed && item.badge && (
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0 ${getBadgeClass(
                                item.badgeVariant
                              )}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer with Collapse Toggle on Desktop */}
        <div className="p-3 bg-[#0A1D36] border-t border-[#1A3860] flex items-center justify-between shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 text-[11px] text-gray-400 min-w-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Govt. Verified Platform</span>
            </div>
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
          )}

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
