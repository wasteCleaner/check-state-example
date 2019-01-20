import { createSelector, Selector } from "reselect";
import { State, Popup, PopupContentTypes } from "../../types";

export const selectPopup = (state: State): Popup => state.popup;
export const selectIsPopupOpen: Selector<State, boolean> = createSelector(selectPopup, popup => popup.isOpen);
export const selectPopupType: Selector<State, PopupContentTypes | undefined> = createSelector(
    selectPopup,
    popup => popup.type,
);
