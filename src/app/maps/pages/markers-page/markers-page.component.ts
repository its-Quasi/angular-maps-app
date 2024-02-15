import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map as MapBox } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') containerMap? : ElementRef
  map? : MapBox;
  zoom = 8
  lngLat : LngLat = new LngLat(-74.5, 40) 
  
  ngAfterViewInit(): void {
    
    if(!this.containerMap) throw 'map has been not initialized';
    console.log(this.containerMap)
    
    this.map = new MapBox({
      container: this.containerMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    })
  }
}
