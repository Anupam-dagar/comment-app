export enum UpvoteType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

export interface UpvoteMessage {
  commentId: number;
  type: UpvoteType;
  parentId?: number;
}
