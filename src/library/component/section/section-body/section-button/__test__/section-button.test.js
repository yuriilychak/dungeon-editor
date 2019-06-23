import React from "react";
import {createMount} from "@material-ui/core/test-utils";

import SectionButton from "../section-button";

describe("SectionButton test", () => {
    const onClick = jest.fn();
    const Icon = () => <div>Icon</div>;
    const wrapper = createMount()(
        <SectionButton
            title="test"
            Icon={Icon}
            onClick={onClick}
            fileId={5}
            sectionId={3}
            userData="test"
        />
    );

    it("default snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("test click", () => {
        wrapper.find("button").simulate("click");
        expect(onClick).toHaveBeenCalled();
    });
});
