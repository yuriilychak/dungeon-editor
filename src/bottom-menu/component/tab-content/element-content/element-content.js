import React from "react";

import { ElementItem } from "./element-item";

import "./element-content.scss";

const ElementContent = (props) => {
    return (
        <div className="element-content-root">
            <ElementItem title={"Button"} icon={"button"}/>
            <ElementItem title={"Checkbox"} icon={"checkbox"}/>
            <ElementItem title={"Label"} icon={"label"}/>
            <ElementItem title={"Text field"} icon={"text_field"}/>
            <ElementItem title={"Tile map"} icon={"tile_map"}/>
            <ElementItem title={"Toggle button"} icon={"toggle_button"}/>
            <ElementItem title={"List view"} icon={"list_view"}/>
            <ElementItem title={"Scroll view"} icon={"scroll_view"}/>
            <ElementItem title={"Panel"} icon={"panel"}/>
            <ElementItem title={"Widget"} icon={"widget"}/>
            <ElementItem title={"Image view"} icon={"image_view"}/>
            <ElementItem title={"Page view"} icon={"page_view"}/>
            <ElementItem title={"Skeleton"} icon={"skeleton"}/>
            <ElementItem title={"Slider"} icon={"slider"}/>
            <ElementItem title={"Progressbar"} icon={"progress_bar"}/>
            <ElementItem title={"Container"} icon={"container"}/>
            <ElementItem title={"Sprite"} icon={"sprite"}/>
            <ElementItem title={"Particle"} icon={"particle"}/>
        </div>
    )
};

export default ElementContent;
