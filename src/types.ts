import { Action } from "redux";

export type State = {
    category: Category[];
};

export type Category = {
    name: string;
    id: number;
    active: boolean;
};

export type Reducer<S,A> = (state: S, action: A) => S;
export type DispatchType = (action: Action) => void;
