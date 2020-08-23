import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Button from 'react-bootstrap/Button';

/** Working: Create a botton to Loop over the images.  */

export default (props) => (
    <div className="map-overlay top">
        <div className="map-overlay-inner">
        <h5 className="map-overlay-title">Pomino V2 Pollution Map</h5>
        <p className="map-overlay-select-text">
            Please select a month: 2016.{props.month}
        </p>
        <RangeSlider className="map-overlay-slider" 
                    min={1}
                    max={12}
                    value={props.month}
                    onChange={props.handleChange}
                    variant="dark"
        />
        <Button 
            className="map-overlay-botton" 
            variant="dark" 
            size="sm"
            onClick={props.handleClick}
            value={props.animate}>{props.animate ? 'Stop': 'Loop'}</Button>
        </div>
    </div>
);