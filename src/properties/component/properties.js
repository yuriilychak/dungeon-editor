import React, {Fragment, useEffect, useMemo} from "react";
import {string, func, number, arrayOf, shape, object, bool, objectOf} from "prop-types";
import {useTranslation} from "react-i18next";

import {TitledPanel} from "../../common-ui/titled-panel";
import {FileHeader} from "./file-header";
import {LibraryElementBody, StageElementBody} from "./file-body";
import {generateLocale} from "../../helpers";

import "./properties.css";

const Properties = ({
                        file,
                        locales,
                        iconSize,
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
                        onSwitchCompressName
                    }) => {
    const {t} = useTranslation();

    useEffect(init, []);

    const localesParsed = useMemo(() => generateLocale(locales, t), [locales, t]);

    let content;

    if (file !== null) {
        const data = file.isDirectory ? directoryData :
            file.isStageElement ? stageData[file.sectionId] : sectionData[file.sectionId];
        const fileType = t(data.locale);
        let fileBody = null;

        if (file.isStageElement) {
            fileBody = (
                <StageElementBody
                    data={file.data}
                    isRoot={file.isRoot}
                    locales={localesParsed.stage}
                    elementTrees={stageElementTrees}
                    onChange={onStageElementChange}
                />
            );
        } else if (!file.isDirectory) {
            fileBody = (
                <LibraryElementBody
                    file={file}
                    {...localesParsed.library}
                    onSwitchAtlas={onSwitchAtlas}
                    onSwitchCompressSkeleton={onSwitchCompressSkeleton}
                    onSwitchCompressName={onSwitchCompressName}
                    onClearAtlas={onClearAtlas}
                />
            );
        }

        const handleRenameFile = () => onRenameFile(file.id, file.sectionId, file.isStageElement);

        content = (
            <Fragment>
                <FileHeader
                    isRoot={file.isRoot}
                    fileName={file.name}
                    nameTitle={localesParsed.nameTitle}
                    fileId={file.id}
                    idTitle={localesParsed.idTitle}
                    fileType={fileType}
                    iconName={data.icon}
                    iconSize={iconSize}
                    preview={file.preview}
                    compressName={file.compressName}
                    onSwitchCompressName={onSwitchCompressName}
                    compressNameLabel={localesParsed.compressNameLabel}
                    onRenameFile={handleRenameFile}
                />
                {fileBody}
            </Fragment>
        );
    } else {
        content = (
            <div className="properties-empty-text">
                {localesParsed.emptyDescription}
            </div>
        );
    }
    return (
        <TitledPanel
            title={localesParsed.sectionTitle}
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
