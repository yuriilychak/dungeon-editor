import AppBar from "../component/app-bar";
import Button from "../component/button";
import MenuBackground from "../component/menu-background";
import { MenuItem } from "../component/menu-item";
import MenuList from "../component/menu-list";
import { MenuSection } from "../component/menu-section";
import Toolbar from "../component/toolbar";
import TopMenu from "../component/top-menu";
import React from "react";
import reducer from "../reducer";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import {getInitialState} from "../../../test_templates";
import {UI_SECTION} from "../../enum";

document.createRange = jest.fn();

jest.mock("@material-ui/core/Popper", () => ({children}) => (
    <div>
        {children}
    </div>
));

describe("top-menu test",()=> {
    const initialState = getInitialState(reducer, UI_SECTION.TOP_MENU);
    it ( "top-menu snapshot", () => {
        const wrapper = createShallow()(
            <TopMenu {...initialState} />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it ( "Button snapshot", () => {
        const wrapper = createShallow()(
            <Button>test</Button>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it ( "AppBar snapshot", () => {
        const wrapper = createShallow()(
            <AppBar>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </AppBar>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it ( "ToolBar snapshot", () => {
        const wrapper = createShallow()(
            <Toolbar>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </Toolbar>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it ( "MenuBackground snapshot", () => {
        const wrapper = createShallow()(
            <MenuBackground>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </MenuBackground>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
    it ( "MenuList snapshot", () => {
        const wrapper = createShallow()(
            <MenuList>
                <Button>test1</Button>
                <Button>test2</Button>
                <Button>test3</Button>
            </MenuList>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    describe("MenuItem test",() => {
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

        it ( "snapshot default", () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        it ( "snapshot selected", () => {
            const selectedProps = {
                ...props,
                isSelected: true
            };
            const selectedWrapper = createShallow()(
                <MenuItem
                    {...selectedProps}
                />
            );
            expect(selectedWrapper.html()).toMatchSnapshot();
        });

        it ( "click", () => {
            jest.spyOn(wrapper.props(), "onClick");

            wrapper.find("li").first().simulate("click");

            const onClick = wrapper.props().onClick;

            expect(onClick).toHaveBeenCalled();
            expect(onClick).toHaveBeenCalledWith(0);
        });
    });

    describe("MenuSection test", () => {
        const onOpen = jest.fn();
        const props = {
            "id": 1,
            "locale": "TopMenu_File",
            "useToggles": false,
            "sections": [
                {
                    "id": 0,
                    "locale": "TopMenu_NewProject",
                    "hotKey": "Ctr+N",
                    "isToggle": false
                },
                {
                    "id": 1,
                    "locale": "TopMenu_OpenProject",
                    "hotKey": "Ctr+O",
                    "isToggle": false
                },
                {
                    "id": 2,
                    "locale": "TopMenu_SaveAll",
                    "hotKey": "Ctr+S",
                    "isToggle": false
                },
                {
                    "id": 3,
                    "locale": "TopMenu_Export",
                    "hotKey": "Ctr+E",
                    "isToggle": true
                },
                {
                    "id": 17,
                    "locale": "TopMenu_Publish",
                    "hotKey": "Ctr+P",
                    "isToggle": false
                },
                {
                    "id": 4,
                    "locale": "TopMenu_Quit",
                    "hotKey": "Ctr+Q",
                    "isToggle": false
                }
            ],
            onOpen,
            onClose: jest.fn(),
            toggledSections: [3],
            isOpen: true
        };

        const wrapper = createMount()(
            <MenuSection
                {...props}
            />
        );

        it ("snapshot open", () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        it ("snapshot closed", () => {
            const closedProps = {
                ...props,
                isOpen: false
            };
            const closedWrapper = createShallow()(
                <MenuSection
                    {...closedProps}
                />
            );
            expect(closedWrapper.html()).toMatchSnapshot();
        });

        it ("click", () => {
            wrapper.find("button").at(0).simulate("click");

            expect(onOpen).toHaveBeenCalled();
            expect(onOpen).toHaveBeenCalledWith(1);
        });
    });
});
