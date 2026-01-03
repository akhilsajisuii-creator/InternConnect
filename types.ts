
export enum Role {
  APPLICANT = 'APPLICANT',
  RECRUITER = 'RECRUITER',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  stipend: string;
  duration: string;
  description: string;
  skills: string[];
  industry: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  createdAt: string;
  createdBy: string;
}

export type Internship = Job;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  token?: string;
  profileImage?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}