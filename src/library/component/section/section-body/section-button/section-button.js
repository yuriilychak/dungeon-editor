import React, { memo } from "react";
import { func, string, number, bool, oneOfType } from "prop-types";

import { ToolButton } from "../../../../../common-ui/tool-button";

const SectionButton = ({
                           title,
                           Icon,
                           onClick,
                           fileId,
                           sectionId,
                           userData
                       }) => {
    const onSelect = () => onClick(sectionId, fileId, userData);

    return (
        <ToolButton
            title={title}
            Icon={Icon}
            onClick={onSelect}
        />
    );
};

SectionButton.defaultProps = {
    userData: null
};

SectionButton.propTypes = {
    title: string,
    Icon: func.isRequired,
    onClick: func.isRequired,
    fileId: number.isRequired,
    sectionId: number.isRequired,
    userData: oneOfType([string, number, bool])
};

export default memo(SectionButton);

