import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

/** Working: Re-implementation of this slider using react-bootstrap. */

export default (props) => (
    <div className="map-overlay top">
        <div className="map-overlay-inner">
        <h5 className="map-overlay-title">Pomino V2 Pollution Map</h5>
        <p className="map-overlay-select-text">Please select a month: 2016.{props.month}</p>
        <RangeSlider className="map-overlay-slider" 
                    min={1}
                    max={12}
                    value={props.month}
                    onChange={props.handleChange}
                    variant={'dark'}
        />
        </div>
    </div>
);