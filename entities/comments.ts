import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommentUpvotes } from "./commentUpvotes";
import { User } from "./user";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public comment: string;

  @Column()
  public createdBy: string;

  @CreateDateColumn()
  public createdAt: string;

  @Column({ nullable: true })
  public parentId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "createdBy" })
  public user: User;

  @OneToMany(() => CommentUpvotes, (upvote) => upvote.comment)
  @JoinColumn({ name: "id" })
  public upvotes: CommentUpvotes;
}
