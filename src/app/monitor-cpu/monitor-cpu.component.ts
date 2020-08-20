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
  public nint : number = -12;
  public valAct : number = 0;
  public titulo : string = "Monitor - CPU";
  public valant = undefined;
  public valpor ;
  public valactualReturn;

  public listlabels : number[]; 
  public listdatos : number[];

  stats()
  {
    let act = this.getHola2();
    if(!this.valant)
    {
      this.valant = act;
      let i = 0 ;
      while(true){
        i+=1;
        if(i === 80000000)
        {
          break;
        }
      }
      act = this.getHola2();
    }
    var prc = 0;
    if(typeof act === 'undefined' )
    {
      console.log("??????? indefinido ???????")
      prc = 0;
    }
    else
    {
      prc = ((act[0] - this.valant[0])/(act[1] - this.valant[1]))*100;
      console.log(" ++++valant++++ " + this.valant + " ++++act++++ " + act);
      this.valant = act;
    }
    if(isNaN(prc))
    {
      prc = 0.0;    
    }
    console.log("=======prc============"+prc);
    this.valactualReturn = prc.toFixed(2);
    this.removeData(this.LineChart);
    this.addData(this.LineChart, prc);
  }

  getHola(){
    this.listlabels = [this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1, this.nint+=1];
    this.listdatos = [0,0,0,0,0,0,0,0,0,0];
    console.log(" =====+> Eliminando: " + this.listlabels  );
  }

  getHola2(){
  console.log("esperando2");
  var cpu ;
  var total ;
  
  this._reqprocesosService.getCpu().subscribe(
        result => {
        this.valAct = result.User;
          cpu = result.User + result.Nice + result.System + result.Irq + result.Softirq + result.Steal;
          total = result.User + result.Nice + result.System + result.Idle + result.Iowait + result.Irq + result.Softirq + result.Steal;
          this.valpor = [cpu, total];
        },
        error => {
          console.log("======error====="+<any>error);
        }
    );
    return this.valpor;
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
      type: 'line',
      data: {
        labels: this.listlabels,
        datasets: [{
          label:  'Monitor-CPU',
          data: this.listdatos,
          fill: false,
          lineTension:  0.5,
          borderColor:  "red",
          borderWidth:  1
        }]
      },
      options: {
        title: {
          text: "Porcentaje consumo de procesador",
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
                          return value + " %"
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
                      return datasetLabel+ ': ' + tooltipItem.yLabel + ' %';
                  }
              }
          }
      }
    });
    this.x = setInterval(() => { this.stats(); }, 1000);
  }

}
