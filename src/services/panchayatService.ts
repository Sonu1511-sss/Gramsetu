import { VillageProfile } from '../types';
import { mockVillageProfile } from '../mock-data/panchayat';

const PROFILE_KEY = 'gramsetu_village_profile';

export const panchayatService = {
  getVillageProfile: async (): Promise<VillageProfile> => {
    await new Promise((res) => setTimeout(res, 200));
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return mockVillageProfile;
  },

  updateVillageProfile: async (data: Partial<VillageProfile>): Promise<VillageProfile> => {
    await new Promise((res) => setTimeout(res, 300));
    const current = await panchayatService.getVillageProfile();
    const updated = { ...current, ...data };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  }
};

