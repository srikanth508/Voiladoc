import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurseworkingdash',
  templateUrl: './nurseworkingdash.component.html',
  styleUrls: ['./nurseworkingdash.component.css']
})
export class NurseworkingdashComponent implements OnInit {

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
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlist: any;
  public nurselist: any;
  public count: any;
  public daysname: any;
  public nursename: any;
  public nursedd = {};
  public search: any;
  ngOnInit() {
    this.daysname = ''
    this.nursename = ''
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');

    this.getlanguage()
    this.getnurseworkingdetails();
    this.GetDaysMaster()

    if (this.hospitalclinicid == undefined) {
      // this.getnurselist();
      this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.nurselist = data;
          this.count = this.nurselist.length;

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };


        }, error => {
        }
      )
    }

    if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.nurselist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.nurselist.length


          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };

        }, error => {
        }
      )
    }
    this.GetTimings()
  }


  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.dayslist = data;
      }, error => {
      }
    )
  }

  public SelectLabel: any;

  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search,
          this.SelectLabel = this.labels[0].selectNurse
      }, error => {
      }
    )
  }
  public getnurseworkingdetails() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
        data => {
          this.dummworkinglist = data;
          // this.workinglist = data;

        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
        data => {

          this.dummworkinglist = data;
          // this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

        }, error => {
        }
      )
    }
  }



  public GetNurseID(item:any) {
    debugger
    this.nurseid = item.id;
    this.getnurseesworkingdetails()
  }

  public getnurseesworkingdetails() {
    this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
      data => {
        debugger
        this.dummworkinglist = data;
        this.workinglist = this.dummworkinglist.filter(x => x.nurseID == this.nurseid)

      }, error => {
      }
    )
  }

  Timeings: any
  public GetTimings() {
    this.docservice.GetSlotMasterTimings().subscribe(
      data => {

        this.Timeings = data;
      }, error => {
      }
    )
  }



  public GetDetsilsID(nurseHospitalDetailsID, dayID, startime, endtime, nsid) {
    debugger
    this.nursehospitaldetilsid = nurseHospitalDetailsID;
    this.dayid = dayID,
      this.startdatetime = startime,
      this.enddatetime = endtime
    this.id = nsid;
    debugger
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
        Swal.fire("Updated Successfully");
        this.getnurseesworkingdetails();
      }
    })

  }


  public DeleteNurseWorkingDetails(nsid, dayid) {

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
          this.getnurseesworkingdetails();
        })
        Swal.fire(
          'Deleted!',
          'Day has been deleted.',
          'success'
        )
      }
      else {
        this.getnurseesworkingdetails();
      }
    })
  }
}
