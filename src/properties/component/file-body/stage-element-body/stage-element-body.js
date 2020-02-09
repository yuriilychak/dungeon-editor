import React from "react";

import {PropertySection} from "./property-section";
import {FileArea} from "../../../../common-ui";

import "./stage-element-body.scss";


const StageElementBody = ({
                              isRoot,
                              locales,
                              data,
                              currentInfo,
                              elementTrees,
                              onChange,
                              onChangeSelectedSection
                          }) => (
    <div className="properties-stage-element-body-root">
        {data.sections.map(id => (
            <PropertySection
                id={id}
                key={id}
                sectionTree={elementTrees[id]}
                locales={locales}
                data={data}
                expanded={id === currentInfo.sectionId}
                onExpansionChange={onChangeSelectedSection}
                onChange={onChange}
            />
        ))}
    </div>
);


export default StageElementBody;
