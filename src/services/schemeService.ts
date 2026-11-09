import { Scheme } from '../types';
import { mockSchemes } from '../mock-data/schemes';

const SCHEMES_KEY = 'gramsetu_schemes';

export const schemeService = {
  getSchemes: async (category?: string): Promise<Scheme[]> => {
    await new Promise((res) => setTimeout(res, 200));
    let list: Scheme[] = [];
    try {
      const stored = localStorage.getItem(SCHEMES_KEY);
      list = stored ? JSON.parse(stored) : mockSchemes;
    } catch {
      list = mockSchemes;
    }

    if (category && category !== 'All') {
      list = list.filter((s) => s.category === category);
    }
    return list;
  },

  getSchemeById: async (id: string): Promise<Scheme | undefined> => {
    const list = await schemeService.getSchemes();
    return list.find((s) => s.id === id);
  },

  submitAssistanceRequest: async (
    schemeId: string,
    applicantData: {
      name: string;
      mobile: string;
      ward: number;
      aadhaarOrSamagra: string;
      notes?: string;
    }
  ): Promise<{ success: boolean; tokenNumber: string }> => {
    await new Promise((res) => setTimeout(res, 400));
    const token = `CSC-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    // Record into localStorage
    const existing = JSON.parse(localStorage.getItem('gramsetu_scheme_applications') || '[]');
    existing.push({
      schemeId,
      token,
      ...applicantData,
      submittedAt: new Date().toISOString(),
      status: 'Verification Pending at Panchayat Operator Counter'
    });
    localStorage.setItem('gramsetu_scheme_applications', JSON.stringify(existing));
    return { success: true, tokenNumber: token };
  }
};

