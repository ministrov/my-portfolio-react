import React from "react";
import "./style.css";

export const Tag = ({ children, color = 'purple', ...props }) => {
    return (
        <div className={`tag ${color === 'red' ? 'red' : ''}`} {...props}>
            {children}
        </div>
    )
}