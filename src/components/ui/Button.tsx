import { LucideIcon } from "lucide-react"
import { ButtonHTMLAttributes, ReactNode } from "react"

type buttonProps = {
  children: ReactNode,
  Icon?: LucideIcon,
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>
const Button = ({ children, Icon, className ,...props }: buttonProps) => {
  return (
    <button {...props} className={`${className} flex items-center gap-1 border rounded py-1.5 px-7 text-black hover:text-white bg-white hover:bg-black transition-all duration-300`}>
      { Icon && <Icon size={15} />}
      {children}
    </button>
  )
}

export default Button
