import React from "react";
import "./Notification.css";

type NotificationProps = {
    text: string;
};

export const Notification: React.FunctionComponent<NotificationProps> = ({ text }) => {
    return (
        <div className="Notification">
            { text }
        </div>
    )
};
