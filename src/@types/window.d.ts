interface Window { 
  mapbox_ref: any;
  mapbox_draw_ref: MapboxDraw;
  mapbox_disable_polygon_click_once: boolean;
  mapbox_esc_callback: () => void;
  mapbox_enter_callback: () => void;
}

window.mapbox_ref = window.mapbox_ref || null;
window.mapbox_draw_ref = window.mapbox_draw_ref || null;
window.mapbox_disable_polygon_click_once = window.mapbox_disable_polygon_click_once || false;