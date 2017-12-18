/**
  * LegacyResultsTable.jsx
  * Created by Kevin Li 11/8/16
  * TEMPORARY: We should reunify this table with the award search table when federal accounts are
  * moved to v2 endpoints
  **/

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { formatMoney } from 'helpers/moneyFormatter';

import IBTable from 'components/sharedComponents/IBTable/IBTable';

import ResultsTableGenericCell from 'components/search/table/cells/ResultsTableGenericCell';
import ResultsTableAwardIdCell from 'components/search/table/cells/ResultsTableAwardIdCell';

import LegacyTableHeaderCell from './LegacyTableHeaderCell';

const propTypes = {
    results: PropTypes.array,
    batch: PropTypes.object,
    columns: PropTypes.array,
    visibleWidth: PropTypes.number,
    loadNextPage: PropTypes.func,
    currentType: PropTypes.string
};

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 12.5 * rowHeight;

export default class LegacyResultsTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            yPos: 0,
            xPos: 0,
            dataHash: null
        };

        this.headerCellRender = this.headerCellRender.bind(this);
        this.bodyCellRender = this.bodyCellRender.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            if (this.tableComponent) {
                this.tableComponent.reloadTable();
            }
        }
    }

    headerCellRender(columnIndex) {
        const column = this.props.columns[columnIndex];
        const isLast = columnIndex === this.props.columns.length - 1;

        return (
            <LegacyTableHeaderCell
                title={column.displayName}
                field={column.columnName}
                defaultDirection={column.defaultDirection}
                currentSort={this.props.sort}
                updateSort={this.props.updateSort}
                isLastColumn={isLast} />
        );
    }

    bodyCellRender(columnIndex, rowIndex) {
        const column = this.props.columns[columnIndex];
        const isLast = columnIndex === this.props.columns.length - 1;

        if (column.columnName === 'award_id') {
            return (
                <ResultsTableAwardIdCell
                    rowIndex={rowIndex}
                    id={this.props.results[rowIndex].id}
                    data={this.props.results[rowIndex][column.columnName]}
                    column={column.columnName}
                    isLastColumn={isLast} />
            );
        }

        const originalData = this.props.results[rowIndex][column.columnName];
        let displayedData = originalData;
        if (column.dataType === 'currency') {
            displayedData = formatMoney(originalData);
        }
        else if (column.dataType === 'date') {
            // format the content as a date
            displayedData = moment(originalData, 'YYYY-MM-DD').format('M/D/YYYY');
        }

        return (
            <ResultsTableGenericCell
                rowIndex={rowIndex}
                data={displayedData}
                column={column.columnName}
                isLastColumn={isLast} />
        );
    }

    prepareTable() {
        let totalWidth = 0;

        const columns = this.props.columns.map((column) => {
            const columnX = totalWidth;
            totalWidth += column.width;

            return {
                x: columnX,
                width: column.width
            };
        });

        return {
            columns,
            width: totalWidth
        };
    }

    render() {
        const calculatedValues = this.prepareTable();

        let noResultsClass = '';
        if (this.props.results.length === 0) {
            // remove duplicated bottom border
            noResultsClass = ' no-results';
        }

        return (
            <div className={`account-results-table${noResultsClass}`}>
                <IBTable
                    rowHeight={rowHeight}
                    rowCount={this.props.results.length}
                    headerHeight={50}
                    contentWidth={calculatedValues.width}
                    bodyWidth={this.props.tableWidth}
                    bodyHeight={tableHeight}
                    columns={calculatedValues.columns}
                    onReachedBottom={this.props.loadNextPage}
                    headerCellRender={this.headerCellRender}
                    bodyCellRender={this.bodyCellRender}
                    ref={(table) => {
                        this.tableComponent = table;
                    }} />
            </div>
        );
    }
}

LegacyResultsTable.propTypes = propTypes;
