import { createRef, useCallback, useMemo, useState } from 'react';

// mapbox
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl, Source, Layer, ImageSource } from 'react-map-gl';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl, { CircleLayer, Coordinate, FillLayer, LineLayer, MapLayerMouseEvent, MapboxEvent, MapboxGeoJSONFeature, RasterLayer, SymbolLayer } from 'mapbox-gl';
import type {FeatureCollection} from 'geojson';
import { useParams } from 'react-router';
(mapboxgl as any).workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN; // Set your mapbox token here
const interactiveLayerIds = [
  'cirle-layer-1',
];

const refineries = [
  { id: 1, label: 'Phillips 66 Refinery - Exxon, Linden, NJ, USA', lat: 40.64453321108492, lon: -74.21934182274542 },
  { id: 2, label: 'ExxonMobil - Baytown Refinery', lat: 29.7364, lon: -94.9774 },
  { id: 3, label: 'Chevron Corporation - Chevron Richmond Refinery', lat: 37.9311, lon: -122.3478 },
];

const fuel_sources_map = {
  "1" : [
    { id: 1, label: 'Huron Country Wind Farm, MI, USA', lat: 43.71590694504539, lon: -82.95328881543344, marker_color: 'black' },
    { id: 2, label: 'Maple Ridge Wind Farm, NY, USA', lat: 43.80101230045528, lon: -75.64898915904574, marker_color: 'black' },
    { id: 3, label: 'Ocean Wind 1, Offshore, NJ, USA', lat: 40.710649175479254, lon: -75.17981337025897, marker_color: 'black' },
    { id: 4, label: 'Mount Olive Solar Farm, NJ, USA', lat: 35.1915228875457, lon: -78.01442864981915, marker_color: 'black' },
    { id: 5, label: 'Illinois Industrial, IL, USA', lat: 41.73527252676589, lon: -87.80946269042686, marker_color: 'purple' }
  ],
  "2" : [
    { id: 1, label: 'US', lat: 37.0902, lon: -95.7129, marker_color: 'purple' },
    { id: 2, label: 'UK', lat: 54.7024, lon: -3.2766, marker_color: 'purple' },
    { id: 3, label: 'Canada', lat: 56.1304, lon: -106.3468, marker_color: 'purple' },
    { id: 4, label: 'Indonesia', lat: -0.7893, lon: 113.9213, marker_color: 'purple' },
  ],
  "3" : [
    { id: 1, label: 'Indonesia', lat: -0.7893, lon: 113.9213, marker_color: 'purple' },
    { id: 2, label: 'Malaysia', lat: 4.2105, lon: 101.9758, marker_color: 'purple' },
    { id: 3, label: 'Brazil', lat: -14.2350, lon: -51.9253, marker_color: 'purple' },
    { id: 4, label: 'Indonesia', lat: -0.8893, lon: 119.9213, marker_color: 'purple' },
  ]
};

const init_map_state_map = {
  "1": {
    latitude: 42,
    longitude: -80,
    zoom: 4,
    bearing: 0,
    pitch: 0
  },
  "2": {
    latitude: 42,
    longitude: 0,
    zoom: 1,
    bearing: 0,
    pitch: 0
  },
  "3": {
    latitude: 42,
    longitude: 0,
    zoom: 1,
    bearing: 0,
    pitch: 0
  }
};

