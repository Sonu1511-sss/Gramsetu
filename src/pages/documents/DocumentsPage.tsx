import { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  FileCheck2,
  Upload,
  Clock,
  X,
  FileSpreadsheet,
  FolderArchive,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { documentService } from '../../services/documentService';
import { PanchayatDocument } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pagination } from '../../components/common/Pagination';

export function DocumentsPage() {
  const [documents, setDocuments] = useState<PanchayatDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Preview Document Modal
  const [previewDoc, setPreviewDoc] = useState<PanchayatDocument | null>(null);

  // Upload Document Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newCategory, setNewCategory] = useState<PanchayatDocument['category']>('Government Orders');
  const [newVersion, setNewVersion] = useState('v1.0 (Signed)');
  const [newDescription, setNewDescription] = useState('');
  const [newFileType, setNewFileType] = useState<PanchayatDocument['fileType']>('PDF');

  const { lang } = useLanguage();
  const { success } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await documentService.uploadDocument({
      documentName: newDocName,
      category: newCategory,
      uploadedBy: currentUser.name,
      uploadedRole: currentUser.designation,
      date: new Date().toISOString().split('T')[0],
      fileSize: '2.4 MB',
      fileType: newFileType,
      version: newVersion,
      status: 'Approved',
      description: newDescription
    });

    setDocuments((prev) => [created, ...prev]);
    setShowUploadModal(false);
    setNewDocName('');
    setNewDescription('');
    success('Document Uploaded', `${created.documentName} archived.`);
  };

  const filteredDocs = documents.filter((d) => {
    const matchesSearch =
      d.documentName.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredDocs.length / pageSize) || 1;
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'दस्तावेज़ एवं आधिकारिक अभिलेख' : 'Document Management & Repository'}
        description="Central digital repository of government orders, Gram Sabha proceedings, DPRs, measurement bills and audit sanctions"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Encrypted Govt Archive
          </span>
        }
        actions={
          currentUser.role !== 'citizen' ? (
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F2747] hover:bg-[#173359] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          ) : undefined
        }
      />

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Archived Documents</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">{documents.length}</p>
                <p className="text-xs text-[#667085] mt-1">Across 6 categories</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center">
                <FolderArchive className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Government Orders</p>
                <p className="text-2xl font-bold text-[#1769AA] mt-1">
                  {documents.filter((d) => d.category === 'Government Orders').length}
                </p>
                <p className="text-xs text-blue-600 font-medium mt-1">Gazette & circulars</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Audit & Bills</p>
                <p className="text-2xl font-bold text-[#16865B] mt-1">
                  {documents.filter((d) => d.category === 'Bills & Vouchers' || d.category === 'Reports').length}
                </p>
                <p className="text-xs text-emerald-600 font-medium mt-1">MB certified</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#16865B] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Storage Utilized</p>
                <p className="text-2xl font-bold text-[#17212B] mt-1">42.8 MB</p>
                <p className="text-xs text-[#667085] mt-1">NIC Cloud Storage</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <HardDrive className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#667085]" />
            <input
              type="text"
              placeholder="Search document title, category, uploader..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B] focus:outline-none focus:border-[#1769AA] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-[#667085]" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs font-medium text-[#17212B] focus:outline-none focus:border-[#1769AA]"
            >
              <option value="All">All Categories ({documents.length})</option>
              <option value="Government Orders">Government Orders</option>
              <option value="Meeting Minutes">Meeting Minutes</option>
              <option value="Project Documents">Project Documents (DPR)</option>
              <option value="Bills & Vouchers">Bills & Vouchers (MB)</option>
              <option value="Approvals">Approvals & Sanctions</option>
              <option value="Reports">Reports & Audits</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] text-[#667085] font-semibold uppercase tracking-wider border-b border-[#E4E7EC]">
              <tr>
                <th className="px-5 py-3.5">Document Title & Format</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Uploaded By</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Version</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {paginatedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F5F7FA]/60 transition-colors">
                  <td className="px-5 py-4 max-w-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-[#1769AA] shrink-0 mt-0.5">
                        {doc.fileType === 'XLSX' ? (
                          <FileSpreadsheet className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div
                          onClick={() => setPreviewDoc(doc)}
                          className="font-bold text-[#17212B] hover:text-[#1769AA] cursor-pointer line-clamp-1"
                        >
                          {doc.documentName}
                        </div>
                        <div className="text-[11px] text-[#667085] mt-0.5">
                          Size: {doc.fileSize} • Format: {doc.fileType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={doc.category} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#17212B]">{doc.uploadedBy}</div>
                    <div className="text-[11px] text-[#667085]">{doc.uploadedRole}</div>
                  </td>
                  <td className="px-5 py-4 text-[#667085] font-mono text-xs">{doc.date}</td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                      {doc.version}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 text-[#667085] hover:text-[#1769AA] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => success('File Download Initiated', doc.documentName)}
                        className="p-1.5 text-[#667085] hover:text-[#16865B] hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredDocs.length}
          pageSize={pageSize}
        />
      </Card>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-[#1769AA]">
                {previewDoc.category}
              </span>
              <button onClick={() => setPreviewDoc(null)} className="text-[#667085] hover:text-[#17212B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-base font-bold text-[#17212B] leading-snug">
              {previewDoc.documentName}
            </h3>

            <div className="p-3.5 bg-[#F5F7FA] rounded-lg border border-[#E4E7EC] my-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#667085]">Uploaded By:</span>
                <span className="font-bold text-[#17212B]">{previewDoc.uploadedBy} ({previewDoc.uploadedRole})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Date of Archive:</span>
                <span className="font-mono text-[#17212B]">{previewDoc.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Version Stamp:</span>
                <span className="font-mono font-bold text-[#16865B]">{previewDoc.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">File Specifications:</span>
                <span className="text-[#17212B]">{previewDoc.fileType} • {previewDoc.fileSize}</span>
              </div>
            </div>

            {previewDoc.description && (
              <p className="text-xs text-[#17212B] leading-relaxed mb-4 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                {previewDoc.description}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E4E7EC]">
              <button
                onClick={() => {
                  success('File Downloaded', previewDoc.documentName);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 bg-[#1769AA] hover:bg-[#135487] text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-[#E4E7EC] max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC] mb-3">
              <h3 className="text-base font-bold text-[#17212B]">
                Upload Document to Panchayat Digital Archive
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-[#667085] hover:text-[#17212B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#17212B] mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gram Sabha Resolution Register Vol 15"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  >
                    <option value="Government Orders">Government Orders</option>
                    <option value="Meeting Minutes">Meeting Minutes</option>
                    <option value="Project Documents">Project Documents</option>
                    <option value="Bills & Vouchers">Bills & Vouchers</option>
                    <option value="Approvals">Approvals</option>
                    <option value="Reports">Reports</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17212B] mb-1">Format</label>
                  <select
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value as any)}
                    className="w-full p-2 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word Document</option>
                    <option value="XLSX">Excel Spreadsheet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#17212B] mb-1">Version & Description</label>
                <textarea
                  rows={2}
                  placeholder="Official order number, dispatch reference, or summary..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-xs text-[#17212B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E4E7EC]">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-[#E4E7EC] rounded-lg text-[#17212B] font-semibold hover:bg-[#F5F7FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F2747] hover:bg-[#173359] text-white font-bold rounded-lg shadow-xs transition-colors"
                >
                  Archive Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
