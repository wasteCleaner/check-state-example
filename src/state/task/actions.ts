import {
    Task as TaskType,
    Reducer,
} from "../../types";

const initial: Readonly<TaskType[]> = [];

enum ActionTypes {
    AddTask = "task/AddTask",
    FinishTask = "task/FinishTask",
    RestoreTask = "task/RestoreTask",
    RemoveTask = "task/RemoveTask",
}

type AddTaskAction = {
    type: ActionTypes.AddTask;
    payload: TaskType;
};

type FinishTaskAction = {
    type: ActionTypes.FinishTask;
    payload: number;
};

type RestoreTaskAction = {
    type: ActionTypes.RestoreTask;
    payload: number;
};

type RemoveTaskAction = {
    type: ActionTypes.RemoveTask;
    payload: number;
};

export const addTask = (task: TaskType): AddTaskAction => ({
    type: ActionTypes.AddTask,
    payload: task,
});

export const finishTask = (id: number): FinishTaskAction => ({
    type: ActionTypes.FinishTask,
    payload: id,
});

export const restoreTask = (id: number): RestoreTaskAction => ({
    type: ActionTypes.RestoreTask,
    payload: id,
});

export const removeTask = (id: number): RemoveTaskAction => ({
    type: ActionTypes.RemoveTask,
    payload: id,
});

const addTaskReducer: Reducer<TaskType[], AddTaskAction> = (state, { payload }) =>
    [...state].concat(payload);

const finishTaskReducer: Reducer<TaskType[], FinishTaskAction> = (state, { payload }) =>
    [...state].map(task => ({
        ...task,
        isDone: task.id === payload ? true : task.isDone,
    }));

const restoreTaskReducer: Reducer<TaskType[], RestoreTaskAction> = (state, { payload }) =>
    [...state].map(task => ({
        ...task,
        isDone: task.id === payload ? false : task.isDone,
    }));

const removeTaskReducer: Reducer<TaskType[], RemoveTaskAction> = (state, { payload }) =>
    [...state].filter(task => task.id !== payload);

type Actions = AddTaskAction
    | FinishTaskAction
    | RestoreTaskAction
    | RemoveTaskAction;

export const task = (state = initial, action: Actions): TaskType[] => {
    switch (action.type) {
        case ActionTypes.AddTask:
            return addTaskReducer(state, action);

        case ActionTypes.FinishTask:
            return finishTaskReducer(state, action);

        case ActionTypes.RestoreTask:
            return restoreTaskReducer(state, action);

        case ActionTypes.RemoveTask:
            return removeTaskReducer(state, action);

        default:
            return state;
    }
};
