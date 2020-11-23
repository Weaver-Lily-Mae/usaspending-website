import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { Table, TooltipComponent, TooltipWrapper, Tabs, Picker } from "data-transparency-ui";
import { throttle } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import { allFiscalYears } from "helpers/fiscalYearHelper";
import { getLatestPeriod } from "helpers/accountHelper";
import WithLatestFy from "containers/account/WithLatestFy";
import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import Note from "components/sharedComponents/Note";
import DrilldownCell from 'components/aboutTheData/DrilldownCell';
import CellWithModal from 'components/aboutTheData/CellWithModal';
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';

require("pages/aboutTheData/agenciesPage.scss");

const periodsPerQuarterPost2020 = [
    [
        { title: 'P01 - P02', id: '2', className: 'double-period' },
        { title: 'Q1 P03', id: '3' }
    ],
    [
        { title: 'P04', id: '4' },
        { title: 'P05', id: '5' },
        { title: 'Q2 P06', id: '6' }
    ],
    [
        { title: 'P07', id: '7' },
        { title: 'P08', id: '8' },
        { title: 'Q3 P09', id: '9' }
    ],
    [
        { title: 'P10', id: '10' },
        { title: 'P11', id: '11' },
        { title: 'Q4 P12', id: '12' }
    ]
];

const Tooltip = ({ title }) => (
    <TooltipComponent title={title}>
        <p>Place holder for tooltip component.</p>
    </TooltipComponent>
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired
};

const columns = [
    {
        title: "name",
        displayName: "Agency Name"
    },
    {
        title: "total",
        displayName: "Total Budgetary Resources"
    },
    {
        title: "publication_date",
        displayName: "Most Recent Publication Date",
        icon: (
            <TooltipWrapper
                icon="info"
                tooltipComponent={<Tooltip title="Most Recent Publication Date" />} />
        )
    },
    {
        title: "tas_not_in_file_a",
        displayName: "Count of Agency TAS in GTAS Not in File A"
    },
    {
        title: "publication_date",
        displayName: "% of Total Amount"
    },
    {
        title: "file_a_b_diff",
        displayName: "Difference in File A and File B Obligations"
    },
    {
        title: "unlinked_asst_award_count",
        displayName: "Count of Unlinked Assistance Awards"
    }
];

const mockAPIResponse = {
    page_metadata: {
        page: 1,
        hasNext: false,
        hasPrevious: false,
        total: 2
    },
    results: [
        {
            name: "Department of Health and Human Services",
            abbreviation: "DHHS",
            code: "020",
            fiscal_year: 2020,
            fiscal_period: 12,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: "2020-01-10T11:59:21Z",
            recent_publication_date_certified: false,
            discrepancy_count: 20,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            fiscal_year: 2020,
            fiscal_period: 9,
            current_total_budget_authority_amount: 8361447130497.72,
            recent_publication_date: null,
            recent_publication_date_certified: true,
            discrepancy_count: 10,
            obligation_difference: 436376232652.87
        }
    ]
};

const mockDatesApiResponse = {
    page_metadata: {
        page: 1,
        hasNext: false,
        hasPrevious: false,
        total: 2
    },
    results: [
        {
            name: "Department of Health and Human Services",
            abbreviation: "DHHS",
            code: "020",
            current_total_budget_authority_amount: 8361447130497.72,
            periods: [{
                period: 2,
                quarter: 1,
                date: "2020-01-20T11:59:21Z",
                certified: true,
                quarterly: false,
                submitted: true
            }]
        },
        {
            name: "Department of Treasury",
            abbreviation: "DOT",
            code: "021",
            current_total_budget_authority_amount: 8361447130497.72,
            periods: [{
                period: 2,
                quarter: 1,
                date: "2020-01-20T11:59:21Z",
                certified: false,
                quarterly: false,
                submitted: true
            }]
        }
    ]
};

const TableTabLabel = ({ label, tooltipComponent = <Tooltip title={label} /> }) => (
    <div className="table-tab-label">
        <span>{label}</span>
        <TooltipWrapper tooltipComponent={tooltipComponent} icon="info" />
    </div>
);

TableTabLabel.propTypes = {
    label: PropTypes.string.isRequired,
    tooltipComponent: PropTypes.element
};

const dateRows = mockDatesApiResponse.results
    .map(({
        name,
        abbreviation,
        code,
        current_total_budget_authority_amount: total,
        periods
    }) => ([
        (<DrilldownCell data={`${name} (${abbreviation})`} id={code} />),
        (<div className="generic-cell-content">{total}</div>),
        ...periods.map(({ date }) => (<div className="generic-cell-content">{date}</div>))
    ]));

const message = "All numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by the owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.";

const PeriodComponent = ({
    title,
    classNames
}) => {
    return (
        <div className={classNames}>
            <span>{title}</span>
        </div>
    );
};

