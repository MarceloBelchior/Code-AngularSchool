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
   latitudeDest: number = 0;
   longitideDest: number = 0;
  pontodepartida: boolean = false;
  longradouroorigem: string = '';
 dataroute : any | undefined;

  constructor(private escolaService: EscolasService) { }

  ngOnInit() {
   this.mapa = new mapboxgl.Map({
     accessToken : 'key',
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
  criarMarcador(scl: any)
  {

    const marker = new mapboxgl.Marker({
      draggable: false
    })
    .setLngLat([scl.longitude,scl.latitude])
    .setPopup(new mapboxgl.Popup().setHTML(`
    <div class="leaflet-popup-content" >
    <strong>nome:</strong><div>`+ scl.nome + `</div>
    <strong>telefone:</strong><div>`+ scl.telefone + `</div>
    <strong>email:</strong><div>`+ scl.email + `</div>
    <strong>site:</strong><div>`+ scl.url_website + `</div>
    <strong>endereco:</strong><div>`+ scl.logradouro + `</div>
    </div>`))
    .addTo(this.mapa);
   

  }
   getEscola() {
    //this.loading = true;
    this.escolaService.getEscolas()
    .subscribe(escolas => { this.escolas = escolas;
     this.escolas?.forEach(c=> {
       this.total += 1;
       this.criarMarcador(c);
      });


    });
  }

    habilitaEndereco(lat: number, logt: number)
    {
      this.latitudeDest = lat;
      this.longitideDest = logt;
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
      .subscribe(origem  => { 
        this.latitudeOrigem = origem.coordinates[0];
        this.longitideOrigem = origem.coordinates[1];
       
      
      });

    }

    pesquisaRota()
    {

      this.escolaService.GetRota(this.latitudeOrigem,
        this.longitideOrigem,
        this.latitudeDest,
         this.longitideDest).subscribe(rotas => { this.dataroute = rotas; debugger; }  );

    }



}


