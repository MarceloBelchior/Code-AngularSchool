import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { EscolasService } from '../escola.service';

@Component({
  selector: 'CodeHB-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  page: number = 0;
  size: number = 10;
  total: number = 0;
   mapa!: mapboxgl.Map;
   marker!:  mapboxgl.Marker | undefined;
   escolas: Array<any> | undefined;
   latitudeOrigem: number = 0;
   longitideOrigem: number = 0;
  pontodepartida: boolean = false;
  longradouroorigem: string = '';
dataorigem: any = null;

  constructor(private escolaService: EscolasService) { }

  ngOnInit() {
   this.mapa = new mapboxgl.Map({
     accessToken : 'pk.eyJ1IjoibWFyY2Vsb2JlbGNoaW9yIiwiYSI6ImNrdWtpamkxZDA5OG8ydm80ZzdhY2dtYjcifQ._onFYs7OWm21YMLXb4Q3BA',
     container : 'mapa-mapbox',
     style: 'mapbox://styles/mapbox/streets-v11',
     center: [-51.2473525,-30.1087029],
     zoom: 11
   });
  this.getEscola();
   //this.criarMarcador(-51.2473525,-30.1087029);



  }
  onRoute()
  {

  }
  criarMarcador(lng: number,lat: number)
  {

    const marker = new mapboxgl.Marker({
      draggable: false
    })
    .setLngLat([lng,lat]).addTo(this.mapa);


  }
   getEscola() {
    //this.loading = true;
    this.escolaService.getEscolas()
    .subscribe(escolas => { this.escolas = escolas;
     this.escolas?.forEach(c=> {
       this.total += 1;
       this.criarMarcador(c.longitude,c.latitude);
      });


    });
  }

    habilitaEndereco()
    {
      this.pontodepartida = true;
    }

    onProximo()
    {
      this.page = this.size;
      this.size = this.page + 10;

    }
    onVoltar()
    {
      this.size = this.page;
      this.page =  this.page - 10;



    }


    pesquisarOrigem()
    {
      this.escolaService.getOrigem(this.longradouroorigem)
      .subscribe(origem  => this.dataorigem = this.dataorigem );

    }



}


