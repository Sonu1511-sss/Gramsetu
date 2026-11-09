import { Complaint, ComplaintStatus } from '../types';
import { mockComplaints } from '../mock-data/complaints';

const COMPLAINTS_KEY = 'gramsetu_complaints';

export const complaintService = {
  getComplaints: async (): Promise<Complaint[]> => {
    await new Promise((res) => setTimeout(res, 200));
    try {
      const stored = localStorage.getItem(COMPLAINTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return mockComplaints;
  },

  getComplaintById: async (id: string): Promise<Complaint | undefined> => {
    const list = await complaintService.getComplaints();
    return list.find((c) => c.id.toLowerCase() === id.trim().toLowerCase());
  },

  createComplaint: async (data: {
    citizenName: string;
    citizenMobile: string;
    ward: number;
    category: Complaint['category'];
    priority: Complaint['priority'];
    title: string;
    description: string;
    location: string;
    photoUrl?: string;
  }): Promise<Complaint> => {
    await new Promise((res) => setTimeout(res, 350));
    const list = await complaintService.getComplaints();
    const nextNum = 128 + list.length;
    const newId = `GP-2026-00${nextNum}`;
    const now = new Date();
    const timestampStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newComplaint: Complaint = {
      id: newId,
      citizenName: data.citizenName,
      citizenMobile: data.citizenMobile,
      ward: data.ward,
      category: data.category,
      priority: data.priority,
      status: 'New',
      title: data.title,
      description: data.description,
      location: data.location,
      photoUrl: data.photoUrl || 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=600&q=80',
      submittedDate: timestampStr,
      expectedResolutionDate: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      assignedOfficerName: 'Assigned to Ward Supervisory Committee',
      assignedOfficerDesignation: 'Panchayat Grievance Cell',
      timeline: [
        {
          id: `ct-${Date.now()}`,
          status: 'New',
          timestamp: timestampStr,
          note: 'Complaint registered successfully into Gramsetu portal.',
          updatedBy: 'Citizen Self-Service'
        }
      ]
    };

    const updated = [newComplaint, ...list];
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(updated));
    return newComplaint;
  },

  updateComplaintStatus: async (
    id: string,
    newStatus: ComplaintStatus,
    note: string,
    officerName?: string,
    resolvedPhotoUrl?: string
  ): Promise<Complaint> => {
    await new Promise((res) => setTimeout(res, 300));
    const list = await complaintService.getComplaints();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Complaint not found');

    const complaint = list[index];
    const now = new Date();
    const timestampStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const timelineItem = {
      id: `ct-${Date.now()}`,
      status: newStatus,
      timestamp: timestampStr,
      note,
      updatedBy: officerName || 'Panchayat Redressal Officer'
    };

    const updated: Complaint = {
      ...complaint,
      status: newStatus,
      assignedOfficerName: officerName || complaint.assignedOfficerName,
      resolvedPhotoUrl: resolvedPhotoUrl || complaint.resolvedPhotoUrl,
      timeline: [...complaint.timeline, timelineItem]
    };

    list[index] = updated;
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(list));
    return updated;
  },

  addCitizenFeedback: async (id: string, rating: number, comment: string): Promise<Complaint> => {
    await new Promise((res) => setTimeout(res, 300));
    const list = await complaintService.getComplaints();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Complaint not found');

    const updated: Complaint = {
      ...list[index],
      status: 'Closed',
      citizenFeedback: {
        rating,
        comment,
        submittedAt: new Date().toISOString()
      }
    };

    list[index] = updated;
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(list));
    return updated;
  }
};

