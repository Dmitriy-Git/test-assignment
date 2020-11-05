
import React from "react";

type ButtonProps = {
    onClick: any,
    disabled?: boolean,
    type?: "button" | "submit",
    children: React.ReactNode
}

export const Button = (props: ButtonProps) => {

    const {onClick, disabled = false, type = "button", children } = props

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}


