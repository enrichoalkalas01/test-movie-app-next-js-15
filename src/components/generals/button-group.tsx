import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";

interface IButtonGroup {
    datas: IPropsSelect[]
    propsToggle?: Record<string, unknown>
}

interface IPropsSelect {
    label?: string;
    value?: string|number;
}

export default function ButtonGroup({ datas = [], propsToggle }: IButtonGroup) {
    return (
        <ToggleGroup variant="outline" className="inline-flex" type="single" {...propsToggle}>
            {
                datas?.map((e: IPropsSelect) => {
                    return(
                        <React.Fragment key={e.value}>
                            <ToggleGroupItem
                                value={`${e.value}`}
                                className="px-6 text-xs cursor-pointer"
                            >
                                    {e?.label || e?.value}
                            </ToggleGroupItem>
                        </React.Fragment>
                    )
                })
            }
        </ToggleGroup>
    );
}