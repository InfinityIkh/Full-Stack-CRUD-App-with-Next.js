"use client"

import { Pencil, X } from "lucide-react"
import Button from "./ui/Button"
import { useRef, useState } from "react"
import InputField from "./ui/InputField"
import { useRouter } from "next/navigation"
import { userApi } from "../lib/api/api"
import axios from "axios"

type ValidationErrorResponse = {
    success: false,
    error: {
        username?: string[],
        email?: string[]
    }
}

const UpdateUserDialog = ( {id} : { id : number }) => {
    const router = useRouter()
    const DialogRef = useRef<HTMLDialogElement>(null)
    const [form, setForm] = useState({
        username: "",
        email: ""
    })
        const [error, setError] = useState({
        username: "",
        email: ""
    })

    const handleOpen = () => {
        DialogRef.current?.showModal()
    }
    const handleClose = () => {
        DialogRef.current?.close()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }
    
    const handleUpdateUser = async () => {
        try {
            await userApi.updateUser(id ,form)
            DialogRef.current?.close()
            router.refresh()
        } catch (error: unknown) {
            if (axios.isAxiosError<ValidationErrorResponse>(error)) {
                const errors = error.response?.data?.error
                setError({
                    username: errors?.username?.[0] ?? "",
                    email: errors?.email?.[0] ?? "",
                })
            }
        }
    }

    return (
        <div>
            <div>
                <Button Icon={Pencil} onClick={handleOpen} className="text-blue-600 hover:bg-blue-600">Upadte</Button>
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
                                <span className="text-xl leading-none" aria-hidden="true" onClick={handleClose}><X size={20} /></span>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </header>
                        <main className="px-4 py-4 sm:px-6">
                            <p className="leading-relaxed text-slate-700 text-start">Please review the information carefully before updating this user’s account.</p>
                            <br></br>
                            <form className="flex flex-col justify-start" onSubmit={(e) => e.preventDefault()}>
                                <InputField error={error.username} onChange={(e) => handleChange(e)} inputName="username" labelVal="Enter Username" inputType="text" placeholder="griffith" />
                                <InputField error={error.email} onChange={(e) => handleChange(e)} inputName="email" labelVal="Enter Email" inputType="email" placeholder="griffith@gmail.com" />
                            </form>
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
                                onClick={handleUpdateUser}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Update
                            </button>
                        </footer>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default UpdateUserDialog