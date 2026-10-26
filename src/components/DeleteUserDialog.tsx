"use client"

import { Trash2 ,X } from "lucide-react"
import Button from "./ui/Button"
import { useRef } from "react"
import { userApi } from "../lib/api/api"
import { useRouter } from "next/navigation"


const DeleteUserDialog = ( {id} : { id : number} ) => {
    const router = useRouter()
    const DialogRef = useRef<HTMLDialogElement>(null)

    const handleOpen = () => {
        DialogRef.current?.showModal()
    }
    const handleClose = () => {
        DialogRef.current?.close()
    }
    const handleDeleteUser = async () => {
        try{
            await userApi.deleteUser(id)
            DialogRef.current?.close()
            router.refresh()
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <Button Icon={Trash2} className="text-red-600 hover:bg-red-600" onClick={handleOpen}>Delete</Button>
                <dialog
                    ref={DialogRef}
                    className="animate-in fade-in zoom-in backdrop:animate-in backdrop:fade-in m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-xl duration-200 backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:duration-300 starting:scale-95 starting:opacity-0 backdrop:starting:opacity-0"
                >
                    <div className="flex flex-col overflow-hidden">
                        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
                            <h2 className="text-lg font-semibold text-slate-900">Confirm Action</h2>
                            <button
                                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                            >
                                <span className="text-xl leading-none" aria-hidden="true" onClick={handleClose}><X size={20}/></span>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </header>
                        <main className="px-4 py-4 sm:px-6">
                            <p className="leading-relaxed text-slate-700 text-start">
                                Are you sure you want to delete this user? This action cannot be undone and will 
                                permanently remove their account and associated data from our servers.
                            </p>
                        </main>
                        <footer
                            className="flex flex-col-reverse gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6"
                        >
                            <button
                                onClick={handleClose}
                                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Delete
                            </button>
                        </footer>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default DeleteUserDialog
