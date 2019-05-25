import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        width: 16,
        height: 16,
        paddingRight: "8px !important",
        fill: "#ffffff"
    }
});

const Icon = ({name}) => (
    <img src={`${process.env.PUBLIC_URL}/icon/${name}.svg`} className={useStyles().root} alt={"empty Icon"}/>
);

export default Icon;
