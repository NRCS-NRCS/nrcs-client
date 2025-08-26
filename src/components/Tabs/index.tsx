import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { type Props as ButtonProps } from '../Button';
import {
    TabsContext,
    type TabsKey,
} from '../TabsContext';

import styles from './styles.module.css';

export interface TabProps<T extends TabsKey> extends Omit<ButtonProps<T>, 'onClick'> {
    name: T;
}

export function Tab<T extends TabsKey>(props: TabProps<T>) {
    const context = React.useContext(TabsContext);

    const {
        className,
        name,
        ...otherProps
    } = props;

    const isActive = context.activeTab === name;

    return (
        <Button
            className={_cs(
                className,
                styles.tab,
                isActive && styles.active,
            )}
            onClick={context.setActiveTab}
            name={name}
            role="tab"
            variant="transparent"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export interface TabListProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

export function TabList(props: TabListProps) {
    const {
        children,
        className,
        ...otherProps
    } = props;

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            className={_cs(className, styles.tabList)}
            role="tablist"
        >
            {children}
        </div>
    );
}

export interface TabPanelProps extends React.HTMLProps<HTMLDivElement> {
    name: TabsKey;
    className?: string;
    elementRef?: React.Ref<HTMLDivElement>;
}

export function TabPanel(props: TabPanelProps) {
    const context = React.useContext(TabsContext);

    const {
        name,
        elementRef,
        ...otherProps
    } = props;

    const isActive = context.activeTab === name;

    if (!isActive) {
        return null;
    }

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            role="tabpanel"
            ref={elementRef}
        />
    );
}

export interface BaseProps {
    children: React.ReactNode;
    disabled?: boolean;
}

export type TabsProps<T extends TabsKey> = BaseProps & (
    {
        value: T | undefined;
        onChange: ((key: T | undefined) => void) | undefined;
    }
);

export function Tabs<T extends TabsKey>(props: TabsProps<T>) {
    const {
        children,
        disabled,
        onChange,
        value,
    } = props;

    const contextValue = React.useMemo(() => ({
        disabled,
        activeTab: value,
        setActiveTab: onChange as (key: TabsKey | undefined) => void | undefined,
    }), [
        value,
        onChange,
        disabled,
    ]);

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    );
}

export default Tabs;
