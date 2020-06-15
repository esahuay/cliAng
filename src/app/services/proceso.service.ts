import { Injectable } from '@angular/core';
import { Procesoubuntu } from '../models/procesoubuntu';


@Injectable()
export class ProcesoService{
	public LProcesos: Array<Procesoubuntu>;

	constructor(){
	  	this.LProcesos = [
	  		new Procesoubuntu(1,2,'name1','process1'),
	  		new Procesoubuntu(2,2,'name2','process2'),
	  		new Procesoubuntu(3,2,'name3','process3'),
	  		new Procesoubuntu(4,2,'name4','process4'),
	  	];
	}

	getTexto(){
		return "Hola mundo";
	}

	getProcesos():Array<Procesoubuntu>{
	 return this.LProcesos;
	}
	
}

