import React, { Component } from "react";
import { connect } from "react-redux";

import * as Type from "../../types";
import { Notification } from "../../components/notification";
import {
    selectCategories,
    deleteCategory,
    selectCategory,
} from "../../state/category";
import {
    removeTask,
    selectTasks,
} from "../../state/task";
import { AddCategoryConnected } from "../../components/addCategory";
import "./Categories.css";
import { CategoryCard } from "../../components/categoryCard";

class CategoriesContainer extends Component<MapStateToProps & MapDispatchToProps> {
    public onCategorySelect = (id: number) => {
        this.props.selectCategory(id);
    };

    public deleteCategory = (id: number) => {
        const { deleteCategory, removeTask, tasks } = this.props;
        deleteCategory(id);
        tasks.forEach(task => {
            if (task.categoryId === id) {
                removeTask(id);
            }
        });
    };

    public render() {
        const { categories } = this.props;
        return (
            <div className="Categories">
                <div className="Categories-header">Category</div>
                <div className="Categories-list">
                    { categories.length ? categories.map(category =>
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onDelete={() => this.deleteCategory(category.id)}
                            onClick={() => this.onCategorySelect(category.id)}
                        />
                        ) :
                        <Notification text="Sorry, but we can't show any categories" />
                    }
                    <AddCategoryConnected />
                </div>
            </div>
        )
    }
}

type MapStateToProps = {
    categories: Type.Category[];
    tasks: Type.Task[];
};

type MapDispatchToProps = {
    deleteCategory: (id: number) => void;
    selectCategory: (id: number) => void;
    removeTask: (id: number) => void;
}

const mapStateToProps = (state: Type.State) => ({
    categories: selectCategories(state),
    tasks: selectTasks(state),
});

const mapDispatchToProps = (dispatch: Type.DispatchType) => ({
    deleteCategory: (id: number) => dispatch(deleteCategory(id)),
    selectCategory: (id: number) => dispatch(selectCategory(id)),
    removeTask: (id: number) => dispatch(removeTask(id)),
});

export const Categories = connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
