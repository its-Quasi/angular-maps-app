import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map as MapBox} from 'mapbox-gl'
@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit {

  @ViewChild('map') containerMap? : ElementRef

  ngAfterViewInit(): void {

    if(!this.containerMap) throw 'no';
    console.log(this.containerMap)

    const map = new MapBox({
      container: this.containerMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    })
    
  }
}
