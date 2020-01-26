import React, { memo } from "react";
import { string, func, node, bool } from "prop-types";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Icon} from "../icon";

import "./expansion-panel.scss";

const ExpansionPanelLocal = ({
    id,
    expanded,
    headerContent,
    onChange,
    icon,
    title,
    children
                        }) => {

    return (
        <ExpansionPanel
            expanded={expanded}
            onChange={onChange}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={id}
                id={id}
            >
                <Icon name={icon} size={16} />
                <span className="expansion-panel-title">
                    {title}
                </span>
                {headerContent}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                { children }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

ExpansionPanelLocal.propTypes = {
    id: string.isRequired,
    icon: string.isRequired,
    title: string.isRequired,
    children: node.isRequired,
    headerContent: node,
    expanded: bool,
    onChange: func
};

export default memo(ExpansionPanelLocal);
