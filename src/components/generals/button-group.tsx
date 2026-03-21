import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";

interface IPropsSelect {
    label?: string;
    value?: string | number;
}

interface IButtonGroup {
    datas: IPropsSelect[];
    selectedValue?: string;
    propsToggle?: Record<string, unknown>;
}

export default function ButtonGroup({ datas = [], selectedValue, propsToggle }: IButtonGroup) {
    if (datas.length === 0) return null;

    return (
        <ToggleGroup
            variant="outline"
            className="flex-1 flex flex-wrap gap-1.5 justify-start"
            type="single"
            value={selectedValue}
            {...propsToggle}
        >
            {datas.map((e: IPropsSelect) => (
                <ToggleGroupItem
                    key={`${e.value}`}
                    value={`${e.value}`}
                    className="px-4 text-xs cursor-pointer h-7 rounded-full capitalize data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                    {e.label || e.value}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
