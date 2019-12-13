import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import Loader from "../loader";

describe("Loader test",()=> {

    it('default snapshot', () => {
        expect(createShallow()(
            <Loader
                size={30}
                isLoading
            >
                Test
            </Loader>
        ).html()).toMatchSnapshot();
    });

    it('default snapshot with loading disabled', () => {
        expect(createShallow()(
            <Loader
                size={30}
                isLoading={false}
            >
                Test
            </Loader>
        ).html()).toMatchSnapshot();
    });
});
