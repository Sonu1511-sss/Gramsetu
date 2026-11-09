import { AppNotification } from '../types';

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Gram Sabha Meeting Scheduled',
    message: 'Gram Sabha meeting scheduled for 15 November 2026 at 10:30 AM in Panchayat Bhawan.',
    timestamp: '2 hours ago',
    type: 'meeting',
    isRead: false,
    link: '/meetings'
  },
  {
    id: 'notif-2',
    title: 'Project Progress Milestone Updated',
    message: 'Project Ward 04 (CC Road Construction) reached 68% progress. Curing in progress.',
    timestamp: '4 hours ago',
    type: 'project',
    isRead: false,
    link: '/projects'
  },
  {
    id: 'notif-3',
    title: 'New Citizen Complaint Assigned',
    message: 'Complaint GP-2026-00124 (Street light not working) assigned to Ward Panch & Line Tech.',
    timestamp: '1 day ago',
    type: 'complaint',
    isRead: true,
    link: '/complaints'
  },
  {
    id: 'notif-4',
    title: 'Government Scheme Notification Available',
    message: 'Special registration camp for Ladli Behna Yojana e-KYC starting on 12 November.',
    timestamp: '1 day ago',
    type: 'scheme',
    isRead: true,
    link: '/schemes'
  },
  {
    id: 'notif-5',
    title: 'Worker Attendance Recorded',
    message: '9 out of 10 registered Panchayat workers reported present on morning muster roll.',
    timestamp: '2 days ago',
    type: 'worker',
    isRead: true,
    link: '/workers'
  }
];

