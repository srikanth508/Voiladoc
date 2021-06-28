import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmdash',
  templateUrl: './pharmdash.component.html',
  styleUrls: ['./pharmdash.component.css']
})
export class PharmdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
public value;
  public pharmacylist: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public options: any
  ngOnInit() {

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.getsponserpharmacyforadmin();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }


  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public getsponserpharmacyforadmin() {
   
    this.docservice.GetSponsoredPharmacyForAdmin().subscribe(
      data => {
       
        this.pharmacylist = data;
      }, error => {
      }
    )
  }
  // public diasblePharmacy(id) {
   
  //   this.docservice.DisableSponsoredPharmacy(id).subscribe(
  //     data => {
       
  //       Swal.fire('Disabled', 'Pharmacy has been Disabled');
  //       this.getsponserpharmacyforadmin();
  //     }, error => {
  //     }
  //   )
  // }





  public diasblePharmacy(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Disable this Pharmacy !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, disable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableSponsoredPharmacy(id).subscribe(res => {
            let test = res;
            this.getsponserpharmacyforadmin();
          })
          Swal.fire('Disabled', 'Pharmacy has been Disabled');
        }
        else {
          this.getsponserpharmacyforadmin();
        }
      })

    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Activer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableSponsoredPharmacy(id).subscribe(res => {
            let test = res;
            this.getsponserpharmacyforadmin();
          })
          Swal.fire(
            '',
            'Désactivé avec succès',
            'success'
          )
        }
        else {
          this.getsponserpharmacyforadmin();
        }
      })
    }


  }



  
  public enablePharmacy(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Enable this Pharmacy !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Enable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableSponsoredPharmacy(id).subscribe(res => {
            let test = res;
            this.getsponserpharmacyforadmin();
          })
          Swal.fire('Enabled', 'Pharmacy has been Enabled');
        }
        else {
          this.getsponserpharmacyforadmin();
        }
      })

    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Activer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableSponsoredPharmacy(id).subscribe(res => {
            let test = res;
            this.getsponserpharmacyforadmin();
          })
          Swal.fire(
            '',
            'Activé avec succès',
            'success'
          )
        }
        else {
          this.getsponserpharmacyforadmin();
        }
      })
    }


  }


  // public enablePharmacy(id) {
   
  //   this.docservice.EnableSponsoredPharmacy(id).subscribe(
  //     data => {
       
  //       Swal.fire('Enabled', 'Pharmacy has been Enabled');
  //       this.getsponserpharmacyforadmin();
  //     }, error => {
  //     }
  //   )
  // }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }

  startdate
  enddate
  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1];

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.docservice.GetSponsoredPharmacyForAdminByDate(this.startdate, this.enddate).subscribe(
      data => {
       
        this.pharmacylist = data;
      }, error => {
      }
    )
  }
  


  
}
