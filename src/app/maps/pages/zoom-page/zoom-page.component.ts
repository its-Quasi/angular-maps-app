import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map as MapBox} from 'mapbox-gl'

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit {

  @ViewChild('map') containerMap? : ElementRef
  map? : MapBox;
  zoom = 8

  ngAfterViewInit(): void {

    if(!this.containerMap) throw 'no';
    console.log(this.containerMap)

    this.map = new MapBox({
      container: this.containerMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    })
    this.mapListener()
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
      if(this.map!.getZoom() > 18) {
        this.map?.zoomTo(18)
      }
    })
  }
}
