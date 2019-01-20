import React, { Component } from "react";
import { connect } from "react-redux";
import * as Type from "../../types";
import { selectIsCategoryActive } from "../../state/category";
import { openPopup } from "../../state/popup";
import { Notification } from "../../components/notification";
import { Categories } from "../categories";
import { Tasks } from "../tasks";
import { Button } from "../../components/button";
import { Popup } from "../popup";
import "./Layout.css";


class LayoutComponent extends Component<MapStateToProps & MapDispatchToProps> {
    public addTask = () => {
        this.props.openPopup(Type.PopupContentTypes.AddTask);
    };

    public render() {
        const { isCategoryActive } = this.props;
        return (
            <div className="Layout">
                <Categories />
                { isCategoryActive ?
                    <Tasks /> :
                    <Notification text="Category is not selected" />
                }
                { isCategoryActive && <Button onClick={this.addTask} className="Layout-addTask" /> }
                <Popup />
            </div>
        );
    }
}

type MapStateToProps = {
    isCategoryActive: boolean;
};

type MapDispatchToProps = {
    openPopup: (type: Type.PopupContentTypes) => void;
};

const mapStateToProps = (state: Type.State) => ({
    isCategoryActive: selectIsCategoryActive(state),
});

const mapDispatchToProps = (dispatch: Type.DispatchType) => ({
    openPopup: (type: Type.PopupContentTypes) => dispatch(openPopup(type)),
});

export const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);