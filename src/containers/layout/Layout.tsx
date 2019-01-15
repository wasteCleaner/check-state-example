import React, { Component } from "react";
import { CategoriesConnected } from "../categories"
import "./Layout.css";

export class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <CategoriesConnected />
            </div>
        );
    }
}
