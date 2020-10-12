import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-diagnostic-slots-dash',
  templateUrl: './diagnostic-slots-dash.component.html',
  styleUrls: ['./diagnostic-slots-dash.component.css']
})
export class DiagnosticSlotsDashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

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
  SelectLabel:any;
  // public dayid = []
  search:any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid')

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
     

      }, error => {
      }
    )
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
        this.SelectLabel= this.labels1[0].select;
        this.search = this.labels[0].search;
      },
      error => { }
    );
    this.getWorkingdetils()

    this.GetdicgnosticMasterSlotByID()
    this.GetdicgnosticAfternoonSlotsMaster()
    this.GetDiagnosticEveningSlotsMaster()
    this.GetDiagnosticNightSlotsMaster()
  }


  public getWorkingdetils() {
    if (this.diagnosticid != undefined) {
      this.docservice.GetDiagnosticRelatedSlotsStartTimeEndTime(this.languageid).subscribe(
        data => {
         
          this.dummworkingdetails = data;
          this.Workingdetails = this.dummworkingdetails.filter(x => x.diagnosticCenterID == this.diagnosticid)
        },
        error => { }
      );
    }
    else {
      this.docservice.GetDiagnosticRelatedSlotsStartTimeEndTime(this.languageid).subscribe(
        data => {
         
          this.Workingdetails = data;
        },
        error => { }
      );
    }


  }

  timeid: any;


  public GetDiagnosticID(diagnosticCenterID, dayID, timeid) {
    this.diagnosticid = diagnosticCenterID,
      this.dayid = dayID,
      this.timeid = timeid
  }



  public GetdicgnosticMasterSlotByID() {
   
    this.docservice.GetDiagnosticSlotMasterByTimeID(1).subscribe(
      data => {
       
        this.slotslist = data;
        this.slotsdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }
  public GetdicgnosticAfternoonSlotsMaster() {
   
    this.docservice.GetDiagnosticSlotMasterByTimeID(2).subscribe(
      data => {
       
        this.slotslist1 = data;
        this.slotsdd1 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }
  public GetDiagnosticEveningSlotsMaster() {
   
    this.docservice.GetDiagnosticSlotMasterByTimeID(3).subscribe(
      data => {
       
        this.slotslist2 = data;
        this.slotsdd2 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }
  public GetDiagnosticNightSlotsMaster() {
    this.docservice.GetDiagnosticSlotMasterByTimeID(4).subscribe(
      data => {
       
        this.slotslist3 = data;
        this.slotsdd3 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }

  dis3
  dis4
  dis1
  dis2

  public GetMrngSlotsID(item: any) {
   
    this.mrngslots.push(item);

    if (this.mrngslots.length == 2) {
      this.dis1 = 1;
    }

  }
  public GetAfternoonSlotsID(item1: any) {
   
    this.afternoonslots.push(item1);
    if (this.afternoonslots.length == 2) {
      this.dis2 = 1;
    }
  }
  public GetEvngSlotsID(item2) {
   
    this.evngslots.push(item2);
    if (this.evngslots.length == 2) {
      this.dis3 = 1;
    }
  }
  public GetNightSlotsID(item3: any) {
   
    this.nightslots.push(item3);
    if (this.evngslots.length == 2) {
      this.dis4 = 1;
    }
  }







  public insertdetails() {
   
    for (let i = 0; i < this.mrngslots.length; i++) {
      this.mrngslotarray.push(this.mrngslots[i].slotName)
     
      this.mrngslotarrayid.push(this.mrngslots[i].id)
    }
   
    this.slotname = this.mrngslotarray;
    this.mrng = this.slotname.join(' to ')
    this.slotnameid = this.mrngslotarrayid;
    this.mrngid = this.slotnameid.join(',')

   
    for (let i = 0; i < this.afternoonslots.length; i++) {
      this.afternoonslotarray.push(this.afternoonslots[i].slotName)
     
      this.afternoonslotarrayid.push(this.afternoonslots[i].id)
    }
   
    this.slotname1 = this.afternoonslotarray;
    this.afternoon = this.slotname1.join(' to ')
    this.slotnameid1 = this.afternoonslotarrayid;
    this.afternoonid = this.slotnameid1.join(',')

   
    for (let i = 0; i < this.evngslots.length; i++) {
      this.evngslotarray.push(this.evngslots[i].slotName)
     
      this.evngslotarrayid.push(this.evngslots[i].id)
    }
   
    this.slotname2 = this.evngslotarray;
    this.evng = this.slotname2.join(' to ')
    this.slotnameid12 = this.evngslotarrayid;
    this.evngid = this.slotnameid12.join(',')

   
    for (let i = 0; i < this.nightslots.length; i++) {
      this.nightslotarray.push(this.nightslots[i].slotName)
     
      this.nightslotarrayid.push(this.nightslots[i].id)
    }
   
    this.slotname3 = this.nightslotarray;
    this.night = this.slotname3.join(' to ')
    this.slotnameid13 = this.nightslotarrayid;
    this.nightid = this.slotnameid13.join(',')


    this.docservice.DeleteDiagnosticRelatedSlotsStartTimeEndTime(this.diagnosticid, this.dayid, this.timeid).subscribe(res => {

     
      let mrng = this.mrng;
      let ms = mrng.split(" to ", 3);
      let mst = ms[0];
      let met = ms[1];

      let noon = this.afternoon;
      let ns = noon.split(" to ", 3);
      let nst = ns[0];
      let net = ns[1];

      let evng = this.evng;
      let es = evng.split(" to ", 3);
      let est = es[0];
      let eet = es[1];

      let nyt = this.night;
      let nys = nyt.split(" to ", 3);
      let nyst = nys[0];
      let nyet = nys[1];

      if (this.timeid == 1) {
        var entitys = {
          'DiagnosticCenterID': this.diagnosticid,
          'DayID': this.dayid,
          'TimeID': this.timeid,
          'StartTime': mst,
          'EndTime': met
        }
        this.docservice.UpdateDiagnosticRelatedSlotsStartTimeEndTime(entitys).subscribe(data => {

        })
      }
      if (this.timeid == 2) {
        var entitys = {
          'DiagnosticCenterID': this.diagnosticid,
          'DayID': this.dayid,
          'TimeID': this.timeid,
          'StartTime': nst,
          'EndTime': net
        }
        this.docservice.UpdateDiagnosticRelatedSlotsStartTimeEndTime(entitys).subscribe(data => {

        })
      }
      if (this.timeid == 3) {
        var entitys = {
          'DiagnosticCenterID': this.diagnosticid,
          'DayID': this.dayid,
          'TimeID': this.timeid,
          'StartTime': est,
          'EndTime': eet
        }
        this.docservice.UpdateDiagnosticRelatedSlotsStartTimeEndTime(entitys).subscribe(data => {

        })
      }
      if (this.timeid == 4) {
        var entitys = {
          'DiagnosticCenterID': this.diagnosticid,
          'DayID': this.dayid,
          'TimeID': this.timeid,
          'StartTime': nyst,
          'EndTime': nyet
        }
        this.docservice.UpdateDiagnosticRelatedSlotsStartTimeEndTime(entitys).subscribe(data => {

        })
      }
    })

    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'DayID': this.dayid,
      'Morning': this.mrngid,
      'Noon': this.afternoonid,
      'Evening': this.evngid,
      'Night': this.nightid,
    }
    this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
     
      if (this.languageid == 1) {
        Swal.fire('', 'Added Successfully')
      }
      else {
        Swal.fire('', 'Ajouté avec succès')

      }
      this.getWorkingdetils()
      this.dropdownclear1 = []
      this.dropdownclear2 = []
      this.dropdownclear3 = []
      this.dropdownclear4 = []
      this.mrngslotarray = []
      this.evngslotarray = []
      this.afternoonslotarray = []
      this.nightslotarray = []

      this.dis1 =
        this.dis2 = ""
      this.dis3 = ""
      this.dis4 = ""
      this.mrngslotarrayid.length = 0
      this.evngslotarrayid.length = 0
      this.afternoonslotarrayid.length = 0
      this.nightslotarrayid.length = 0
      //   this.mrngid=[]
      //   this.evngid=[]
      //   this.afternoonid=[]
      //   this.nightid=[]
      //  this.mrng=[]
      //  this.evng=[]
      //  this.afternoon=[]
      //  this.night=[]
    })

  }





  public deleteTimeWise(diagnosticCenterID, dayID, timeid) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete  Slot!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDiagnosticRelatedSlotsStartTimeEndTime(diagnosticCenterID, dayID, timeid).subscribe(res => {
          let test = res;
          this.getWorkingdetils()
        })
        Swal.fire(
          'Deleted!',
          'Slot has been deleted.',
          'success'
        )
      }
      else {
        this.getWorkingdetils()
      }
    })
  }


  public DeleteDaySlots(diagnosticCenterID, dayID) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete this Day!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteADiagnosticRelatedSlotsStartTimeEndTimeDay(diagnosticCenterID, dayID).subscribe(res => {
          let test = res;
          this.getWorkingdetils()
        })
        Swal.fire(
          'Deleted!',
          'Day slots has been deleted.',
          'success'
        )
      }
      else {
        this.getWorkingdetils()
      }
    })
  }

}
