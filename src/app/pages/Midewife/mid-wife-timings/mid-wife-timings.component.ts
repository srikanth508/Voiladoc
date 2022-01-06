import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mid-wife-timings',
  templateUrl: './mid-wife-timings.component.html',
  styleUrls: ['./mid-wife-timings.component.css']
})
export class MidWifeTimingsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public id: any;
  public workinglist: any;
  public midwifehospitalid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public term: any;
  public midid: any;
  public dayslist: any;
  midwifeid: any
  public languageid: any;
  public labels: any;
  public hopitsllist: any;
  public labels1:any;
  ngOnInit() {
    this.id = localStorage.getItem('midwifeid');
    this.languageid = localStorage.getItem('LanguageID');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.startdatetime = 0;
    this.enddatetime = 0;
    this.getmidwifelist();
    this.getdaysmaster()
    // this.GetTimings();
    this.getlanguage();
    this.docservice.GetMidWifeHospitalDetailsByHospitals(this.midwifeid, this.languageid,).subscribe(
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
  public getmidwifelist() {
    this.docservice.GetMidWifeHospitalDetailsWeb(this.id, this.languageid).subscribe(
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
   
    this.midwifehospitalid = nurseHospitalDetailsID;
    this.dayid = dayID,
      this.startdatetime = startime,
      this.enddatetime = endtime,
      this.midid = id;
    this.startdatetime = 0;
    this.enddatetime = 0;

  }
  public updatedetails() {
   
    var entity = {
      'ID': this.midid,
      'MidWifeHospitalDetailsID': this.midwifehospitalid,
      'DayID': this.dayid,
      'StartTimee': this.startdatetime,
      'EndTimee': this.enddatetime
    }
   
    this.docservice.UpdateMidWifeWorkingDetails(entity).subscribe(data => {
      if (data != undefined) {
        if(this.languageid==1)
        {
          Swal.fire("Updated Successfully");
          this.getmidwifelist()
        }
        else
        {
          Swal.fire("Supprimé avec succès");
          this.getmidwifelist()
        }
   

      }
    })

  }

  // public DeleteMidWifeWorkingDetails(mid, dayid) {
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
  //       this.docservice.DeleteMidWifeWorkingDetails(mid, dayid).subscribe(res => {
  //         let test = res;
  //         this.getmidwifelist()
  //       })
  //       Swal.fire(
  //         'Deleted!',
  //         'Day has been deleted.',
  //         'success'
  //       )
  //     }
  //     else {
  //       this.getmidwifelist()
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
  //       this.docservice.DeleteMidWifeWorkingDetails(mid, dayid).subscribe(res => {
  //         let test = res;
  //         this.getmidwifelist()
  //       })
  //       Swal.fire(
  //         'Supprimé!',
  //         'Le jour a été supprimé.',
  //         'success'
  //       )
  //     }
  //     else {
  //       this.getmidwifelist()
  //     }
  //   })
  //  }
   
  // }

  //Prashant 
  public addnew() {
    location.href = '#/MidwifeWorkingDetails/' + this.midwifeid;
  }
  hopitslname
  public GetHospital(even) {
   
    this.hopitslname = even.target.value;
  }

  daysname
  public GetDaysName(even) {
    this.daysname = even.target.value;
  }








  public DisableMidWifeWorkingDetails(id) {
    if(this.languageid==1)
    {
     Swal.fire({
       title: 'Are you sure?',
       text: "You Want to disable This Day!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, disable it!',

     }).then((result) => {
       if (result.value) {
         this.docservice.DisableMidWifeWorkingDetails(id).subscribe(res => {
           let test = res;
           this.getmidwifelist()
         })
         Swal.fire(
           'Deleted!',
           'Day has been deleted.',
           'success'
         )
       }
       else {
         this.getmidwifelist()
       }
     })
    }
    else
    {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to disable This Day!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, désactiver!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableMidWifeWorkingDetails(id).subscribe(res => {
            let test = res;
            this.getmidwifelist()
          })
          Swal.fire(
            'désactiver!',
            'Le jour a été désactivé.',
            'success'
          )
        }
        else {
          this.getmidwifelist()
        }
      })
    }
  }



  // public DisableMidWifeWorkingDetails(id) {
  //   this.docservice.DisableMidWifeWorkingDetails(id).subscribe(
  //     data => {
       
  //       Swal.fire('Disabled', 'MidWife Working Details has been Disabled');
  //       this.getmidwifelist();
  //     }, error => {
  //     }
  //   )
  // }
  // public EnableMidWifeWorkingDetails(id) {
  //   this.docservice.EnableMidWifeWorkingDetails(id).subscribe(
  //     data => {
       
  //       Swal.fire('Enabled', 'MidWife Working Details has has been Enabled');
  //       this.getmidwifelist();

  //     }, error => {
  //     }
  //   )
  // }







  public EnableMidWifeWorkingDetails(id) {
    if(this.languageid==1)
    {
     Swal.fire({
       title: 'Are you sure?',
       text: "You Want to disable This Day!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, Enable it!',

     }).then((result) => {
       if (result.value) {
         this.docservice.EnableMidWifeWorkingDetails(id).subscribe(res => {
           let test = res;
           this.getmidwifelist()
         })
         Swal.fire(
           'désactivé!',
           'Day has been disabled.',
           'success'
         )
       }
       else {
         this.getmidwifelist()
       }
     })
    }
    else
    {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to disable This Day!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, désactiver!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableMidWifeWorkingDetails(id).subscribe(res => {
            let test = res;
            this.getmidwifelist()
          })
          Swal.fire(
            'désactiver!',
            'Le jour a été désactivé.',
            'success'
          )
        }
        else {
          this.getmidwifelist()
        }
      })
    }
  }

}
