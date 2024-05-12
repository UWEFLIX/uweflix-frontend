import type Role from '@/features/users/models/role';

export default interface User {
  id: number
  name: string
  email: string
  roles: Role[] | null
  status: string | undefined
}