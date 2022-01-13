import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurse-services-dash',
  templateUrl: './nurse-services-dash.component.html',
  styleUrls: ['./nurse-services-dash.component.css']
})
export class NurseServicesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  nurseServicesList: any;
  term: any;
  nurseid: any;
  labels1: any;
  dummid: any;
  showdropdown: any;
  hospitalclinicid: any;
  ngOnInit() {
    debugger
    this.languageid = localStorage.getItem('LanguageID');
    this.nurseid = localStorage.getItem('nurseid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');

    if (this.nurseid == undefined) {
      this.showdropdown = 1;
    }
    else {
      this.showdropdown = 0;
    }
    this.getlanguage();
    this.getlanguage1()
    this.GetNurseServices()
  }


  public getlanguage1() {
    debugger
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels1 = data;
      }, error => {
      }
    )
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public GetNurseServices() {
    if (this.nurseid != undefined) {
      debugger
      this.docservice.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.nurseServicesList = data.filter(x => x.nurseID == this.nurseid);
        }, error => {
        }
      )
    }
   else if (this.hospitalclinicid != undefined) {
      debugger
      this.docservice.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.nurseServicesList = data.filter(x => x.hospitalClinicID == this.hospitalclinicid);
        }, error => {
        }
      )
    }
    else {
      debugger
      this.docservice.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.nurseServicesList = data;
        }, error => {
        }
      )

    }

  }





  public Enable(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Activate This!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableNurseService(id).subscribe(res => {
            let test = res;
            this.GetNurseServices();
          })
          Swal.fire(
            'Activated!',
            'Activated Successfully".',
            'success'
          )
        }
        else {
          this.GetNurseServices();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Activer",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui,',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableNurseService(id).subscribe(res => {
            let test = res;
            this.GetNurseServices();
          })
          Swal.fire(
            'Activer!',
            'Activer avec Succès ',
            'success'
          )
        }
        else {
          this.GetNurseServices();
        }
      })
    }
  }





  public Delete(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Deactivate This!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableNurseService(id).subscribe(res => {
            let test = res;
            this.GetNurseServices();
          })
          Swal.fire(
            'Activated!',
            'Deactivated Successfully".',
            'success'
          )
        }
        else {
          this.GetNurseServices();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Désactiver",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui,',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableNurseService(id).subscribe(res => {
            let test = res;
            this.GetNurseServices();
          })
          Swal.fire(
            'Désactiver!',
            'Désactiver avec Succès ',
            'success'
          )
        }
        else {
          this.GetNurseServices();
        }
      })
    }
  }

}
