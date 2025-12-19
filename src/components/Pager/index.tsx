'use client';

import React, { useState } from 'react';
import {
    IoChevronBack,
    IoChevronForward,
} from 'react-icons/io5';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';

import Button from '../Button';

import styles from './styles.module.css';

type PaginationProps = {
    itemsCount?: number;
    maxItemsPerPage?: number;
};

export default function Pager({
    itemsCount = 1,
    maxItemsPerPage = 10,
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activePage = Number(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(activePage);

    const totalPages = Math.max(Math.ceil(itemsCount / maxItemsPerPage), 1);
    const maxButtons = 5;

    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;
    if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - maxButtons + 1);
    }
    for (let i = start; i <= end; i += 1) pages.push(i);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        router.push(`?page=${page}`);
    };

    return (
        itemsCount > maxItemsPerPage
        && (
            <div className={styles.pager}>
                <Button
                    variant="transparent"
                    name="prev-button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <IoChevronBack size={18} />
                </Button>

                {pages.map((p) => (
                    <Button
                        key={p}
                        name={p.toString()}
                        onClick={() => goToPage(p)}
                        variant={p === currentPage ? 'primary' : 'transparent'}
                        className={styles.pagerBtn}
                    >
                        {p}
                    </Button>
                ))}

                <Button
                    variant="transparent"
                    name="prev-next"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={styles.pagerBtn}
                >
                    <IoChevronForward size={18} />
                </Button>
            </div>
        )
    );
}
