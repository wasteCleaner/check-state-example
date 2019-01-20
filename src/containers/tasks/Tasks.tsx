import React, { Component } from "react";
import { connect } from "react-redux";
import * as Type from "../../types";
import {
    selectActiveDoneTasks,
    selectActiveInProgressTasks,
} from "../../state/task";

enum Tabs {
    InProgress = "InProgress",
    Done = "Done",
}

type OwnProps = {
    activeTab: Tabs,
};

class TasksContainer extends Component<MapStateToProps, OwnProps> {
    constructor(props: MapStateToProps) {
        super(props);
        this.state = {
            activeTab: Tabs.InProgress,
        };
    }

    public render() {
        return (
            <div className="Tasks">

            </div>
        );
    }
}

type MapStateToProps = {
    doneTasks: Type.Task[],
    inProgressTasks: Type.Task[],
};

const mapStateToProps = (state: Type.State) => ({
    doneTasks: selectActiveDoneTasks(state),
    inProgressTasks: selectActiveInProgressTasks(state),
});

export const Tasks = connect(mapStateToProps)(TasksContainer);
