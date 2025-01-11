import { OneToMany, Entity, PrimaryColumn, Generated, Column } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({
    type: 'double precision',
  })
  rating: number;

  @Column({
    type: 'varchar',
  })
  director: string;

  @Column({
    type: 'text',
  })
  tags: string;

  @Column({
    type: 'varchar',
  })
  image: string;

  @Column({
    type: 'varchar',
  })
  cover: string;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  about: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}