function FuelSourceTransportMap() {
  const { terminal_id, refinery_id } = useParams<any>();
  
  // BEGIN data_prepare
  const testPins: Array<MapPin> = useMemo<Array<MapPin>>(() => {    
    const testPins: Array<MapPin> = [];
    for(let i = 0; i < refineries.length; i++) {
      if ( refineries[i].id !== Number(refinery_id) ) { continue; }

      testPins.push({
        ...refineries,
        id: 'refinery_' + refineries[i].id,
        id_in_dataset: refineries[i].id,
        dataset: 'refinery',
        label: refineries[i].label,
        lat: refineries[i].lat,
        lon: refineries[i].lon,
        info: refineries[i].label,
        tool_tip: refineries[i].label,
        marker_size: 10,
        marker_color: 'red',
      })
    }

    let fuel_sources = fuel_sources_map[ refinery_id ] ?? [];
    for(let i = 0; i < fuel_sources.length; i++) {
      testPins.push({
        ...fuel_sources,
        id: 'green_source_' + fuel_sources[i].id,
        id_in_dataset: fuel_sources[i].id,
        dataset: 'green_source',
        label: fuel_sources[i].label,
        lat: fuel_sources[i].lat,
        lon: fuel_sources[i].lon,
        info: fuel_sources[i].label,
        tool_tip: fuel_sources[i].label,
        marker_size: 10,
        marker_color: fuel_sources[i].marker_color,
      })
    }
    return testPins;
  }, [ refinery_id ]);
  // =================================================================================
  // END data_prepare

  const _mapRef = createRef<any>();
  const initialViewState = init_map_state_map[refinery_id] ?? {
    latitude: 42,
    longitude: -80,
    zoom: 4,
    bearing: 0,
    pitch: 0
  };
  const [viewState, setViewState] = useState(initialViewState);
  const [tooltip, setTooltip] = useState<any>(null);

  const onChangeTooltip = useCallback((tooltip: any) => {
    setTooltip(tooltip);
  }, []);

  // BEGIN raw_mapbox_init
  const onMapLoad = useCallback((e: MapboxEvent ) => {
    const map = e.target;
    if (!map) { return; }

    window.mapbox_ref = map;
    ///////////////////////////////
    ///////////////////////////////
    map.on('mouseenter', interactiveLayerIds, (e) => {
      map.getCanvas().style.cursor = 'pointer';
    })
    map.on('mousemove', interactiveLayerIds, (e) => {
      /////////////////////////////      
      if ( e.features?.[0]?.properties && e.features?.[0]?.geometry ) {
        let geometry: any = e.features[0].geometry as any;
        let properties: any = e.features[0].properties as any;        
        if ( geometry?.coordinates?.length ) {
          onChangeTooltip?.({lat: geometry?.coordinates[1], lon: geometry?.coordinates[0], tool_tip: properties.tool_tip, label: properties.label })
        }
      }
    })
    map.on('mouseleave', interactiveLayerIds, () => {
      map.getCanvas().style.cursor = ''
      onChangeTooltip?.(null);
    });
  }, [ onChangeTooltip ]);
  // END raw_mapbox_init

  // BEGIN useMemo_extraLayers
  const extraLayers = useMemo(() => {
    const circlesData1: FeatureCollection = {
      type: 'FeatureCollection',
      features: testPins.map((task: MapPin, index: number) => {        
        let point_radius = task.marker_size;  
        return {
          type: "Feature", 
          properties: { id_in_dataset: task.id_in_dataset, dataset: task.dataset, point_radius, marker_color: task.marker_color, taskId: task.id, tool_tip: task.tool_tip, label: task.label }, 
          geometry: { type: "Point", "coordinates": [ task.lon, task.lat ] }
        };
      })
    };
  
    const circleLayerStyle1: CircleLayer = {
      id: 'cirle-layer-1',
      type: 'circle',
      paint: {
        'circle-radius': ['number', ['get', 'point_radius'], 8],
        'circle-color': ['string', ['get', 'marker_color'], 'blue'],
        'circle-stroke-color': 'black',
        'circle-stroke-width': 1,
      }
    };

    return (
      <>
        <Source id="circles-data-1" type="geojson" data={circlesData1}>
          <Layer {...circleLayerStyle1} />
        </Source>
      </>
    );
  }, [ testPins ]);
  // END useMemo_extraLayers
  
  return <>
    <Map
      ref={_mapRef}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      mapboxAccessToken={TOKEN}
      style={{ height: `600px`, width: "100%" }}
      interactiveLayerIds={interactiveLayerIds}
      onLoad={onMapLoad}
      onClick={(e: MapLayerMouseEvent ) => {
        let { features } = e;
        if ( !features || !features.length ) { return; }
        let feature: MapboxGeoJSONFeature = features[0];
        if ( feature?.properties?.dataset === 'terminal' ) {
          location.href=`/terminal/${feature?.properties?.id_in_dataset}`;
        }
        if ( feature?.properties?.dataset === 'refinery' ) {
          location.href=`/terminal/${terminal_id}/tank/refinerytransport/${feature?.properties?.id_in_dataset}`;
        }
        // if ( interactiveLayerIds.includes( features[0].layer?.id ) && features[0].properties?.taskId ) {
        //   onClickTaskPoint( features[0].properties?.taskId );
        // }
      }}
    >
      <GeolocateControl position="top-right" />
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />
      <ScaleControl position="bottom-right" />
      
      {extraLayers}

      {tooltip && (
        <Popup
          longitude={Number(tooltip.lon)}
          latitude={Number(tooltip.lat)}
          closeButton={false}
          style={{padding: 0, wordWrap: 'break-word'}}
          maxWidth='auto'
          offset={15}
        >
          {tooltip.tool_tip}
        </Popup>
      )}
    </Map>
  </>;
}
export default FuelSourceTransportMap;