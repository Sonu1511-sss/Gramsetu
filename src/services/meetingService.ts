import { GramSabhaMeeting } from '../types';
import { mockMeetings } from '../mock-data/meetings';

const MEETINGS_KEY = 'gramsetu_meetings';

export const meetingService = {
  getMeetings: async (): Promise<GramSabhaMeeting[]> => {
    await new Promise((res) => setTimeout(res, 200));
    try {
      const stored = localStorage.getItem(MEETINGS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return mockMeetings;
  },

  getMeetingById: async (id: string): Promise<GramSabhaMeeting | undefined> => {
    const list = await meetingService.getMeetings();
    return list.find((m) => m.id === id);
  },

  createMeeting: async (data: Omit<GramSabhaMeeting, 'id' | 'resolutions' | 'actionItems'>): Promise<GramSabhaMeeting> => {
    await new Promise((res) => setTimeout(res, 350));
    const list = await meetingService.getMeetings();
    const newMeeting: GramSabhaMeeting = {
      ...data,
      id: `mtg-${Date.now().toString().slice(-4)}`,
      resolutions: [],
      actionItems: []
    };
    const updated = [newMeeting, ...list];
    localStorage.setItem(MEETINGS_KEY, JSON.stringify(updated));
    return newMeeting;
  },

  addResolution: async (
    meetingId: string,
    resolution: {
      title: string;
      decision: 'Passed Unanimously' | 'Passed by Majority' | 'Deferred' | 'Rejected';
      responsiblePerson: string;
      deadline: string;
      status: 'In Progress' | 'Implemented' | 'Pending';
    }
  ): Promise<GramSabhaMeeting> => {
    await new Promise((res) => setTimeout(res, 300));
    const list = await meetingService.getMeetings();
    const index = list.findIndex((m) => m.id === meetingId);
    if (index === -1) throw new Error('Meeting not found');

    const meeting = list[index];
    const resCount = meeting.resolutions.length + 1;
    const newResolution = {
      id: `res-${Date.now()}`,
      resolutionNumber: `GS-2026-${resCount.toString().padStart(2, '0')}`,
      ...resolution
    };

    const updated = {
      ...meeting,
      resolutions: [...meeting.resolutions, newResolution]
    };

    list[index] = updated;
    localStorage.setItem(MEETINGS_KEY, JSON.stringify(list));
    return updated;
  },

  addActionItem: async (
    meetingId: string,
    action: {
      task: string;
      assignedTo: string;
      deadline: string;
      priority: 'High' | 'Medium' | 'Low';
      status: 'Open' | 'In Progress' | 'Completed';
    }
  ): Promise<GramSabhaMeeting> => {
    await new Promise((res) => setTimeout(res, 300));
    const list = await meetingService.getMeetings();
    const index = list.findIndex((m) => m.id === meetingId);
    if (index === -1) throw new Error('Meeting not found');

    const meeting = list[index];
    const newAction = {
      id: `act-${Date.now()}`,
      ...action
    };

    const updated = {
      ...meeting,
      actionItems: [...meeting.actionItems, newAction]
    };

    list[index] = updated;
    localStorage.setItem(MEETINGS_KEY, JSON.stringify(list));
    return updated;
  }
};

