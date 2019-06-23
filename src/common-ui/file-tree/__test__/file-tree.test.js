import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import FileTree from "../file-tree";

describe("FileTree test",()=> {
    const treeData = [
        { title: '.gitignore' },
        { title: 'package.json' },
        {
            title: 'src',
            isDirectory: true,
            expanded: true,
            children: [
                { title: 'styles.css' },
                { title: 'index.js' },
                { title: 'reducers.js' },
                { title: 'actions.js' },
                { title: 'utils.js' },
            ],
        },
        {
            title: 'tmp',
            isDirectory: true,
            children: [
                { title: '12214124-log' },
                { title: 'drag-disabled-file', dragDisabled: true },
            ],
        },
        {
            title: 'build',
            isDirectory: true,
            children: [{ title: 'react-sortable-tree.js' }],
        },
        {
            title: 'public',
            isDirectory: true,
        },
        {
            title: 'node_modules',
            isDirectory: true,
        },
    ];

    const onChange = jest.fn();

    it('default snapshot', () => {
        const generateNodeProps = () => ({});
        const wrapper = createMount()(
            <FileTree
                treeData={treeData}
                generateNodeProps={generateNodeProps}
                onChange={onChange}
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('existing icons', () => {
        const generateNodeProps = () => ({ icon: []});

        const wrapper = createMount()(
            <FileTree
                treeData={treeData}
                generateNodeProps={generateNodeProps}
                onChange={onChange}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
