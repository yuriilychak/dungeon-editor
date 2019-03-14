import React, {Component} from 'react';
import Button from "./Button";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from './MenuItem';
import MenuList from './MenuList';
import MenuBackground from "./MenuBackground";

export default class MenuSection extends Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props);


        this._onOpen = this._onOpen.bind(this);
        this._onClose = this._onClose.bind(this);
    }


    render() {
        const {open} = this.state;
        const {title} = this.props;

        return (
            <div>
                <Button
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this._onOpen}
                >
                   {title}
                </Button>
                <Popper
                    placement="bottom-start"
                    open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
                        >
                            <MenuBackground>
                                <ClickAwayListener onClickAway={this._onClose}>
                                    <MenuList>
                                        <MenuItem onClick={this._onClose}>Profile</MenuItem>
                                        <MenuItem onClick={this._onClose}>My account</MenuItem>
                                        <MenuItem onClick={this._onClose}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </MenuBackground>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }

    /**
     * @method
     * @private
     */

    _onOpen() {
        this.setState({ open: true });
    }

    /**
     * @method
     * @private
     */

    _onClose() {
        this.setState({ open: false });
    }
}
