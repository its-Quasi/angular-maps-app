import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map as MapBox, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number]
  @ViewChild('map') containerMap?: ElementRef
  map?: MapBox

  ngAfterViewInit(): void {
    if (!this.lngLat) throw 'lnglat cant be null'
    if (!this.containerMap) throw 'map has been not initialized';
    this.map = new MapBox({
      container: this.containerMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive : false
    })
    new Marker().setLngLat(this.lngLat).addTo(this.map)
  }
}
