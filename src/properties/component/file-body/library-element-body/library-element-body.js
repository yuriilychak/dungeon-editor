import React, {Fragment} from "react";

import {AutoComplete} from "../../../../common-ui/auto-complete";
import {CheckBox} from "../common";

export default ({
                    file,
                    compressNameLabel,
                    compressSkeletonLabel,
                    atlasAutocompleteLabel,
                    atlasAutocompletePlaceholder,
                    onSwitchCompressName,
                    onSwitchCompressSkeleton,
                    onSwitchAtlas,
                    onClearAtlas
                }) => {
    const {compressName, atlas, data} = file;

    let atlasAutocomplete = null;
    let skeletonCheckbox = null;

    if (data.hasOwnProperty("compressSkeleton")) {
        skeletonCheckbox = (
            <CheckBox
                value={data.compressSkeleton}
                onChange={onSwitchCompressSkeleton}
                label={compressSkeletonLabel}
            />
        );
    }

    if (Number.isInteger(atlas)) {
        const {atlases} = file;
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
            <CheckBox
                value={compressName}
                onChange={onSwitchCompressName}
                label={compressNameLabel}
            />
            {skeletonCheckbox}
        </Fragment>
    )
};
