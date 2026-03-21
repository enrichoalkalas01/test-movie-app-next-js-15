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

const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof schema>;

export default function Login() {
    const { userRegistered, setAuthStatus, setUserData } = useAuthStore()
    const { setStatusDialog } = useDialogStore()

    const form = useForm<LoginFormData>({
        defaultValues: { username: "", password: "" },
        resolver: zodResolver(schema),
    });

    const handleSubmit = (data: LoginFormData) => {
        const user = userRegistered.find(
            (e) => e.username === data.username
        );

        if (!user) {
            toast.error("User does not exist!", { position: "top-right" });
            return;
        }

        if (user.password !== data.password) {
            toast.error("Wrong username or password!", { position: "top-right" });
            return;
        }

        setAuthStatus(true);
        setUserData(user);
        setStatusDialog(false);
        toast.success("Welcome back!", { position: "top-right" });
    };

    return (
        <section className="w-full">
            <p className="text-xs text-muted-foreground mb-4">
                Demo credentials: <span className="font-mono font-semibold text-foreground">admin / admin</span>
            </p>
            <WrapperForms form={form} onSubmitFunction={handleSubmit}>
                <div className="flex flex-col gap-4 mb-5">
                    <FormRegularInput
                        form={form}
                        labelName="Username"
                        name="username"
                        placeholder="Enter username"
                    />
                    <FormRegularInput
                        form={form}
                        labelName="Password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                    />
                </div>
                <Button variant="default" type="submit" className="w-full cursor-pointer">
                    Sign In
                </Button>
            </WrapperForms>
        </section>
    )
}
