import { pl } from "date-fns/locale";
import getPreciseDistance from "geolib/es/getPreciseDistance";
import getDistance from "geolib/es/getDistance";
import isPointInPolygon from "geolib/es/isPointInPolygon";
import { isReturnStatement } from "typescript";

export const FUEL_TYPE = [
  { id: 'hfo', name: 'HFO', source_fuel_title: 'Crude'},
  { id: 'biofuel', name: 'Biofuel', source_fuel_title: 'Waste oil'},
  { id: 'green_methanol', name: 'Green Methanol', source_fuel_title: 'Renewable source'},
];

export const parse_fetch_response = async (response) => {
  if (response.ok) {
    return response.json();
  }
  let errorText = 'Something went wrong';
  try {
    errorText = await response.text();
  } catch(e) {}
  throw new Error(`Error code: ${response.status} : ${errorText}`);
}

export const dd = function (number: number): string {
  return number > 9 ? ('' + number) : ('0' + number)
}

// This function is deprecated.
// Instead, use dayjs
// dayjs(new Date()).format("YYYY-MM-DD")
// npm i dayjs
export const date2str = function (this_date: Date, style: number = 0 ): string {
  if ( !this_date ) return "";

  // As default, mysql date format
  var datetime: string = this_date.getFullYear() + "-"
              + dd(this_date.getMonth()+1)  + "-" 
              + dd(this_date.getDate()) + " "  
              + dd(this_date.getHours()) + ":"  
              + dd(this_date.getMinutes()) + ":" 
              + dd(this_date.getSeconds());
  if ( style === 1 ) {
    datetime = this_date.getFullYear() + "/"
              + dd(this_date.getMonth()+1)  + "/" 
              + dd(this_date.getDate()) + " "  
              + dd(this_date.getHours()) + ":"  
              + dd(this_date.getMinutes()) + ":" 
              + dd(this_date.getSeconds());
  }
  return datetime;
}

export const getCurrentUrl = (): string => {
  var currentUrl = window.location.href;
  // Check if the last character is '/' and remove it
  if (currentUrl.endsWith('/')) {
      currentUrl = currentUrl.slice(0, -1);
  }
  return currentUrl;
}

export const id2item = (id: ID, list: Array<any>): any => {
  if(!list) return null;
  for (let i = 0; i < list.length; i++) { 
    if (list[i]['id'] == id)
    {
      return list[i];
    }
  }
  return null;
}

export const push_non_duplicate = (value: any, list: Array<any>): void => {
  if ( !value ) { 
    return; 
  }
  for ( let i = 0; i < list.length; i++) {
    if (list[i] === value) { return; }
  }
  list.push(value);
}

export const push_non_duplicate_id = (value: any, list: Array<any>): void => {
  if ( !value?.id ) { 
    return; 
  }
  for ( let i = 0; i < list.length; i++) {
    if (list[i]?.id === value.id) { return; }
  }
  list.push(value);
}

export const is_drawing_polygon = (): boolean => {
  let mapbox_draw_ref = window.mapbox_draw_ref;
  if (!mapbox_draw_ref) return false;

  if (mapbox_draw_ref.getMode() === 'draw_polygon' || mapbox_draw_ref.getMode() === 'direct_select') {
    // If new polygon draw 
    // or precise vertex moving in polygon 
    return true;
  }

  var edit_polygon_object = mapbox_draw_ref.get('polygonShapeEdit');
  if ( edit_polygon_object ) { return true; }

  if (mapbox_draw_ref.getMode() === 'simple_select') {
    var selectedFeatureCollection = mapbox_draw_ref.getSelected();
    return selectedFeatureCollection?.features?.length > 0;
  }

  return false;
}

export const mapboxPixelToEm = (pxValue: number) : number => {
  // Caution ! This is based on current mapbox version's css settings.
  // If you get found incorrect, please refactor it.
  let mapbox_base_fontSize = 12; // 12 px
  return pxValue / mapbox_base_fontSize;
}