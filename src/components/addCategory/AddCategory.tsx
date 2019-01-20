import React, { Component } from "react";
import { trim } from "lodash";
import classnames from "classnames";
import { connect } from "react-redux";

import * as Type from "../../types";
import {
    selectCategories,
    addCategory,
} from "../../state/category";
import "./AddCategory.css";

type OwnProps = {
    name: string;
}

class AddCategory extends Component<MapStateToProps & MapDispatchToProps, OwnProps> {
    constructor(props: MapStateToProps & MapDispatchToProps) {
        super(props);
        this.state = {
            name: "",
        };
    }

    public changeName = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ name: event.currentTarget.value });
    };

    public clearName = () => {
        this.setState({ name: "" });
    };

    public addCategory = () => {
        if (trim(this.state.name)) {
            this.props.addCategory({
                id: this.getNextId(),
                name: this.state.name,
                active: false,
            });

            this.clearName();
        }
    };

    public getNextId = (): number => {
        const { categories } = this.props;
        if (!categories.length) {
            return 1;
        }

        return categories[categories.length - 1].id + 1;
    };

    public onKeyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            this.addCategory();
        }
    };

    public render() {
        return (
            <div className="AddCategory">
                <input
                    name="category"
                    className="AddCategory-name"
                    placeholder="New category"
                    value={this.state.name}
                    onChange={this.changeName}
                    onKeyPress={this.onKeyPressHandler}
                />
                <div
                    className={classnames(
                        "AddCategory-addButton",
                        !trim(this.state.name) && "AddCategory-addButton__disable",
                        )}
                    onClick={this.addCategory}
                >
                    Add
                </div>
            </div>
        );
    }
}

type MapStateToProps = {
    categories: Type.Category[];
}

type MapDispatchToProps = {
    addCategory: (category: Type.Category) => void;
}

const mapStateToProps = (state: Type.State) => ({
    categories: selectCategories(state),
});

const mapDispatchToProps = (dispatch: Type.DispatchType) => ({
    addCategory: (category: Type.Category) => dispatch(addCategory(category)),
});

export const AddCategoryConnected =
    connect(mapStateToProps, mapDispatchToProps)(AddCategory);
