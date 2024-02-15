import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map as MapBox} from 'mapbox-gl'

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {
  
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
    this.mapListener()
  }
  
  ngOnDestroy(): void {
    this.map?.remove()
  }

  zoomIn() {
    this.map?.zoomIn()
  }
  
  zoomOut() {
    this.map?.zoomOut()
  }

  doZoomChangeBar(value : string) {
    const zoomVal = Number(value)
    this.zoom = zoomVal
    this.map?.zoomTo(this.zoom)
  }

  mapListener() {
    if(!this.map) return
    this.map.on('zoom' , (e) => this.zoom = this.map!.getZoom() )

    this.map.on('zoomend', () => {
      if(this.map!.getZoom() > 18) this.map?.zoomTo(18)
    })

    this.map.on('move' , (e) => this.lngLat = this.map!.getCenter())
  }
}
