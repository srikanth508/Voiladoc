import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-midwife-working-dash',
  templateUrl: './midwife-working-dash.component.html',
  styleUrls: ['./midwife-working-dash.component.css']
})
export class MidwifeWorkingDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public term: any;
  public dayslist: any;
  public daysname: any;
  public dummlist: any;
  public midwifelist: any;
  public count: any;
  public miwifename: any;
  public middd = {};
  public search: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.miwifename = ''
    this.daysname = ''
    // this.getmidwifelist();
    this.getlanguage();
    this.GetDaysMaster();


    if (this.hospitalclinicid == undefined) {
      this.GetMidWivesRegistration();
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifelist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;

          this.middd = {
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
    this.GetTimings()
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

  public GetMidWivesRegistration() {
    this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
      data => {

        this.midwifelist = data;
        this.dummlist = this.midwifelist
        this.count = this.midwifelist.length;

        this.middd = {
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
        this.search = this.labels[0].search
        this.select = this.labels[0].selectMidwife
      }, error => {
      }
    )
  }
  public getmidwifelist() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
        data => {
          this.dummworkinglist = data;
          this.workinglist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
        data => {


          this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }
  }


  midwifeid: any;

  public GetmidwifeID(item:any) {

    this.midwifeid = item.id;
    this.getMidwifeworkingdetails()

  }

  public getMidwifeworkingdetails() {
    this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
      data => {

        this.dummworkinglist = data;
        this.workinglist = this.dummworkinglist.filter(x => x.midWifeID == this.midwifeid)
      }, error => {
      }
    )
  }





  public midwifehospitalid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public midid: any;




  public GetDetsilsID(nurseHospitalDetailsID, dayID, startime, endtime, id) {

    this.midwifehospitalid = nurseHospitalDetailsID;
    this.dayid = dayID,
      this.startdatetime = startime,
      this.enddatetime = endtime,
      this.midid = id;
    // this.startdatetime = 0;
    // this.enddatetime = 0;

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
        if (this.languageid == 1) {
          Swal.fire("Updated Successfully");
          this.getMidwifeworkingdetails();
        }
        else {
          Swal.fire("Mis à jour avec succés");
          this.getMidwifeworkingdetails();
        }


      }
    })

  }

  public DeleteMidWifeWorkingDetails(mid, dayid) {

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
        this.docservice.DeleteMidWifeWorkingDetails(mid, dayid).subscribe(res => {
          let test = res;
          this.getMidwifeworkingdetails();
        })
        Swal.fire(
          'Deleted!',
          'Day has been deleted.',
          'success'
        )
      }
      else {
        this.getMidwifeworkingdetails();
      }
    })
  }
}
