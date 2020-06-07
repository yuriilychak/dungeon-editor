import { getBorderStyle, connectStore, generateLocale } from "../helpers";

jest.mock("react-redux", () => ({
    connect: stateCallback => () => stateCallback
}));

describe("GIVEN root helpers", () => {
    it("WHEN call getBorderStyle WITH default props THEN result string should equal expected", () => {
        expect(getBorderStyle("test")).toEqual("test solid 1px");
    });

    it("WHEN call connectStore THEN connector should return valid state", () => {
        const storeConnector = connectStore("test", "test2", {});

        expect(storeConnector({
            tes1: { name: "test1" },
            test2: { name: "test2" }
        })).toEqual({ name: "test2" });
    });

    it("WHEN call generateLocale WITH nested information THEN result object shoud equal expected", () => {
        expect(generateLocale({
            locale1: "test1",
            localeSection: { locale2: "test2" }
        },locale => `${locale}_value`)).toEqual({
            locale1: "test1_value",
            localeSection: { locale2: "test2_value" }
        });
    });
});