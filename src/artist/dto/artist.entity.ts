import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistStatus } from './artist.status';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: ArtistStatus,
    default: ArtistStatus.ACTIVE,
  })
  status: ArtistStatus;
}
