import React, { Component } from "react";

type NotificationProps = {
    text: string;
};

export const Notification: React.FunctionComponent<NotificationProps> = ({ text }) => {
    return (
        <div>
            { text }
        </div>
    )
};
