export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  bio?: string;
  city?: string;
  college?: string;
  avatar_url?: string;
  language?: string;
  role: string;
  followers_count: number;
  following_count: number;
  trust_score: number;
  created_at: string;
}

export interface Idea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  domain: string;
  city?: string;
  college?: string;
  tags: string[];
  required_skills: string[];
  goal_amount: number;
  status: string;
  views_count: number;
  upvotes_count: number;
  downvotes_count: number;
  pledged_amount: number;
  created_at: string;
  users?: Partial<User>; // populated by API
}

export interface Comment {
  id: string;
  idea_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  users?: Partial<User>;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  reference_id?: string;
  is_read: boolean;
  created_at: string;
}
