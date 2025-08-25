'use client';

import React, {
    useCallback,
    useEffect,
} from 'react';
import {
    IoIosArrowDown,
    IoIosArrowUp,
} from 'react-icons/io';
import { _cs } from '@togglecorp/fujs';

import useBlurEffect from '../../hooks/useBlurEffect';
import Button, { type Props as ButtonProps } from '../Button';
import Popup from '../Popup';

import styles from './styles.module.css';

export interface PopupButtonProps<T extends string | undefined> extends Omit<ButtonProps<T>, 'label'> {
    popupClassName?: string;
    popupContentClassName?: string;
    label: React.ReactNode;
    componentRef?: React.RefObject<{
        setPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    } | null>;
    persistent: boolean;
    arrowHidden?: boolean;
    defaultShown?: boolean;
    elementRef?: React.RefObject<HTMLButtonElement>;
    actions?: React.ReactNode;
}

function PopupButton<T extends string | undefined>(props: PopupButtonProps<T>) {
    const {
        popupClassName,
        popupContentClassName,
        children,
        label,
        name,
        actions,
        componentRef,
        arrowHidden,
        persistent,
        defaultShown,
        elementRef,
        ...otherProps
    } = props;

    const internalButtonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = elementRef ?? internalButtonRef;

    const [popupShown, setPopupShown] = React.useState(defaultShown ?? false);
    // const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (componentRef) {
            componentRef.current = {
                setPopupVisibility: setPopupShown,
            };
        }
    }, [componentRef]);

    useBlurEffect(
        popupShown && !persistent,
        // () => {
        //     if (!isHovered) {
        //         setPopupShown(false);
        //     }
        // },
        setPopupShown,
        popupRef,
        buttonRef,
    );

    const handleShowPopup = useCallback(() => {
        setPopupShown((prev) => !prev);
    }, []);

    return (
        <>
            <Button
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...otherProps}
                name={name}
                elementRef={buttonRef}
                onClick={handleShowPopup}
                variant="transparent"
                className={_cs(popupShown && styles.active, styles.popupButton)}
            >
                {label}
                {!arrowHidden && (popupShown ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                {actions}
            </Button>
            {popupShown && (
                <Popup
                    elementRef={popupRef}
                    parentRef={buttonRef}
                    className={_cs(styles.popup, popupClassName)}
                    contentClassName={_cs(styles.popupContent, popupContentClassName)}
                >
                    {children}
                </Popup>
            )}
        </>
    );
}

export default PopupButton;
