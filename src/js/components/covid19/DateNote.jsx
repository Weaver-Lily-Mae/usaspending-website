/**
 * DateNote.jsx
 * Created by Jonathan Hill 06/10/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const propTypes = { styles: PropTypes.object };

const DateNote = ({ styles }) => {
    const date = useSelector((state) => state.account.dataAsOf);
    if (!date) return null;
    return (
        <div style={{ ...styles }} className="covid__date-note">
            Data through {date.format('MMMM DD[,] YYYY')}
        </div>
    );
};

DateNote.propTypes = propTypes;
export default DateNote;
