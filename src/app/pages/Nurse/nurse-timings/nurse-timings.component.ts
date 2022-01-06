import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurse-timings',
  templateUrl: './nurse-timings.component.html',
  styleUrls: ['./nurse-timings.component.css']
})
export class NurseTimingsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public nurseid: any;
  public workinglist: any;
  public nursehospitaldetilsid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public term: any;
  public dayslist: any;
  public id: any;


  public languageid: any;
  public labels: any;
  public hopitsllist: any
  public workingdetails: any
  ngOnInit() {
   
    this.nurseid = localStorage.getItem('nurseid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getnurselist();
    this.getdaysmaster();
    // this.GetTimings();
    this.getlanguage();
    this.docservice.GetNurseHospitalDetailsByHospitals(this.nurseid, this.languageid,).subscribe(
      data => {
       
        this.hopitsllist = data;
      }, error => {
      }
    );
    this.docservice.GetNurseHospitalDetailsWeb(this.nurseid, this.languageid).subscribe(
      data => {
       
        this.workingdetails = data;

      }, error => {
      }
    )
  }


  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
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
  public GetDayID(even) {
   
    this.dayid = even.target.value;
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

  public getnurselist() {
    this.docservice.GetNurseHospitalDetailsWeb(this.nurseid, this.languageid).subscribe(
      data => {
       
        this.workinglist = data;

      }, error => {
      }
    )
  }


  public GetDetsilsID(nurseHospitalDetailsID, dayID, startime, endtime, nsid) {
   
    this.nursehospitaldetilsid = nurseHospitalDetailsID;
    this.dayid = dayID,
      this.startdatetime = startime,
      this.enddatetime = endtime
    this.id = nsid;
    
  }

  public updatedetails() {
   
    var entity = {
      'ID': this.id,
      'NurseHospitalDetailsID': this.nursehospitaldetilsid,
      'DayID': this.dayid,
      'StartTimee': this.startdatetime,
      'EndTimee': this.enddatetime
    }
   
    this.docservice.UpdateNurseWorkingDetails(entity).subscribe(data => {
      if (data != undefined) {
        if(this.languageid==1)
        {
          Swal.fire("Updated Successfully");
          this.getnurselist();
        }
        else
        {
          Swal.fire("Supprimé avec succès");
          this.getnurselist();
        }
       
      }
    })

  }


  public DeleteNurseWorkingDetails(nsid, dayid) {
   
    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Day Slot!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteNurseWorkingDetails(nsid, dayid).subscribe(res => {
            let test = res;
            this.getnurselist();
          })
          Swal.fire(
            'Deleted!',
            'Day has been deleted.',
            'success'
          )
        }
        else {
          this.getnurselist();
        }
      })
    }
    else
    {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Day Slot!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
        
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteNurseWorkingDetails(nsid, dayid).subscribe(res => {
            let test = res;
            this.getnurselist();
          })
          Swal.fire(
            'Supprimé!',
            'Le jour a été supprimé.',
            'success'
          )
        }
        else {
          this.getnurselist();
        }
      })
    }
  }
  //01-06-2020 Prashant
  public addnew() {
    location.href = '#/NurseWorkingDetails/' + this.nurseid;
  }
  hopitslname
  public GetHospital(even) {
   
    this.hopitslname = even.target.value;
  }

  daysname
  public GetDaysName(even) {
    this.daysname = even.target.value;
  }

  // public DisableNurseWorking(docid) {
  //   this.docservice.DisableNurseWorking(docid).subscribe(
  //     data => {
       
  //       if(this.languageid==1)
  //       {
  //         Swal.fire('Disabled', 'Nurse Working Details has been Disabled');
  //         this.getnurselist();
  //       }
  //       else
  //       {
  //         Swal.fire('désactivé', 'Les détails de travail de l infirmière ont été désactivés');
  //         this.getnurselist();
  //       }
    
  //     }, error => {
  //     }
  //   )
  // }





  public EnableNurseWorking(id) {
   
    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to enable This Day!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, enable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableNurseWorking(id).subscribe(res => {
            let test = res;
            this.getnurselist();
          })
          Swal.fire(
            'Enabled!',
            'Nurse Working Details has  been Enabled',
            'success'
          )
        }
        else {
          this.getnurselist();
        }
      })
    }
    else
    {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to enable This Day!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableNurseWorking(id).subscribe(res => {
            let test = res;
            this.getnurselist();
          })
          Swal.fire(
            'Activée!',
            'Les détails de travail de l infirmière ont été activés',
            'success'
          )
        }
        else {
          this.getnurselist();
        }
      })
    }
  }








  public DisableNurseWorking(id) {
   
    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to disable This Day!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, disable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableNurseWorking(id).subscribe(res => {
            let test = res;
            this.getnurselist();
          })
          Swal.fire(
            'Enabled!',
            'Nurse Working Details has  been disabled',
            'success'
          )
        }
        else {
          this.getnurselist();
        }
      })
    }
    else
    {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to enable This Day!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableNurseWorking(id).subscribe(res => {
            let test = res;
            this.getnurselist();
          })
          Swal.fire(
            'Activée!',
            'Les détails de travail de l infirmière ont été désactivés',
            'success'
          )
        }
        else {
          this.getnurselist();
        }
      })
    }
  }

  // public EnableNurseWorking(id) {
  //   this.docservice.EnableNurseWorking(id).subscribe(
  //     data => {
  //      if(this.languageid==1)
  //      {
  //       Swal.fire('Enabled', 'Nurse Working Details has has been Enabled');
  //       this.getnurselist();
  //      }
  //      else
  //      {
  //       Swal.fire('Activée', 'Les détails de travail de l infirmière ont été activés');
  //       this.getnurselist();
  //      }
      

  //     }, error => {
  //     }
  //   )
  // }

}
