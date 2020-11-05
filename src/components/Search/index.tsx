import React from "react";
import './index.css';

type SearchProps = {
    onChange: any,
    value?: string,
    type?: "text" | "number",
    children: React.ReactNode
}

export const Search = (props: SearchProps) => {

    const {type, onChange , value, children } = props

    return (
        <div className={"container"}>
            <input
                type={type}
                onChange={onChange}
                value={value}
            />
            {children}
        </div>
    )
}
