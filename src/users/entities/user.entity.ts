import { AppBaseEntity } from 'src/db/app-base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AppBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  hashedPassword: string;

  @Column({ type: 'varchar', length: 255 })
  passwordSalt: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'varchar', length: 15 })
  mobilePhone: string;
}
