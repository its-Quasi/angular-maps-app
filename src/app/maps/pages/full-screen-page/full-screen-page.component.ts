import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';



@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') containerMap? : ElementRef
  map? : Map
  lngLat : LngLat = new LngLat(-74.5, 40) 

  ngAfterViewInit(): void {

      if(!this.containerMap) throw 'map has been not initialized';
      console.log(this.containerMap)

      this.map = new Map({
      container: this.containerMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    
  }
}
