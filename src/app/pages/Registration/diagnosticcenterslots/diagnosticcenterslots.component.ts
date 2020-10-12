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
  public dayslist: any;
  public daysdd = {}
  public dayid = []
  public dummdiagnosticid: any;
  public diagnosticname: any;
  public search:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid')
    this.dummdiagnosticid = localStorage.getItem('diagnosticid')
    this.diagnosticname = localStorage.getItem('user')
    this.getlanguage()
    this.getdiagnosticCenterList();
    this.GetdicgnosticMasterSlotByID();
    this.GetdicgnosticAfternoonSlotsMaster();
    this.GetDiagnosticEveningSlotsMaster();
    this.GetDiagnosticNightSlotsMaster();
    this.tablecount = 0;
    this.GetDaysMaster()
  }


  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.dayslist = data;

        this.daysdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'dayOfTheWeek',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }

  public GetDaysID(item10: any) {
   
    // this.dayid = item10.id;
    this.dayid.push(item10)
   

  }


  public getdiagnosticCenterList() {
   
    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {
       
        this.diagnosticlist = data;
        this.diadnosticdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
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
  public getlanguage() {
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;
      }, error => {
      }
    )
  }
  SelectLabel
  public GetDiagnosticID(item7: any) {
   
    this.diagnosticid = item7.id;
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


  dis1
  dis2
  dis3
  dis4
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
    if (this.nightslots.length == 2) {
      this.dis4 = 1;
    }
  }
  // public AddDetails() {

  //  
  //   for (let i = 0; i < this.mrngslots.length; i++) {
  //     this.mrngslotarray.push(this.mrngslots[i].slotName)
  //    
  //     this.mrngslotarrayid.push(this.mrngslots[i].id)
  //   }
  //  
  //   this.slotname = this.mrngslotarray;
  //   this.mrng = this.slotname.join(' to ')
  //   this.slotnameid = this.mrngslotarrayid;
  //   this.mrngid = this.slotnameid.join(',')

  //  
  //   for (let i = 0; i < this.afternoonslots.length; i++) {
  //     this.afternoonslotarray.push(this.afternoonslots[i].slotName)
  //    
  //     this.afternoonslotarrayid.push(this.afternoonslots[i].id)
  //   }
  //  
  //   this.slotname1 = this.afternoonslotarray;
  //   this.afternoon = this.slotname1.join(' to ')
  //   this.slotnameid1 = this.afternoonslotarrayid;
  //   this.afternoonid = this.slotnameid1.join(',')


  //  
  //   for (let i = 0; i < this.evngslots.length; i++) {
  //     this.evngslotarray.push(this.evngslots[i].slotName)
  //    
  //     this.evngslotarrayid.push(this.evngslots[i].id)
  //   }
  //  
  //   this.slotname2 = this.evngslotarray;
  //   this.evng = this.slotname2.join(' to ')
  //   this.slotnameid12 = this.evngslotarrayid;
  //   this.evngid = this.slotnameid12.join(',')

  //  
  //   for (let i = 0; i < this.nightslots.length; i++) {
  //     this.nightslotarray.push(this.nightslots[i].slotName)
  //    
  //     this.nightslotarrayid.push(this.nightslots[i].id)
  //   }
  //  
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



      for (let i = 0; i < this.dayid.length; i++) {

       
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

        var entity1 = {
          'DiagnosticCenterID': this.diagnosticid,
          'MrngStartTime': mst,
          'MrngEndTime': met,
          'AfternoonStartTime': nst,
          'AfternoonEndTime': net,
          'EvngStartTime': est,
          'EvngEndTime': eet,
          'NightStartTime': nyst,
          'NightEndTime': nyet,
          'DayID': this.dayid[i].id
        }
        this.docservice.InsertDiagnosticRelatedSlotsStartTimeEndTime(entity1).subscribe(data => {

        })

        var entity = {
          'DiagnosticCenterID': this.diagnosticid,
          'DayID': this.dayid[i].id,
          'Morning': this.mrngid,
          'Noon': this.afternoonid,
          'Evening': this.evngid,
          'Night': this.nightid,
        }
        this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
         
          if(this.languageid==1)
          {
            Swal.fire('','Added Successfully');
            location.href="#/DiagnosticSlotsDash"
          }
          else 
          {
            Swal.fire('','Ajouté avec succès');
            location.href="#/DiagnosticSlotsDash"
          }
      
        })


        // if (this.mrngslots != undefined) {
        //  
        //   for (let i = 0; i < this.mrngslots.length; i++) {
        //     var entity = {
        //       'DiagnosticCenterID': this.diagnosticid,
        //       'DiagnosticSlotID': this.mrngslots[i].id,
        //       'DayID': this.dayid[i].id
        //     }
        //     this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
        //      
        //       if (data != 0) {
        //         Swal.fire('Completed', 'Slots saved successfully', 'success');
        //         this.dropdownclear2 = [];
        //         this.dropdownclear3 = [];
        //         this.dropdownclear4 = [];
        //         this.dropdownclear1 = [];
        //       }
        //     })
        //   }
        // }







        // if (this.mrngslots != undefined) {
        //  
        //   for (let i = 0; i < this.mrngslots.length; i++) {
        //     var entity = {
        //       'DiagnosticCenterID': this.diagnosticid,
        //       'DiagnosticSlotID': this.mrngslots[i].id,
        //       'DayID': this.dayid[i].id
        //     }
        //     this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
        //      
        //       if (data != 0) {
        //         Swal.fire('Completed', 'Slots saved successfully', 'success');
        //         this.dropdownclear2 = [];
        //         this.dropdownclear3 = [];
        //         this.dropdownclear4 = [];
        //         this.dropdownclear1 = [];
        //       }
        //     })
        //   }
        // }

        // if (this.afternoonslots != undefined) {
        //   for (let i = 0; i < this.afternoonslots.length; i++) {
        //    
        //     var entity = {
        //       'DiagnosticCenterID': this.diagnosticid,
        //       'DiagnosticSlotID': this.afternoonslots[i].id,
        //       'DayID': this.dayid[i].id
        //     }
        //     this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
        //      
        //       if (data != 0) {
        //         Swal.fire('Completed', 'Slots saved successfully', 'success');
        //         this.dropdownclear2 = [];
        //         this.dropdownclear3 = [];
        //         this.dropdownclear4 = [];
        //         this.dropdownclear1 = [];

        //       }
        //     })
        //   }
        // }
        // if (this.evngslots != undefined) {
        //  
        //   for (let i = 0; i < this.evngslots.length; i++) {
        //     var entity = {
        //       'DiagnosticCenterID': this.diagnosticid,
        //       'DiagnosticSlotID': this.evngslots[i].id,
        //       'DayID': this.dayid[i].id
        //     }
        //     this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
        //      
        //       if (data != 0) {
        //         Swal.fire('Completed', 'Slots saved successfully', 'success');
        //         this.dropdownclear2 = [];
        //         this.dropdownclear3 = [];
        //         this.dropdownclear4 = [];
        //         this.dropdownclear1 = [];
        //       }
        //     })
        //   }
        // }
        // if (this.nightslots != undefined) {
        //   for (let i = 0; i < this.nightslots.length; i++) {
        //    
        //     var entity = {
        //       'DiagnosticCenterID': this.diagnosticid,
        //       'DiagnosticSlotID': this.nightslots[i].id,
        //       'DayID': this.dayid[i].id
        //     }
        //     this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
        //      
        //       if (data != 0) {
        //         Swal.fire('Completed', 'Slots saved successfully', 'success');
        //         this.dropdownclear2 = [];
        //         this.dropdownclear3 = [];
        //         this.dropdownclear4 = [];
        //         this.dropdownclear1 = [];
        //         location.reload()
        //       }
        //     })
        //   }
        // }



      }
    }
  }




}
