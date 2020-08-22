import React from 'react';

export default (props) => (
    <div className="map-overlay top">
        <div className="map-overlay-inner">
        <h3>VCD Pollution</h3>
        <input name="month" 
               type="range" 
               min="0" 
               max="11" 
               step="1" 
               value={props.month}
               onChange={props.handleChange} />
        </div>
    </div>
);