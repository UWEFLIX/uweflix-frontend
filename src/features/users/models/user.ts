export default interface User {
  id: number | undefined
  name: string
  email: string
  roles: string[] | null
  status: string | undefined
}