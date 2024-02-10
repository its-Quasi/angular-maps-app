import { Component } from '@angular/core';

interface MenuItem {
  name : string,
  route : string
}

@Component({
  selector: 'map-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  menuItems : MenuItem[] = [
    {name : 'Fullscreen' , route : '/maps/fullscreen'},
    {name : 'Zoom' , route : '/maps/zoom'},
    {name : 'Markers' , route : '/maps/markers'},
    {name : 'Houses' , route : '/maps/properties'},
  ]
}
