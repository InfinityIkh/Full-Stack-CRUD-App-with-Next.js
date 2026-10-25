
import { LoaderCircle } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <LoaderCircle
        size={40}
        className="animate-spin text-black"
      />
      <p className="text-sm font-medium text-gray-500">
        Loading, please wait...
      </p>
    </div>
  )
}

export default Loading