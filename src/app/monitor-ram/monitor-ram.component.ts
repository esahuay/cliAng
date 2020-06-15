import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ReqprocesosService } from '../services/reqprocesos.services'

@Component({
  selector: 'app-monitor-ram',
  templateUrl: './monitor-ram.component.html',
  styleUrls: ['./monitor-ram.component.css'],
  providers: [ReqprocesosService]
})
export class MonitorRamComponent implements OnInit {
  public LineChart: Chart;
  public x : any;
  public nint : number = -10;
  public valAct : number = 0;

  public listlabels : number[]; 
  public listdatos : number[];
  
  

  getHola(){
	this.listlabels = [this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1];
	this.listdatos = [0,0,0,0,0,0,0,0,0,0];
	console.log(" =====+> Eliminando: " + this.listlabels  );
  }

  getHola2(){
	console.log("esperando2");
	this._reqprocesosService.getMemo().subscribe(
        result => {
  		  this.valAct = result["Porcentaje memoria"];
          console.log(this.valAct);
        },
        error => {
          console.log("======error====="+<any>error);
        }
    );
	this.removeData(this.LineChart);
	this.addData(this.LineChart,this.valAct);
  }

addData(chart, data) {
    chart.data.labels.push(this.nint+=1);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

removeData(chart) {
    chart.data.labels.splice(0,1);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.splice(0,1);
    });
    chart.update();
}

delay(ms: number) {
	console.log("esperando");
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  constructor(private _reqprocesosService : ReqprocesosService) { }

  ngOnInit() {
   	//LineChart
   	this.getHola();
  	this.LineChart = new Chart('lineChart', {
  		type:	'line',
  		data:	{
  			labels:	this.listlabels,
  			datasets:	[{
  				label:	'Monitor-CPU',
  				data:	this.listdatos,
  				fill:	false,
  				lineTension:	0.5,
  				borderColor:	"red",
  				borderWidth:	1
  			}]
  		},
  		options: {
  			title: {
  				text: "Line Chart",
  				display: true
  			},
  			scales: {
	            xAxes: [{
	                time: {
	                    unit: 'second'
	                },
	                gridLines: {
	                    display:true,
	                    drawBorder: false
	                },
	                ticks: {
	                    maxTicksLimit: 20
	                }
	            }],
	            yAxes:[{
	                ticks:{
	                    maxTicksLimit: 10,
	                    callback: function(value, index, values){
	                        return value + " MB"
	                    }
	                }
	            }],
	        },
	        legend : {
	            display: false
	        },
	        tooltips:{
	            callbacks:{
	                label: (tooltipItem, chart) =>{
	                    let datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
	                    return datasetLabel+ ': ' + tooltipItem.yLabel + ' MB';
	                }
	            }
	        }
  		}
  	});
  	this.x = setInterval(() => { this.getHola2(); }, 1000);
  }

}
