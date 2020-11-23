/**
 * AboutTheDataPage.jsx
 * Created by Lizzie Salita 11/25/20
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { TooltipComponent, TooltipWrapper, Tabs, Picker } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

import Header from "containers/shared/HeaderContainer";
import Footer from "containers/Footer";
import WithLatestFy from "containers/account/WithLatestFy";
import StickyHeader from "components/sharedComponents/stickyHeader/StickyHeader";
import Note from "components/sharedComponents/Note";
import AboutTheDataModal from "components/aboutTheData/AboutTheDataModal";
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';
import { modalTitles, modalClassNames } from 'dataMapping/aboutTheData/modals';

import { allFiscalYears } from "helpers/fiscalYearHelper";
import { getLatestPeriod } from "helpers/accountHelper";

require("pages/aboutTheData/agenciesPage.scss");

const Tooltip = ({ title }) => (
    <TooltipComponent title={title}>
        <p>Place holder for tooltip component.</p>
    </TooltipComponent>
);

Tooltip.propTypes = {
    title: PropTypes.string.isRequired
};

const TableTabLabel = ({ label, tooltipComponent = <Tooltip title={label} /> }) => (
    <div className="table-tab-label">
        <span>{label}</span>
        <TooltipWrapper tooltipComponent={tooltipComponent} icon="info" />
    </div>
);

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

TableTabLabel.propTypes = {
    label: PropTypes.string.isRequired,
    tooltipComponent: PropTypes.element,
    dataAsOf: PropTypes.object.isRequired // moment object
};

const message = "All numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by the owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.";

const PeriodComponent = ({
    title,
    classNames
}) => (
    <div className={classNames}>
        <span>{title}</span>
    </div>
);

PeriodComponent.propTypes = {
    title: PropTypes.string.isRequired,
    classNames: PropTypes.string.isRequired
};

const propTypes = {
    dataAsOf: PropTypes.object, // moment obj
    history: PropTypes.func,
    submissionPeriods: PropTypes.arrayOf(PropTypes.object)
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

const AboutTheDataPage = ({
    dataAsOf,
    history,
    submissionPeriods
}) => {
    const { fy: urlFy } = useParams();
    const latestFy = dataAsOf ? dataAsOf.format('YYYY') : null;
    const [selectedFy, setSelectedFy] = useState(latestFy);
    const [activeTab, setActiveTab] = useState('details'); // details or dates
    const [showModal, setShowModal] = useState('');
    const [modalAgency, setModalAgency] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [availablePeriods, setAvailablePeriods] = useState([]);

    // Modal Logic
    const modalClick = (modalType, agencyName) => {
        setShowModal(modalType);
        setModalAgency(agencyName);
    };
    const closeModal = () => setShowModal('');

    const handleSwitchTab = (tab) => {
        setActiveTab(tab);
    };

    const handleFyChange = (fy) => {
        history.push(`${fy}`);
        setSelectedFy(fy);
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(availablePeriods.find(({ id }) => id === period));
    };

    // PERIOD LOGIC:
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

    // FY LOGIC:
    useEffect(() => {
        if (dataAsOf) {
            setSelectedFy(dataAsOf.year());
        }
    }, [dataAsOf]);

    useEffect(() => {
        if (dataAsOf) {
            if (allFiscalYears(2017, dataAsOf.year()).includes(parseInt(urlFy, 10))) {
                setSelectedFy(urlFy);
            }
            else {
                setSelectedFy(`${dataAsOf.year()}`);
                history.push('latest');
            }
        }
    }, [dataAsOf]);

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
                <AgenciesContainer openModal={modalClick} activeTab={activeTab} />
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

AboutTheDataPage.propTypes = propTypes;

export default () => (
    <WithLatestFy propName="dataAsOf">
        <AboutTheDataPage />
    </WithLatestFy>
);
