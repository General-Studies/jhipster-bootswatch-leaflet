import { Component, OnInit, AfterViewInit } from '@angular/core';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
/* import { 
    Popup, 
    popup, icon, latLng, Map, control,
    marker, point, polyline, tileLayer, 
    LatLngExpression 
  } from 'leaflet'; */
import * as L from 'leaflet';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  account: Account | null = null;

  constructor(private accountService: AccountService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.account = account));
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginService.login();
  }

  previousState(): void {
    window.history.back();
  }

  private initMap(): void { 
    const map = L.map('map', {scrollWheelZoom:false}).setView([-15.77972,-47.92972], 4);

    const openstreetmap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
        maxZoom: 18
    });

    const openStreetMapBlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    });

    const empty = L.tileLayer('');    

    const baseLayers = {
        'Blank': empty,
        'OSM' : openstreetmap,
        'OSM_Black' : openStreetMapBlackAndWhite
    };
    baseLayers.OSM_Black.addTo(map);   
    
    const municipios = L.tileLayer.wms('http://200.133.244.148:8080/geoserver/cemaden_dev/wms?', {
      layers: 'cemaden_dev:municipios_monitorados',
      format: 'image/png',
      transparent: true
    }).addTo(map);
    
    const overlayers = {
        'Municípios Monitorados': municipios
    };

    L.control.layers(baseLayers, overlayers).addTo(map);

    L.control.scale().addTo(map);
  }
}