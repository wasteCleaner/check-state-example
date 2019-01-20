import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import * as Type from "../../types";
import {
    selectActiveDoneTasks,
    selectActiveInProgressTasks,
    finishTask,
    restoreTask,
} from "../../state/task";
import {
    selectActiveCategory,
} from "../../state/category";
import { TaskCard } from "../../components/taskCard";
import "./Tasks.css";

enum Tabs {
    InProgress = "InProgress",
    Done = "Done",
}

type OwnProps = {
    activeTab: Tabs,
};

class TasksContainer extends Component<MapStateToProps & MapDispatchToProps, OwnProps> {
    constructor(props: MapStateToProps & MapDispatchToProps) {
        super(props);
        this.state = {
            activeTab: Tabs.InProgress,
        };
    }

    public selectTab = (tab: Tabs) => {
        this.setState({
            activeTab: tab,
        });
    };

    public render() {
        const { activeCategory, inProgressTasks, doneTasks, finishTask, restoreTask }  = this.props;
        const { activeTab } = this.state;
        return (
            <div className="Tasks">
                <div className="Tasks-header">
                    <div className="Tasks-path">Todo</div>
                    <div className="Tasks-categoryName">{ activeCategory ? activeCategory.name : "" }</div>
                </div>
                <div className="TasksTabs">
                    <div
                        className={classnames(
                            "TasksTabs-tab",
                            activeTab === Tabs.InProgress && "TasksTabs-tab__active",
                        )}
                        onClick={() => this.selectTab(Tabs.InProgress)}
                    >
                        <span>{ inProgressTasks.length }</span>
                        In progress
                    </div>
                    <div
                        className={classnames(
                            "TasksTabs-tab",
                            activeTab === Tabs.Done && "TasksTabs-tab__active",
                        )}
                        onClick={() => this.selectTab(Tabs.Done)}
                    >
                        <span>{ doneTasks.length }</span>
                        Done
                    </div>
                </div>
                <div className="TasksList">
                    { activeTab === Tabs.InProgress ?
                        inProgressTasks
                            .map((task, i) =>
                                <TaskCard
                                    key={`inProgress_${i}`}
                                    task={task}
                                    finishTask={() => finishTask(task.id)}
                                    restoreTask={() => restoreTask(task.id)}
                                />) :
                        doneTasks
                            .map((task, i) =>
                                <TaskCard
                                    key={`done_${i}`}
                                    task={task}
                                    finishTask={() => finishTask(task.id)}
                                    restoreTask={() => restoreTask(task.id)}
                                />)
                    }
                </div>
            </div>
        );
    }
}

type MapStateToProps = {
    doneTasks: Type.Task[],
    inProgressTasks: Type.Task[],
    activeCategory?: Type.Category,
};

type MapDispatchToProps = {
    finishTask: (id: number) => void;
    restoreTask: (id: number) => void;
}

const mapStateToProps = (state: Type.State) => ({
    doneTasks: selectActiveDoneTasks(state),
    inProgressTasks: selectActiveInProgressTasks(state),
    activeCategory: selectActiveCategory(state),
});

const mapDispatchToProps = (dispatch: Type.DispatchType) => ({
    finishTask: (id: number) => dispatch(finishTask(id)),
    restoreTask: (id: number) => dispatch(restoreTask(id)),
});

export const Tasks = connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
