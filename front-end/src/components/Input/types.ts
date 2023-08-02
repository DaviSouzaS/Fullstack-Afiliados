import { UseFormRegisterReturn } from "react-hook-form";

export interface iInput {
    children: React.ReactNode;
    placeHolder?: string;
    defaultValue?: string;
    id: string;
    css: string;
    inputCSS: string;
    register?: UseFormRegisterReturn<string>;
    type: string;
    step?: string
    value?: string | number | undefined
}