import React, { Component } from "react";
import * as Type from "../../types";
import "./TaskCard.css";

type TaskCardProps = {
    task: Type.Task;
    finishTask: () => void;
    restoreTask: () => void;
};

export const TaskCard: React.FunctionComponent<TaskCardProps> = ({ task, finishTask, restoreTask }) => {
    const { name, estimate, isDone, id } = task;
    return (
        <div className="TaskCard">
            <div className="TaskCard-id">#{ id }</div>
            <div className="TaskCard-name">{ name }</div>
            <div className="TaskCard-estimate">{ estimate }</div>
            { isDone ?
                <div className="TaskCard-action" onClick={restoreTask}>Back to inprogress</div> :
                <div className="TaskCard-action" onClick={finishTask}>Move to done</div>
            }
        </div>
    );
};
