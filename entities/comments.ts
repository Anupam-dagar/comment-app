import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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

  @Column({ default: 0 })
  public upvotes: number;

  @Column({ nullable: true })
  public parentId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "createdBy" })
  public user: User;
}
