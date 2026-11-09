import { Worker } from '../types';
import { mockWorkers } from '../mock-data/workers';

const WORKERS_KEY = 'gramsetu_workers';

export const workerService = {
  getWorkers: async (): Promise<Worker[]> => {
    await new Promise((res) => setTimeout(res, 200));
    try {
      const stored = localStorage.getItem(WORKERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return mockWorkers;
  },

  updateAttendance: async (workerId: string, attendance: 'Present' | 'Absent' | 'Leave'): Promise<Worker> => {
    await new Promise((res) => setTimeout(res, 200));
    const list = await workerService.getWorkers();
    const index = list.findIndex((w) => w.id === workerId);
    if (index === -1) throw new Error('Worker not found');

    const updated = {
      ...list[index],
      todayAttendance: attendance
    };
    list[index] = updated;
    localStorage.setItem(WORKERS_KEY, JSON.stringify(list));
    return updated;
  },

  assignWork: async (
    workerId: string,
    assignment: {
      task: string;
      location: string;
      deadline: string;
      priority: 'High' | 'Medium' | 'Low';
    }
  ): Promise<Worker> => {
    await new Promise((res) => setTimeout(res, 300));
    const list = await workerService.getWorkers();
    const index = list.findIndex((w) => w.id === workerId);
    if (index === -1) throw new Error('Worker not found');

    const updated = {
      ...list[index],
      assignedTask: assignment.task,
      taskLocation: assignment.location,
      taskDeadline: assignment.deadline,
      taskPriority: assignment.priority,
      taskStatus: 'In Progress' as const
    };
    list[index] = updated;
    localStorage.setItem(WORKERS_KEY, JSON.stringify(list));
    return updated;
  }
};

