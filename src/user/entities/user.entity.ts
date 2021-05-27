import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { AbstractEntity, UserRole } from '../../shared';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Column({ enum: UserRole, default: UserRole.USER })
  role?: UserRole = UserRole.USER;

  @Expose()
  get fullName(): string {
    return this.firstName && this.lastName && `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async isCorrectPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
}
