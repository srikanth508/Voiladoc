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
  public search: any;

  public dianoofappointments: any;
  public homenoofappointments: any;
  public shodrop: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid')
    this.dummdiagnosticid = localStorage.getItem('diagnosticid')
    this.diagnosticname = localStorage.getItem('user')

    if (this.diagnosticid == undefined) {
      this.shodrop = 1;
    }
    else {
      this.shodrop = 0;
    }
    this.getlanguage()
    this.getdiagnosticCenterList();
    this.GetdicgnosticMasterSlotByID();
    this.GetdicgnosticAfternoonSlotsMaster();
    this.GetDiagnosticEveningSlotsMaster();
    this.GetDiagnosticNightSlotsMaster();
    this.tablecount = 0;
    this.GetDaysMaster()
    this.mrngfromid = "";
    this.mrngtoid = "";
    this.idcount = 1;
    this.diafromid = "";
    this.diatoid = "";

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

  public mrngfromlist: any;
  public diagnsticfromlist: any;

  public GetdicgnosticMasterSlotByID() {

    this.docservice.GetDiagnosticSlotMasterByTimeID(1).subscribe(
      data => {

        this.slotslist = data;
        this.mrngfromlist = this.slotslist;

        this.diagnsticfromlist = this.slotslist;
        // this.slotsdd = {
        //   singleSelection: false,
        //   idField: 'id',
        //   textField: 'slotName',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 3,
        //   allowSearchFilter: true,
        //   enableCheckAll: false,
        //   searchPlaceholderText: this.search,
        // };
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
  // public GetMrngSlotsID(item: any) {

  //   this.mrngslots.push(item);

  //   if (this.mrngslots.length == 2) {
  //     this.dis1 = 1;
  //   }
  // }
  // public GetAfternoonSlotsID(item1: any) {

  //   this.afternoonslots.push(item1);

  //   if (this.afternoonslots.length == 2) {
  //     this.dis2 = 1;
  //   }
  // }
  // public GetEvngSlotsID(item2) {

  //   this.evngslots.push(item2);
  //   if (this.evngslots.length == 2) {
  //     this.dis3 = 1;
  //   }
  // }
  // public GetNightSlotsID(item3: any) {

  //   this.nightslots.push(item3);
  //   if (this.nightslots.length == 2) {
  //     this.dis4 = 1;
  //   }
  // }
  public morningslots = [];
  public qwerty = [];


  public appointmenttype: any;
  public idcount: any;
  public colorcode: any;
  public cleardropwn = [];

  public AppointmentName: any;

  public adddetails() {
    
    if (this.diagnosticid == undefined || this.diagnosticid == null) {
      Swal.fire("Please Select Diagnostic Center");
    }
    else if (this.appointmenttype == undefined || this.appointmenttype == "" ) {
      Swal.fire("Please Select Mandatory Fields");
    }
    // else if(this.appointmenttype==1)
    // {
    //   
    //   if(this.mrngfromid == undefined ||this.mrngfromid == "" || this.mrngtoid == undefined||this.mrngtoid == "")
    //   {
    //     Swal.fire("Please Select Mandatory Fields");
    //   }
    // }
    // else if(this.appointmenttype==2)
    // {
    //   
    //   if(this.diafromid == undefined || this.diatoid == undefined)
    //   {
    //     
    //     Swal.fire("Please Select Mandatory Fields");
    //   }
    // }
    else {
      
      this.tablecount = 1

      if (this.appointmenttype == 1) {
        var mrgfrm = {
          slotName: this.mrngfromslot,
          id: this.mrngfromid
        };
        this.mrngslots.push(mrgfrm);
        
        var mrgto = {
          slotName: this.mrngtoslot,
          id: this.mrngtoid
        };
        this.mrngslots.push(mrgto);
        
        for (let i = 0; i < this.mrngslots.length; i++) {
          this.mrngslotarray.push(this.mrngslots[i].slotName)
          this.mrngslotarrayid.push(this.mrngslots[i].id)
        }
        this.slotname = this.mrngslotarray;
        this.mrng = this.slotname.join(' to ')
        this.slotnameid = this.mrngslotarrayid;
        this.mrngid = this.slotnameid.join(',')

        if (this.appointmenttype == '1') {
          this.colorcode = '#ADD8E6'
          this.AppointmentName = 'Home Sample'
        }
        else if (this.appointmenttype == '2') {
          this.colorcode = '#5F9EA0'
          this.AppointmentName = 'Diagnostic Center'
        }
        var entity = {
          'Sno': this.idcount,
          'DiagnosticName': this.diagnosticname,
          'Morning': this.mrng,
          'Nightid': this.nightid,
          'mrngAppointmenttype': this.appointmenttype,
          'StartTime': this.mrngfromslot,
          'EndTime': this.mrngtoslot,
          'Color': this.colorcode,
          'AppointmentTypeID': this.appointmenttype,
          'Morningid': this.mrngid,
          'DiagnosticCenterID': this.diagnosticid,
          'NoOfAppointments': this.homenoofappointments,
          'AppointmentName': this.AppointmentName,
          'MrngfromID': this.mrngfromid
        }
      }

      if (this.appointmenttype == 2) {
        var mrgfrm = {
          slotName: this.diagnosticfromslot,
          id: this.diafromid
        };
        this.mrngslots.push(mrgfrm);
        
        var mrgto = {
          slotName: this.diagnostictoslot,
          id: this.diatoid
        };
        this.mrngslots.push(mrgto);
        
        for (let i = 0; i < this.mrngslots.length; i++) {
          this.mrngslotarray.push(this.mrngslots[i].slotName)

          this.mrngslotarrayid.push(this.mrngslots[i].id)
        }
        this.slotname = this.mrngslotarray;
        this.mrng = this.slotname.join(' to ')
        this.slotnameid = this.mrngslotarrayid;
        this.mrngid = this.slotnameid.join(',')

        if (this.appointmenttype == '1') {
          this.colorcode = '#ADD8E6'
          this.AppointmentName = 'Home Sample'
        }
        else if (this.appointmenttype == '2') {
          this.colorcode = '#5F9EA0'
          this.AppointmentName = 'Diagnostic Center'
        }
        var entity = {
          'Sno': this.idcount,
          'DiagnosticName': this.diagnosticname,
          'Morning': this.mrng,
          'Nightid': this.nightid,
          'mrngAppointmenttype': this.appointmenttype,
          'StartTime': this.diagnosticfromslot,
          'EndTime': this.diagnostictoslot,
          'Color': this.colorcode,
          'AppointmentTypeID': this.appointmenttype,
          'Morningid': this.mrngid,
          'DiagnosticCenterID': this.diagnosticid,
          'NoOfAppointments': this.dianoofappointments,
          'AppointmentName': this.AppointmentName,
          'MrngfromID': this.diafromid
        }
      }
      
      this.qwerty.push(entity);
      this.idcount = this.idcount + 1;
      if (this.appointmenttype == 1) {
        var mrngslots = this.mrngfromlist.findIndex(x => x.id == this.mrngtoid);
        this.mrngfromlist = this.mrngfromlist.slice(mrngslots + 1, this.mrngfromlist.length);
      }
      else if (this.appointmenttype == 2) {
        var diaslots = this.diagnsticfromlist.findIndex(x => x.id == this.diatoid);
        this.diagnsticfromlist = this.diagnsticfromlist.slice(diaslots + 1, this.diagnsticfromlist.length);
      }
      
      this.mrngfromid = "";
      this.mrngtoid = "";
      this.diafromid = "";
      this.diatoid = "";
      this.appointmenttype = "";
      this.morningslots = [];
      this.morningslots.length = 0;
      this.cleardropwn.length = 0;
      this.homenoofappointments = ""
      this.dianoofappointments = ""
      this.mrngslotarray = [];
      this.mrngslotarray.length = 0;
      this.mrngslots = [];
      this.mrngslotarrayid = [];
      this.slotnameid = "";
    }

  }




  public insertdetails1() {
    
    var entity = {
      'dayList': this.dayid,
      'slotsList': this.qwerty,
    }
    this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
      
      if (data == 0) {
        if (this.languageid == 1) {
          Swal.fire('', 'Added Successfully');
          location.href = "#/DiagnosticSlotsDash"
        }
        else {
          Swal.fire('', 'Ajouté avec succès');
          location.href = "#/DiagnosticSlotsDash"
        }
      }
    })



  }





  // public insertdetails1() {
  //   
  //   for (let j = 0; j < this.dayid.length; j++) {
  //     
  //     for (let i = 0; i < this.qwerty.length; i++) {
  //       var entity = {
  //         'DiagnosticCenterID': this.diagnosticid,
  //         'DayID': this.dayid[j].id,
  //         'Morning': this.qwerty[i].Morningid,
  //         'AppointmentTypeID': this.qwerty[i].AppointmentTypeID,
  //         'Noon': this.afternoonid,
  //         'Evening': this.evngid,
  //         'Night': this.nightid,
  //       }
  //       this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
  //         
  //       })
  //     }
  //   }
  //   if (this.languageid == 1) {
  //     Swal.fire('', 'Added Successfully');
  //     location.href = "#/DiagnosticSlotsDash"
  //   }
  //   else {
  //     Swal.fire('', 'Ajouté avec succès');
  //     location.href = "#/DiagnosticSlotsDash"
  //   }
  // }



  public mrngfromid: any;
  public mrngfromslot: any;
  public mrngtolist: any;
  public mrngtoid: any;
  public mrngtoslot: any;



  public getmrngfrom(even) {
    this.mrngfromid = even.target.value;
    var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slotName;
    this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }


  public getmrngto(even) {
    this.mrngtoid = even.target.value;
    var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slotName;
  }

  public diafromid: any;
  public diagnosticfromslot: any;
  public diagnostictolist: any;
  public diatoid: any;
  public diatoslot: any;
  public diatolist: any;
  public diagnostictoslot: any;



  public GetDiagnosticFromSlots(even) {
    this.diafromid = even.target.value;
    var qwerty = this.diagnsticfromlist.filter(x => x.id == this.diafromid);
    this.diagnosticfromslot = qwerty[0].slotName;
    this.diatolist = this.diagnsticfromlist.filter(x => x.id > this.diafromid);
    this.diatoid = "";
  }


  public getDiagnosticToSlots(even) {
    this.diatoid = even.target.value;
    var qwerty = this.diatolist.filter(x => x.id == this.diatoid);
    this.diagnostictoslot = qwerty[0].slotName;
  }





  public delete(Sno) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (Sno == this.qwerty[i].Sno) {

        if (this.qwerty[i].mrngAppointmenttype == 1) {
          var mrngslots = this.slotslist.findIndex(x => x.id == this.qwerty[i].MrngfromID);
          this.mrngfromlist = this.slotslist.slice(mrngslots, this.slotslist.length);
          this.qwerty.splice(i, 1);
        }
        if (this.qwerty[i].mrngAppointmenttype == 2) {
          var mrngslots = this.slotslist.findIndex(x => x.id == this.qwerty[i].MrngfromID);
          this.diagnsticfromlist = this.slotslist.slice(mrngslots, this.slotslist.length);
          this.qwerty.splice(i, 1);
        }
      }
    }

  }
}
