import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { CircleHelp } from "lucide-react";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface IFormRegularInput<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    labelName?: string;
    disable?: boolean;
    type?: string;
    description?: string;
    placeholder?: string;
    className?: string;
    classNameInput?: string;
    classNameLabel?: string;
    classNameMsg?: string;
    autoComplete?: "on" | "off";
    tooltip?: string;
    tooltipComponent?: React.ReactNode;
    propsInput?: React.InputHTMLAttributes<HTMLInputElement>;
    propsFormItem?: React.HTMLAttributes<HTMLDivElement>;
    propsFormControl?: React.HTMLAttributes<HTMLDivElement>;
    propsFormLabel?: React.HTMLAttributes<HTMLLabelElement>;
    propsFormDescription?: React.HTMLAttributes<HTMLParagraphElement>;
    propsFormMessage?: React.HTMLAttributes<HTMLParagraphElement>;
}

export const FormRegularInput = <T extends FieldValues>({
    form,
    name,
    labelName,
    disable = false,
    type = "text",
    description,
    placeholder = "input here..",
    autoComplete = "off",
    tooltip,
    tooltipComponent,
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsInput = {},
    propsFormDescription = {},
    propsFormMessage = {},
}: IFormRegularInput<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem {...propsFormItem}>
                    <FormLabel {...propsFormLabel}>
                        <div className="flex gap-1 items-center justify-start">
                            {labelName && <span>{labelName}</span>}
                            {tooltip && (
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <CircleHelp className="w-[12px] h-[12px] cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="px-4 py-2 text-inherit text-white">
                                            {tooltipComponent || tooltip}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                    </FormLabel>
                    <FormControl {...propsFormControl}>
                        <Input
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            disabled={disable}
                            type={type}
                            {...field}
                            {...propsInput}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription {...propsFormDescription}>
                            {description}
                        </FormDescription>
                    )}
                    <FormMessage {...propsFormMessage} />
                </FormItem>
            )}
        />
    );
};
