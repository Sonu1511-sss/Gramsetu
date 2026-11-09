import { PanchayatMember } from '../types';
import { mockMembers } from '../mock-data/members';

const MEMBERS_KEY = 'gramsetu_members';

export const memberService = {
  getMembers: async (): Promise<PanchayatMember[]> => {
    await new Promise((res) => setTimeout(res, 200));
    try {
      const stored = localStorage.getItem(MEMBERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return mockMembers;
  },

  getMemberById: async (id: string): Promise<PanchayatMember | undefined> => {
    const list = await memberService.getMembers();
    return list.find((m) => m.id === id);
  },

  addMember: async (member: Omit<PanchayatMember, 'id'>): Promise<PanchayatMember> => {
    await new Promise((res) => setTimeout(res, 300));
    const list = await memberService.getMembers();
    const newMember: PanchayatMember = {
      ...member,
      id: `mem-${Date.now().toString().slice(-4)}`
    };
    const updated = [newMember, ...list];
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
    return newMember;
  },

  updateMember: async (id: string, updates: Partial<PanchayatMember>): Promise<PanchayatMember> => {
    await new Promise((res) => setTimeout(res, 300));
    const list = await memberService.getMembers();
    const index = list.findIndex((m) => m.id === id);
    if (index === -1) throw new Error('Member not found');
    const updatedMember = { ...list[index], ...updates };
    list[index] = updatedMember;
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(list));
    return updatedMember;
  }
};

