/**
 * DrilldownCell.jsx
 * Created by Lizzie Salita 11/23/20
 */

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    data: oneOfType([PropTypes.string, PropTypes.object]),
    id: PropTypes.string
};

const DrilldownCell = ({ data, id }) => (
    <Link
        to={`/about-the-data/agency/${id}`}
        className="drilldown-cell">
        <span className="drilldown-cell__text">
            {data}
        </span>
        <span className="drilldown-cell__icon">
            <FontAwesomeIcon icon="angle-double-down" />
        </span>
    </Link>
);

DrilldownCell.propTypes = propTypes;
export default DrilldownCell;
