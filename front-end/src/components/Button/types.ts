import React from "react";

export interface iButton {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactElement | string | JSX.Element;
    css: string;
    type: "submit" | "button";
}