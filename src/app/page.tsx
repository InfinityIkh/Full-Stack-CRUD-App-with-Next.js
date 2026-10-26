import { User } from "../components/UsersTable"
import UsersTable from "../components/UsersTable"
import AddUserDialog from "../components/AddUserDialog"
import { userApi } from "../lib/api/api"

const Home = async () => {
  const response = await userApi.getUsers()
  const users : User[] = response.data.users
  return (
    <div className="flex flex-col gap-6 mx-auto max-w-7xl p-4 md:p-24">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <AddUserDialog />
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
        <UsersTable users={users} />
      </div>
    </div>
  )
}

export default Home