import { Component, OnInit } from '@angular/core';
import { ReqprocesosService } from '../services/reqprocesos.services'

@Component({
  selector: 'app-varbol',
  templateUrl: './varbol.component.html',
  styleUrls: ['./varbol.component.css'],
  providers: [ReqprocesosService]
})
export class VarbolComponent implements OnInit {
 options = {};
 mapProc : any ;
 listProc : any ;
 treeobjects : any;
 op : {id:number; name:string; children:object[] };
 lop :  any [];
 arboljson : any;
 jsonparse : any;
 stringListado: string = "";
 titulo : string = "Arbol de procesos";

  constructor(private _reqprocesosService : ReqprocesosService) { }
  
  mostrarArbol(){
  	this.mapProc = new Map();
  	this.op = { id:1, name:"abc", children:[{ id:2, name:"cd", children:[] }, { id:3, name:"fg", children:[] } ] };
  	//this.mapProc.set(1,"a");
  	//this.mapProc.set(2,"a");
  	//this.mapProc.set(3,"a");
  	this.mapearProcs();
  	console.log("!===============!");
  	console.log(this.mapProc);
  	console.log("!========-------=======!");
  	this.mapEntries();
  	//this.node = new Map();
  	this.treeobjects = [];
  	this.mapAarray(this.mapProc);
  }

  mapEntries() { this.lop = Array.from(this.listProc.entries()); }


  mapAarray(nodo)
  {
  	nodo.forEach((value: any, key: string) => {
    	
//		let aux = this.op{value.Pid, value.Nombre,value.hijos};
		console.log("********** idmodified **********");		
//		console.log(aux);
    	if(value.Padre == 0 )
    	{
    		if(value.hijos.length > 0)
    		{
    			this.recorrehoja(value.hijos);
    		}
    		console.log(key, value);    		
    		this.treeobjects.push(value);
    	}
	});
  	console.log("......arboljson......");
  	this.arboljson = <JSON>this.treeobjects;
  	let idModified = this.arboljson.map(
	    obj => {
	        return {
	            "id" : obj.Pid,
	            "name":obj.Nombre,
	            "children":obj.hijos
	        }
	    }
	);


  	var s = JSON.stringify(this.arboljson);
  	var myJSON = s.replace(/"Pid"/g, '"id"').replace(/"Nombre"/g, '"name"').replace(/"hijos"/g, '"children"');
  	this.jsonparse = JSON.parse(myJSON);
  }

  recorrehoja(raiz)
  {
	console.log("========================!!!!!!!!");
	console.log(raiz);
  	for (var hoja = 0; hoja < raiz.length; hoja ++)
  	{
  		if(raiz[hoja].hijos.length > 0)
  		{
  			this.recorrehoja(raiz[hoja].hijos);
  		}
	  		console.log(raiz[hoja]);
  	}
  }

  mapearProcs(){
  	var proc, procp;
  	console.log("size is: " + this.listProc.length);
  	for(let i = 0; i < this.listProc.length; i++)
  	{
  		proc = this.listProc[i];
  		proc.hijos = [];
  		if (proc.Padre != 0) {
  			procp = this.mapProc.get(proc.Padre);
  			if(procp){
  				procp.hijos.push(proc);
  			}
  		}  		
  		if (i < 10)
  		{
	  		console.log(proc);
  		}
  		this.mapProc.set(proc.Pid, proc);
  	}
  }

  ngOnInit() {
  	this._reqprocesosService.getTree().subscribe(
        result => {
        	this.listProc = result.Procesos;
        	console.log("listado ----v");
        	console.log(this.listProc);
    		this.mostrarArbol();
        },
        error => {
          console.log(<any>error);
        }
    );
  }

}
