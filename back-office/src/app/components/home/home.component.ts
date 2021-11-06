import { Component, OnInit } from '@angular/core';
import { KpiService } from '../../services/kpi.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public token;
  public totalEarningYear = 0;
  public totalEarningMonth = 0;
  public countSales = 0;
  public totalLastMonth = 0;
  constructor(private kpiService: KpiService) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.kpiService.getMonthlyEarningsKPI(this.token).subscribe(
      response => {
        this.totalEarningYear = response.totalEarningYear;
        this.totalEarningMonth = response.totalEarningMonth;
        this.countSales = response.countSales;
        this.totalLastMonth = response.totalLastMonth;
        this.initChart(response);
      },
      error => {

      }
    )
  }

  initChart(data: any){
    var canvas = <HTMLCanvasElement> document.getElementById('myChart');
    var ctx = canvas.getContext('2d')!;

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Meses',
                data: [
                  data.january, 
                  data.february, 
                  data.march, 
                  data.april, 
                  data.may,
                  data.june,
                  data.july,
                  data.august,
                  data.september,
                  data.october,
                  data.november,
                  data.december,
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }

}
