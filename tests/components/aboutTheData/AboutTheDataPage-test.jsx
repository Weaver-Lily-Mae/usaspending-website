import React from 'react';
import { useParams } from "react-router-dom";

import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@test-utils';
import AboutTheDataPage from 'components/aboutTheData/AboutTheDataPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    // latest fy of 2020; latest period is 12
    useParams: jest.fn(() => ({ fy: '2020', period: '11' }))
}));

jest.mock('helpers/accountHelper', () => ({
    ...jest.requireActual('helpers/accountHelper'),
    fetchAllSubmissionDates: jest.fn(() => ({
        promise: Promise.resolve({
            data: {
                available_periods: [{
                    period_start_date: "2020-09-01T00:00:00Z", period_end_date: "2020-09-30T00:00:00Z", submission_start_date: "2020-10-19T00:00:00Z", submission_due_date: "2020-11-17T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-11-17T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: false
                }, {
                    period_start_date: "2020-07-01T00:00:00Z", period_end_date: "2020-09-30T00:00:00Z", submission_start_date: "2020-10-19T00:00:00Z", submission_due_date: "2020-11-17T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-11-17T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
                }, {
                    period_start_date: "2020-08-01T00:00:00Z", period_end_date: "2020-08-31T00:00:00Z", submission_start_date: "2020-09-18T00:00:00Z", submission_due_date: "2020-09-30T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-09-30T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 11, is_quarter: false
                }, {
                    period_start_date: "2020-07-01T00:00:00Z", period_end_date: "2020-07-31T00:00:00Z", submission_start_date: "2020-08-19T00:00:00Z", submission_due_date: "2020-08-29T00:00:00Z", certification_due_date: "2020-11-17T00:00:00Z", submission_reveal_date: "2020-08-29T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 4, submission_fiscal_month: 10, is_quarter: false
                }, {
                    period_start_date: "2020-06-01T00:00:00Z", period_end_date: "2020-06-30T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-07-31T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-07-31T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: false
                }, {
                    period_start_date: "2020-04-01T00:00:00Z", period_end_date: "2020-06-30T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-08-15T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-08-15T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
                }, {
                    period_start_date: "2020-05-01T00:00:00Z", period_end_date: "2020-05-31T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-07-31T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-07-31T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 8, is_quarter: false
                }, {
                    period_start_date: "2020-04-01T00:00:00Z", period_end_date: "2020-04-30T00:00:00Z", submission_start_date: "2020-07-17T00:00:00Z", submission_due_date: "2020-07-31T00:00:00Z", certification_due_date: "2020-08-15T00:00:00Z", submission_reveal_date: "2020-07-31T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 3, submission_fiscal_month: 7, is_quarter: false
                }, {
                    period_start_date: "2020-01-01T00:00:00Z", period_end_date: "2020-03-31T00:00:00Z", submission_start_date: "2020-04-17T00:00:00Z", submission_due_date: "2020-05-16T00:00:00Z", certification_due_date: "2020-05-16T00:00:00Z", submission_reveal_date: "2020-05-16T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
                }, {
                    period_start_date: "2019-10-01T00:00:00Z", period_end_date: "2019-12-31T00:00:00Z", submission_start_date: "2020-01-17T00:00:00Z", submission_due_date: "2020-02-15T00:00:00Z", certification_due_date: "2020-02-15T00:00:00Z", submission_reveal_date: "2020-02-15T00:00:00Z", submission_fiscal_year: 2020, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
                }, {
                    period_start_date: "2019-07-01T00:00:00Z", period_end_date: "2019-09-30T00:00:00Z", submission_start_date: "2019-10-18T00:00:00Z", submission_due_date: "2019-11-15T00:00:00Z", certification_due_date: "2019-11-15T00:00:00Z", submission_reveal_date: "2019-11-15T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
                }, {
                    period_start_date: "2019-04-01T00:00:00Z", period_end_date: "2019-06-30T00:00:00Z", submission_start_date: "2019-07-19T00:00:00Z", submission_due_date: "2019-08-15T00:00:00Z", certification_due_date: "2019-08-15T00:00:00Z", submission_reveal_date: "2019-08-15T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
                }, {
                    period_start_date: "2019-01-01T00:00:00Z", period_end_date: "2019-03-31T00:00:00Z", submission_start_date: "2019-04-19T00:00:00Z", submission_due_date: "2019-05-16T00:00:00Z", certification_due_date: "2019-05-16T00:00:00Z", submission_reveal_date: "2019-05-16T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
                }, {
                    period_start_date: "2018-10-01T00:00:00Z", period_end_date: "2018-12-31T00:00:00Z", submission_start_date: "2019-02-21T00:00:00Z", submission_due_date: "2019-03-21T00:00:00Z", certification_due_date: "2019-03-21T00:00:00Z", submission_reveal_date: "2019-03-21T00:00:00Z", submission_fiscal_year: 2019, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
                }, {
                    period_start_date: "2018-07-01T00:00:00Z", period_end_date: "2018-09-30T00:00:00Z", submission_start_date: "2018-10-19T00:00:00Z", submission_due_date: "2018-11-15T00:00:00Z", certification_due_date: "2018-11-15T00:00:00Z", submission_reveal_date: "2018-11-15T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
                }, {
                    period_start_date: "2018-04-01T00:00:00Z", period_end_date: "2018-06-30T00:00:00Z", submission_start_date: "2018-07-19T00:00:00Z", submission_due_date: "2018-08-15T00:00:00Z", certification_due_date: "2018-08-15T00:00:00Z", submission_reveal_date: "2018-08-15T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
                }, {
                    period_start_date: "2018-01-01T00:00:00Z", period_end_date: "2018-03-31T00:00:00Z", submission_start_date: "2018-04-19T00:00:00Z", submission_due_date: "2018-05-16T00:00:00Z", certification_due_date: "2018-05-16T00:00:00Z", submission_reveal_date: "2018-05-16T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
                }, {
                    period_start_date: "2017-10-01T00:00:00Z", period_end_date: "2017-12-31T00:00:00Z", submission_start_date: "2018-01-19T00:00:00Z", submission_due_date: "2018-02-15T00:00:00Z", certification_due_date: "2018-02-15T00:00:00Z", submission_reveal_date: "2018-02-15T00:00:00Z", submission_fiscal_year: 2018, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
                }, {
                    period_start_date: "2017-07-01T00:00:00Z", period_end_date: "2017-09-30T00:00:00Z", submission_start_date: "2017-10-06T00:00:00Z", submission_due_date: "2017-12-01T00:00:00Z", certification_due_date: "2017-12-01T00:00:00Z", submission_reveal_date: "2017-12-01T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 4, submission_fiscal_month: 12, is_quarter: true
                }, {
                    period_start_date: "2017-04-01T00:00:00Z", period_end_date: "2017-06-30T00:00:00Z", submission_start_date: "2017-07-19T00:00:00Z", submission_due_date: "2017-08-15T00:00:00Z", certification_due_date: "2017-08-15T00:00:00Z", submission_reveal_date: "2017-08-15T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 3, submission_fiscal_month: 9, is_quarter: true
                }, {
                    period_start_date: "2017-01-01T00:00:00Z", period_end_date: "2017-03-31T00:00:00Z", submission_start_date: "2017-04-19T00:00:00Z", submission_due_date: "2017-05-20T00:00:00Z", certification_due_date: "2017-05-20T00:00:00Z", submission_reveal_date: "2017-05-20T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 2, submission_fiscal_month: 6, is_quarter: true
                }, {
                    period_start_date: "2016-10-01T00:00:00Z", period_end_date: "2016-12-31T00:00:00Z", submission_start_date: "2017-01-19T00:00:00Z", submission_due_date: "2017-02-20T00:00:00Z", certification_due_date: "2017-02-20T00:00:00Z", submission_reveal_date: "2017-02-20T00:00:00Z", submission_fiscal_year: 2017, submission_fiscal_quarter: 1, submission_fiscal_month: 3, is_quarter: true
                }]
            }
        }),
        cancel: () => {}
    }))
}));

