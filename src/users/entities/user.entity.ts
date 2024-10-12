import { AppBaseEntity } from 'src/db/app-base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AppBaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'varchar', length: 15, unique: true })
  mobilePhone: string;
}
