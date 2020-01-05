import React, {Fragment, useEffect} from "react";
import {string, func, number, arrayOf, shape, object, bool} from "prop-types";
import {useTranslation} from "react-i18next";

import {TitledPanel} from "../../common-ui/titled-panel";
import {FileHeader} from "./file-header";
import {LibraryElementBody, StageElementBody} from "./file-body";

import "./properties.css";

const Properties = ({
                        file,
                        locales,
                        iconSize,
                        directoryData,
                        sectionData,
                        stageData,
                        init,
                        onRenameFile,
                        onSwitchAtlas,
                        onClearAtlas,
                        onStageElementChange,
                        onSwitchCompressSkeleton,
                        onSwitchCompressName
                    }) => {
    const {t} = useTranslation();

    useEffect(init, []);

    let content;

    if (file !== null) {
        const data = file.isDirectory ? directoryData :
            file.isStageElement ? stageData[file.sectionId] : sectionData[file.sectionId];
        const fileType = t(data.locale);
        let fileBody = null;

        if (file.isStageElement) {
            fileBody = (
                <StageElementBody
                    {...file.data}
                    onChange={onStageElementChange}
                />
            );
        }
        else if (!file.isDirectory) {
            fileBody = (
                <LibraryElementBody
                    file={file}
                    compressNameLabel={t(locales.compressName)}
                    compressSkeletonLabel={t(locales.compressSkeleton)}
                    atlasAutocompleteLabel={t(locales.selectAtlasLabel)}
                    atlasAutocompletePlaceholder={t(locales.selectAtlasPlaceholder)}
                    onSwitchAtlas={onSwitchAtlas}
                    onSwitchCompressSkeleton={onSwitchCompressSkeleton}
                    onSwitchCompressName={onSwitchCompressName}
                    onClearAtlas={onClearAtlas}
                />
            );
        }

        const handleRenameFile = () => onRenameFile(file.id, file.sectionId);

        content = (
            <Fragment>
                <FileHeader
                    fileName={file.name}
                    nameTitle={t(locales.nameTitle)}
                    fileId={file.id}
                    idTitle={t(locales.idTitle)}
                    fileType={fileType}
                    iconName={data.icon}
                    iconSize={iconSize}
                    preview={file.preview}
                    onRenameFile={handleRenameFile}
                />
                {fileBody}
            </Fragment>
        );
    } else {
        content = (
            <div className="properties-empty-text">
                {t(locales.emptyDescription)}
            </div>
        );
    }
    return (
        <TitledPanel
            title={t(locales.sectionTitle)}
            bodyPadding="8px 12px 0 12px"
        >
            {content}
        </TitledPanel>
    )
};

Properties.propTypes = {
    iconSize: number.isRequired,
    file: shape({
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
    locales: shape({
        compressName: string.isRequired,
        compressSkeleton: string.isRequired,
        emptyDescription: string.isRequired,
        idTitle: string.isRequired,
        nameTitle: string.isRequired,
        sectionTitle: string.isRequired,
        selectAtlasLabel: string.isRequired,
        selectAtlasPlaceholder: string.isRequired
    }).isRequired,
    init: func.isRequired,
    onStageElementChange: func.isRequired,
    onSwitchCompressName: func.isRequired,
    onRenameFile: func.isRequired,
    onSwitchAtlas: func.isRequired,
    onClearAtlas: func.isRequired
};

export default Properties;
