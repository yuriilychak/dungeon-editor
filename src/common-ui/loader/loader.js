import React from "react";

import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({isLoading, children, size, className}) => (
    isLoading ? (
        <div
            className={className}
        >
            <CircularProgress size={size}/>
        </div>
    ) : (
        <>
            {children}
        </>
    )
);

export default Loader;
