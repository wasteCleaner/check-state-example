import { Action } from "redux";

export type State = {
    category: Category[];
    task: Task[];
    popup: Popup;
};

export type Category = {
    name: string;
    id: number;
    active: boolean;
};

export type Task = {
    name: string;
    id: number;
    categoryId: number;
    isDone: boolean;
    estimate: string;
};

export type Popup = {
    type?: PopupContentTypes,
    isOpen: boolean,
};

export enum PopupContentTypes {
    AddTask = "AddTask",
}

export type Reducer<S,A> = (state: S, action: A) => S;
export type DispatchType = (action: Action) => void;
