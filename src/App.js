import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

import Heatmap from './components/Heatmap';
import MonthSlider from './components/MonthSlider';

export default function App() {
    // month => dataFile => data
    const [month, setMonth] = useState(1);

    // Do we really need this? This may cause an extra re-render. `UseReducer`
    const [dataFile, setDataFile] = useState('2018-01.csv');

    const [data, setData] = useState(null);

    const [animate, setAnimate] = useState(false);

    const [param, setParam] = useState('VCD');

    const [accessor, setAccessor] = useState(() => d => d[2]);

    const accessors = {
        'VCD': () => d => d[2],
        'AOD': () => d => d[3],
        'AMF': () => d => d[4]
    };

    useEffect(() => {
        setDataFile(mapMonth(month));
    }, [month]);

    useEffect(() => {
        fetch(`data/${dataFile}`)
            .then(response => response.text())
            .then(data => Papa.parse(data, {
                dynamicTyping: true,
                complete: res => {
                    setData(res.data);
                },
            }));
    }, [dataFile]);

    // TODO: Refactor this 'effect'.
    useEffect(() => {
        // Invariant: month should be a number between 1 - 12. 
        if (animate) {
            const interval = setInterval(() => {
                const currentMonth = month + 1;
                if (currentMonth > 12) {
                    setMonth(currentMonth - 12);
                } else {
                    setMonth(currentMonth);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [animate, month]);

    // Once the month changes, useEffect() will take over and update things.
    const handleMonthChange = (event) => {
        const { value } = event.target;
        setMonth(parseInt(value));
    };

    const handleParamChange = (event) => {
        const { value } = event.target;
        setParam(value);
        setAccessor(accessors[value])
    };

    /* Question: should combine? 
    const handleChange = (event) => {
        const { name, value } = event.target;
        name === 'month' ? setMonth(parseInt(value)) : setParam(value);
    }
    */

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
            <Heatmap data={data} param={param} accessor={accessor}/>
            <MonthSlider 
                month={month} 
                handleMonthChange={handleMonthChange}
                handleParamChange={handleParamChange}
                handleClick={handleClick}
                animate={animate}
                param={param} />
            {/* <div className="sidebar-style">
                <div>Month: {month} | File: {dataFile}</div>
            </div> */}
        </div>
    );
}
