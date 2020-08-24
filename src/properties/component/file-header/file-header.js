import React, { memo } from "react";
import classNames from "classnames";

import EditIcon from '@material-ui/icons/Edit';

import { Icon, TitledField, ToolButton, ImagePreview } from "../../../common-ui";
import { CheckBox } from "../file-body/common/check-box";

import "./file-header.scss";

const FileHeader = ({
    isRoot,
    fileName,
    fileId,
    fileType,
    idTitle,
    iconName,
    iconSize,
    nameTitle,
    compressName,
    onSwitchCompressName,
    compressNameLabel,
    onRenameFile,
    preview
}) => {
    const iconSection = (
        <div className="properties-header-icon">
            <Icon
                name={iconName}
                size={iconSize}
                className="properties-header-icon-root"
            />
            <div className="properties-header-icon-title">
                {fileType}
            </div>
        </div>
    );

    const wrapper = preview ? (
        <ImagePreview
            preview={preview}
            height={150}
        >
            {iconSection}
        </ImagePreview>
    ) : iconSection;

    return (
        <div className="properties-header-root">
            {wrapper}
            <div className="properties-header-description">
                <TitledField
                    className="properties-header-name-field"
                    title={nameTitle}
                >
                    <div className="properties-header-name">
                        {fileName}
                    </div>
                    <div className={classNames({ "properties-header-name-icon-disabled": isRoot })}>
                        <ToolButton
                            disabled={isRoot}
                            onClick={onRenameFile}
                            Icon={EditIcon}
                        />
                    </div>
                </TitledField>
                <div className="properties-header-params">
                    <TitledField
                        className="properties-header-field"
                        title={idTitle}
                    >
                        {fileId}
                    </TitledField>
                    <CheckBox
                        value={compressName}
                        onChange={onSwitchCompressName}
                        label={compressNameLabel}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(FileHeader);

