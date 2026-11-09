import { useState, useEffect } from 'react';
import {
  MessageSquareText,
  Plus,
  Search,
  Filter,
  FileText,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Send,
  Users,
  X,
  Download,
  Share2,
  BellRing
} from 'lucide-react';
import { noticeService } from '../../services/noticeService';
import { Notice } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';

export function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [audienceFilter, setAudienceFilter] = useState('All');

  // Create Notice Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Notice['category']>('Notice Board');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Notice['priority']>('medium');
  const [targetAudience, setTargetAudience] = useState<Notice['targetAudience']>('All');
  const [validUntil, setValidUntil] = useState('2026-11-30');

  // Preview Notice Modal
  const [previewNotice, setPreviewNotice] = useState<Notice | null>(null);

  const { lang } = useLanguage();
  const { success } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadNotices();
  }, []);

  async function loadNotices() {
    try {
      const data = await noticeService.getNotices();
      setNotices(data);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice = await noticeService.createNotice({
      title,
      titleHindi: title,
      category,
      description,
      priority,
      targetAudience,
      publishDate: new Date().toISOString().split('T')[0],
      validUntil,
      attachmentName: `${title.replace(/\s+/g, '_').slice(0, 20)}_Notice.pdf`,
      attachmentSize: '1.1 MB',
      isRead: false,
      author: currentUser.name,
      authorRole: currentUser.designation
    });

    setNotices((prev) => [newNotice, ...prev]);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
    success('Notice Published', 'Notification dispatched to selected audience.');
  };

  const handleMarkAsRead = async (id: string) => {
    await noticeService.markAsRead(id);
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
    const matchesAudience = audienceFilter === 'All' || n.targetAudience === audienceFilter;
    return matchesSearch && matchesCategory && matchesAudience;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'सूचनाएं, परिपत्र एवं घोषणाएं' : 'Communication & Notice Management'}
        description="Official Gram Panchayat digital notice board, Gram Sabha circulars and public announcements"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-[#1769AA]">
            {notices.length} Published Notices
          </span>
        }
        actions={
          currentUser.role !== 'citizen' ? (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F2747] hover:bg-[#173359] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          ) : undefined
        }
      />

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#667085]" />
            <input
              type="text"
              placeholder="Search notice by title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B] focus:outline-none focus:border-[#1769AA] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#667085]">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#1769AA]"
              >
                <option value="All">All Categories</option>
                <option value="Notice Board">Notice Board</option>
                <option value="Official Circulars">Official Circulars</option>
                <option value="Announcements">Announcements</option>
                <option value="Gram Sabha Notice">Gram Sabha Notice</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#667085]">Audience:</span>
              <select
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="px-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#1769AA]"
              >
                <option value="All">All Audiences</option>
                <option value="Citizens">Citizens</option>
                <option value="Ward Members">Ward Members</option>
                <option value="Staff">Panchayat Staff</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotices.map((n) => (
          <Card
            key={n.id}
            className={`flex flex-col justify-between hover:border-[#1769AA]/40 transition-all ${
              !n.isRead ? 'border-blue-300 ring-1 ring-blue-100 shadow-xs' : ''
            }`}
          >
            <CardContent className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Category, Priority and Target Audience Badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={n.category} />
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        n.priority === 'urgent'
                          ? 'bg-red-100 text-red-800'
                          : n.priority === 'high'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {n.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#667085] font-medium">
                    <Users className="w-3.5 h-3.5 text-[#667085]" />
                    <span>{n.targetAudience}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold text-[#17212B] leading-snug hover:text-[#1769AA] cursor-pointer"
                  onClick={() => {
                    setPreviewNotice(n);
                    handleMarkAsRead(n.id);
                  }}
                >
                  {lang === 'hi' ? n.titleHindi : n.title}
                </h3>

                {/* Description preview */}
                <p className="text-xs text-[#667085] mt-2 line-clamp-3 leading-relaxed">
                  {n.description}
                </p>

                {/* Attachment badge */}
                {n.attachmentName && (
                  <div className="mt-3.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F5F7FA] border border-[#E4E7EC] text-xs text-[#17212B] font-medium">
                    <FileText className="w-3.5 h-3.5 text-[#1769AA]" />
                    <span className="truncate max-w-[200px]">{n.attachmentName}</span>
                    <span className="text-[#667085]">({n.attachmentSize})</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3.5 border-t border-[#E4E7EC] flex items-center justify-between text-xs text-[#667085]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#667085]" />
                  <span>Published: {n.publishDate}</span>
                </div>

                <button
                  onClick={() => {
                    setPreviewNotice(n);
                    handleMarkAsRead(n.id);
                  }}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1769AA] font-bold rounded-lg text-xs transition-colors"
                >
                  Read Notice
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {previewNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-[#1769AA]">
                  {previewNotice.category}
                </span>
                <span className="text-xs font-semibold text-[#667085]">
                  Target: {previewNotice.targetAudience}
                </span>
              </div>
              <button
                onClick={() => setPreviewNotice(null)}
                className="text-[#667085] hover:text-[#17212B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-[#17212B] leading-snug">
              {previewNotice.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-[#667085] my-2">
              <span>Published by: <strong className="text-[#17212B]">{previewNotice.author}</strong> ({previewNotice.authorRole})</span>
              <span>•</span>
              <span>Date: {previewNotice.publishDate}</span>
            </div>

            <div className="p-4 bg-[#F5F7FA] rounded-lg border border-[#E4E7EC] my-4 text-xs text-[#17212B] leading-relaxed whitespace-pre-wrap">
              {previewNotice.description}
            </div>

            {previewNotice.attachmentName && (
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg flex items-center justify-between text-xs mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1769AA]" />
                  <span className="font-semibold text-[#17212B]">{previewNotice.attachmentName}</span>
                  <span className="text-[#667085]">({previewNotice.attachmentSize})</span>
                </div>
                <button
                  onClick={() => success('File Downloaded', previewNotice.attachmentName)}
                  className="flex items-center gap-1 text-[#1769AA] font-bold hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E4E7EC]">
              <button
                onClick={() => setPreviewNotice(null)}
                className="px-4 py-2 bg-[#0F2747] hover:bg-[#173359] text-white font-bold rounded-lg text-xs transition-colors"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-4">
              <h3 className="text-base font-bold text-[#17212B]">
                Publish Official Notice or Circular
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#667085] hover:text-[#17212B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#17212B] mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Swachhata Shramdaan & Gram Sabha"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  >
                    <option value="Notice Board">Notice Board</option>
                    <option value="Official Circulars">Official Circulars</option>
                    <option value="Announcements">Announcements</option>
                    <option value="Gram Sabha Notice">Gram Sabha Notice</option>
                    <option value="Tender">Tender Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  >
                    <option value="All">All Panchayat & Citizens</option>
                    <option value="Citizens">Citizens</option>
                    <option value="Ward Members">Ward Members</option>
                    <option value="Staff">Panchayat Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#17212B] mb-1">Full Notice Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter detailed notice description, location, timing, and statutory reference..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E4E7EC]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-[#E4E7EC] rounded-lg text-[#17212B] font-semibold hover:bg-[#F5F7FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F2747] hover:bg-[#173359] text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish & Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
