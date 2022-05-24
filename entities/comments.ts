import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Upvotes } from "./upvotes";
import { User } from "./user";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public comment: string;

  @Column()
  public createdBy: number;

  @CreateDateColumn()
  public createdAt: string;

  @Column({ default: null, nullable: true })
  public parentId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "createdBy" })
  public user: User;

  @OneToMany(() => Upvotes, (upvote) => upvote.comment)
  @JoinColumn({ name: "id" })
  public upvotes: Upvotes[];

  public totalUpvotes: number;
}
