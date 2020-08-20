import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public titulo: string;
	public subtitulo: string;

  constructor() { 
  	this.titulo = "Practica #1 - Monitor";
  	this.subtitulo = " Eliseo Sahuay - Tereza Salazar - Pedro García";
  }

  ngOnInit() {
  }

}
