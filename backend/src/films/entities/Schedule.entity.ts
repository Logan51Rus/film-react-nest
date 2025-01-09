import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FilmEntity } from './Film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryColumn({
    unique: true,
  })
  @Generated('uuid')
  id: string;

  @Column({ type: 'double precision' })
  daytime: string;

  @Column({ type: 'integer' })
  hall: number;

  @Column({ type: 'integer' })
  rows: number;

  @Column({ type: 'integer' })
  seats: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column('text')
  taken: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}
