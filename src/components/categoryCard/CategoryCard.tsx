import React from "react";
import classnames from "classnames";
import * as Type from "../../types";
import "./CategoryCard.css";

type CategoryCardProps = {
    category: Type.Category;
    onClick: () => void;
    delete: () => void;
}

export const CategoryCard: React.FunctionComponent<CategoryCardProps> = ({ category }) => {
    return (
        <div className={classnames("CategoryCard", category.active && "CategoryCard__active")}>
            <div className="CategoryCard-name">
                { category.name }
            </div>
        </div>
    );
};
