import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-physioworking-dash',
  templateUrl: './physioworking-dash.component.html',
  styleUrls: ['./physioworking-dash.component.css']
})
export class PhysioworkingDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlistphysiolist: any;
  public physioist: any;
  public term: any;
  public count: any;
  public dummlist: any;
  public dayslist: any;
  public daysname: any;
  public physioname: any;
  public phsyodd = {};
  public search: any;
  ngOnInit() {
    this.daysname = ''
    this.physioname = ''
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');

    this.getlanguage();
    // this.getphysiolist();

    if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlistphysiolist = data;
          this.physioist = this.dummlistphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.physioist.length

          this.phsyodd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
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
    else if (this.hospitalclinicid == undefined) {

      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.physioist = data;
          this.dummlist = this.physioist
          this.count = this.physioist.length

          this.phsyodd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
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
    this.GetDaysMaster()
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

  public select: any;


  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search,
          this.select = this.labels[0].selectPhysiotherapist
      }, error => {
      }
    )
  }
  public getphysiolist() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
        data => {

          this.workinglist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
        data => {

          this.dummworkinglist = data;
          this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }
  }

  physioid: any;

  public GetPhysioID(item: any) {
    debugger
    this.physioid = item.id
    this.GetPhysioWorkingDetails()
  }


  public GetPhysioWorkingDetails() {
    this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
      data => {

        this.dummworkinglist = data;
        this.workinglist = this.dummworkinglist.filter(x => x.physiotherapistID == this.physioid)
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

  phsyhospitadetailsid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public id: any;


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
        if (this.languageid == 1) {
          Swal.fire("Updated Successfully");
          this.GetPhysioWorkingDetails();
        }
        else {
          Swal.fire("Mis à jour avec succés");
          this.GetPhysioWorkingDetails();
        }


      }
    })

  }



  public DeletePhysiotherapistWorkingDetails(nsid, dayid) {

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
        this.docservice.DeletePhysiotherapistWorkingDetails(nsid, dayid).subscribe(res => {
          let test = res;
          this.GetPhysioWorkingDetails();
        })
        Swal.fire(
          'Deleted!',
          'Day has been deleted.',
          'success'
        )
      }
      else {
        this.GetPhysioWorkingDetails();
      }
    })
  }
}
