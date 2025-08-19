'use client';

import {
    useCallback,
    useState,
} from 'react';

import Button from '#components/Button';

import styles from './styles.module.css';

interface AccordionItem {
    id: string;
    title: string;
    description: string;
}
interface Props {
    items: AccordionItem[];
    allowMultipleExpansion?: boolean;
}

function Accordion(props: Props) {
    const {
        items,
        allowMultipleExpansion,
    } = props;

    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = useCallback((id: string) => {
        if (!allowMultipleExpansion) {
            setOpenItems((prev) => (
                prev.includes(id)
                    ? []
                    : [id]
            ));
        } else {
            setOpenItems((prev) => (
                prev.includes(id)
                    ? prev.filter((i) => i !== id)
                    : [...prev, id]
            ));
        }
    }, [
        allowMultipleExpansion,
    ]);

    return (
        <div className={styles.accordion}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);
                return (
                    <div
                        key={item.id}
                        className={styles.accordionItem}
                    >
                        <Button
                            name={item.id}
                            className={styles.accordionHeader}
                            onClick={() => toggleItem(item.id)}
                            variant="border"
                        >
                            {item.title}
                            <span>{isOpen ? '−' : '+'}</span>
                        </Button>
                        {isOpen && (
                            <div
                                className={styles.accordionContent}
                            >
                                {item.description}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Accordion;
