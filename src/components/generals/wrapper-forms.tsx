"use client";

// Library
import { UseFormReturn } from "react-hook-form";

// Components
import { Form } from "@/components/ui/form";

// Interfaces
interface IWrapperForms<T extends Record<string, unknown>> {
    children?: React.ReactNode;
    className?: string;
    form: UseFormReturn<T>;
    onSubmitFunction: (data: T) => void;
}

export const WrapperForms = <T extends Record<string, unknown>> ({
    children,
    className,
    form,
    onSubmitFunction = () => {},
}: IWrapperForms<T>) => {
    const { handleSubmit } = form;

    return (
        <>
            <Form {...form}>
                <form
                    className={`${className}`}
                    onSubmit={handleSubmit(onSubmitFunction)}
                >
                    {children}
                </form>
            </Form>
        </>
    );
};
