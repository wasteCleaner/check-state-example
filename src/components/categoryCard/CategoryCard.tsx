import React from "react";
import classnames from "classnames";
import * as Type from "../../types";
import "./CategoryCard.css";

type CategoryCardProps = {
    category: Type.Category;
    onClick: () => void;
    onDelete: () => void;
}

export const CategoryCard: React.FunctionComponent<CategoryCardProps> = ({ category, onDelete, onClick }) => {
    return (
        <div className={classnames("CategoryCard", category.active && "CategoryCard__active")}>
            <div className={classnames("CategoryCard-indicator")} onClick={onClick} />
            <div className="CategoryCard-name" onClick={onClick}>
                { category.name }
            </div>
            <div className="CategoryCard-delete" onClick={onDelete} />
        </div>
    );
};
