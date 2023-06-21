import { Component, OnInit } from '@angular/core';
import { MainContentService } from '../../services/main-content/main-content.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private idUser: string = "";
  public role: string = "";
  private token: string = "";

  public dataDashboard: any;  

  public chartData: ChartDataset[] = [];
  public chartLabels: string[] = [];
  public chartOptions: ChartOptions = {};

  constructor(
    private mainContentService: MainContentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initDataUser();
  }

  async initDataUser() {
    await this.loadUserData();
    await this.validateLoginData();
    await this.getDataDashboard();
  }

  async loadUserData() {
    if (this.idUser == "" || this.role == "" || this.token == "") {
      this.idUser = await this.mainContentService.getIdUser();
      this.role = await this.mainContentService.getRoleUser();
      this.token = await this.mainContentService.getToken();
    }
  }

  createTicket() {
    this.router.navigate(['/create-ticket']);
  }
  viewHistory() {
    this.router.navigate(['/view-ticket']);
  }
  adminTickets() {
    this.router.navigate(['/list-tickets']);
  }
  home() {
    this.router.navigate(['home']);
  }
  logOut() {
    this.idUser = "";
    this.role = "";
    this.token = "";
    this.mainContentService.logOut();
    this.router.navigate(['auth']);
  }

  validateLoginData() {
    if (this.idUser == "" || this.role == "" || this.token == "") {
      this.router.navigate(['auth']);
    }
  }

  redirectTicketsView() {
    this.router.navigate(['list-tickets']);
  }

  redirectViewGenerateReport() {

  }

  async getDataDashboard() {

    let response = await this.mainContentService.getDataDashboard().subscribe(res => {
      this.fillObjDataDashboard(res);
      this.generateDataChart();
    }, err => {
      this.dataDashboard = {
        "quantityCreatedTickets": "Err",
        "percentilTicketsCreatedByUsers": "Err",
        "percentilClosedTickets": "Err",
        "dataChart": []
      };
    });

  }

  fillObjDataDashboard(response: any) {
    this.dataDashboard = {
      "quantityCreatedTickets": response.cantTickets,
      "percentilTicketsCreatedByUsers": Number(response.percentilTicketsCreatedByUsers).toFixed(2),
      "percentilClosedTickets": Number(response.percentilClosedTickets).toFixed(2),
      "dataChart": response.dataChart
    };
  }

  generateDataChart() {

    this.chartOptions =
    {
      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          // ⤵️ tooltip main styles
          backgroundColor: 'white',
          displayColors: false, // removes unnecessary legend
          padding: 10,

          // ⤵️ title
          titleColor: '#2D2F33',
          titleFont: {
            size: 18
          },

          // ⤵️ body
          bodyColor: '#2D2F33',
          bodyFont: {
            size: 13
          }
        }
      }
    };

    this.chartData = [
      {
        label: 'Tickets abiertos por mes',
        data: [],
        pointHitRadius: 15, // expands the hover 'detection' area
        pointHoverRadius: 8, // grows the point when hovered
        pointRadius: 2,
        borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
        pointBackgroundColor: '#2D2F33',
        pointHoverBackgroundColor: '#2D2F33',
        borderWidth: 2, // main line width
        hoverBorderWidth: 0, // borders on points
        pointBorderWidth: 0, // removes POINT borders
        tension: 0.3, // makes line more squiggly
      }
    ];

    this.dataDashboard['dataChart'].forEach((element: any) => {
      this.chartData[0]['data'].push(element['cantTickets']);
      this.chartLabels.push(element['nameMonth']);
    });

  }

}
