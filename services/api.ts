
import { Internship, User, Role, ApiResponse } from '../types';

const STORAGE_KEYS = {
  USERS: 'internconnect_users_v2',
  INTERNSHIPS: 'internconnect_jobs_v2',
};

// Simulated network delay
const delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

const INITIAL_JOBS: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    companyName: 'Meta',
    companyLogo: 'https://picsum.photos/seed/meta/100/100',
    location: 'Remote',
    stipend: '₹35,000/mo',
    duration: '6 Months',
    industry: 'Technology',
    type: 'Remote',
    description: 'Work on building high-performance React components for global scale applications.',
    skills: ['React', 'TypeScript', 'Tailwind'],
    createdAt: new Date().toISOString(),
    createdBy: 'admin-1'
  },
  {
    id: '2',
    title: 'Data Analyst Intern',
    companyName: 'Amazon',
    companyLogo: 'https://picsum.photos/seed/amazon/100/100',
    location: 'Bangalore, India',
    stipend: '₹30,000/mo',
    duration: '3 Months',
    industry: 'E-commerce',
    type: 'On-site',
    description: 'Help us derive insights from massive datasets to improve supply chain efficiency.',
    skills: ['Python', 'SQL', 'Tableau'],
    createdAt: new Date().toISOString(),
    createdBy: 'admin-1'
  }
];

const getDB = <T>(key: string, initial: T[]): T[] => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

const saveDB = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const authService = {
  register: async (name: string, email: string, password: string, role: Role): Promise<ApiResponse<User>> => {
    await delay(800);
    const users = getDB<any>(STORAGE_KEYS.USERS, []);
    if (users.find((u: any) => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }
    const newUser = { id: Math.random().toString(36).substr(2, 9), name, email, password: btoa(password), role };
    users.push(newUser);
    saveDB(STORAGE_KEYS.USERS, users);
    return { success: true, message: 'Registration successful!' };
  },

  login: async (email: string, password: string): Promise<ApiResponse<User>> => {
    await delay(800);
    const users = getDB<any>(STORAGE_KEYS.USERS, []);
    const user = users.find((u: any) => u.email === email && u.password === btoa(password));
    if (!user) return { success: false, message: 'Invalid email or password.' };
    
    const token = btoa(JSON.stringify({ id: user.id, role: user.role }));
    return { 
      success: true, 
      data: { id: user.id, name: user.name, email: user.email, role: user.role, token, profileImage: `https://ui-avatars.com/api/?name=${user.name}&background=random` }, 
      message: 'Logged in successfully.' 
    };
  }
};

export const internshipService = {
  getAll: async (): Promise<ApiResponse<Internship[]>> => {
    await delay(500);
    return { success: true, data: getDB<Internship>(STORAGE_KEYS.INTERNSHIPS, INITIAL_JOBS), message: 'Jobs fetched.' };
  },

  getById: async (id: string): Promise<ApiResponse<Internship>> => {
    await delay(300);
    const db = getDB<Internship>(STORAGE_KEYS.INTERNSHIPS, INITIAL_JOBS);
    const item = db.find(i => i.id === id);
    return item ? { success: true, data: item, message: 'Job found.' } : { success: false, message: 'Job not found.' };
  },

  create: async (payload: Partial<Internship>, token: string): Promise<ApiResponse<Internship>> => {
    if (!token) return { success: false, message: 'Unauthorized access.' };
    await delay(1000);
    const db = getDB<Internship>(STORAGE_KEYS.INTERNSHIPS, INITIAL_JOBS);
    const newItem: Internship = {
      ...payload as Internship,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      companyLogo: payload.companyLogo || `https://picsum.photos/seed/${payload.companyName}/100/100`
    };
    db.unshift(newItem);
    saveDB(STORAGE_KEYS.INTERNSHIPS, db);
    return { success: true, data: newItem, message: 'Internship published.' };
  },

  update: async (id: string, payload: Partial<Internship>, token: string): Promise<ApiResponse<Internship>> => {
    if (!token) return { success: false, message: 'Unauthorized access.' };
    await delay(800);
    const db = getDB<Internship>(STORAGE_KEYS.INTERNSHIPS, INITIAL_JOBS);
    const idx = db.findIndex(i => i.id === id);
    if (idx === -1) return { success: false, message: 'Job not found.' };
    db[idx] = { ...db[idx], ...payload };
    saveDB(STORAGE_KEYS.INTERNSHIPS, db);
    return { success: true, data: db[idx], message: 'Job updated.' };
  },

  delete: async (id: string, token: string): Promise<ApiResponse<null>> => {
    if (!token) return { success: false, message: 'Unauthorized access.' };
    await delay(500);
    const db = getDB<Internship>(STORAGE_KEYS.INTERNSHIPS, INITIAL_JOBS);
    saveDB(STORAGE_KEYS.INTERNSHIPS, db.filter(i => i.id !== id));
    return { success: true, message: 'Job deleted.' };
  }
};
