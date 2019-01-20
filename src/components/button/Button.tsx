import React from "react";
import classnames from "classnames";
import "./Button.css";

type ButtonProps = {
    className: string;
    onClick: () => void;
};

export const Button: React.FunctionComponent<ButtonProps> = ({ className, onClick }) => {
    return (
        <div className={classnames(className, "Button")} onClick={onClick} />
    );
};
