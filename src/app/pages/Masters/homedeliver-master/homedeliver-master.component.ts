import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-homedeliver-master',
  templateUrl: './homedeliver-master.component.html',
  styleUrls: ['./homedeliver-master.component.css']
})
export class HomedeliverMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }

  languageid: any;
  labels: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()

  }


  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

}
