import { createSelector, Selector } from "reselect";
import { State, Category } from "../../types";

export const selectCategories = (state: State): Category[] => state.category;
export const selectCategoryById = (id: number): Selector<State, Category | undefined> => createSelector(
    selectCategories,
    categories => {
        const filteredCategory = categories.filter(category => category.id === id);
        return filteredCategory.length ? filteredCategory[0] : undefined;
    }
);
