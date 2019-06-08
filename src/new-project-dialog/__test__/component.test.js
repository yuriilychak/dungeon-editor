import NewProjectDialog from "../component";
import NameInput from "../../common-ui/name-input/name-input";
import { initialState } from '../reducer';
import React from "react";
import { createMount } from '@material-ui/core/test-utils';
import "../../Locale";


describe('new-project-dialog index test',()=>{
    const props = {
        ...initialState,
        isPopupOpen: true,
        onClosePopup: jest.fn(),
        onSubmitProject: jest.fn()
    };

    const wrapper = createMount()(
        <NewProjectDialog
            {...props}
        />
    );

    const projectInput = wrapper.find('input');

    it('Open snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Close snapshot', () => {
        const wrapper = createMount()(
            <NewProjectDialog
                {...initialState}
                isPopupOpen={false}
                onClosePopup={ jest.fn() }
                onSubmitProject={ jest.fn() }
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Click submit with empty project name', () => {
        jest.spyOn(wrapper.props(), "onSubmitProject");

        const button = wrapper.find('#newProjectDialog-submit').first();

        projectInput.simulate('change', { target: { value: '' } });
        button.simulate('click');
        expect(wrapper.props().onSubmitProject).not.toHaveBeenCalled();
    });

    it('Click submit with "test" project name', () => {
        jest.spyOn(wrapper.props(), "onSubmitProject");

        const button = wrapper.find('#newProjectDialog-submit').first();

        projectInput.simulate('change', { target: { value: 'test' } });
        button.simulate('click');
        expect(wrapper.props().onSubmitProject).toHaveBeenCalled();
    });

    it('Click cancel', () => {
        jest.spyOn(wrapper.props(), "onClosePopup");

        const button = wrapper.find('#newProjectDialog-cancel').first();
        button.simulate('click');
        expect(wrapper.props().onClosePopup).toHaveBeenCalled();
    });

});

describe( 'new-project-dialog NameInput test', () => {

    const props = {
        isError: false,
        titleLocale: "test locale",
        errorLocale: "test error",
        maxLength: 20
    };

    const wrapper = createMount()(
        <NameInput
            {...props}
        />
    );
    const instance = wrapper.instance();

    it('Default snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Error snapshot', () => {
        const errorProps = {...props, isError: true};
        const errorWrapper = createMount()(
            <NameInput
                {...errorProps}
            />
        );

        expect(errorWrapper.html()).toMatchSnapshot();
    });

    it('Test input value: not empty', () => {
        instance.onProjectNameChange({
            target: {
                value: "test_text difference"
            }
        });

        expect(instance.state.projectName).toBe("test_text");
    });

    it('Test input value: empty', () => {
        instance.onProjectNameChange({
            target: {
                value: " "
            }
        });

        expect(instance.state.projectName).toBe("");
    });
});
