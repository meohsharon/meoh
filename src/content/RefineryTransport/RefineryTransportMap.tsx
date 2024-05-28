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

const terminals = [
  { id: 103, label: 'Port of New York and New Jersey', lat: 40.6688, lon: -74.0345 },
];
const refineries = [
  { id: 1, label: 'Global Companies LLC - Global Partners Albany Terminal', lat: 42.6354, lon: -73.7562 },
  { id: 2, label: 'ExxonMobil - Baytown Refinery', lat: 29.7364, lon: -94.9774 },
  { id: 3, label: 'Chevron Corporation - Chevron Richmond Refinery', lat: 37.9311, lon: -122.3478 },
]

const testPins: Array<MapPin> = [];
for(let i = 0; i < terminals.length; i++) {
  testPins.push({
    ...terminals,
    id: 'terminal_' + terminals[i].id,
    id_in_dataset: terminals[i].id,
    dataset: 'terminal',
    label: terminals[i].label,
    lat: terminals[i].lat,
    lon: terminals[i].lon,
    info: terminals[i].label,
    tool_tip: terminals[i].label,
    marker_size: 16,
    marker_color: 'red',
  })
}

for(let i = 0; i < refineries.length; i++) {
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
    marker_size: 16,
    marker_color: 'black',
  })
}

function RefineryTransportMap() {
  const { terminal_id } = useParams<any>();
  
  const _mapRef = createRef<any>();
  const initialViewState = {
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
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
  }, []);
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
export default RefineryTransportMap;