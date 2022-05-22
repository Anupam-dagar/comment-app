import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public comment: string;

  @Column()
  public createdBy: string;

  @Column()
  public createdAt: string;

  @Column()
  public upvotes: number;

  @Column()
  public parentId: number;
}
