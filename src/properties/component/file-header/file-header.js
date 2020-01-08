import React from "react";
import classNames from "classnames";

import EditIcon from '@material-ui/icons/Edit';

import {Icon, TitledField, ToolButton, ImagePreview} from "../../../common-ui";

import "./file-header.css";

const FileHeader = ({
                        isRoot,
                        fileName,
                        fileId,
                        fileType,
                        idTitle,
                        iconName,
                        iconSize,
                        nameTitle,
                        onRenameFile,
                        preview
                    }) => {
    const iconSection = (
        <div className="properties-header-icon">
            <Icon name={iconName} size={iconSize}/>
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
                <TitledField
                    className="properties-header-field"
                    title={idTitle}
                >
                    {fileId}
                </TitledField>
            </div>
        </div>
    )
};

export default FileHeader;

