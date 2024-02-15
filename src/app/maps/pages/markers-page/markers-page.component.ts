import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map as MapBox, Marker } from 'mapbox-gl';

interface MarkColor {
  mark : Marker, 
  color : string
}

interface PlainMark {
  lngLat : number[]
  color : string
}
@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map') containerMap? : ElementRef
  markers : MarkColor [] = []
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

    this.getMarkers()
  }

  saveMarkers () {
    const toSave : PlainMark[] = this.markers.map(({color, mark}) => {
      return {
        color,
        lngLat : mark.getLngLat().toArray()
      }
    })
    localStorage.setItem('plainmarkers', JSON.stringify(toSave))
  }

  getMarkers () {
    const saved = localStorage.getItem('plainmarkers') ?? '[]'
    const plainMarkers : PlainMark[] = JSON.parse(saved) 
    plainMarkers.forEach(({color, lngLat}) => {
      const [x, y] = lngLat
      const point = new LngLat(x, y);
      this.addMark(point, color)
    })
  }

  flyTo(mark : Marker) {
    this.map?.flyTo({
      center : mark.getLngLat(),
      zoom : 14
    })
  }

  removeMarker(index : number) {
    const mark = this.markers[index]
    this.markers[index].mark.remove()
    this.markers.splice(index, 1)
  }

  createMark() {
    if(!this.map) return
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.addMark(this.map.getCenter(), color)
  }

  addMark(lngLat : LngLat, color : string = 'red') {
    if(!this.map) return
    const mark = new Marker({
      color,
      draggable : true
    })
    .setLngLat(lngLat)
    .addTo(this.map)
    this.markers.push({mark, color})
    this.saveMarkers()
    mark.on('dragend', () => this.saveMarkers() );
  }
}