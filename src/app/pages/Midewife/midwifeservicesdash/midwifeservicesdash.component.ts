import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-midwifeservicesdash',
  templateUrl: './midwifeservicesdash.component.html',
  styleUrls: ['./midwifeservicesdash.component.css']
})
export class MidwifeservicesdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  nurseServicesList: any;
  term: any;
  midwifeid: any;
  labels1: any;
  dummid: any;
  showDropdown: any;
  hospitalclinicid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    if (this.midwifeid == undefined) {
      this.showDropdown = 1;
    }
    else {
      this.showDropdown = 0;
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
    debugger
    if (this.midwifeid != undefined) {
      this.docservice.GetMidWifeServicesWeb(this.midwifeid, this.languageid).subscribe(
        data => {
          debugger
          this.nurseServicesList = data.filter(x => x.midWifeID == this.midwifeid);
        }, error => {
        }
      )

    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWifeServicesWeb(this.midwifeid, this.languageid).subscribe(
        data => {
          debugger
          this.nurseServicesList = data.filter(x => x.hospitalClinicID == this.hospitalclinicid);
        }, error => {
        }
      )

    }

    else {
      this.docservice.GetMidWifeServicesWeb(this.midwifeid, this.languageid).subscribe(
        data => {
          debugger
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
          this.docservice.EnableMidWifeService(id).subscribe(res => {
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
          this.docservice.EnableMidWifeService(id).subscribe(res => {
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
          this.docservice.DisableMidWifeService(id).subscribe(res => {
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
          this.docservice.DisableMidWifeService(id).subscribe(res => {
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
