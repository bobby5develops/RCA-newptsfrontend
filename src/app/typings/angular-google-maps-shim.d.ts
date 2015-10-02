/// <reference path="../../../.tmp/typings/tsd.d.ts" />

declare module "angular-google-maps-shim" {
  var _: string;
  export = _;
}

declare module AngularGoogleMaps {
  interface IPoint {
    latitude: number;
    longitude: number;
  }

  interface IBounds {
    northeast: IPoint;
    southwest: IPoint;
  }

  interface IMapDirectiveOptions {
    center ?: IPoint;
    pan ?: string | boolean;
    zoom ?: number;
    control ?: any;
  }

  interface IMapEvents {
    bounds_changed?: ()=>void;
    center_changed?: ()=>void;
    click?: (event: google.maps.MouseEvent)=>void;
    dblclick?: (event: google.maps.MouseEvent)=>void;
    drag?: ()=>void;
    dragend?: ()=>void;
    dragstart?: ()=>void;
    heading_changed?: ()=>void;
    idle?: ()=>void;
    maptypeid_changed?: ()=>void;
    mousemove?: (event: google.maps.MouseEvent)=>void;
    mouseout?: (event: google.maps.MouseEvent)=>void;
    mouseover?: (event: google.maps.MouseEvent)=>void;
    projection_changed?: ()=>void;
    resize?: ()=>void;
    rightclick?: (event: google.maps.MouseEvent)=>void;
    tilesloaded?: ()=>void;
    tilt_changed?: ()=>void;
    zoom_changed?: ()=>void;
  }

  interface IMapControlAccessor{
    getGMap?:()=>google.maps.Map;
  }

  interface IMapDrawingManagerAccessor{
    getDrawingManager ?: () => google.maps.drawing.DrawingManager;
  }
}
