import type Role from '@/features/users/models/role';

export default interface User {
  id: number | undefined
  name: string
  email: string
  password: string | undefined
  roles: Role[] | null
  status: string | undefined
}