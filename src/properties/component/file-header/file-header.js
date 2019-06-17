import React from "react";

import EditIcon from '@material-ui/icons/Edit';

import {Icon} from "../../../common-ui/icon";
import {TitledField} from "../../../common-ui/titled-field";
import {ToolButton} from "../../../common-ui/tool-button";

import "./file-header.css";

export default ({
                    fileName,
                    fileId,
                    fileType,
                    idTitle,
                    iconName,
                    iconSize,
                    nameTitle,
                    onRenameFile
                }) => (
    <div className="properties-header-root">
        <div className="properties-header-icon">
            <Icon name={iconName} size={iconSize}/>
            <div>{fileType}</div>
        </div>
        <div className="properties-header-description">
            <TitledField
                className="properties-header-field"
                title={nameTitle}
            >
                <div className="properties-header-name">
                    {fileName}
                </div>
                <ToolButton onClick={onRenameFile} Icon={EditIcon}/>
            </TitledField>
            <TitledField
                className="properties-header-field"
                title={idTitle}
            >
                {fileId}
            </TitledField>
        </div>
    </div>
);

