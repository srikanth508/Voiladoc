import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-diagnostic-slots-dash',
  templateUrl: './diagnostic-slots-dash.component.html',
  styleUrls: ['./diagnostic-slots-dash.component.css']
})
export class DiagnosticSlotsDashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public labels1: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
        this.labels1 = data;
      },
      error => { }
    );
  }

}
