import {
    Popup as PopupType,
    Reducer,
    PopupContentTypes,
} from "../../types";

const initial: PopupType = {
    isOpen: false,
};

enum ActionTypes {
    OpenPopup = "popup/OpenPopup",
    ClosePopup = "popup/ClosePopup",
}

type OpenPopupAction = {
    type: ActionTypes.OpenPopup;
    payload: PopupContentTypes;
}

type ClosePopupAction = {
    type: ActionTypes.ClosePopup;
}

export const openPopup = (type: PopupContentTypes): OpenPopupAction => ({
    type: ActionTypes.OpenPopup,
    payload: type,
});

export const closePopup = (): ClosePopupAction => ({
    type: ActionTypes.ClosePopup,
});

const openPopupReducer: Reducer<PopupType, OpenPopupAction> = (state, { payload }) => ({
    isOpen: true,
    type: payload,
});

const closePopupReducer: Reducer<PopupType, ClosePopupAction> = (state) => ({
    isOpen: false,
});

type Actions = OpenPopupAction | ClosePopupAction;

export const popup = (state = initial, action: Actions): PopupType => {
    switch (action.type) {
        case ActionTypes.OpenPopup:
            return openPopupReducer(state, action);
        case ActionTypes.ClosePopup:
            return closePopupReducer(state, action);
        default:
            return state;
    }
};
