import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReqprocesosService{
	public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = "http://localhost:8000/"
	}

	getMemo(): Observable<any>{
		return this._http.get(this.url+'archivo1');
	}

	getCpu(): Observable<any>{
		return this._http.get(this.url+'archivo2');
	}

	getTree(): Observable<any>{
		return this._http.get(this.url+'archivo3');
	}

	getProc(): Observable<any>{
		return this._http.get(this.url+'archivo4');
	}

	deletProc(indice): Observable<any>{
		return this._http.get(this.url + 'eliminar/' + indice);
	}
}
