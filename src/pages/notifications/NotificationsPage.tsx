import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Calendar,
  FolderGit2,
  AlertCircle,
  Award,
  HardHat,
  Filter,
  Check,
  CheckCheck
} from 'lucide-react';
import { mockNotifications } from '../../mock-data/notifications';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const { lang } = useLanguage();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    success('Notifications Read', 'All notifications marked as read.');
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'project':
        return <FolderGit2 className="w-5 h-5 text-[#1769AA]" />;
      case 'complaint':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'scheme':
        return <Award className="w-5 h-5 text-purple-600" />;
      case 'worker':
        return <HardHat className="w-5 h-5 text-[#16865B]" />;
      default:
        return <Bell className="w-5 h-5 text-[#667085]" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'सूचना केंद्र' : 'Notification Center'}
        description="System activity alerts, meeting reminders, grievance allocations, and scheme notices"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-[#1769AA]">
            {unreadCount} Unread Alerts
          </span>
        }
        actions={
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E4E7EC] hover:bg-[#F5F7FA] text-[#17212B] font-bold text-xs rounded-lg transition-colors shadow-xs"
          >
            <CheckCheck className="w-4 h-4 text-[#16865B]" />
            <span>Mark All as Read</span>
          </button>
        }
      />

      {/* Filter Tabs Card */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`py-2 px-4 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-[#1769AA] text-white shadow-xs font-bold'
                  : 'text-[#667085] hover:text-[#17212B] hover:bg-[#F5F7FA]'
              }`}
            >
              All Notifications ({notifications.length})
            </button>

            <button
              onClick={() => setFilter('unread')}
              className={`py-2 px-4 rounded-lg transition-all ${
                filter === 'unread'
                  ? 'bg-[#1769AA] text-white shadow-xs font-bold'
                  : 'text-[#667085] hover:text-[#17212B] hover:bg-[#F5F7FA]'
              }`}
            >
              Unread Only ({unreadCount})
            </button>

            <button
              onClick={() => setFilter('read')}
              className={`py-2 px-4 rounded-lg transition-all ${
                filter === 'read'
                  ? 'bg-[#1769AA] text-white shadow-xs font-bold'
                  : 'text-[#667085] hover:text-[#17212B] hover:bg-[#F5F7FA]'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className={`transition-all hover:border-[#1769AA]/40 ${
              !item.isRead ? 'border-blue-300 ring-1 ring-blue-100 bg-blue-50/15' : ''
            }`}
          >
            <CardContent className="p-4 sm:p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#F5F7FA] border border-[#E4E7EC] shrink-0">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-[#17212B] text-sm">{item.title}</h3>
                  <span className="text-[11px] text-[#667085] font-medium shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-[#667085] mt-1.5 leading-relaxed">{item.message}</p>

                <div className="flex items-center gap-4 mt-3 pt-2 border-t border-gray-100">
                  {item.link && (
                    <button
                      onClick={() => navigate(item.link!)}
                      className="text-[#1769AA] font-bold hover:underline"
                    >
                      View Resource →
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleRead(item.id)}
                    className="text-[#667085] hover:text-[#17212B] transition-colors"
                  >
                    {item.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
