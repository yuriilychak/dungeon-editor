import React from "react";

import {CheckBox, PointField, SliderField, ColorField} from "../common";
import {VALUE_FORMAT, DIMENSION_FORMATS, DEGREE_FORMATS, PERCENT_FORMATS} from "../../../constants";

import "./stage-element-body.scss";

const StageElementBody = ({
                              locales,
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
                {...locales["position"]}
                formats={DIMENSION_FORMATS}
                {...position}
                onChange={onChange}
            />
            <PointField
                id="size"
                {...locales["size"]}
                formats={DIMENSION_FORMATS}
                {...size}
                onChange={onChange}
            />
            <PointField
                id="scale"
                {...locales["scale"]}
                formats={PERCENT_FORMATS}
                {...scale}
                onChange={onChange}
            />
            <PointField
                id="skew"
                {...locales["skew"]}
                formats={DEGREE_FORMATS}
                {...skew}
                onChange={onChange}
            />
            <PointField
                id="anchor"
                {...locales["anchor"]}
                formats={PERCENT_FORMATS}
                {...anchor}
                onChange={onChange}
            />
            <SliderField
                id="rotation"
                {...locales["rotation"]}
                format={VALUE_FORMAT.DEGREE}
                onChange={onChange}
                value={rotation}
                maxValue={359}
            />
            <SliderField
                id="alpha"
                {...locales["alpha"]}
                onChange={onChange}
                format={VALUE_FORMAT.PERCENT}
                value={alpha}
                maxValue={100}
            />
            <ColorField
                id="tint"
                {...locales["tint"]}
                value={tint}
                onChange={onChange}
            >
                <CheckBox
                    id="visible"
                    {...locales["visible"]}
                    checked={visible}
                    onChange={onChange}
                />
                <CheckBox
                    id="interactive"
                    {...locales["interactive"]}
                    checked={interactive}
                    onChange={onChange}
                />
            </ColorField>
        </div>
    )
};


export default StageElementBody;
