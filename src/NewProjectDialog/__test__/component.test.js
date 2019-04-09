import NewProjectDialog from "../component";
import { initialState } from '../reducer';
import React from "react";
import { createMount } from '@material-ui/core/test-utils';


describe('NewProjectDialog snapshots',()=>{
    it('Root snapshot', () => {
        const wrapper = createMount()(
            <NewProjectDialog
                {...initialState}
                isPopupOpen={true}
                onClosePopup={()=>{}}
                onSubmitProject={()=>{}}
            />
            );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