jest.mock('helpers/glossaryHelper', () => ({
    fetchAllTerms: jest.fn(() => ({
        promise: Promise.resolve({
            data: {
                page_metadata: {
                    page: 1,
                    count: 132,
                    next: 2,
                    previous: null,
                    hasNext: true,
                    hasPrevious: false
                },
                results: [
                    {
                        term: "Acquisition of Assets",
                        slug: "acquisition-of-assets",
                        data_act_term: "Acquisition of Assets",
                        plain: "This major object class includes an agency’s procurement of assets, including those that have lost value (depreciated). Some examples of assets, according to this definition, include equipment, land, physical structures, investments, and loans.",
                        official: "This major object class covers object classes 31.0 through 33.0. Include\ncapitalized (depreciated) assets and non-capitalized assets. This includes:\n31.0 Equipment\n32.0 Land and structures\n33.0 Investments and loans\n\nEach specific object class is defined in OMB Circular A-11 Section 83.6.",
                        resources: "Learn More: [Circular No. A-11](https://www.whitehouse.gov/sites/whitehouse.gov/files/omb/assets/a11_current_year/a11_2017.pdf)"
                    }
                ]
            }
        }),
        cancel: () => {}
    }))
}));

const mockPush = jest.fn();

const history = {
    push: mockPush
};

