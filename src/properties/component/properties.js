import React, {Fragment, useEffect, useCallback} from "react";
import {string, func, number, arrayOf, shape, object, bool, objectOf} from "prop-types";

import {TitledPanel} from "../../common-ui";
import {FileHeader} from "./file-header";
import { FileBody } from "./file-body";
import {useLocalization} from "../../hooks";

import "./properties.scss";

const Properties = ({
                        file,
                        locales,
                        iconSize,
                        currentInfo,
                        directoryData,
                        sectionData,
                        stageData,
                        stageElementTrees,
                        init,
                        onRenameFile,
                        onSwitchAtlas,
                        onClearAtlas,
                        onStageElementChange,
                        onSwitchCompressSkeleton,
                        onSwitchCompressName,
                        onChangeSelectedSection
                    }) => {
    useEffect(init, []);

    const { localization, t } = useLocalization(locales);

    const handleRenameFile = useCallback(
        () => onRenameFile(file.id, file.sectionId, file.isStageElement),
        [file]);

    let content;

    if (file !== null) {
        const data = file.isDirectory ? directoryData :
            file.isStageElement ? stageData[file.sectionId] : sectionData[file.sectionId];
        const fileType = t(data.locale);

        content = (
            <Fragment>
                <FileHeader
                    isRoot={file.isRoot}
                    fileName={file.name}
                    nameTitle={localization.nameTitle}
                    fileId={file.id}
                    idTitle={localization.idTitle}
                    fileType={fileType}
                    iconName={data.icon}
                    iconSize={iconSize}
                    preview={file.preview}
                    compressName={file.compressName}
                    onSwitchCompressName={onSwitchCompressName}
                    compressNameLabel={localization.compressNameLabel}
                    onRenameFile={handleRenameFile}
                />
                <FileBody
                    file={file}
                    locales={localization}
                    currentInfo={currentInfo}
                    stageElementTrees={stageElementTrees}
                    onSwitchAtlas={onSwitchAtlas}
                    onClearAtlas={onClearAtlas}
                    onStageElementChange={onStageElementChange}
                    onSwitchCompressSkeleton={onSwitchCompressSkeleton}
                    onSwitchCompressName={onSwitchCompressName}
                    onChangeSelectedSection={onChangeSelectedSection}
                />
            </Fragment>
        );
    } else {
        content = (
            <div className="properties-empty-text">
                {localization.emptyDescription}
            </div>
        );
    }
    return (
        <TitledPanel
            title={localization.sectionTitle}
        >
            {content}
        </TitledPanel>
    )
};

Properties.propTypes = {
    iconSize: number.isRequired,
    file: shape({
        isRoot: bool.isRequired,
        id: number.isRequired,
        name: string.isRequired,
        isDirectory: bool.isRequired,
        sectionId: number.isRequired,
        data: object.isRequired,
        preview: string
    }),
    directoryData: shape({
        locale: string.isRequired,
        icon: string.isRequired
    }).isRequired,
    sectionData: arrayOf(shape({
        locale: string.isRequired,
        icon: string.isRequired
    })).isRequired,
    stageData: arrayOf(shape({
        locale: string.isRequired,
        icon: string.isRequired
    })).isRequired,
    stageElementTrees: objectOf(arrayOf(shape({
        id: string.isRequired,
        content: arrayOf(shape({
                id: string.isRequired,
                children: arrayOf(shape({
                        id: string.isRequired
                    })
                )
            })
        ).isRequired
    }))).isRequired,
    locales: shape({
        compressNameLabel: string.isRequired,
        emptyDescription: string.isRequired,
        idTitle: string.isRequired,
        nameTitle: string.isRequired,
        sectionTitle: string.isRequired,
        library: shape({
            compressSkeletonLabel: string.isRequired,
            atlasAutocompleteLabel: string.isRequired,
            atlasAutocompletePlaceholder: string.isRequired
        }).isRequired
    }).isRequired,
    init: func.isRequired,
    onStageElementChange: func.isRequired,
    onSwitchCompressName: func.isRequired,
    onRenameFile: func.isRequired,
    onSwitchAtlas: func.isRequired,
    onClearAtlas: func.isRequired,
    onChangeSelectedSection: func.isRequired
};

export default Properties;
