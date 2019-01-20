import React, { Component } from "react";
import { connect } from "react-redux";
import * as Type from "../../types";
import {
    selectIsPopupOpen,
    selectPopupType,
    closePopup,
} from "../../state/popup";
import { AddTask } from "../../components/addTask";
import "./Popup.css";

class PopupContainer extends Component<MapStateToProps & MapDispatchToProps> {
    public renderPopup = () => {
        const { popupType } = this.props;
        let PopupComponent: React.ComponentType = () => null;
        switch (popupType) {
            case Type.PopupContentTypes.AddTask:
                PopupComponent = AddTask;
        }
        return (
            <div className="PopupWindow">
                <PopupComponent />
            </div>
        )
    };

    public closePopup = (event: React.MouseEvent) => {
        event.preventDefault();
        this.props.closePopup();
    };

    public renderPopupContainer = () => {
        return (
            <div className="PopupContainer">
                <div className="PopupContainer-background" onClick={this.closePopup} />
                { this.renderPopup() }
            </div>
        );
    };

    public render() {
        const { isPopupOpen } = this.props;
        return isPopupOpen ? this.renderPopupContainer() : null;
    }
}

type MapStateToProps = {
    isPopupOpen: boolean;
    popupType?: Type.PopupContentTypes;
}

type MapDispatchToProps = {
    closePopup: () => void;
}

const mapStateToProps = (state: Type.State) => ({
    isPopupOpen: selectIsPopupOpen(state),
    popupType: selectPopupType(state),
});

const mapDespatchToProps = (dispatch: Type.DispatchType) => ({
    closePopup: () => dispatch(closePopup()),
});

export const Popup = connect(mapStateToProps, mapDespatchToProps)(PopupContainer);