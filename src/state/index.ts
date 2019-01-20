import { combineReducers } from "redux";
import { category } from "./category/actions";
import { task } from "./task";
import { popup } from "./popup";

export const reducers = combineReducers({
    category,
    task,
    popup,
});
