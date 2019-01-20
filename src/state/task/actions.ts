import {
    Task as TaskType,
    Reducer,
} from "../../types";

const initial: Readonly<TaskType[]> = [];

enum ActionTypes {
    AddTask = "task/AddTask",
}

type AddTaskAction = {
    type: ActionTypes.AddTask;
    payload: TaskType;
};

export const addTask = (task: TaskType): AddTaskAction => ({
    type: ActionTypes.AddTask,
    payload: task,
});

const addTaskReducer: Reducer<TaskType[], AddTaskAction> = (state, { payload }) =>
    [...state].concat(payload);

type Actions = AddTaskAction;

export const task = (state = initial, action: Actions): TaskType[] => {
    switch (action.type) {
        case ActionTypes.AddTask:
            return addTaskReducer(state, action);
        default:
            return state;
    }
};
