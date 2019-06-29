import React, {Fragment} from "react";
import {string, func, number, arrayOf, shape, object, bool} from "prop-types";
import {useTranslation} from "react-i18next";

import {TitledPanel} from "../../common-ui/titled-panel";
import {FileHeader} from "./file-header";
import { LibraryElementBody } from "./file-body";

import "./properties.css";

const Properties = ({
                        file,
                        locales,
                        iconSize,
                        directoryData,
                        sectionData,
                        onRenameFile,
                        onSwitchAtlas,
                        onClearAtlas,
                        onSwitchCompressName
                    }) => {
    const {t} = useTranslation();

    let content;

    if (file !== null) {
        const data = file.isDirectory ? directoryData : sectionData[file.sectionId];
        const fileType = t(data.locale);
        let fileBody = null;

        if (!file.isDirectory) {
            fileBody = (
                <LibraryElementBody
                    file={file}
                    compressNameLabel={t(locales.compressName)}
                    atlasAutocompleteLabel={t(locales.selectAtlasLabel)}
                    atlasAutocompletePlaceholder={t(locales.selectAtlasPlaceholder)}
                    onSwitchAtlas={onSwitchAtlas}
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
    }
    else {
        content = (
            <div className="properties-empty-text">
                {t(locales.emptyDescription)}
            </div>
        );
    }
    return (
        <TitledPanel title={t(locales.sectionTitle)}>
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
    locales: shape({
        compressName: string.isRequired,
        emptyDescription: string.isRequired,
        idTitle: string.isRequired,
        nameTitle: string.isRequired,
        sectionTitle: string.isRequired,
        selectAtlasLabel: string.isRequired,
        selectAtlasPlaceholder: string.isRequired
    }).isRequired,
    onSwitchCompressName: func.isRequired,
    onRenameFile: func.isRequired,
    onSwitchAtlas: func.isRequired,
    onClearAtlas: func.isRequired
};

export default Properties;
