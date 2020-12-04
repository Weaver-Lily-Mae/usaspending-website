export const glossaryResponse = {
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
            },
            {
                term: "Action Date",
                slug: "action-date",
                data_act_term: "Action Date",
                plain: "The date the action being reported was issued / signed by the Government or a binding agreement was reached.",
                official: "The date the action being reported was issued / signed by the Government or a binding agreement was reached.",
                resources: null
            },
            {
                term: "Action Type",
                slug: "action-type",
                data_act_term: "Action Type",
                plain: "Provides information on the type of change made to an award. For example, the change may be the result of a continuation, revision, and/or adjustment to completed project.",
                official: "Description (and corresponding code) that provides information on any changes made to the Federal prime award. There are typically multiple actions for each award.\n\n(Note: This definition encompasses current data elements ‘Type of Action’ for financial assistance and ‘Reason for Modification’ for procurement)",
                resources: null
            },
            {
                term: "Agency",
                slug: "agency",
                data_act_term: "Agency",
                plain: "On this website, we use the term agency to mean any federal department, commission, or other U.S. government entity. Agencies can have multiple sub-agencies. For example, the National Park Service is a sub-agency of the U.S. Department of the Interior. ",
                official: "On this website, we use the term agency to mean any federal department, commission, or other U.S. government entity. Agencies can have multiple sub-agencies. For example, the National Park Service is a sub-agency of the U.S. Department of the Interior. ",
                resources: null
            },
            {
                term: "Agency Identifier",
                slug: "agency-identifier",
                data_act_term: "Agency Identifier",
                plain: "Identifies the agency responsible for a Treasury account. This is a 3-digit number that is a part of a Treasury Account Symbol (TAS).",
                official: "The agency code identifies the department or agency that is responsible for the account.",
                resources: null
            },
            {
                term: "Allocation Transfer Agency (ATA) Identifier",
                slug: "allocation-transfer-agency-ata-identifier",
                data_act_term: "Allocation Transfer Agency (ATA) Identifier",
                plain: "Identifies an agency that receives funds through an allocation (non-expenditure) transfer. This is a 3-digit number that is a part of a Treasury Account Symbol (TAS).",
                official: "The allocation agency identifies the department or agency that is receiving funds through an allocation (non-expenditure) transfer.",
                resources: null
            },
            {
                term: "Appropriation",
                slug: "appropriation",
                data_act_term: null,
                plain: "The process by which Congress designates and approves spending for a specific purpose (e.g., a project or program). Most government spending is determined through appropriation bills each year. These bills must be passed by Congress and signed by the President. \n\nWhen an appropriation is not passed by Congress before the beginning of the fiscal year, a “continuing resolution” (often referred to as a “CR”) may be enacted to avoid a government shutdown. A CR is a law that provides stopgap funding for agencies until their regular appropriations are passed.",
                official: null,
                resources: null
            },
            {
                term: "Appropriation Account",
                slug: "appropriation-account",
                data_act_term: "Appropriations Account",
                plain: "When Congress passes a law, it often gives an agency authority to carry out a project. When this happens, Congress may set aside money for the project. An appropriation account tracks the money, much like a bank account. The appropriation account number (like a bank account number) is called a Treasury Account Symbol (TAS).",
                official: "The basic unit of an appropriation generally reflecting each unnumbered paragraph in an appropriation act. An appropriation account typically encompasses a number of activities or projects and may be subject to restrictions or conditions applicable to only the account, the appropriation act, titles within an appropriation act, other appropriation acts, or the Government as a whole.\n\nAn appropriations account is represented by a TAFS created by Treasury in consultation with OMB.\n\n(defined in OMB Circular A-11)",
                resources: "Learn More: [Circular No. A-11](https://www.whitehouse.gov/sites/whitehouse.gov/files/omb/assets/a11_current_year/a11_2017.pdf)"
            },
            {
                term: "Availability Type Code",
                slug: "availability-type-code",
                data_act_term: "Availability Type Code",
                plain: "Within a Treasury Account Symbol (TAS), this one-letter code Identifies the availability (or time period) for obligations to be made on the appropriation account. A TAS will have an “X” if there is an unlimited or indefinite period to incur new obligations.",
                official: "In appropriations accounts, the availability type code identifies an unlimited period to incur new obligations; this is denoted by the letter X.",
                resources: null
            },
            {
                term: "Award",
                slug: "award",
                data_act_term: null,
                plain: "Money the federal government has promised to pay a recipient. Funding may be awarded to a company, organization, government entity (i.e., state, local, tribal, federal, or foreign), or individual. It may be obligated (promised) in the form of a contract, grant, loan, insurance, direct payment, etc.",
                official: null,
                resources: null
            }
        ]
    }
};

export const submissionPeriodsResponse = {
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
};