describe('AgenciesContainer', () => {
    describe('tab change', () => {
        // TODO: only fires one api request on tab change
        // shows the correct table
        it('renders the details table first', async () => {
            render(<AboutTheDataPage history={history} />);
            const [table] = screen.getAllByText('Count of Agency TAS in GTAS Not in File A');
            expect(table).toBeDefined();
            const loading = screen.getByAltText('Dismiss message');
            expect(loading).toBeDefined();
            // await waitForElementToBeRemoved(() => screen.getByAlt)
        });
        it('renders the dates table on tab click', () => {
            render(<AboutTheDataPage history={history} />);
            const tab = screen.getAllByText('Updates by Fiscal Year');
            fireEvent.click(tab[0]);
            const table = screen.getByText('FY 2020 Q4');
            expect(table).toBeDefined();
        });
    });
    describe('table loads the correct fy by url', () => {
        // it('shows table for fy from url', async () => {
        //     render(<AboutTheDataPage history={history} />);
        //     expect(true).toBeDefined();
        //     // useParams.mockImplementation(() => ({ fy: '2019', period: '11' }));
        //     // await waitFor(() => {
        //     //     const picker = screen.getByAltText('Selected FY 2019');
        //     //     expect(picker).toBeDefined();
        //     // });
        // });
        // it('when fy in url is invalid the latest fy is displayed and url is updated', async () => {
        //     useParams.mockImplementation(() => ({ fy: '2012' }));
        //     render(<AboutTheDataPage history={history} />);
        //     await waitFor(() => {
        //         const fy = screen.getByAltText('FY 2020');
        //         const period = screen.getByAltText('P11');
        //         expect(fy).toBeDefined();
        //         expect(period).toBeDefined();
        //     });
        //     expect(mockPush).toHaveBeenCalledWith({
        //         pathname: '/about-the-data/agencies/2020/11'
        //     });
        // });
        // it('when period in url is invalid the latest fy is displayed and url is updated', async () => {
        //     useParams.mockImplementation(() => ({ fy: '2018', period: '6' }));
        //     await waitFor(() => {
        //         const fy = screen.getByAltText('FY 2018');
        //         const period = screen.getByAltText('Q2 / P06');
        //         expect(fy).toBeDefined();
        //         expect(period).toBeDefined();
        //     });
        //     expect(mockPush).toHaveBeenCalledWith({
        //         pathname: '/about-the-data/agencies/2018/6'
        //     });
        // });
    });
});
