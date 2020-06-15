import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ReqprocesosService } from '../services/reqprocesos.services'

@Component({
  selector: 'app-monitor-cpu',
  templateUrl: './monitor-cpu.component.html',
  styleUrls: ['./monitor-cpu.component.css'],
  providers: [ReqprocesosService]
})

export class MonitorCpuComponent implements OnInit {
  public LineChart: Chart;
  public x : any;
  public nint : number = 0;

  public listlabels : number[]; 
  public listdatos : number[];
  
  

  getHola(){
	this.listlabels = [this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1];
	this.listdatos = [9,7,3,5,2,10,15,16,19,3,1,9];
	console.log(" =====+> Eliminando: " + this.listlabels  );
  }

  getHola2(){
	console.log("esperando2");
	this._reqprocesosService.getCpu().subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(<any>error);
        }
    );
	this.removeData(this.LineChart);
	this.addData(this.LineChart);
  }

addData(chart) {
    chart.data.labels.push(this.nint+=1);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(30);
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
