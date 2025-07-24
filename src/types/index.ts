export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'technician' | 'student';
  full_name?: string;
  avatar?: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role: 'student' | 'technician';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  user_id: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  assignee?: User;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  user?: User;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  tags: string[];
  excerpt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface TicketStats {
  total: number;
  open: number;
  in_progress: number;
  resolved: number;
  closed: number;
  high_priority: number;
  medium_priority: number;
  low_priority: number;
}

export interface TechnicianPerformance {
  technician_id: string;
  technician_name: string;
  tickets_assigned: number;
  tickets_resolved: number;
  average_resolution_time: number;
  rating: number;
}