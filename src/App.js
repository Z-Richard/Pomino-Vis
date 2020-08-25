import React, { useState, useEffect, useReducer } from 'react';
import Papa from 'papaparse';

import Heatmap from './components/Heatmap';
import MonthSlider from './components/MonthSlider';

export default function App() {
    const [month, setMonth] = useState(1);

    const [data, setData] = useState(null);

    const [animate, setAnimate] = useState(false);

    const paramReducer = (_, action) => {
        switch (action.type) {
            case 'VCD':
                return initialParam;
            case 'AOD':
                return {
                    param: 'AOD',
                    accessor: d => d[3]
                };
            case 'AMF':
                return {
                    param: 'AMF',
                    accessor: d => d[4]
                };
        }
    }

    const initialParam = {
        param: 'VCD',
        accessor: d => d[2]
    };

    const [paramState, dispatch] = useReducer(paramReducer, initialParam);

    // data fetching: side effect. 
    useEffect(() => {
        fetch(`data/${mapMonth(month)}`)
            .then(response => response.text())
            .then(data => Papa.parse(data, {
                dynamicTyping: true,
                complete: res => {
                    setData(res.data);
                },
            }));
    }, [month]);

    useEffect(() => {
        // Invariant: month should be a number between 1 - 12. 
        if (animate) {
            const timeout = setTimeout(() => {
                const currentMonth = month + 1;
                if (currentMonth > 12) {
                    setMonth(currentMonth - 12);
                } else {
                    setMonth(currentMonth);
                }
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [animate, month]);

    // Once the month changes, useEffect() will take over and update things.
    const handleMonthChange = (event) => {
        const { value } = event.target;
        setMonth(parseInt(value));
    };

    const handleClick = () => {
        setAnimate(!animate);
    };

    /**
     * Map a value of [0, 19] to the corresponding month from '2016-01.csv' to
     * '2016-12.csv'. 
     * Invariant: value should be a number, not a string. 
     */
    const mapMonth = (month) => {
        return month < 10 ? `2016-0${month}.csv`: `2016-${month}.csv`;
    };

    return (
        <div>
            <Heatmap data={data} paramState={paramState} />
            <MonthSlider 
                month={month} 
                animate={animate}
                paramState={paramState}
                handleMonthChange={handleMonthChange}
                handleClick={handleClick}
                dispatch={dispatch} />
            {/* <div className="sidebar-style">
                <div>Month: {month} | File: {dataFile}</div>
            </div> */}
        </div>
    );
}
