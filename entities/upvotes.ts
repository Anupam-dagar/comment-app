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
export class Upvotes {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public commentId: number;

  @Column()
  public upvotedBy: number;

  @CreateDateColumn()
  public createdAt: string;

  @Column("datetime", { default: null })
  public deleted_token: string;

  @ManyToOne(() => Comment, (comment) => comment.upvotes)
  @JoinColumn()
  public comment: Comment;
}
