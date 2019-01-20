import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { trim } from "lodash";
import * as Type from "../../types";
import { selectActiveCategory } from "../../state/category";
import {
    selectTasks,
    addTask,
} from "../../state/task";
import { closePopup } from "../../state/popup";
import "./AddTask.css";

type OwnProps = {
    name: string;
    estimate: string;
};

class AddTaskComponent extends Component<MapStateToProps & MapDispatchToProps, OwnProps> {
    constructor(props: MapStateToProps & MapDispatchToProps) {
        super(props);
        this.state = {
            name: "",
            estimate: "",
        };
    }

    public onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            name: event.currentTarget.value,
        });
    };

    public onEstimateChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            estimate: event.currentTarget.value,
        });
    };

    public getNextId = () => {
        const { tasks } = this.props;
        return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    };

    public addTask = () => {
        const { activeCategory, closePopup } = this.props;
        this.props.addTask({
            id: this.getNextId(),
            categoryId: activeCategory ? activeCategory.id : 0,
            name: this.state.name,
            estimate: this.state.estimate || "",
            isDone: false,
        });
        closePopup();
    };

    public render() {
        return(
            <div className="AddTask">
                <input
                    name="name"
                    className="AddTask-name"
                    placeholder="Enter task subject"
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
                <input
                    name="estimate"
                    className="AddTask-estimate"
                    placeholder="Estimate"
                    value={this.state.estimate}
                    onChange={this.onEstimateChange}
                />
                <div
                    className={classnames(
                        "AddTask-add",
                        !trim(this.state.name) && "AddTask-add__disable"
                    )}
                    onClick={this.addTask}
                >
                    Add
                </div>
            </div>
        );
    }
}

type MapStateToProps = {
    tasks: Type.Task[],
    activeCategory?: Type.Category,
}

type MapDispatchToProps = {
    addTask: (task: Type.Task) => void;
    closePopup: () => void;
}

const mapStateToProps = (state: Type.State) => ({
    tasks: selectTasks(state),
    activeCategory: selectActiveCategory(state),
});

const mapDispatchToProps = (dispatch: Type.DispatchType) => ({
    addTask: (task: Type.Task) => dispatch(addTask(task)),
    closePopup: () => dispatch(closePopup()),
});

export const AddTask = connect(mapStateToProps, mapDispatchToProps)(AddTaskComponent);
