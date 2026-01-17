import { CheckCircleIcon, XCircle } from 'lucide-react';
import {toast} from 'sonner';

const check = <CheckCircleIcon className='text-green-400 mr-5' />

export const successToaster = (header, description, label) => {
    toast(`${header}`, {
        icon: check,
        description: description || "",
        action: {
            label: label || "",
            onClick: () => console.log("check"),
        },
        position: "top-center",
        duration: 3000
    })
}

export const errorToaster = (header, description, label) => {
    toast(`${header}`, {
        description: description || "",
        icon: <XCircle className='text-red-400' /> ,
        action: {
            label: label || "",
            onClick: () => console.log("Undo"),
        },
        position: "top-center",
        duration: 3000
    })
}

