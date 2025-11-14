import { toast } from "sonner"

export const SuccessToast = (message:string) => {
    return(
        toast.success(message)
    )
}

export const ErrorToast = (message:string) => {
    return(
        toast.error(message)
    )
}
