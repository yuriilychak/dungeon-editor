import React from "react";

import {CheckBox, PointField, SliderField, ColorField} from "../common";

import "./stage-element-body.scss";

const StageElementBody = ({
                              visible,
                              position,
                              size,
                              scale,
                              skew,
                              anchor,
                              alpha,
                              rotation,
                              interactive,
                              tint,
                              onChange
                          }) => {
    return (
        <div className="properties-stage-element-body-root">
            <PointField
                id="position"
                mainLabel={"Position"}
                xLabel={"X"}
                yLabel={"Y"}
                {...position}
                onChange={onChange}
            />
            <PointField
                id="size"
                mainLabel={"Size"}
                xLabel={"W"}
                yLabel={"H"}
                {...size}
                onChange={onChange}
            />
            <PointField
                id="scale"
                mainLabel={"Scale"}
                xLabel={"X"}
                yLabel={"Y"}
                {...scale}
                onChange={onChange}
            />
            <PointField
                id="skew"
                mainLabel={"Skew"}
                xLabel={"X"}
                yLabel={"Y"}
                {...skew}
                onChange={onChange}
            />
            <PointField
                id="anchor"
                mainLabel={"Anchor"}
                xLabel={"X"}
                yLabel={"Y"}
                {...anchor}
                onChange={onChange}
            />
            <SliderField
                id="rotation"
                label={"Rotation"}
                format={"°"}
                onChange={onChange}
                value={rotation}
                maxValue={359}
            />
            <SliderField
                id="alpha"
                label={"Alpha"}
                onChange={onChange}
                format={"%"}
                value={alpha}
                maxValue={100}
            />
            <ColorField
                id="tint"
                label="Tint"
                value={tint}
                onChange={onChange}
            >
                <CheckBox
                    id="visible"
                    label="Visible"
                    checked={visible}
                    onChange={onChange}
                />
                <CheckBox
                    id="interactive"
                    label="Interactive"
                    checked={interactive}
                    onChange={onChange}
                />
            </ColorField>
        </div>
    )
};


export default StageElementBody;
