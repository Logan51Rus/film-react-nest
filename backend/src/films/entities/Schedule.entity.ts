import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  Generated,
  Column,
  JoinColumn,
} from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  daytime: string;

  @Column({
    type: 'integer',
  })
  hall: number;

  @Column({
    type: 'integer',
  })
  rows: number;

  @Column({
    type: 'integer',
  })
  seats: number;

  @Column({
    type: 'double precision',
  })
  price: number;

  @Column({
    type: 'text',
  })
  taken: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}
