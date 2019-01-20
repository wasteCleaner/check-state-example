import { createSelector, Selector } from "reselect";
import { State, Category } from "../../types";

export const selectCategories = (state: State): Category[] => state.category;

export const selectIsCategoryActive: Selector<State, boolean> = createSelector(selectCategories, categories =>
    categories.some(category => category.active));

export const selectActiveCategory: Selector<State, Category | undefined> = createSelector(
    selectCategories,
    categories => {
        const filtredCategories = categories.filter(category => category.active);
        return filtredCategories.length ? filtredCategories[0] : undefined;
    }
);

export const selectActiveCategoryId: Selector<State, number | undefined> = createSelector(
    selectActiveCategory,
    activeCategory => activeCategory ? activeCategory.id : undefined
);
