import { createSelector, Selector } from "reselect";
import * as Type from "../../types";
import { selectActiveCategoryId } from "../category";

export const selectTasks = (state: Type.State): Type.Task[] => state.task;
export const selectActiveTasks: Selector<Type.State, Type.Task[]> = createSelector(
    selectTasks,
    selectActiveCategoryId,
    (tasks, categoryId) => tasks.filter(task => task.categoryId === categoryId),
);
export const selectActiveDoneTasks: Selector<Type.State, Type.Task[]> = createSelector(
    selectTasks,
    selectActiveCategoryId,
    (tasks, categoryId) => tasks.filter(task => task.categoryId === categoryId && task.isDone),
);

export const selectActiveInProgressTasks: Selector<Type.State, Type.Task[]> = createSelector(
    selectTasks,
    selectActiveCategoryId,
    (tasks, categoryId) => tasks.filter(task => task.categoryId === categoryId && !task.isDone),
);
