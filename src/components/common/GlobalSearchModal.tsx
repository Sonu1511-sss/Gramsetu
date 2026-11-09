import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FolderGit2, AlertCircle, Users, Calendar, Award, FileText, ArrowRight } from 'lucide-react';
import { mockProjects } from '../../mock-data/projects';
import { mockComplaints } from '../../mock-data/complaints';
import { mockMembers } from '../../mock-data/members';
import { mockMeetings } from '../../mock-data/meetings';
import { mockSchemes } from '../../mock-data/schemes';
import { mockDocuments } from '../../mock-data/documents';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProjects = trimmed
    ? mockProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.code.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.location.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingComplaints = trimmed
    ? mockComplaints.filter(
        (c) =>
          c.id.toLowerCase().includes(trimmed) ||
          c.title.toLowerCase().includes(trimmed) ||
          c.citizenName.toLowerCase().includes(trimmed) ||
          c.category.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingMembers = trimmed
    ? mockMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(trimmed) ||
          m.designation.toLowerCase().includes(trimmed) ||
          m.contact.includes(trimmed)
      )
    : [];

  const matchingMeetings = trimmed
    ? mockMeetings.filter(
        (m) =>
          m.title.toLowerCase().includes(trimmed) ||
          m.meetingType.toLowerCase().includes(trimmed) ||
          m.date.includes(trimmed)
      )
    : [];

  const matchingSchemes = trimmed
    ? mockSchemes.filter(
        (s) =>
          s.name.toLowerCase().includes(trimmed) ||
          s.code.toLowerCase().includes(trimmed) ||
          s.category.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingDocs = trimmed
    ? mockDocuments.filter(
        (d) =>
          d.documentName.toLowerCase().includes(trimmed) ||
          d.category.toLowerCase().includes(trimmed)
      )
    : [];

  const totalResults =
    matchingProjects.length +
    matchingComplaints.length +
    matchingMembers.length +
    matchingMeetings.length +
    matchingSchemes.length +
    matchingDocs.length;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-200 bg-gray-50/50">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, complaints, staff, meetings, schemes, documents... (ESC to close)"
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-gray-200 text-gray-600">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {!trimmed && (
            <div className="py-8 text-center text-sm text-gray-500">
              <p className="font-medium text-gray-700">Unified Panchayat Search</p>
              <p className="text-xs text-gray-400 mt-1">
                Type keywords like "Road", "Water", "Sunita Bai", "PMAY", "Gram Sabha"
              </p>
            </div>
          )}

          {trimmed && totalResults === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No matching records found for "{query}".
            </div>
          )}

          {matchingProjects.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                Development Projects ({matchingProjects.length})
              </div>
              <div className="space-y-1">
                {matchingProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect('/projects')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50 cursor-pointer group transition-colors text-sm"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-700">
                        {p.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Ward {p.ward} • {p.category} • Progress: {p.progress}%
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingComplaints.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Complaints ({matchingComplaints.length})
              </div>
              <div className="space-y-1">
                {matchingComplaints.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect('/complaints')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer group transition-colors text-sm"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-amber-800">
                        <span className="font-mono text-xs text-amber-700 font-semibold mr-2">{c.id}</span>
                        {c.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Citizen: {c.citizenName} • Ward {c.ward} • Status: {c.status}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingMembers.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Members & Staff ({matchingMembers.length})
              </div>
              <div className="space-y-1">
                {matchingMembers.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleSelect('/members')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-emerald-50 cursor-pointer group transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={m.photo} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-emerald-800">
                          {m.name}
                        </div>
                        <div className="text-xs text-gray-500">{m.designation}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingMeetings.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Gram Sabha & Meetings ({matchingMeetings.length})
              </div>
              <div className="space-y-1">
                {matchingMeetings.map((mtg) => (
                  <div
                    key={mtg.id}
                    onClick={() => handleSelect('/meetings')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-indigo-50 cursor-pointer group transition-colors text-sm"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-indigo-800">
                        {mtg.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Date: {mtg.date} at {mtg.time} • {mtg.venue}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingSchemes.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-600" />
                Government Schemes ({matchingSchemes.length})
              </div>
              <div className="space-y-1">
                {matchingSchemes.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect('/schemes')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-purple-50 cursor-pointer group transition-colors text-sm"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-purple-800">
                        <span className="font-mono text-xs font-semibold text-purple-700 mr-2">{s.code}</span>
                        {s.name}
                      </div>
                      <div className="text-xs text-gray-500">{s.category} • {s.department}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingDocs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                Documents Repository ({matchingDocs.length})
              </div>
              <div className="space-y-1">
                {matchingDocs.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSelect('/documents')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-teal-50 cursor-pointer group transition-colors text-sm"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-teal-800">
                        {d.documentName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {d.category} • Uploaded by {d.uploadedBy} ({d.fileType})
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <span>Gramsetu Global Directory</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}

