/**
 * AgencyContent.jsx
 * Created by Kevin Li 6/8/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import { scrollToY } from 'helpers/scrollToHelper';
import { convertDateToQuarter } from 'helpers/fiscalYearHelper';

import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import WithLatestFy from 'containers/account/WithLatestFy';
import ObjectClassContainer from 'containers/agency/visualizations/ObjectClassContainer';
import ObligatedContainer from 'containers/agency/visualizations/ObligatedContainer';
import FederalAccountContainer from 'containers/agency/visualizations/FederalAccountContainer';
import FooterLinkToAdvancedSearchContainer from 'containers/shared/FooterLinkToAdvancedSearchContainer';

import * as StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Sidebar from '../sharedComponents/sidebar/Sidebar';
import AgencyOverview from './overview/AgencyOverview';
import TreasuryDisclaimer from './TreasuryDisclaimer';

const agencySections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'obligated-amount',
        label: 'Obligated Amount'
    },
    {
        section: 'object-classes',
        label: 'Object Classes'
    },
    {
        section: 'federal-accounts',
        label: 'Federal Accounts'
    }
];

const propTypes = {
    agency: PropTypes.object,
    isTreasury: PropTypes.bool,
    dataAsOf: PropTypes.object
};

const AgencyContent = ({
    agency,
    isTreasury,
    dataAsOf
}) => {
    const [activeSection, setActiveSection] = useState('overview');

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(agencySections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }
        // scroll to the correct section
        const sectionDom = document.querySelector(`#agency-${section}`);
        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 10 - StickyHeader.stickyHeaderHeight;
        scrollToY(sectionTop, 700);
        setActiveSection(section);
    };

    const asOfDate = dataAsOf
        ? dataAsOf.format("MMMM D, YYYY")
        : "";

    const activeFy = dataAsOf
        ? `${dataAsOf.year()}`
        : "";

    let disclaimer = null;
    if (isTreasury) {
        disclaimer = (<TreasuryDisclaimer />);
    }

    return (
        <div className="agency-content-wrapper">
            <div className="agency-sidebar">
                <Sidebar
                    active={activeSection}
                    pageName="agency"
                    sections={agencySections}
                    detectActiveSection={setActiveSection}
                    jumpToSection={jumpToSection}
                    fixedStickyBreakpoint={StickyHeader.stickyHeaderHeight} />
            </div>
            <div className="agency-content">
                <div className="agency-padded-content overview">
                    <GlossaryButtonWrapperContainer
                        child={AgencyOverview}
                        activeFy={activeFy}
                        asOfDate={asOfDate}
                        agency={agency.overview} />
                </div>
                <div className="agency-padded-content data">
                    <ObligatedContainer
                        agencyName={agency.overview.name}
                        activeFY={activeFy}
                        activeQuarter={convertDateToQuarter(dataAsOf)}
                        id={agency.id}
                        asOfDate={asOfDate} />
                    <ObjectClassContainer
                        id={agency.id}
                        activeFY={activeFy}
                        displayedTotalObligation={agency.overview.obligatedAmount}
                        asOfDate={asOfDate} />
                    <FederalAccountContainer
                        id={agency.id}
                        activeFY={activeFy}
                        obligatedAmount={agency.overview.obligatedAmount}
                        asOfDate={asOfDate} />
                    {disclaimer}
                </div>
                <FooterLinkToAdvancedSearchContainer
                    title="Looking for more insight?"
                    description="for more in-depth analysis on this agency and more" />
            </div>
        </div>
    );
};

AgencyContent.propTypes = propTypes;

export default (props) => (
    <WithLatestFy propName="dataAsOf">
        <AgencyContent {...props} />
    </WithLatestFy>
);
