import React from 'react';

export const ZoneContext = React.createContext({
    currentZone: {
        id: 0,
        label: "France"
    }
}); // https://reactjs.org/docs/context.html