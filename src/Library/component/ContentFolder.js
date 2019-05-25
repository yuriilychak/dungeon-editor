import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from "react";
import ElementItem from "./ElementItem";
import Icon from "./Icon";

const ContentFolder = ({
                           title,
                           emptyText,
                           id,
                           icon,
                           files,
                           deleteText,
                           renameText,
                           onRemoveElement
}) => {
    const content = files.length !== 0 ? files.map( file => (
        <ElementItem
            key={file.id}
            sectionId={id}
            {...file}
            icon={icon}
            onRemoveElement={onRemoveElement}
            deleteText={deleteText}
            renameText={renameText}
        />
    )) : emptyText;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Icon name={`${icon}_root`}/>
                {title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {content}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default React.memo(ContentFolder);