const parsePeriods = (year, periods) => {
    const allPeriodsAvailableInFy = periods
        .filter((p) => p.submission_fiscal_year === parseInt(year, 10))
        .filter((p) => moment.utc(p.submission_reveal_date).isSameOrBefore(moment()));
    return periodsPerQuarterPost2020
        .reduce((acc, periodsInQuarter) => {
            return acc.concat(
                periodsInQuarter
                    .map((period, i, src) => {
                        const isEnabled = allPeriodsAvailableInFy.some((p) => p.submission_fiscal_month >= parseInt(period.id, 10));
                        const classNames = src.length - 1 === i
                            ? 'period last'
                            : 'period';
                        return {
                            ...period,
                            isEnabled,
                            component: <PeriodComponent
                                isEnabled={isEnabled}
                                classNames={`${classNames}${i === 0 ? ' first' : ''}`}
                                title={period.title} />
                        };
                    })
            );
        }, []);
};

const sortPeriods = ({ value: a }, { value: b }) => {
    if (parseInt(a, 10) < parseInt(b, 10)) return -1;
    if (parseInt(a, 10) > parseInt(b, 10)) return 1;
    return 0;
};

const AgenciesContainer = ({
    dataAsOf,
    history,
    submissionPeriods
}) => {
    const { fy: urlFy } = useParams();
    const [sortStatus, updateSort] = useState({ field: "", direction: "asc" });
    const [selectedFy, setSelectedFy] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [availablePeriods, setAvailablePeriods] = useState([]);
    const [activeTab, setActiveTab] = useState('details'); // details or dates
    const [{ vertical: isVerticalSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({ vertical: false, horizontal: false });
    const [showModal, setShowModal] = useState('');
    const [modalAgency, setModalAgency] = useState('');
    const tableRef = useRef(null);
    const verticalStickyClass = isVerticalSticky ? 'sticky-y-table' : '';
    const horizontalStickyClass = isHorizontalSticky ? 'sticky-x-table' : '';

    const handleScroll = throttle(() => {
        const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
        setIsSticky({ vertical, horizontal });
    }, 100);

    const handleUpdateSort = (field, direction) => {
        updateSort({ field, direction });
    };

    // Modal Logic
    const modalClick = (modalType, agencyName) => {
        setShowModal(modalType);
        setModalAgency(agencyName);
    };
    const closeModal = () => setShowModal('');

    const handleSwitchTab = (tab) => {
        setActiveTab(tab);
    };

    // TODO - create a data model for agency row
    const rows = mockAPIResponse.results.map(
        ({
            name,
            abbreviation,
            code,
            current_total_budget_authority_amount: total,
            recent_publication_date: publicationDate,
            discrepancy_count: GtasNotInFileA,
            obligation_difference: differenceInFileAAndB
        }) => [
            // TODO: handle agencies with no code
            (<DrilldownCell data={`${name} (${abbreviation})`} id={code} />),
            (<div className="generic-cell-content">{ total }</div>),
            (<CellWithModal data={publicationDate} openModal={modalClick} modalType="publicationDates" agencyName={name} />),
            (<CellWithModal data={GtasNotInFileA} openModal={modalClick} modalType="missingAccountBalance" agencyName={name} />),
            (<div className="generic-cell-content">% placeholder</div>),
            (<div className="generic-cell-content">{differenceInFileAAndB}</div>)
        ]
    );
    const handlePeriodChange = (period) => {
        setSelectedPeriod(availablePeriods.find(({ id }) => id === period));
    };

    useEffect(() => {
        // when fiscal year changes, set the available periods
        const newPeriods = parsePeriods(selectedFy, submissionPeriods).map((p) => ({
            ...p,
            component: p.component,
            value: `${p.id}`,
            isEnabled: p.isEnabled,
            onClick: p.isEnabled
                ? handlePeriodChange
                : () => console.log('dats gonna be a no from me dawg!!!')
        }));
        setAvailablePeriods(newPeriods);
    }, [selectedFy]);

    useEffect(() => {
        // when latest account data is ready or the url changes, set the active fiscal year
        if (dataAsOf) {
            if (allFiscalYears(2017, dataAsOf.year()).includes(parseInt(urlFy, 10))) {
                // only legit fy
                setSelectedFy(urlFy);
            }
            else {
                // bad fy
                setSelectedFy(`${dataAsOf.year()}`);
                history.push('latest');
            }
        }
    }, [dataAsOf, history, urlFy]);

    useEffect(() => {
        // when fiscal year changes, select latest period by default
        if (availablePeriods.length) {
            const periodsInFy = submissionPeriods.filter(({ submission_fiscal_year: year }) => year === parseInt(selectedFy, 10));
            const { period } = getLatestPeriod(periodsInFy) || { period: '2' };
            const latestPeriod = availablePeriods.find(({ id }) => id === `${period}`);
            console.log('yooohooo', latestPeriod, period, availablePeriods);
            setSelectedPeriod(latestPeriod);
        }
    }, [availablePeriods]);

    const handleFyChange = (fy) => {
        history.push(`${fy}`);
        setSelectedFy(fy);
    };

    return (
        <div className="usa-da__about-the-data__agencies-page">
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1}>Agency Submission Statistics</h1>
                </div>
            </StickyHeader>
            <main id="main-content" className="main-content">
                <div className="heading-container">
                    <h2 className="header">About These Statistics</h2>
                    <p className="sub-header">Agencies submit data monthly and/or quarterly to USAspending.gov. The table below shows information about the status and content of agency financial data submissions, and it will be updated as agencies publish/certify new submissions or republish/recertify existing submissions.</p>
                </div>
                <div className="table-controls">
                    <Tabs
                        active={activeTab}
                        switchTab={handleSwitchTab}
                        types={[
                            { internal: 'details', label: <TableTabLabel label="Statistics by Reporting Period" /> },
                            { internal: 'dates', label: <TableTabLabel label="Updates by  Fiscal Year" /> }
                        ]} />
                    <div className="table-controls__time-and-search">
                        <div className="picker-container">
                            <span className="fy-picker__title">FISCAL YEAR</span>
                            <Picker
                                icon=""
                                isFixedWidth
                                sortFn={sortPeriods}
                                selectedOption={selectedFy
                                    ? `FY ${selectedFy}`
                                    : (
                                        <div className="fy-loading">
                                                FY <FontAwesomeIcon icon="spinner" size="sm" alt="Toggle menu" spin />
                                        </div>
                                    )}
                                options={dataAsOf
                                    ? allFiscalYears(2017, dataAsOf.year()).map((year) => ({ name: `${year}`, value: `${year}`, onClick: handleFyChange }))
                                    : [{ name: 'Loading...', value: null, onClick: () => {} }]
                                } />

                        </div>
                        <div className="picker-container">
                            <span className="period-picker__title">PERIOD</span>
                            <Picker
                                icon=""
                                sortFn={sortPeriods}
                                selectedOption={selectedPeriod
                                    ? selectedPeriod.title
                                    : (
                                        <div className="fy-loading">
                                            P <FontAwesomeIcon icon="spinner" size="sm" alt="Toggle menu" spin />
                                        </div>
                                    )}
                                options={availablePeriods} />

                        </div>
                    </div>
                </div>
                <div className="table-container" ref={tableRef} onScroll={handleScroll}>
                    {activeTab === 'details' && (
                        <Table
                            rows={rows}
                            classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                            columns={columns}
                            updateSort={handleUpdateSort}
                            currentSort={sortStatus} />
                    )}
                    {activeTab === 'dates' && (
                        <Table
                            rows={dateRows}
                            classNames={`usda-table-w-grid ${verticalStickyClass} ${horizontalStickyClass}`}
                            columns={[
                                { title: 'name', displayName: 'Agency  Name', icon: <TooltipWrapper icon="info" tooltipComponent={<TooltipComponent title="Test Tooltip"><div>Test content for tooltip</div></TooltipComponent>} /> },
                                { title: 'total', displayName: 'Total Budgetary  Resources' },
                                {
                                    title: 'Q4',
                                    displayName: 'FY 2020 Q4',
                                    columnSpan: "2",
                                    subColumnNames: [
                                        { displayName: 'P10', title: 'P10' },
                                        { displayName: 'P11', title: 'P11' }
                                    ]
                                },
                                {
                                    title: 'Q3',
                                    displayName: 'FY 2020 Q3',
                                    columnSpan: "3",
                                    subColumnNames: [
                                        { displayName: 'P7', title: 'P7' },
                                        { displayName: 'P8', title: 'P8' },
                                        { displayName: 'P9', title: 'P9' }
                                    ]
                                },
                                {
                                    title: 'Q2',
                                    displayName: 'FY 2020 Q2',
                                    columnSpan: "4",
                                    subColumnNames: [
                                        { displayName: 'P6', title: 'P6' },
                                        { displayName: 'P5', title: 'P5' },
                                        { displayName: 'P4', title: 'P4' },
                                        { displayName: 'P3', title: 'P3' }
                                    ]
                                },
                                {
                                    title: 'Q1',
                                    displayName: 'FY 2020 Q1',
                                    columnSpan: "2",
                                    subColumnNames: [
                                        { displayName: 'P2', title: 'P2' },
                                        { displayName: 'P1', title: 'P1' }
                                    ]
                                }
                            ]}
                            updateSort={handleUpdateSort}
                            currentSort={sortStatus} />
                    )}
                </div>
                <Note message={message} />
                <AboutTheDataModal
                    mounted={!!showModal.length}
                    type={showModal}
                    className={modalClassNames[showModal]}
                    title={modalTitles[showModal]}
                    agencyName={modalAgency}
                    fiscalYear={2020}
                    fiscalPeriod={8}
                    closeModal={closeModal}
                    totalObligationsNotInGTAS={45999} />
            </main>
            <Footer />
        </div>
    );
};

AgenciesContainer.propTypes = {
    dataAsOf: PropTypes.object,
    history: PropTypes.object.isRequired,
    submissionPeriods: PropTypes.arrayOf(PropTypes.object)
};

export default (props) => (
    <WithLatestFy propName="dataAsOf">
        <AgenciesContainer {...props} />
    </WithLatestFy>
);
