import { Component, OnInit } from '@angular/core';
import { Procesoubuntu } from '../models/procesoubuntu';
import { ProcesoService } from '../services/proceso.service'
import { ReqprocesosService } from '../services/reqprocesos.services'


@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css'],
  providers: [ReqprocesosService]
})

export class ProcesosComponent implements OnInit {
  public titulo : string = "Tabla de procesos"
	public LProcesos: Array<Procesoubuntu>;
  public lproc: any;
  public lista: any;
  public ejecucion: any;
  public suspend: any;
  public detenido: any;
  public muertos: any;
  public otros: any;
  public zombies: any;
  public idle: any;
  public totalproc: any;
  public lptotal: any;

//  constructor( private _procesoservice : ProcesoService) { 
//}

  constructor(
    private _reqprocesosService : ReqprocesosService
  ){ }

  ngOnInit() {
  
      this._reqprocesosService.getProc().subscribe(
        result => {
          this.lproc = result;
          this.ejecucion = result.Estats.Proc_ejecucion;
          this.suspend = result.Estats.Proc_suspend;
          this.detenido = result.Estats.Proc_detenido;
          this.muertos = result.Estats.Proc_dead;
          this.otros = result.Estats.Proc_other;
          this.zombies = result.Estats.Proc_zombie;
          this.idle = result.Estats.Proc_idle;
          this.totalproc = result.Estats.Totalproc;
          this.lista = result.Procs
          this.lptotal = result.Total
        },
        error => {
          console.log(<any>error);
        }
      );
  }

  borrarProceso(indice)
  {
    this._reqprocesosService.deletProc(indice).subscribe(
      result => {
        console.log(" =====+> Eliminando: " + indice );        
      },
      error => {
        console.log(<any>error);
      }
    );
    window.location.reload();   
  }
}
