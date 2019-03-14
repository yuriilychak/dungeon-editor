import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/Button";

const paddingHorizontal = 8;
const paddingVertical = 2;

const style = theme => (
    {
        root: {
            paddingLeft: paddingHorizontal + "px",
            paddingRight: paddingHorizontal + "px",
            paddingTop: paddingVertical + "px",
            paddingBottom: paddingVertical + "px",
            height: "24px",
            minHeight: "24px",
            minWidth: 32,
            "@media (min-width: 600px)": {
                minHeight: "24px"
            }
        },
        label: {
            lineHeight: 1,
            color: theme.palette.primary.contrastText,
            fontSize: "0.6rem"
        }
    }
);

export default withStyles(style)(Button);
