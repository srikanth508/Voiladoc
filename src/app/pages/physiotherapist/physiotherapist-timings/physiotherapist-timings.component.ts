import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-physiotherapist-timings',
  templateUrl: './physiotherapist-timings.component.html',
  styleUrls: ['./physiotherapist-timings.component.css']
})
export class PhysiotherapistTimingsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public physioid: any;
  public workinglist: any;
  public phsyhospitadetailsid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public term: any;
  public id: any;
  public dayslist: any;


  public languageid: any;
  public labels: any;
  public hopitsllist: any
  ngOnInit() {
    this.physioid = localStorage.getItem('physioid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getphysiolist();
    this.getdaysmaster();
    // this.GetTimings();
    this.getlanguage();
    this.docservice.GetPhysiotherapyHospitalDetailsByHospitals(this.physioid, this.languageid,).subscribe(
      data => {
       
        this.hopitsllist = data;
      }, error => {
      }
    );
  }
  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public getdaysmaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.dayslist = data;
      }, error => {
      }
    )
  }
  public getphysiolist() {
    this.docservice.GetPhysiotherapyHospitalDetailsWeb(this.physioid, this.languageid).subscribe(
      data => {
       
        this.workinglist = data;
      }, error => {
      }
    )
  }

  Timeings: any
  // public GetTimings() {
  //   this.docservice.GetSlotMasterTimings().subscribe(
  //     data => {
       
  //       this.Timeings = data;
  //     }, error => {
  //     }
  //   )
  // }
  public GetDayID(even) {
   
    this.dayid = even.target.value;
  }

  public GetDetsilsID(nurseHospitalDetailsID, dayID, startime, endtime, id) {
   
    this.phsyhospitadetailsid = nurseHospitalDetailsID;
    this.dayid = dayID,
      this.startdatetime = startime,
      this.enddatetime = endtime,
      this.id = id

  }
  public updatedetails() {
   
    var entity = {
      'ID': this.id,
      'PhysiotherapyHospitalDetailsID': this.phsyhospitadetailsid,
      'DayID': this.dayid,
      'StartTimee': this.startdatetime,
      'EndTimee': this.enddatetime
    }
   
    this.docservice.UpdatePhysiotherapistWorkingDetails(entity).subscribe(data => {
      if (data != undefined) {
        if(this.languageid==1)
        {
          Swal.fire("Updated Successfully");
          this.getphysiolist();
        }
        else
        {
          Swal.fire("Supprimé avec succès");
          this.getphysiolist();
        }
      

      }
    })

  }

  // public DeletePhysiotherapistWorkingDetails(nsid, dayid) {
  //  if(this.languageid==1)
  //  {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You Want to Delete This Day Slot!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.docservice.DeletePhysiotherapistWorkingDetails(nsid, dayid).subscribe(res => {
  //         let test = res;
  //         this.getphysiolist();
  //       })
  //       Swal.fire(
  //         'Deleted!',
  //         'Day has been deleted.',
  //         'success'
  //       )
  //     }
  //     else {
  //       this.getphysiolist();
  //     }
  //   })
  //  }
  //  else{
  //   Swal.fire({
  //     title: 'Êtes-vous sûr ?',
  //     // text: "You Want to Delete This Day Slot!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui, supprimer !',
  //     cancelButtonText: 'Annuler'

  //   }).then((result) => {
  //     if (result.value) {
  //       this.docservice.DeletePhysiotherapistWorkingDetails(nsid, dayid).subscribe(res => {
  //         let test = res;
  //         this.getphysiolist();
  //       })
  //       Swal.fire(
  //         'Supprimé!',
  //         'Le jour a été supprimé.',
  //         'success'
  //       )
  //     }
  //     else {
  //       this.getphysiolist();
  //     }
  //   })
  //  }
  // }

  public addnew() {
    location.href = '#/PhysiotherapistWorkingDetails/' + this.physioid;
  }
  hopitslname
  public GetHospital(even) {
   
    this.hopitslname = even.target.value;
  }

  daysname
  public GetDaysName(even) {
    this.daysname = even.target.value;
  }

  // public DisablePhysiotherapistWorkingDetails(id) {
  //   this.docservice.DisablePhysiotherapistWorkingDetails(id).subscribe(
  //     data => {
       
  //       Swal.fire('Disabled', 'Physiotherapist Working Details has been Disabled');
  //       this.getphysiolist();

  //     }, error => {
  //     }
  //   )
  // }
  // public EnablePhysiotherapistWorkingDetails(id) {
  //   this.docservice.EnablePhysiotherapistWorkingDetails(id).subscribe(
  //     data => {
       
  //       Swal.fire('Enabled', 'Physiotherapist Working Details has has been Enabled');
  //       this.getphysiolist();

  //     }, error => {
  //     }
  //   )
  // }







  public DisablePhysiotherapistWorkingDetails(nsid) {
    if(this.languageid==1)
    {
     Swal.fire({
       title: 'Are you sure?',
       text: "You Want to Disable This Day!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, disable it!'
     }).then((result) => {
       if (result.value) {
         this.docservice.DisablePhysiotherapistWorkingDetails(nsid).subscribe(res => {
           let test = res;
           this.getphysiolist();
         })
         Swal.fire(
           'Deleted!',
           'Day has been disabled.',
           'success'
         )
       }
       else {
         this.getphysiolist();
       }
     })
    }
    else{
     Swal.fire({
       title: 'Êtes-vous sûr ?',
       // text: "You Want to Delete This Day Slot!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Oui, Désactiver !',
       cancelButtonText: 'Annuler'
 
     }).then((result) => {
       if (result.value) {
         this.docservice.DisablePhysiotherapistWorkingDetails(nsid).subscribe(res => {
           let test = res;
           this.getphysiolist();
         })
         Swal.fire(
           'Supprimé!',
           'Le jour a été désactivé.',
           'success'
         )
       }
       else {
         this.getphysiolist();
       }
     })
    }
   }



   
  public EnablePhysiotherapistWorkingDetails(nsid) {
    if(this.languageid==1)
    {
     Swal.fire({
       title: 'Are you sure?',
       text: "You Want to Enable This Day!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, enable it!'
     }).then((result) => {
       if (result.value) {
         this.docservice.EnablePhysiotherapistWorkingDetails(nsid).subscribe(res => {
           let test = res;
           this.getphysiolist();
         })
         Swal.fire(
           'Deleted!',
           'Day has been enabled.',
           'success'
         )
       }
       else {
         this.getphysiolist();
       }
     })
    }
    else{
     Swal.fire({
       title: 'Êtes-vous sûr ?',
       // text: "You Want to Delete This Day Slot!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Oui, Activer !',
       cancelButtonText: 'Annuler'
 
     }).then((result) => {
       if (result.value) {
         this.docservice.EnablePhysiotherapistWorkingDetails(nsid).subscribe(res => {
           let test = res;
           this.getphysiolist();
         })
         Swal.fire(
           'Supprimé!',
           'Le jour a été activé',
           'success'
         )
       }
       else {
         this.getphysiolist();
       }
     })
    }
   }
}
