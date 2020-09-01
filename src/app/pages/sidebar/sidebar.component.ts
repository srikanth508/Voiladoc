import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../hello-doctor.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  display: string;
  showdocvideo: string;

  constructor(public docservice: HelloDoctorService) { }

  public temp: any;
  public roleid: any;
  public languageid: any;
  public labels: any;
  public hospitalid: any;

  ngOnInit() {
    debugger
    this.display = "none";
    this.roleid = localStorage.getItem('roleid');
    this.languageid = localStorage.getItem('LanguageID')
    this.hospitalid = localStorage.getItem('hospitalClinicID')
    this.getlanguage()
  }
  public getlanguage() {
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  public show() {
    debugger;
    if (this.docservice.showvid == 1) {
      this.display = "block";
    }

  }

  public hide() {
    this.display = "none";
  }

  public highlight(evt) {
    var i, tablinks;

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }
}
