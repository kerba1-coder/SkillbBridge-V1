export type UserRole = 'learner' | 'poster';

export interface Milestone {
  title: string;
  description: string;
  weeks: string;
}

export interface Gig {
  id: string;
  title: string;
  desc: string;
  org: string;
  image?: string;
  type: string;
  price?: number | string;
  valuation?: string;
  duration: string;
  category: string;
  status: 'Draft' | 'Active' | 'Completed';
  skills: string[];
  postedBy: string;
  createdAt: string;
  updatedAt?: string;
  location?: string;
  workload?: string;
  experienceLevel?: string;
}

export interface MasteredSkill {
  name: string;
  level: string;
  tags: string[];
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  fullName?: string; // Added for compatibility
  role: UserRole;
  persona?: string;
  level?: number;
  experienceHours?: number;
  credentialsEarned?: number;
  efficiency?: number;
  masteredSkills?: MasteredSkill[];
  createdAt: string;
  updatedAt?: string;
}

export interface Application {
  id: string;
  gigId: string;
  gigTitle?: string; // Added for compatibility
  userId: string;
  status: 'Applied' | 'Shortlisted' | 'Accepted' | 'Rejected' | 'Withdrawn';
  matchScore: number;
  applicantName: string;
  applicantAvatar?: string;
  applicantSkills: string[];
  applicantPersona?: string;
  message?: string; // Added for compatibility
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  gigId: string;
  authorId: string;
  recipientId: string;
  score: number;
  comment: string;
  createdAt: string;
}

export interface DisputeTimelineEvent {
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface Dispute {
  id: string;
  gigId: string;
  gigTitle: string;
  organizationName: string;
  status: string;
  priority: string;
  track: string;
  timeline: DisputeTimelineEvent[];
}

export interface RegionalInsight {
  metro: string;
  gigsCount: number;
  valueCreated: number;
}
