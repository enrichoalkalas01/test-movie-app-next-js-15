import { LoaderCircleIcon } from "lucide-react";

interface ILoadingComponent<T = Record<string, unknown>> {
    type: "full" | "text" | "icon";
    propsIcon?: T;
}

export function LoadingComponent({ type, propsIcon }: ILoadingComponent) {
    return (
        <>
            {type === "full" && (
                <div className="w-auto flex justify-center items-center gap-2">
                    <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                        {...propsIcon}
                    />
                    <span>Loading...</span>
                </div>
            )}

            {type !== "full" && (
                <div className="w-auto flex justify-center items-center">
                    {type === "icon" && (
                        <LoaderCircleIcon
                            className="-ms-1 animate-spin"
                            size={16}
                            aria-hidden="true"
                            {...propsIcon}
                        />
                    )}
                    {type === "text" && <span>Loading...</span>}
                </div>
            )}
        </>
    );
}
