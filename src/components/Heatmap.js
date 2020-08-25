import React from 'react';

import { StaticMap } from 'react-map-gl';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmljaGFyZHpodWFuZyIsImEiOiJja2N5YTQxNDYwN3d5MnNwamdteWl5d3k3In0.UgE-_u7VgdxQWuJh3fdh9w';

const INITIAL_VIEW_STATE = {
    // 101, 40, 3.3
    longitude: 110,
    latitude: 31,
    zoom: 4.5,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};

export default (props) => {
    
    const mapStyle = 'mapbox://styles/mapbox/dark-v10';

    const layers = [
        new HeatmapLayer({
            data: props.data,
            id: 'heatmap-layer',
            pickable: false,
            getPosition: d => [d[0], d[1]],
            getWeight: props.paramState.accessor,
            radiusPixels: 25,
            intensity: 3,
            opacity: 0.12,
            threshold: 0.05,
            updateTriggers: {
                getWeight: [d => d[2], d => d[3], d => d[4]]
            },
        })
    ];

    console.log(layers);

    return (
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
            <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        </DeckGL>
    );
}
