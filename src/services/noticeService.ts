import { Notice } from '../types';
import { mockNotices } from '../mock-data/notices';

const NOTICES_KEY = 'gramsetu_notices';

export const noticeService = {
  getNotices: async (): Promise<Notice[]> => {
    await new Promise((res) => setTimeout(res, 200));
    try {
      const stored = localStorage.getItem(NOTICES_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return mockNotices;
  },

  createNotice: async (notice: Omit<Notice, 'id'>): Promise<Notice> => {
    await new Promise((res) => setTimeout(res, 350));
    const list = await noticeService.getNotices();
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now().toString().slice(-4)}`
    };
    const updated = [newNotice, ...list];
    localStorage.setItem(NOTICES_KEY, JSON.stringify(updated));
    return newNotice;
  },

  markAsRead: async (id: string): Promise<void> => {
    const list = await noticeService.getNotices();
    const item = list.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
      localStorage.setItem(NOTICES_KEY, JSON.stringify(list));
    }
  }
};

