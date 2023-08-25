import { AlbumStatus } from 'src/utils/status';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: AlbumStatus,
    default: AlbumStatus.ACTIVE, // Set the default value here
  })
  status: AlbumStatus;
}
