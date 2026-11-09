import { PanchayatDocument } from '../types';
import { mockDocuments } from '../mock-data/documents';

const DOCS_KEY = 'gramsetu_documents';

export const documentService = {
  getDocuments: async (category?: string): Promise<PanchayatDocument[]> => {
    await new Promise((res) => setTimeout(res, 200));
    let list: PanchayatDocument[] = [];
    try {
      const stored = localStorage.getItem(DOCS_KEY);
      list = stored ? JSON.parse(stored) : mockDocuments;
    } catch {
      list = mockDocuments;
    }

    if (category && category !== 'All') {
      list = list.filter((d) => d.category === category);
    }
    return list;
  },

  uploadDocument: async (doc: Omit<PanchayatDocument, 'id'>): Promise<PanchayatDocument> => {
    await new Promise((res) => setTimeout(res, 350));
    const list = await documentService.getDocuments();
    const newDoc: PanchayatDocument = {
      ...doc,
      id: `doc-${Date.now().toString().slice(-4)}`
    };
    const updated = [newDoc, ...list];
    localStorage.setItem(DOCS_KEY, JSON.stringify(updated));
    return newDoc;
  }
};

