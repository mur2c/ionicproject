import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
})
export class MonitorPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;

  private intervalUpdate: any = null;
	public chart: any = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Voltaje",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false
          }
        ]
      }
    });
		
		this.showData();
		
		this.intervalUpdate = setInterval(function(){
		 	this.showData();
		 }.bind(this), 1000);

  }

  private ngOnDestroy(): void {
    console.log("destruido");
		clearInterval(this.intervalUpdate);
  }
  
  private showData(): void {
		this.getFromAPI().subscribe(response => {
			if(response.error === false) {
				let chartTime: any = new Date();
        chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
        console.log(chartTime);
				if(this.lineChart.data.labels.length > 20) {   //15 pasos o labels a mostrar
						this.lineChart.data.labels.shift();    //Si hay mas de 15 labels , borra el primero y pon el ultimo
						this.lineChart.data.datasets[0].data.shift();  //Desplaza la data tambien
				}
				this.lineChart.data.labels.push(chartTime);
				this.lineChart.data.datasets[0].data.push(response.data);
				this.lineChart.update();
			} else {
				console.error("ERROR: The response had an error, retrying");
			}
		}, error => {
			console.error("ERROR: Unexpected response");
		});
  }
  
  private getFromAPI(): Observable<any>{
	  return this.http.get(
		'http://localhost:3000',
		{ responseType: 'json' }
	  );
	}

  /** Go Back rwy*/
  gotoHome() {
    this.router.navigate(['/home']);
  }

}
