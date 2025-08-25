import React from 'react';

export type TabsKey = string;

interface BaseTabContextProps {
    disabled?: boolean;
}

export type TabsContextProps = BaseTabContextProps & (
    {
        activeTab: TabsKey | undefined;
        setActiveTab: (key: TabsKey) => void;
    }
);

export const TabsContext = React.createContext<TabsContextProps>({
    disabled: false,
    activeTab: undefined,
    // eslint-disable-next-line no-console
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
});
