import React from 'react';

import RangeSlider from 'react-bootstrap-range-slider';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/** TODO: Refactor this and CSS.  */

export default (props) => (
    <div className="map-overlay top">
        <div className="map-overlay-inner">
            <h5 className="map-overlay-title">Pomino V2 Pollution Map</h5>
            <p className="map-overlay-select-month">
                Please select a month: 2016.{props.month}
            </p>
            <RangeSlider className="map-overlay-slider" 
                        min={1}
                        max={12}
                        name="month"
                        value={props.month}
                        onChange={props.handleMonthChange}
                        variant="dark"
            />
            <p className="map-overlay-select-attribute">Please select an attribute: </p>
            <Form>
                <Form.Check
                    inline
                    name="param"
                    type="radio"
                    label="VCD"
                    value="VCD"
                    checked={props.param === 'VCD'}
                    onChange={props.handleParamChange}
                    />
                <Form.Check
                    inline
                    name="param"
                    type="radio"
                    label="AOD"
                    value="AOD"
                    checked={props.param === 'AOD'}
                    onChange={props.handleParamChange}
                    />
                <Form.Check
                    inline
                    name="param"
                    type="radio"
                    label="AMF"
                    value="AMF"
                    checked={props.param === 'AMF'}
                    onChange={props.handleParamChange}
                    />
            </Form>
            <Button 
                className="map-overlay-botton" 
                variant="dark" 
                size="sm"
                onClick={props.handleClick}
                value={props.animate}>{props.animate ? 'Stop': 'Loop'}</Button>
        </div>
    </div>
);