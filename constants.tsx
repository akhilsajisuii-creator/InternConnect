
import { Job, Role, User } from './types';

// Standardized mock jobs using updated Job interface fields
export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    /* Fix: Removed recruiterId as it does not exist in the Job interface */
    title: 'Frontend Engineering Intern',
    description: 'Join our creative team to build responsive and intuitive user interfaces using React and Tailwind CSS.',
    industry: 'Technology',
    /* Fix: Changed 'Internship' to 'On-site' to match valid Job types */
    type: 'On-site',
    location: 'San Francisco, CA',
    companyName: 'TechNova',
    companyLogo: 'https://picsum.photos/seed/technova/100/100',
    skills: ['React', 'TypeScript', 'Tailwind'],
    createdAt: new Date().toISOString(),
    createdBy: 'rec-1',
    stipend: '$2000/mo',
    duration: '3 Months'
  },
  {
    id: '2',
    /* Fix: Removed recruiterId as it does not exist in the Job interface */
    title: 'Product Design Intern',
    description: 'We are looking for a design enthusiast to help us define the future of mobile banking.',
    industry: 'FinTech',
    type: 'Remote',
    location: 'New York, NY',
    companyName: 'FinFlow',
    companyLogo: 'https://picsum.photos/seed/finflow/100/100',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    createdAt: new Date().toISOString(),
    createdBy: 'rec-1',
    stipend: '$1500/mo',
    duration: '4 Months'
  },
  {
    id: '3',
    /* Fix: Removed recruiterId as it does not exist in the Job interface */
    title: 'Backend Developer (Go)',
    description: 'Help scale our cloud infrastructure and build robust APIs for high-concurrency systems.',
    industry: 'Cloud Services',
    /* Fix: Changed 'Full-time' to 'On-site' to match valid Job types */
    type: 'On-site',
    location: 'Seattle, WA',
    companyName: 'CloudPeak',
    companyLogo: 'https://picsum.photos/seed/cloudpeak/100/100',
    skills: ['Go', 'Kubernetes', 'PostgreSQL'],
    createdAt: new Date().toISOString(),
    createdBy: 'rec-2',
    stipend: '$2500/mo',
    duration: '6 Months'
  }
];

export const CURRENT_USER: User = {
  id: 'user-123',
  email: 'alex@example.com',
  name: 'Alex Rivera',
  role: Role.APPLICANT,
  profileImage: 'https://picsum.photos/seed/alex/100/100'
};