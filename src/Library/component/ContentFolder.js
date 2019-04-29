import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    icon: {
        width: 16,
        height: 16,
        paddingRight: "8px !important",
        fill: "#ffffff"
    }
});

const ContentFolder = props => {
    const classes = useStyles();
    const { title, emptyText, icon, files } = props;
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <img src={icon} className={classes.icon} alt={"empty Icon"}/>
                {title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {emptyText}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default ContentFolder;
