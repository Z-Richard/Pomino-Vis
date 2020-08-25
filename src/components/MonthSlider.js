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
                    checked={props.paramState.param === 'VCD'}
                    onChange={() => props.dispatch({ type: 'VCD' })}
                    />
                <Form.Check
                    inline
                    name="param"
                    type="radio"
                    label="AOD"
                    checked={props.paramState.param === 'AOD'}
                    onChange={() => props.dispatch({ type: 'AOD' })}
                    />
                <Form.Check
                    inline
                    name="param"
                    type="radio"
                    label="AMF"
                    checked={props.paramState.param === 'AMF'}
                    onChange={() => props.dispatch({ type: 'AMF' })}
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