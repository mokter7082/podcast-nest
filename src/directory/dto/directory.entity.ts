import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Directory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  title: string;
  @Column()
  parentId: number;
}
