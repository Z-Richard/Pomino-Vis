import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

import Heatmap from './components/Heatmap';
import MonthSlider from './components/MonthSlider';

export default function App() {
    
    const [month, setMonth] = useState(1);

    const [dataFile, setDataFile] = useState('2018-01.csv');

    const [data, setData] = useState(null);

    useEffect(() => {
        setDataFile(mapMonth(month));
    }, [month]);

    useEffect(() => {
        fetch(`vcd/${dataFile}`)
            .then(response => response.text())
            .then(data => Papa.parse(data, {
                dynamicTyping: true,
                complete: res => {
                    setData(res.data);
                },
            }));
    }, [dataFile]);

    // Once the month changes, useEffect() will take over and update things.
    const handleChange = (event) => {
        const { value } = event.target;
        setMonth(parseInt(value));
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
            <Heatmap data={data}/>
            <MonthSlider month={month} handleChange={handleChange} />
            {/* <div className="sidebar-style">
                <div>Month: {month} | File: {dataFile}</div>
            </div> */}
        </div>
    );
}
