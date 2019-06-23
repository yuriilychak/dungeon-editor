import React from "react";

import {AutoComplete} from "../../../../common-ui/auto-complete";

const suggestions = [
    {item: "Afghanistan"},
    {item: "Aland Islands"},
    {item: "Albania"},
    {item: "Algeria"},
    {item: "American Samoa"},
    {item: "Andorra"},
    {item: "Angola"},
    {item: "Anguilla"},
    {item: "Antarctica"},
    {item: "Antigua and Barbuda"},
    {item: "Argentina"},
    {item: "Armenia"},
    {item: "Aruba"},
    {item: "Australia"},
    {item: "Austria"},
    {item: "Azerbaijan"},
    {item: "Bahamas"},
    {item: "Bahrain"},
    {item: "Bangladesh"},
    {item: "Barbados"},
    {item: "Belarus"},
    {item: "Belgium"},
    {item: "Belize"},
    {item: "Benin"},
    {item: "Bermuda"},
    {item: "Bhutan"},
    {item: "Bolivia, Plurinational State of"},
    {item: "Bonaire, Sint Eustatius and Saba"},
    {item: "Bosnia and Herzegovina"},
    {item: "Botswana"},
    {item: "Bouvet Island"},
    {item: "Brazil"},
    {item: "British Indian Ocean Territory"},
    {item: "Brunei Darussalam"},
];


export default () => (
    <AutoComplete
        label="Atlas name"
        placeholder="Select atlas"
        showEmpty
        suggestions={suggestions}
        defaultItem="Afghanistan"
        onAddItem={(name) => { console.log(name)}}
        onClearItem={() => {console.log("clear")}}
        onSelectItem={(name) => { console.log(name)}}
    />
);
