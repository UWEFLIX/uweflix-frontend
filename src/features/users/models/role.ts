import type Permission from '@/features/users/models/permission';

export default interface Role {
  id: number | undefined
  name: string
  permissions: Permission[]
}