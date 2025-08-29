'use client';

import React, { useState } from 'react';

import TextInput from '#components/TextInput';

import Heading from '../Heading';
import Table, { type Column } from '../Table';

import styles from './styles.module.css';

export interface ColumnDef<T> {
    key: keyof T;
    label: string;
}

export interface Props<T> {
    title: string;
    data: T[];
    columns: ColumnDef<T>[];
    keySelector: (item: T, index: number, data: T[]) => string;
    searchField?: keyof T;
}

export default function SearchableTable<T>(props: Props<T>) {
    const {
        title,
        data,
        columns,
        keySelector,
        searchField,
    } = props;

    const [search, setSearch] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value ?? '');
    };

    const filteredData = searchField
        ? data.filter((row) => String(row[searchField] ?? '')
            .toLowerCase()
            .includes(search.toLowerCase()))
        : data;

    const tableColumns: Column<T>[] = columns.map((col) => ({
        id: String(col.key),
        title: col.label,
        cellRenderer: (row: T) => String(row[col.key] ?? '-'),
    }));

    return (
        <div className={styles.searchTable}>
            <div className={styles.searchBar}>
                <Heading
                    className={styles.tableHeading}
                    size="small"
                >
                    {title}
                </Heading>
                {searchField && (
                    <TextInput
                        name={String(searchField)}
                        className={styles.searchInput}
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder={`Search by ${String(searchField)}...`}
                    />
                )}
            </div>
            {filteredData.length > 0 ? (
                <Table
                    className={styles.table}
                    keySelector={keySelector}
                    columns={tableColumns}
                    data={filteredData}
                />
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}
