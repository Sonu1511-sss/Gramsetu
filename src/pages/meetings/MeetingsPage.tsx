import { useState, useEffect } from 'react';
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  FileText,
  AlertCircle,
  X,
  ChevronRight,
  Send,
  Download,
  Award,
  CheckSquare,
  ListOrdered
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { meetingService } from '../../services/meetingService';
import { GramSabhaMeeting } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export function MeetingsPage() {
  const [meetings, setMeetings] = useState<GramSabhaMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'draft'>('upcoming');

  // Selected meeting for detailed inspector
  const [selectedMeeting, setSelectedMeeting] = useState<GramSabhaMeeting | null>(null);

  // Active detail tab: Overview, Agenda, Attendance, Minutes, Resolutions, Action Items
  const [detailTab, setDetailTab] = useState<'overview' | 'agenda' | 'attendance' | 'minutes' | 'resolutions' | 'action_items'>('overview');

  // Modals
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddResolutionModal, setShowAddResolutionModal] = useState(false);
  const [showAddActionModal, setShowAddActionModal] = useState(false);

  // New Meeting Form
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-11-28');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newVenue, setNewVenue] = useState('Panchayat Bhawan Main Hall');
  const [newType, setNewType] = useState<GramSabhaMeeting['meetingType']>('Regular Gram Sabha');

  // New Resolution Form
  const [resTitle, setResTitle] = useState('');
  const [resDecision, setResDecision] = useState<any>('Passed Unanimously');
  const [resPerson, setResPerson] = useState('Er. Amit Kumar Bisen');
  const [resDeadline, setResDeadline] = useState('2026-12-15');

  // New Action Item Form
  const [actTask, setActTask] = useState('');
  const [actAssigned, setActAssigned] = useState('Shri Santosh Dhurve (GRS)');
  const [actDeadline, setActDeadline] = useState('2026-11-20');
  const [actPriority, setActPriority] = useState<any>('High');

  const { lang } = useLanguage();
  const { success } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadMeetings();
  }, []);

  async function loadMeetings() {
    try {
      const data = await meetingService.getMeetings();
      setMeetings(data);
      if (data.length > 0 && !selectedMeeting) {
        setSelectedMeeting(data[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await meetingService.createMeeting({
      title: newTitle,
      titleHindi: newTitle,
      meetingType: newType,
      date: newDate,
      time: newTime,
      venue: newVenue,
      status: 'upcoming',
      chairperson: 'Smt. Sunita Bai Maravi (Sarpanch)',
      secretary: 'Shri Mahendra Singh Patle (Secretary)',
      quorumRequired: 250,
      agenda: [
        {
          id: `ag-${Date.now()}`,
          order: 1,
          title: 'Review of development works and new proposals',
          description: 'Discussion on winter development sanctions and community proposals.',
          proposedBy: currentUser.name
        }
      ]
    });

    setMeetings((prev) => [created, ...prev]);
    setSelectedMeeting(created);
    setShowScheduleModal(false);
    setNewTitle('');
    success('Session Scheduled', `${created.title} added to Gram Sabha calendar.`);
  };

  const handleAddResolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeeting) return;

    const updated = await meetingService.addResolution(selectedMeeting.id, {
      title: resTitle,
      decision: resDecision,
      responsiblePerson: resPerson,
      deadline: resDeadline,
      status: 'In Progress'
    });

    setMeetings((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setSelectedMeeting(updated);
    setShowAddResolutionModal(false);
    setResTitle('');
    success('Resolution Adopted', 'Gram Sabha resolution recorded into register.');
  };

  const handleAddActionItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeeting) return;

    const updated = await meetingService.addActionItem(selectedMeeting.id, {
      task: actTask,
      assignedTo: actAssigned,
      deadline: actDeadline,
      priority: actPriority,
      status: 'Open'
    });

    setMeetings((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setSelectedMeeting(updated);
    setShowAddActionModal(false);
    setActTask('');
    success('Action Item Assigned', 'Task allocated.');
  };

  const filteredMeetings = meetings.filter((m) => m.status === activeTab);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'ग्राम सभा एवं पंचायत बैठक प्रबंधन' : 'Gram Sabha & Meetings'}
        description={
          lang === 'hi'
            ? 'ग्राम सभा बैठकों का डिजिटल आयोजन, एजेंडा प्रकाशन, कोरम उपस्थिति, पारित प्रस्ताव एवं क्रियान्वयन कार्य।'
            : 'Official Gram Sabha scheduling, published agendas, citizen quorum tracking, resolutions, and action items.'
        }
        badge={<StatusBadge status="Next: 15 Nov" variant="warning" dot={false} />}
        actions={
          currentUser.role !== 'citizen' && (
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Schedule Meeting</span>
            </button>
          )
        }
      />

      {/* Main Tabs (Upcoming, Completed, Draft) */}
      <div className="flex items-center gap-2 border-b border-gray-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'border-[#1769AA] text-[#1769AA] font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Upcoming Sessions ({meetings.filter((m) => m.status === 'upcoming').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'border-[#1769AA] text-[#1769AA] font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Completed & Signed ({meetings.filter((m) => m.status === 'completed').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('draft')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'draft'
              ? 'border-[#1769AA] text-[#1769AA] font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4 text-gray-400" />
          <span>Draft Agendas ({meetings.filter((m) => m.status === 'draft').length})</span>
        </button>
      </div>

      {/* Split View: Meetings List on Left (5 cols) & Meeting Inspector on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List Style Meeting Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredMeetings.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-gray-200 text-xs text-gray-400">
              No meetings found in this tab.
            </div>
          ) : (
            filteredMeetings.map((mtg) => {
              const isSelected = selectedMeeting?.id === mtg.id;
              return (
                <Card
                  key={mtg.id}
                  hoverEffect
                  onClick={() => setSelectedMeeting(mtg)}
                  className={`p-4 cursor-pointer ${
                    isSelected
                      ? 'border-[#1769AA] ring-2 ring-blue-100 shadow-sm bg-[#EBF3FA]/30'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] font-bold text-[#1769AA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {mtg.meetingType}
                    </span>
                    <span className="text-[11px] font-bold text-[#B54708] bg-[#FEF6E7] px-2 py-0.5 rounded border border-[#F59E0B]/30">
                      {mtg.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#17212B] leading-snug line-clamp-2">
                    {lang === 'hi' ? mtg.titleHindi : mtg.title}
                  </h3>

                  <div className="mt-2.5 text-xs text-[#667085] space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{mtg.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{mtg.venue}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#F2F4F7] flex items-center justify-between text-[11px]">
                    <span className="text-[#667085]">
                      Quorum Required: <strong>{mtg.quorumRequired}</strong> citizens
                    </span>
                    <span className="font-semibold text-[#1769AA]">View Details →</span>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Right Column: Active Meeting Inspector with Tab Navigation (7 cols) */}
        {selectedMeeting ? (
          <div className="lg:col-span-7">
            <Card className="p-5 sm:p-6 space-y-5">
              {/* Meeting Header */}
              <div className="pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF6E7] text-[#B54708] border border-[#F59E0B]/30 mb-2">
                    <span>{selectedMeeting.meetingType}</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-[#17212B] leading-snug">
                    {selectedMeeting.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#667085] mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#1769AA]" />
                      <strong>{selectedMeeting.date}</strong> at {selectedMeeting.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1769AA]" />
                      <span>{selectedMeeting.venue}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => success('MoM Downloaded', selectedMeeting.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D0D5DD] text-gray-700 hover:bg-gray-50 text-xs font-semibold shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MoM</span>
                </button>
              </div>

              {/* Clean Inspector Tabs: Overview, Agenda, Attendance, Minutes, Resolutions, Action Items */}
              <div className="flex items-center gap-1 border-b border-gray-200 text-xs font-semibold overflow-x-auto pb-1">
                <button
                  onClick={() => setDetailTab('overview')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    detailTab === 'overview'
                      ? 'bg-[#1769AA] text-white shadow-2xs font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setDetailTab('agenda')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    detailTab === 'agenda'
                      ? 'bg-[#1769AA] text-white shadow-2xs font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Agenda ({selectedMeeting.agenda.length})
                </button>
                <button
                  onClick={() => setDetailTab('attendance')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    detailTab === 'attendance'
                      ? 'bg-[#1769AA] text-white shadow-2xs font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Attendance
                </button>
                <button
                  onClick={() => setDetailTab('resolutions')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    detailTab === 'resolutions'
                      ? 'bg-[#1769AA] text-white shadow-2xs font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Resolutions ({selectedMeeting.resolutions.length})
                </button>
                <button
                  onClick={() => setDetailTab('action_items')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    detailTab === 'action_items'
                      ? 'bg-[#1769AA] text-white shadow-2xs font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Action Items ({selectedMeeting.actionItems.length})
                </button>
                <button
                  onClick={() => setDetailTab('minutes')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    detailTab === 'minutes'
                      ? 'bg-[#1769AA] text-white shadow-2xs font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Minutes
                </button>
              </div>

              {/* Tab 1: Overview */}
              {detailTab === 'overview' && (
                <div className="space-y-4 text-xs animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E4E7EC]">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Presiding Officer</div>
                      <div className="font-bold text-[#17212B] mt-0.5">{selectedMeeting.chairperson}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Recording Secretary</div>
                      <div className="font-bold text-[#17212B] mt-0.5">{selectedMeeting.secretary}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Quorum Target</div>
                      <div className="font-bold text-[#16865B] mt-0.5">
                        {selectedMeeting.actualAttendance
                          ? `${selectedMeeting.actualAttendance} Present (Quorum Met)`
                          : `${selectedMeeting.quorumRequired} Citizens (1/10th required)`}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Meeting Key Focus</h4>
                    <p className="text-gray-600 leading-relaxed text-[11px] bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {selectedMeeting.minutesSummary || 'Special session to finalize development estimates under 15th FC and verify beneficiary lists.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Agenda Items */}
              {detailTab === 'agenda' && (
                <div className="space-y-3 text-xs animate-fade-in">
                  {selectedMeeting.agenda.map((ag) => (
                    <div
                      key={ag.id}
                      className="p-3.5 rounded-lg border border-[#E4E7EC] bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1769AA] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {ag.order}
                        </span>
                        <div className="flex-1">
                          <div className="font-bold text-[#17212B] text-xs sm:text-sm">{ag.title}</div>
                          <div className="text-[#667085] mt-1 leading-relaxed text-[11px]">
                            {ag.description}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-1.5 italic">
                            Proposed by: {ag.proposedBy}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Attendance */}
              {detailTab === 'attendance' && (
                <div className="space-y-3 text-xs animate-fade-in">
                  <div className="p-3 bg-[#E8F5EF] rounded-lg border border-[#16865B]/20 text-[#16865B] flex items-center justify-between">
                    <div>
                      <strong>Quorum Target:</strong> {selectedMeeting.quorumRequired} attendees required
                    </div>
                    <span className="font-bold">
                      {selectedMeeting.actualAttendance || 318} Attended
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px]">
                    Official attendance register scanned and biometrically cross-referenced with CSC kiosk token entries.
                  </p>
                </div>
              )}

              {/* Tab 4: Resolutions */}
              {detailTab === 'resolutions' && (
                <div className="space-y-3 text-xs animate-fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#17212B]">Adopted Resolutions</span>
                    {currentUser.role !== 'citizen' && (
                      <button
                        onClick={() => setShowAddResolutionModal(true)}
                        className="text-xs font-semibold text-[#1769AA] hover:underline"
                      >
                        + Add Resolution
                      </button>
                    )}
                  </div>

                  {selectedMeeting.resolutions.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-lg border border-[#16865B]/20 bg-[#E8F5EF]/30 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold text-[#16865B]">
                          {res.resolutionNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5EF] text-[#16865B] border border-[#16865B]/30">
                          {res.decision}
                        </span>
                      </div>
                      <div className="font-bold text-[#17212B]">{res.title}</div>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-[#667085]">
                        <span>Responsible Officer: <strong>{res.responsiblePerson}</strong></span>
                        <span>Deadline: {res.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Action Items */}
              {detailTab === 'action_items' && (
                <div className="space-y-3 text-xs animate-fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#17212B]">Action Tasks & Follow-up</span>
                    {currentUser.role !== 'citizen' && (
                      <button
                        onClick={() => setShowAddActionModal(true)}
                        className="text-xs font-semibold text-[#1769AA] hover:underline"
                      >
                        + Add Action Item
                      </button>
                    )}
                  </div>

                  {selectedMeeting.actionItems.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-lg border border-[#E4E7EC] bg-white text-xs flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-semibold text-[#17212B]">{act.task}</div>
                        <div className="text-[10px] text-[#667085] mt-0.5">
                          Assigned to: <strong>{act.assignedTo}</strong> • Deadline: {act.deadline}
                        </div>
                      </div>
                      <StatusBadge status={act.status} />
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 6: Minutes */}
              {detailTab === 'minutes' && (
                <div className="space-y-3 text-xs animate-fade-in">
                  <div className="p-4 bg-gray-50 rounded-lg border border-[#E4E7EC] leading-relaxed text-[11px] text-gray-700">
                    {selectedMeeting.minutesSummary || 'Minutes are compiled and approved by the Gram Sabha Chairperson.'}
                  </div>
                </div>
              )}
            </Card>
          </div>
        ) : null}
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-[#17212B]">
                Schedule Gram Sabha or Panchayat Session
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleMeeting} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Gram Sabha for Winter Works Review"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Meeting Category</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                >
                  <option value="Regular Gram Sabha">Regular Gram Sabha</option>
                  <option value="Special Gram Sabha">Special Gram Sabha</option>
                  <option value="Panchayat Standing Committee">Panchayat Standing Committee</option>
                  <option value="Social Audit">Social Audit Session</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-3.5 py-2 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1769AA] hover:bg-[#0F2747] text-white font-bold rounded-lg shadow-2xs"
                >
                  Schedule & Issue Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Resolution Modal */}
      {showAddResolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-md w-full p-6">
            <h3 className="text-base font-bold text-[#17212B] mb-3">
              Add Resolution to Session
            </h3>
            <form onSubmit={handleAddResolution} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Resolution Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanction for berm filling CC road"
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Gram Sabha Decision</label>
                <select
                  value={resDecision}
                  onChange={(e) => setResDecision(e.target.value as any)}
                  className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                >
                  <option value="Passed Unanimously">Passed Unanimously</option>
                  <option value="Passed by Majority">Passed by Majority</option>
                  <option value="Deferred">Deferred</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Responsible Officer</label>
                  <input
                    type="text"
                    required
                    value={resPerson}
                    onChange={(e) => setResPerson(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Deadline Date</label>
                  <input
                    type="date"
                    required
                    value={resDeadline}
                    onChange={(e) => setResDeadline(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddResolutionModal(false)}
                  className="px-3.5 py-1.5 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1769AA] text-white font-bold rounded-lg shadow-2xs"
                >
                  Save Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Action Item Modal */}
      {showAddActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4E7EC] max-w-md w-full p-6">
            <h3 className="text-base font-bold text-[#17212B] mb-3">
              Add Action Task
            </h3>
            <form onSubmit={handleAddActionItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Action Task</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Procure bleaching powder and spray machines"
                  value={actTask}
                  onChange={(e) => setActTask(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Assigned To</label>
                  <input
                    type="text"
                    required
                    value={actAssigned}
                    onChange={(e) => setActAssigned(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    required
                    value={actDeadline}
                    onChange={(e) => setActDeadline(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-[#D0D5DD] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddActionModal(false)}
                  className="px-3.5 py-1.5 border border-[#D0D5DD] rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1769AA] text-white font-bold rounded-lg shadow-2xs"
                >
                  Confirm Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
