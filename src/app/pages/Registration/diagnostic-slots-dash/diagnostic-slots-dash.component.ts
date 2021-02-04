import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-diagnostic-slots-dash',
  templateUrl: './diagnostic-slots-dash.component.html',
  styleUrls: ['./diagnostic-slots-dash.component.css']
})
export class DiagnosticSlotsDashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public languageid: any;
  public labels: any;
  public labels1: any;
  public Workingdetails: any;
  public diagnosticid: any;
  public dummworkingdetails: any;
  public diagnosticlist: any;

  public slotslist: any;
  public slotsdd: any;
  public slotslist1: any;
  public slotsdd1: any;
  public slotslist2: any;
  public slotsdd2: any;
  public slotslist3: any;
  public slotsdd3: any;
  public mrngslots = [];
  public afternoonslots = [];
  public evngslots = [];
  public nightslots = [];
  public tablecount: any;
  public mrngslotarray = [];
  public mrngslotarrayid = [];
  public slotname: any;
  public mrng: any;
  public slotnameid: any;
  public mrngid: any;
  public evngslotarray = [];
  public evngslotarrayid = [];
  public afternoonslotarray = [];
  public afternoonslotarrayid = [];
  public slotname1: any;
  public afternoon: any;
  public slotnameid1: any;
  public afternoonid: any;
  public slotname2: any;
  public evng: any;
  public slotnameid12: any;
  public evngid: any;
  public nightslotarray = [];
  public nightslotarrayid = [];

  public slotname3: any;
  public night: any;
  public slotnameid13: any;
  public nightid: any;
  public dropdownclear1 = [];
  public dropdownclear2 = [];
  public dropdownclear3 = [];
  public dropdownclear4 = [];
  public diadnosticdd = {};

  public dayslist: any;
  public daysdd = {}
  public dayid: any;
  public term: any;
  SelectLabel: any;
  // public dayid = []
  search: any;
  labels3: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.typeidss = 2;

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        this.labels = data;
        this.search = this.labels[0].search;

      }, error => {
      }
    )

    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels3 = data;
      }, error => {
      }
    )

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        
        this.labels1 = data;
        this.SelectLabel = this.labels1[0].select;
      },
      error => { }
    );

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        this.labels = data;
        this.search = this.labels[0].search;

      }, error => {
      }
    )

    this.getdiagnosticforadmin();
    document.getElementById("defaultOpen").click();
    // this.getWorkingdetils()
  }



  public getdiagnosticforadmin() {

    this.docservice.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;

      }, error => {
      }
    )
  }



  public GetDiagnosticcenterID(even) {
    
    this.diagnosticid = even.target.value;
    this.spinner.show();
    this.getWorkingdetils();
  }




  public getWorkingdetils() {
    // this.Workingdetails.length = 0;
    this.docservice.GetDiagnosticSlots(this.diagnosticid, this.languageid, this.typeidss).subscribe(
      data => {

        this.Workingdetails = data;
        this.spinner.hide();
      },
      error => { }
    );


    // if (this.diagnosticid != undefined) {
    //   this.docservice.GetDiagnosticRelatedSlotsStartTimeEndTime(this.languageid).subscribe(
    //     data => {

    //       this.dummworkingdetails = data;
    //       this.Workingdetails = this.dummworkingdetails.filter(x => x.diagnosticCenterID == this.diagnosticid)
    //     },
    //     error => { }
    //   );
    // }
    // else {
    //   this.docservice.GetDiagnosticRelatedSlotsStartTimeEndTime(this.languageid).subscribe(
    //     data => {

    //       this.Workingdetails = data;
    //     },
    //     error => { }
    //   );
    // }


  }

  timeid: any;


  public GetDiagnosticID(diagnosticCenterID, dayID, timeid) {

    this.diagnosticid = diagnosticCenterID,
      this.dayid = dayID,
      this.timeid = timeid
  }


  public id: any;
  public typeid: any;
  public slotid: any;
  public alltypeid: any;

  public GetMondayID(details) {
    
    this.id = details.mondayID;
    this.dayid = details.mondayDayID;
    this.typeid = details.monDayTypeID;
    this.slotid = details.mondaySlotID;
    this.alltypeid = details.monDayTypeID;
    this.totalappoiments = details.mondayTotalappointments;
  }


  public GetTuesDayID(details) {
    
    this.id = details.tuesdayID;
    this.dayid = details.tuesDayDayID;
    this.typeid = details.tueasDayTypeID;
    this.slotid = details.tuesadayslotID;
    this.alltypeid = details.tueasDayTypeID;
    this.totalappoiments = details.tuesdayTotalappointments;
  }


  public GetWednessDayID(details) {
    
    this.id = details.wednessdayID;
    this.dayid = details.wednessDayDayID;
    this.typeid = details.wednessDayTypeID;
    this.slotid = details.wedessdaySlotID;
    this.alltypeid = details.wednessDayTypeID;
    this.totalappoiments = details.wednessdayTotalappointments;
  }


  public GetThursadyID(details) {
    
    this.id = details.thursdayID;
    this.dayid = details.thursDayDayID;
    this.typeid = details.thurDayTypeID;
    this.slotid = details.thursdaySlotID;
    this.alltypeid = details.thurDayTypeID;
    this.totalappoiments = details.thusdayTotalappointments;
  }

  public GetFridayID(details) {
    
    this.id = details.fridayID;
    this.dayid = details.fridayDayDayID;
    this.typeid = details.friDayTypeID;
    this.slotid = details.fridaySlotID;
    this.alltypeid = details.friDayTypeID;
    this.totalappoiments = details.fridayTotalappointments;
  }

  public GetSaturdatID(details) {
    
    this.id = details.saturdayID;
    this.dayid = details.satDayDayID;
    this.typeid = details.satDayTypeID;
    this.slotid = details.saturdaySlotID;
    this.alltypeid = details.satDayTypeID;
    this.totalappoiments = details.satdayTotalappointments;
  }

  public GetSundayID(details) {
    
    this.id = details.sundayID;
    this.dayid = details.sunDayDayID;
    this.typeid = details.sunDayTypeID;
    this.slotid = details.sundaySlotID;
    this.alltypeid = details.sunDayTypeID;
    this.totalappoiments = details.sundayTotalappointments;

  }
  public totalappoiments: any;

  public updatedetails() {
    
    if (this.alltypeid == 4 && this.typeid == 1) {
      this.spinner.show();
      this.getWorkingdetils()
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'DiagnosticSlotID': this.slotid,
        'DayID': this.dayid,
        'TypeID': this.typeid,
        'TotalAppointments': this.totalappoiments
      }
      this.docservice.InsertDiagnosticRelatedSlotsWeb(entity).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');
          this.getWorkingdetils()
        }
        else {
          Swal.fire('Mis à jour avec succés');
          this.getWorkingdetils()
        }
      })
    }
    else if (this.alltypeid == 4 && this.typeid == 2) {
      
      this.spinner.show();
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'DiagnosticSlotID': this.slotid,
        'DayID': this.dayid,
        'TypeID': this.typeid,
        'TotalAppointments': this.totalappoiments
      }
      this.docservice.InsertDiagnosticRelatedSlotsWeb(entity).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');
          this.getWorkingdetils()
        }
        else {
          Swal.fire('Mis à jour avec succés');
          this.getWorkingdetils()
        }
      })

    }
    else if (this.alltypeid == 1 && this.typeid == 4) {
      this.spinner.show();
      this.docservice.DeleteDiagnosticRelatedSlots(this.id).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');
          this.getWorkingdetils()
        }
        else {
          Swal.fire('Mis à jour avec succés');
          this.getWorkingdetils()
        }
      })

    }
    else if (this.alltypeid == 2 && this.typeid == 4) {
      this.spinner.show();
      this.docservice.DeleteDiagnosticRelatedSlots(this.id).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');
          this.getWorkingdetils()
        }
        else {
          Swal.fire('Mis à jour avec succés');
          this.getWorkingdetils()
        }
      })
    }
    else if (this.typeid == 1 || this.typeid == 2 && this.alltypeid == 1 || this.alltypeid == 2) {
      this.spinner.show();
      var entity1 = {
        'ID': this.id,
        'TypeID': this.typeid,
        'TotalAppointments': this.totalappoiments
      }
      this.docservice.UpdateDiagnosticRelatedSlotsWeb(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');
          this.getWorkingdetils()
        }
        else {
          Swal.fire('Mis à jour avec succés');
          this.getWorkingdetils()
        }
      })
    }
  }



  public typeidss: any;


  public openCity(evt, cityName) {
    
    var i, tabcontent, tablinks;

    if (cityName == "Diagnosticcenter") {
      this.typeidss = 2;
      this.spinner.show();
      this.getWorkingdetils();
    }
    else {
      this.typeidss = 1;
      this.spinner.show();
      this.getWorkingdetils();
    }

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
}
