import React from 'react';

import { StaticMap } from 'react-map-gl';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmljaGFyZHpodWFuZyIsImEiOiJja2N5YTQxNDYwN3d5MnNwamdteWl5d3k3In0.UgE-_u7VgdxQWuJh3fdh9w';

const INITIAL_VIEW_STATE = {
    longitude: 107.5,
    latitude: 38,
    zoom: 3.5,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};

export default function Heatmap(props, {
    radiusPixels = 25,
    intensity = 3,
    threshold = 0.05,
    opacity = 0.12,
    mapStyle = 'mapbox://styles/mapbox/dark-v10'
}) {
    const layers = [
        new HeatmapLayer({
            data: props.data,
            id: 'heatmap-layer',
            pickable: false,
            getPosition: d => [d[0], d[1]],
            getWeight: d => d[2],
            radiusPixels,
            intensity,
            opacity,
            threshold
        })
    ];

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
