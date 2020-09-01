import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnosticcenterslots',
  templateUrl: './diagnosticcenterslots.component.html',
  styleUrls: ['./diagnosticcenterslots.component.css']
})
export class DiagnosticcenterslotsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnosticlist: any;
  public diagnosticid: any;
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
  public labels: any;
  public languageid: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.getdiagnosticCenterList();
    this.GetdicgnosticMasterSlotByID();
    this.GetdicgnosticAfternoonSlotsMaster();
    this.GetDiagnosticEveningSlotsMaster();
    this.GetDiagnosticNightSlotsMaster();
    this.tablecount = 0;

  }

  public getdiagnosticCenterList() {
    debugger
    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.diagnosticlist = data;
        this.diadnosticdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }
  SelectLabel
  public GetDiagnosticID(item7: any) {
    debugger
    this.diagnosticid = item7.id;
  }
  public GetdicgnosticMasterSlotByID() {
    debugger
    this.docservice.GetDiagnosticSlotMasterByTimeID(1).subscribe(
      data => {
        debugger
        this.slotslist = data;
        this.slotsdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetdicgnosticAfternoonSlotsMaster() {
    debugger
    this.docservice.GetDiagnosticSlotMasterByTimeID(2).subscribe(
      data => {
        debugger
        this.slotslist1 = data;
        this.slotsdd1 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetDiagnosticEveningSlotsMaster() {
    debugger
    this.docservice.GetDiagnosticSlotMasterByTimeID(3).subscribe(
      data => {
        debugger
        this.slotslist2 = data;
        this.slotsdd2 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetDiagnosticNightSlotsMaster() {
    this.docservice.GetDiagnosticSlotMasterByTimeID(4).subscribe(
      data => {
        debugger
        this.slotslist3 = data;
        this.slotsdd3 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetMrngSlotsID(item: any) {
    debugger
    this.mrngslots.push(item);
  }
  public GetAfternoonSlotsID(item1: any) {
    debugger
    this.afternoonslots.push(item1);
  }
  public GetEvngSlotsID(item2) {
    debugger
    this.evngslots.push(item2);

  }
  public GetNightSlotsID(item3: any) {
    debugger
    this.nightslots.push(item3);
  }
  // public AddDetails() {

  //   debugger
  //   for (let i = 0; i < this.mrngslots.length; i++) {
  //     this.mrngslotarray.push(this.mrngslots[i].slotName)
  //     debugger
  //     this.mrngslotarrayid.push(this.mrngslots[i].id)
  //   }
  //   debugger
  //   this.slotname = this.mrngslotarray;
  //   this.mrng = this.slotname.join(' to ')
  //   this.slotnameid = this.mrngslotarrayid;
  //   this.mrngid = this.slotnameid.join(',')

  //   debugger
  //   for (let i = 0; i < this.afternoonslots.length; i++) {
  //     this.afternoonslotarray.push(this.afternoonslots[i].slotName)
  //     debugger
  //     this.afternoonslotarrayid.push(this.afternoonslots[i].id)
  //   }
  //   debugger
  //   this.slotname1 = this.afternoonslotarray;
  //   this.afternoon = this.slotname1.join(' to ')
  //   this.slotnameid1 = this.afternoonslotarrayid;
  //   this.afternoonid = this.slotnameid1.join(',')


  //   debugger
  //   for (let i = 0; i < this.evngslots.length; i++) {
  //     this.evngslotarray.push(this.evngslots[i].slotName)
  //     debugger
  //     this.evngslotarrayid.push(this.evngslots[i].id)
  //   }
  //   debugger
  //   this.slotname2 = this.evngslotarray;
  //   this.evng = this.slotname2.join(' to ')
  //   this.slotnameid12 = this.evngslotarrayid;
  //   this.evngid = this.slotnameid12.join(',')

  //   debugger
  //   for (let i = 0; i < this.nightslots.length; i++) {
  //     this.nightslotarray.push(this.nightslots[i].slotName)
  //     debugger
  //     this.nightslotarrayid.push(this.nightslots[i].id)
  //   }
  //   debugger
  //   this.slotname3 = this.nightslotarray;
  //   this.night = this.slotname3.join(' to ')
  //   this.slotnameid13 = this.nightslotarrayid;
  //   this.nightid = this.slotnameid13.join(',')
  // }
  public insertdetails() {

    if (this.diagnosticid == undefined || this.diagnosticid == null) {
      Swal.fire("Please Select Diagnostic Center")
    }
    else {
      if (this.mrngslots != undefined) {
        debugger
        for (let i = 0; i < this.mrngslots.length; i++) {
          var entity = {
            'DiagnosticCenterID': this.diagnosticid,
            'DiagnosticSlotID': this.mrngslots[i].id
          }
          this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
            debugger
            if (data != 0) {
              Swal.fire('Completed', 'Slots saved successfully', 'success');
              this.dropdownclear2 = [];
              this.dropdownclear3 = [];
              this.dropdownclear4 = [];
              this.dropdownclear1 = [];

            }
          })
        }
      }

      if (this.afternoonslots != undefined) {
        for (let i = 0; i < this.afternoonslots.length; i++) {
          debugger
          var entity = {
            'DiagnosticCenterID': this.diagnosticid,
            'DiagnosticSlotID': this.afternoonslots[i].id
          }
          this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
            debugger
            if (data != 0) {
              Swal.fire('Completed', 'Slots saved successfully', 'success');
              this.dropdownclear2 = [];
              this.dropdownclear3 = [];
              this.dropdownclear4 = [];
              this.dropdownclear1 = [];

            }
          })
        }
      }
      if (this.evngslots != undefined) {
        debugger
        for (let i = 0; i < this.evngslots.length; i++) {
          var entity = {
            'DiagnosticCenterID': this.diagnosticid,
            'DiagnosticSlotID': this.evngslots[i].id
          }
          this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
            debugger
            if (data != 0) {
              Swal.fire('Completed', 'Slots saved successfully', 'success');
              this.dropdownclear2 = [];
              this.dropdownclear3 = [];
              this.dropdownclear4 = [];
              this.dropdownclear1 = [];

            }
          })
        }
      }
      if (this.nightslots != undefined) {
        for (let i = 0; i < this.nightslots.length; i++) {
          debugger
          var entity = {
            'DiagnosticCenterID': this.diagnosticid,
            'DiagnosticSlotID': this.nightslots[i].id
          }
          this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
            debugger
            if (data != 0) {
              Swal.fire('Completed', 'Slots saved successfully', 'success');
              this.dropdownclear2 = [];
              this.dropdownclear3 = [];
              this.dropdownclear4 = [];
              this.dropdownclear1 = [];
              location.reload()
            }
          })
        }
      }
    }
  }

}
