import React from "react";

export default (props) => {
    const { treeData, generateNodeProps, onChange } = props;

    const iterateElements = elements => {
        elements.forEach(element => {
            const props = generateNodeProps({node: element});

            props.onClick();

            if (element.children) {
                iterateElements(element.children);
            }
        });
    };

    iterateElements(treeData);

    onChange(treeData);

    return (
        <div>Test file tree</div>
    );
};
