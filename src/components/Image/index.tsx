import React from "react";
import './index.css';

type ImageProps = {
    onClick: () => void,
    className?: any,
    src: string,
    key: any
}

export const Image = (props: ImageProps) => {

    const {onClick , className, src, key} = props

    return (
            <img
                onClick={onClick}
                className={className}
                key={key}
                src={src}
            />
    )
}
