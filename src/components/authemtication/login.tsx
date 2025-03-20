"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button"
import { toast } from "sonner";

import { WrapperForms } from "../generals/wrapper-forms"
import { FormRegularInput } from "../generals/form-regular-input";

import { useAuthStore } from "@/store/auth-store";
import { useDialogStore } from "@/store/dialog-store";

export default function Login() {
    const { userRegistered, setAuthStatus, setUserData } = useAuthStore()
    const { setStatusDialog } = useDialogStore()

    const schema = z.object({
        username: z.string().nonempty("Username must be filled!"),
        password: z.string().nonempty("Password must be filled!"),
    });
    
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(schema),
    });

    const handleSubmit = (data: { username: string; password: string;}) => {
        const users = userRegistered.filter((e: { username: string; password: string; }) => e.username === data.username)
        if ( users?.length === 0 ) {
            toast.error("user is not exist!", { position: "top-right" })
        }

        if ( users[0]?.password !== data.password ) {
            toast.error("wrong username or password!", { position: "top-right" })
        }

        setAuthStatus(true)
        setUserData(users[0])
        setStatusDialog(false)
    }

    return(
        <>
            <section className="w-full">
                <WrapperForms form={form} onSubmitFunction={handleSubmit}>
                    <div className="w-full mb-4 flex flex-col gap-y-4">
                        <FormRegularInput
                            form={form}
                            labelName="Username"
                            name="username"
                        />
                    </div>
                    <div className="w-full mb-4 flex flex-col gap-y-4">
                        <FormRegularInput
                            form={form}
                            labelName="Password"
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="w-full">
                        <Button variant="default" className="cursor-pointer">Submit</Button>
                    </div>
                </WrapperForms>
            </section>
        </>
    )
}