import React, { Component } from "react";
import { connect } from "react-redux";

import * as Type from "../../types";
import { Notification } from "../../components/notification";
import { selectCategories } from "../../state/category";


class Categories extends Component<MapStateToProps> {
    public render() {
        const { categories } = this.props;
        return (
            <div className="Categories">
                <div className="Categories-header">Category</div>
                <div className="Categories-list">
                    { categories.length ? categories.map(category => {

                    }) :
                        <Notification text="Sorry, but we can't show any categories" />
                    }
                </div>
            </div>
        )
    }
}

type MapStateToProps = {
    categories:Type.Category[];
};

const mapStateToProps = (state: Type.State) => ({
    categories: selectCategories(state),
});

export const CategoriesConnected = connect(mapStateToProps)(Categories);
