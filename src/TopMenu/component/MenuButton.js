import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/Button";

const paddingHorizontal = 4;
const paddingVertical = 2;

const MenuButton = withStyles({
    root: {
        paddingLeft: paddingHorizontal + "px",
        paddingRight: paddingHorizontal + "px",
        paddingTop: paddingVertical + "px",
        paddingBottom: paddingVertical + "px",
        height: "24px",
        minHeight: "24px",
        "@media (min-width: 600px)": {
            minHeight: "24px"
        }
    },
    label: {
        lineHeight: 1,
        color: "#ffffff",
        fontSize: "0.6rem"
    }
})(Button);

export default MenuButton;