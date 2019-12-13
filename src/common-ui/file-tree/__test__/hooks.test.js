import React from "react";

import {shallow} from "enzyme";

import {useFileTree} from "../hooks";

function HookWrapper(props) {
    const hook = props.hook ? props.hook() : undefined;// eslint-disable-line
    return <div hook={hook}/>;
}

const getHook = wrapper => wrapper.find("div").props().hook;

jest.mock("@material-ui/icons/Folder", () => "div");
jest.mock("@material-ui/icons/FolderOpen", () => "div");

describe("useWebRootLogin hook", () => {
    const treeData = [
        {title: ".gitignore"},
        {title: "package.json"},
        {
            title: "src",
            isDirectory: true,
            expanded: true,
            children: [
                {title: "styles.css"},
                {title: "index.js"},
                {title: "reducers.js"},
                {title: "actions.js"},
                {title: "utils.js"},
            ],
        },
        {
            title: "tmp",
            isDirectory: true,
            children: [
                {title: "12214124-log"},
                {title: "drag-disabled-file", dragDisabled: true},
            ],
        },
        {
            title: "build",
            isDirectory: true,
            children: [{title: "react-sortable-tree.js"}],
        },
        {
            title: "public",
            isDirectory: true,
        },
        {
            title: "node_modules",
            isDirectory: true,
        },
    ];

    const generateNodeProps = jest.fn((fileInfo) => {
        return fileInfo.node.expanded ? { icons: [] } : {};
    });

    const wrapper = shallow(<HookWrapper hook={() => useFileTree(treeData, generateNodeProps)}/>);
    let [treeHeight, canDrag, canDrop, onGenerateNodeProps] = getHook(wrapper);

    it("check FileTree height", () => expect(treeHeight).toEqual(300));

    it("check canDrag method", () => expect(canDrag({node: {dragDisabled: false}})).toBeTruthy());

    it("check canDrop method with empty value", () => expect(canDrop({nextParent: null})).toBeTruthy());

    it("check canDrop method with file value", () => expect(canDrop({nextParent: {isDirectory: false}})).toBeFalsy());

    it("check canDrop method with directory value", () => expect(canDrop({nextParent: {isDirectory: true}})).toBeTruthy());

    it("check onGenerateNodeProps method with opened directory value", () =>
        expect(onGenerateNodeProps({
            node: {
                title: "src",
                isDirectory: true,
                expanded: true,
                children: [
                    {title: "styles.css"},
                    {title: "index.js"},
                    {title: "reducers.js"},
                    {title: "actions.js"},
                    {title: "utils.js"},
                ]
            }
        }))
            .toEqual({
                icons: [
                    <div className="section-body-icon" />
                ]
            })
    );

    it("check onGenerateNodeProps method with closed directory value", () =>
        expect(onGenerateNodeProps({
            node: {
                title: "src",
                isDirectory: true,
                expanded: false,
                children: [
                    {title: "styles.css"},
                    {title: "index.js"},
                    {title: "reducers.js"},
                    {title: "actions.js"},
                    {title: "utils.js"},
                ]
            }
        }))
            .toEqual({
                icons: [
                    <div className="section-body-icon" />
                ]
            })
    );

    it("check onGenerateNodeProps method with closed directory value", () =>
        expect(onGenerateNodeProps({
            node: {
                title: "src",
                isDirectory: false,
                expanded: false
            }
        }))
            .toEqual({})
    );
});

