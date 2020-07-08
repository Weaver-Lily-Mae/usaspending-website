/**
 * SpendingByRecipientContainer.jsx
 * Created by Lizzie Salita 7/8/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import CoreSpendingTableRow from 'models/v2/covid19/CoreSpendingTableRow';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { fetchSpendingByRecipient, fetchRecipientLoans } from 'helpers/disasterHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';

const propTypes = {
    activeTab: PropTypes.string.isRequired
};

const columns = [
    {
        title: 'recipient',
        displayName: 'Recipient'
    },
    {
        title: 'obligation',
        displayName: 'Award Obligations',
        right: true
    },
    {
        title: 'outlay',
        displayName: 'Award Outlays',
        right: true
    },
    {
        title: 'count',
        displayName: (
            <>
                <div>Number</div>
                <div>of Awards</div>
            </>
        ),
        right: true
    }
];

const loanColumns = [
    {
        title: 'recipient',
        displayName: 'Recipient'
    },
    {
        title: 'faceValue',
        displayName: (
            <>
                <div>Face Value</div>
                <div>of Loans</div>
            </>
        )
    },
    {
        title: 'obligation',
        displayName: (
            <>
                <div>Award Obligations</div>
                <div>(Loan Subsidy Cost)</div>
            </>
        ),
        right: true
    },
    {
        title: 'outlay',
        displayName: (
            <>
                <div>Award Outlays</div>
                <div>(Loan Subsidy Cost)</div>
            </>
        ),
        right: true
    },
    {
        title: 'count',
        displayName: (
            <>
                <div>Number</div>
                <div>of Awards</div>
            </>
        ),
        right: true
    }
];

export const parseRows = (rows, activeTab) => (
    rows.map((row) => {
        const rowData = Object.create(CoreSpendingTableRow);
        rowData.populateCore(row);
        let link = rowData.description;
        if (rowData._id) {
            link = (
                <a href={`#/recipient/${rowData._id}`}>
                    {rowData.description}
                </a>
            );
        }
        if (activeTab === 'loans') {
            return [
                link,
                rowData.faceValue,
                rowData.obligation,
                rowData.outlay,
                rowData.count
            ];
        }
        return [
            link,
            rowData.obligation,
            rowData.outlay,
            rowData.count
        ];
    })
);

const SpendingByRecipientContainer = ({ activeTab }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const fetchSpendingByRecipientCallback = useCallback(() => {
        setLoading(true);
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
            },
            pagination: {
                limit: pageSize,
                page: currentPage,
                sort: spendingTableSortFields[sort],
                order
            }
        };
        if (activeTab !== 'all') {
            params.filter.award_type_codes = awardTypeGroups[activeTab];
        }
        let request = fetchSpendingByRecipient(params);
        if (activeTab === 'loans') {
            request = fetchRecipientLoans(params);
        }
        request.promise
            .then((res) => {
                const rows = parseRows(res.data.results, activeTab);
                setResults(rows);
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
                setError(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchSpendingByRecipientCallback();
    }, [pageSize, defCodes, sort, order, activeTab]);

    useEffect(() => {
        fetchSpendingByRecipientCallback();
    }, [currentPage]);

    let message = null;
    if (loading) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableLoadingMessage />
            </div>
        );
    } else if (error) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableErrorMessage />
            </div>
        );
    }

    if (message) {
        return (
            <>
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
                <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />
            </>
        );
    }

    return (
        <div className="table-wrapper">
            <Table
                columns={activeTab === 'loans' ? loanColumns : columns}
                rows={results}
                updateSort={updateSort}
                currentSort={{ field: sort, direction: order }} />
        </div>
    );
};

SpendingByRecipientContainer.propTypes = propTypes;
export default SpendingByRecipientContainer;
