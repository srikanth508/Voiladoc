import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-hospital-doc-dash',
  templateUrl: './hospital-doc-dash.component.html',
  styleUrls: ['./hospital-doc-dash.component.css']
})
export class HospitalDocDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { 
    
  }

  languageid: any;
  labels: any;
  commissionlist: any;
  term: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
    this.gethospitalcommssions()
  }

  public gethospitalcommssions() {
    this.docservice.GetHospitalCommissions(this.languageid).subscribe(
      data => {
       
        this.commissionlist = data;
      }, error => {
      }
    )
  }


}
