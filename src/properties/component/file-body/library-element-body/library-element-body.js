import React, { Fragment } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {AutoComplete} from "../../../../common-ui/auto-complete";

import "./library-element-body.css";

export default ({
                    file,
                    compressNameLabel,
                    atlasAutocompleteLabel,
                    atlasAutocompletePlaceholder,
                    onSwitchCompressName,
                    onSwitchAtlas,
                    onClearAtlas
}) => {
    const { compressName, atlas } = file;

    let atlasAutocomplete = null;

    if (Number.isInteger(atlas)) {
        const { atlases } = file;
        const defaultItem = atlases.find(element => element.id === atlas).name;
        const suggestions = atlases.map(element => ({
            item: element.name,
            id: element.id
        }));

        atlasAutocomplete = (
            <AutoComplete
                defaultItem={defaultItem}
                suggestions={suggestions}
                label={atlasAutocompleteLabel}
                placeholder={atlasAutocompletePlaceholder}
                onSelectItem={onSwitchAtlas}
                onClearItem={onClearAtlas}
                onAddItem={onSwitchAtlas}
                showEmpty
            />
        );
    }

    return (
        <Fragment>
            {atlasAutocomplete}
            <div className="library-element-checkbox-wrapper">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={compressName}
                            onChange={onSwitchCompressName}
                            value="checkedF"
                            color="primary"
                        />}
                    label={compressNameLabel}
                />
            </div>
        </Fragment>
    )
};
