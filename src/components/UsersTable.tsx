import { Pencil, Trash2 } from "lucide-react"
import DeleteUserDialog from "./DeleteUserDialog"
import UpdateUserDialog from "./UpdateUserDialog"
export type User = {
  id: number,
  username: string,
  email: string,
  createdAt: string
}

type tableProps = {
  users: User[]
}
const UsersTable = ({ users }: tableProps) => {
  return (
    <table className="w-full min-w-160 text-left text-sm">
      <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
        <tr>
          <th className="px-5 py-3 font-medium">Id</th>
          <th className="px-5 py-3 font-medium">Username</th>
          <th className="px-5 py-3 font-medium">Email</th>
          <th className="px-5 py-3 font-medium">Created at</th>
          <th className="px-5 py-3 text-center font-medium">Update</th>
          <th className="px-5 py-3 text-center font-medium">Delete</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100">
        {users.map((user: User, i: number) => (
          <tr key={i} className="transition-colors hover:bg-neutral-50">
            <td className="px-5 py-3.5 text-neutral-500">{user.id}</td>
            <td className="px-5 py-3.5 font-medium text-neutral-900">{user.username}</td>
            <td className="px-5 py-3.5 text-neutral-600">{user.email}</td>
            <td className="px-5 py-3.5 text-neutral-500">{user.createdAt.toLocaleString()}</td>
            <td className="px-5 py-3 text-center"><UpdateUserDialog /></td>
            <td className="px-5 py-3 text-center"><DeleteUserDialog /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersTable