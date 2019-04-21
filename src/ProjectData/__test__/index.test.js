import * as fileSaver from "file-saver";
import JSZip from "jszip";
import ProjectData from "../index";
import projectTemplate from "../data/ProjectTemplate";
import store from "../../store";

jest.mock("jszip", () =>
    jest.fn().mockImplementation(() => ({
            file: jest.fn(),
            generateAsync: jest.fn(() => Promise.resolve("test"))
        })));

jest.mock("file-saver", () => ({
    saveAs: jest.fn()
}));

jest.mock("store", () => ({
    dispatch: jest.fn()
}));

describe("Test ProjectData Functional", () => {
    it("Test init function", () => {
        ProjectData.init();
        expect(ProjectData._projectData).toEqual(projectTemplate);
    });

    it("Test rename function", () => {
        const name = "TestName";
        ProjectData.rename(name);
        expect(ProjectData._projectData).toEqual({
            ...projectTemplate,
            name
        });
    });

    it("Test rename function", () => {
        const name = "TestName";
        ProjectData.rename(name);
        expect(ProjectData._projectData).toEqual({
            ...projectTemplate,
            name
        });
    });

    it("Test export function", () => {
        ProjectData.export();
        expect(store.dispatch).toHaveBeenCalled();
        expect(JSZip).toHaveBeenCalled();
        expect(ProjectData._zip.file).toHaveBeenCalled();
        expect(ProjectData._zip.generateAsync).toHaveBeenCalled();
    });

    it("Test clearZipData function", () => {
        ProjectData.clearZipData();
        expect(ProjectData._zipData).toEqual(null);
    });

    it("Test save function", () => {
        ProjectData.clearZipData();
        ProjectData.save();
        expect(fileSaver.saveAs).not.toHaveBeenCalled();
        ProjectData._zipData = new Blob(["{test: 1}"], {type : 'application/json'});
        ProjectData.save();
        expect(fileSaver.saveAs).toHaveBeenCalled();
    });
});
