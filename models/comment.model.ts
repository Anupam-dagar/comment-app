import { User } from "../entities/user";

export interface CreateComment {
  comment: string;
}

export interface Comment {
  id: number;
  comment: string;
  createdBy: number;
  createdAt: string;
  user: User;
  hasUpvoted: boolean;
  totalUpvotes: number;
}
