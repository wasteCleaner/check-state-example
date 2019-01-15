import {
    Category as CategoryType,
    Reducer,
} from "../../types";

const initial: CategoryType[] = [];

enum ActionTypes {
    AddCategory = "category/addCategory",
    DeleteCategory = "category/deleteCategory",
    EditCategory = "category/editCategory",
}

type AddCategoryAction = {
    type: ActionTypes.AddCategory;
    payload: {
        id: number;
        name: string;
    };
};

type EditCategoryAction = {
    type: ActionTypes.EditCategory;
    payload: {
        id: number;
        name: string;
    }
};

type DeleteCategoryAction = {
    type: ActionTypes.DeleteCategory;
    payload: number;
}

export const addCategory = (category: CategoryType): AddCategoryAction => ({
    type: ActionTypes.AddCategory,
    payload: category,
});

export const editCategory = (id: number, name: string): EditCategoryAction => ({
    type: ActionTypes.EditCategory,
    payload: {
        id,
        name,
    },
});

export const deleteCategory = (id: number): DeleteCategoryAction => ({
    type: ActionTypes.DeleteCategory,
    payload: id,
});

const addCategoryReducer: Reducer<CategoryType[], AddCategoryAction> = (state, { payload }) =>
    [...state].concat(payload);

const editCategoryReducer: Reducer<CategoryType[], EditCategoryAction> = (state, { payload }) =>
    [...state.map(category => category.id === payload.id ? payload : category)];

const deleteCategoryReducer: Reducer<CategoryType[], DeleteCategoryAction> = (state, { payload }) =>
    [...state.filter(category => category.id !== payload)];

type Actions = AddCategoryAction | EditCategoryAction | DeleteCategoryAction;

export const category = (state = initial, action: Actions): CategoryType[] => {
    switch (action.type) {
        case ActionTypes.AddCategory:
            return addCategoryReducer(state, action);
        case ActionTypes.EditCategory:
            return editCategoryReducer(state, action);
        case ActionTypes.DeleteCategory:
            return deleteCategoryReducer(state, action);
        default:
            return state;
    }
};
