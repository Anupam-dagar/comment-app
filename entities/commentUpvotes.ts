import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comments";

@Entity()
export class CommentUpvotes {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public commentId: string;

  @Column()
  public upvotedBy: string;

  @CreateDateColumn()
  public createdAt: string;

  @ManyToOne(() => Comment, (comment) => comment.upvotes)
  @JoinColumn()
  public comment: Comment;
}
