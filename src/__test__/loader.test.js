import i18n from "i18next";

import { loadStatic } from "../loader";

jest.mock("i18next", () => ({
    use: jest.fn(() => ({ init: jest.fn() }))
}));

jest.mock("react-i18next", () => ({
    initReactI18next: "test"
}));

global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ name: 'fetchedData' }) });

describe("GIVEN root loader", () => {
    it("WHEN call loadStatic THEN localization should init", async () => {
        await loadStatic();

        expect(i18n.use).toHaveBeenCalled();
    });
});