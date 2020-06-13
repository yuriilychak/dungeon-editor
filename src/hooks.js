import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { generateLocale } from "./helpers";

export const useLocalization = localeData => {
    const { t } = useTranslation();

    const localization = useMemo(() => generateLocale(localeData, t), [localeData, t]);

    return { t, localization };
};

export const useChange = (onChange, eventMiddleware) => useCallback(event => onChange(eventMiddleware(event)), [onChange]);
