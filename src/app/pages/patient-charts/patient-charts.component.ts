import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../hello-doctor.service';
import { Router } from "@angular/router";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import Swal from 'sweetalert2';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-patient-charts',
  templateUrl: './patient-charts.component.html',
  styleUrls: ['./patient-charts.component.css']
})
export class PatientChartsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public countlist:any;
  public febcount:any;
  
  public jancount:any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };  public barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Septmber','October','November','December'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];



  ngOnInit() {

   this.getcount()
    
  }



  public getcount()
  {
    this.docservice.Get12MonthsPatientRegistrationDetails(2020).subscribe(
      data => {
       
        this.countlist = data;
        this.jancount=this.countlist[0].jancount
        this.febcount=this.countlist[0].febcount
       
        this.countlist = data;
        // let testdata = [];
        // let testlables = [];
        // for (var i = 0; i < this.countlist.length; i++) {
        //   testdata.push(this.countlist[i].closing_Blance);

        //   testlables.push(this.countlist[i].jancount);
        //  
      }, error => {
      }
    )

  }
  public barChartData: ChartDataSets[] = [
    { data: [2, 3, 2, 0, 0, 0, 0,0,0,0,0,0], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  
}
}
