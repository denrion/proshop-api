import { UserRole } from '../src/shared';
import { CreateUserDTO } from '../src/user/dto';

const users: CreateUserDTO[] = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: 'tesT1234',
    role: UserRole.ADMIN,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'tesT1234',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'tesT1234',
  },
];
