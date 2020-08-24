import React from "react";

import { StageElementBody } from "./stage-element-body";
import { LibraryElementBody } from "./library-element-body";

const FileBody = ({
    file,
    locales,
    currentInfo,
    stageElementTrees,
    onSwitchAtlas,
    onClearAtlas,
    onStageElementChange,
    onSwitchCompressSkeleton,
    onSwitchCompressName,
    onChangeSelectedSection
}) => {
    switch (true) {
    case file.isStageElement:
        return (
            <StageElementBody
                data={file.data}
                isRoot={file.isRoot}
                currentInfo={currentInfo}
                locales={locales.stage}
                elementTrees={stageElementTrees}
                onChange={onStageElementChange}
                onChangeSelectedSection={onChangeSelectedSection}
            />
        );
    case !file.isDirectory:
        return (
            <LibraryElementBody
                file={file}
                {...locales.library}
                onSwitchAtlas={onSwitchAtlas}
                onSwitchCompressSkeleton={onSwitchCompressSkeleton}
                onSwitchCompressName={onSwitchCompressName}
                onClearAtlas={onClearAtlas}
            />
        );
    default:
        return null;
    }
};

export default FileBody;
