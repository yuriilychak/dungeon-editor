import "../../Locale";
import AppBar from "../component/AppBar";
import Button from "../component/Button";
import MenuBackground from "../component/MenuBackground";
import MenuItem from "../component/MenuItem";
import MenuList from "../component/MenuList";
import ToolBar from "../component/ToolBar";
import React from "react";
import { createMount } from '@material-ui/core/test-utils';

describe('TopMenu test',()=> {
    it ( 'Button snapshot', () => {
        const wrapper = createMount()(
            <Button>test</Button>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
    it ( 'AppBar snapshot', () => {
        const wrapper = createMount()(
            <AppBar>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </AppBar>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
    it ( 'ToolBar snapshot', () => {
        const wrapper = createMount()(
            <ToolBar>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </ToolBar>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
    it ( 'MenuBackground snapshot', () => {
        const wrapper = createMount()(
            <MenuBackground>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </MenuBackground>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
    it ( 'MenuList snapshot', () => {
        const wrapper = createMount()(
            <MenuList>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </MenuList>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('MenuItem test',() => {
        const props = {
            onClick: jest.fn(),
            id: 0,
            locale: "test",
            hotKey: "Ctr+Shift",
            isSelected: false
        };

        const wrapper = createMount()(
            <MenuItem
                {...props}
            />
        );

        it ( 'snapshot default', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        it ( 'snapshot selected', () => {
            const selectedProps = {
                ...props,
                isSelected: true
            };
            const selectedWrapper = createMount()(
                <MenuItem
                    {...selectedProps}
                />
            );
            expect(selectedWrapper.html()).toMatchSnapshot();
        });

        it ( 'click', () => {
            jest.spyOn(wrapper.props(), "onClick");

            wrapper.find("li").first().simulate("click");

            expect(wrapper.props().onClick).toHaveBeenCalled();
            expect(wrapper.props().onClick).toHaveBeenCalledWith(0);
        });
    });

});