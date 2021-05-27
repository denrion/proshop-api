import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { AbstractEntity, UserRole } from '../../shared';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async isCorrectPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
}
