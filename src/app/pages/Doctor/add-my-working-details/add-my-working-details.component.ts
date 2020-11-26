import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-add-my-working-details',
  templateUrl: './add-my-working-details.component.html',
  styleUrls: ['./add-my-working-details.component.css']
})
export class AddMyWorkingDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }


  public doctorlist: any;
  public doctorid: any;
  public availabilityid: any;
  public dayslist: any;
  public hospitallist: any;
  public hospitalid: any;
  public availabilitylist: any;
  public slotslist: any;
  public slotsdd: any;
  public timedivisonid: any;
  public morningslotid: any;
  public aftrenoonslots = [];
  public eveningslots = [];
  public nightslots = [];
  public slotslist1: any;
  public slotsdd1: any;
  public slotslist2: any;
  public slotsdd2: any;
  public slotslist3: any;
  public slotsdd3: any;
  public tablecount: any;
  public dayid = []
  public fees: any;
  public session1: any;
  public session2: any;
  public hosipitalidd: any;
  public qwerty = [];
  public morningslotarray = [];
  public morningslotidarray = [];
  public slotid: any;
  public morningslots = [];
  public slotname: any;
  public mrng: any;
  public slotnameid: any;
  public mrngid: any;
  public afternoonslotarray = [];
  public slotname1: any;
  public afternoon: any;
  public afternoonid: any;
  public slotnameid1: any;
  public eveningarray = [];
  public slotname2: any;
  public evening: any;
  public eveningid: any;
  public slotnameid2: any;
  public nightslotsarray = [];
  public slotname3: any;
  public night: any;
  public slotnameid3: any;
  public nightid: any;
  public short: any;
  public hospital_ClinicName: any;
  public dayOfTheWeek: any;
  public afternoonslotidarray = [];
  public eveningarrayid = [];
  public nightslotsarrayid = [];
  public details: any;
  public day: any;
  public name: any;
  public docid: any;
  public qwertyy = [];
  public idcount: any;
  public cleardropdown1 = [];
  public cleardropdown2 = [];
  public cleardropdown3 = [];
  public cleardropdown4 = [];
  public abcd: any;
  public dis1: any;
  public dis2: any;
  public dis3: any;
  public bookingtype: any;
  public appontmenttypeid = [];
  public booktypeid = [];
  public appointmenttype: any;
  public bookingtypedd = {};
  public appointmentdd = {};
  public doctordd = {};
  public docdd = {}

  public languageid: any;
  public labels: any;
  public hosdd: any;
  public showid: any;
  public dummlist: any;
  public dummid: any;
  public doctorname: any
  public HospitalName: any
  SelectLabel: any
  active: any
  daysdd = {}
  mrngAppointmenttype: any;
  afternoonappointmentType: any;
  eveningappointmentType: any;
  nightappointmenttype: any;

  dummdoclist: any;

  public mrngcolorcode: any;
  afternooncolorcode: any;
  evengcolorcode: any;
  nightcolorcode: any;

  slottypeid: any;
  public cleardropdown5 = []
  ngOnInit() {

    this.mrngfromid = "";
    this.mrngtoid = "";
    this.noonfromid = "";
    this.noontoid = "";
    this.evngfromid = "";
    this.evngtoid = "";
    this.nightfromid = "";
    this.nighttoid = ""

    this.languageid = localStorage.getItem('LanguageID');

    this.activatedroute.params.subscribe(params => {


      this.doctorid = params['id'];
      this.hosipitalidd = params['hospitalid'];

      // this.docservice.GetDoctorHospitalDetailsDoctors(1).subscribe(
      //   data => {
      //    
      //     this.dummdoclist = data;
      //     var list = this.dummdoclist.filter(x => x.doctorID == this.doctorid);
      //     this.hosipitalidd = list[0].hosid
      //     this.hospital_ClinicName = list[0].hospital_ClinicName;

      //     this.hosipitalidd = temp.filter(x => x.doctorName == this.doctorname);
      //     this.hospital_ClinicName = temp1[0].hospital_ClinicName;
      //     this.hosipitalidd = temp1[0].hospital_ClinicID;
      //   }, error => {
      //   }
      // )
      // this.booktypeid = [1, 2]

      this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
        data => {

          this.doctorlist = data;
          var list = this.doctorlist.filter(x => x.id == this.doctorid)
          this.slottypeid = list[0].slotDurationID

          if (this.slottypeid != null) {
            this.GetMorningSlotsMasterbyid();
            this.GetAfternoonSlotsMasterbyID();
            this.GetEveningSlotsMasterByID();
            this.GetNightSlotsMasterByID();
          }
          if (this.slottypeid == null) {

            this.slotslist.length = 0;
            this.slotslist1.lenght = 0;
            this.slotslist2.length = 0;
            this.slotslist3.length = 0;
            this.slotslist = []
            this.slotslist1 = []
            this.slotslist2 = []
            this.slotslist3 = []
          }
        }, error => {
        }
      )


    }
    )



    this.doctorname = localStorage.getItem('user');

    this.active = 0;




    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hosipitalidd).subscribe(
      data => {

        this.details = data;
        this.hospital_ClinicName = this.details[0].hospital_ClinicName
      }, error => {
      }
    )





    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )


    // this.Getdoctorlist();
    this.GetDaysMaster();
    // this.GetMorningSlotsMasterbyid();
    // this.GetAfternoonSlotsMasterbyID();
    // this.GetEveningSlotsMasterByID();
    // this.GetNightSlotsMasterByID();
    this.idcount = 1;
    this.tablecount = 0;
    this.activatedroute.params.subscribe(params => {

      this.active = 1;
      this.doctorid = params['id'];
    }
    )
    this.getbookingtype();
    this.GetAppointmentType();
    this.availabilityid = 3;
    for (let i = 0; i < this.availabilitylist.length; i++) {
      if (this.availabilitylist[i].id == this.availabilityid) {
        this.name = this.availabilitylist[i].short
      }
    }

  }




  // public Getdoctorlist() {
  //  
  //   if (this.dummid == undefined) {
  //     this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
  //       data => {
  //        
  //         this.doctorlist = data;
  //         this.docdd = {
  //           singleSelection: true,
  //           idField: 'id',
  //           textField: 'doctorName',
  //           selectAllText: 'Select All',
  //           unSelectAllText: 'UnSelect All',
  //           //  itemsShowLimit: 3,
  //           allowSearchFilter: false,
  //           enableCheckAll: false
  //         };
  //       }, error => {
  //       }
  //     )
  //   }
  //   else if (this.dummid != undefined) {
  //    
  //     this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
  //       data => {
  //        
  //         this.dummlist = data;
  //         this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hosipitalidd)
  //         this.docdd = {
  //           singleSelection: true,
  //           idField: 'id',
  //           textField: 'doctorName',
  //           selectAllText: 'Select All',
  //           unSelectAllText: 'UnSelect All',
  //           //  itemsShowLimit: 3,
  //           allowSearchFilter: false,
  //           enableCheckAll: false
  //         };
  //       }, error => {
  //       }
  //     )
  //   }

  // }





  public getlanguage() {
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public getbookingtype() {
    this.docservice.GetBookingTypeMasterByLanguageID(this.languageid).subscribe(data => {
      this.bookingtype = data;
      this.bookingtypedd = {
        singleSelection: false,
        idField: 'id',
        textField: 'type',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: false,
        enableCheckAll: false
      };
    }, error => {
    })
  }
  public GetAppointmentType() {
    this.docservice.GetBookAppointmentTypeMasterWebByLanguageID(this.languageid).subscribe(data => {
      this.appointmenttype = data;
      this.appointmentdd = {
        singleSelection: false,
        idField: 'id',
        textField: 'appointmentType',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: false,
        enableCheckAll: false
      };
    }, error => {
    })
  }

  public GetBookingTpeID(item7: any) {

    if (item7.id == 1) {
      Swal.fire('On Demand Disabled As of Now')
      this.booktypeid.push(item7);
    }
    else {
      this.booktypeid.push(item7);
    }
  }

  public onItemDeSelect7(item7: any) {

    this.booktypeid = this.booktypeid.slice(item7.id)
  }

  public GetAppointmentTypeID(item8: any) {

    this.appontmenttypeid.push(item8);
    this.showid = item8.id

    // if (this.showid == 1 && this.showid != 2) {
    //   this.mrngAppointmenttype = 1
    //   this.afternoonappointmentType = 1
    //   this.eveningappointmentType = 1
    //   this.nightappointmenttype = 1
    // }
    // else {
    //   this.mrngAppointmenttype = 0
    //   this.afternoonappointmentType = 0
    //   this.eveningappointmentType = 0
    //   this.nightappointmenttype = 0
    // }

  }
  public onItemDeSelect8(item8: any) {

    this.appontmenttypeid = this.appontmenttypeid.slice(item8.id)
  }


  public insertbooktype() {
    for (let j = 0; j < this.booktypeid.length; j++) {
      var entity = {
        'DoctorHospitalID': this.docid,
        'BookingTypeID': this.booktypeid[j].id
      }
      this.docservice.InsertBookingType(entity).subscribe(data => {
        if (data != undefined) {

        }

      })

    }

  }

  public insertbookappointmenttype() {
    for (let j = 0; j < this.appontmenttypeid.length; j++) {
      var entity = {
        'DoctorHospitalID': this.docid,
        'AppointmentTypeID': this.appontmenttypeid[j]
      }
      this.docservice.InsertBookAppointmentType(entity).subscribe(data => {
        if (data != undefined) {

        }
      })

    }

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

    // for (let i = 0; i < this.dayslist.length; i++) {
    //   if (this.dayslist[i].id == this.dayid) {
    //     this.day = this.dayslist[i].dayOfTheWeek;
    //   }
    // }
  }
  public GetAvailabilityID(even) {

    this.availabilityid = even.target.value;

    for (let i = 0; i < this.availabilitylist.length; i++) {

      if (this.availabilitylist[i].id == this.availabilityid) {
        this.name = this.availabilitylist[i].short
      }
    }
  }

  public GetAvailabilityMaster() {

    this.docservice.GetAvailabilityMaster(this.hospitalid).subscribe(
      data => {

        this.availabilitylist = data;
      }, error => {
      }
    )
  }


  public GetDoctorID(item: any) {

    this.doctorid = item.id;
  }
  public GetHosiptalid(even) {
    this.hospitalid = even.target.value;
  }

  public GetMorningSlotsID(item: any) {

    this.morningslots.push(item);

    if (this.morningslots.length == 2) {
      this.abcd = 1;
    }
  }

  onItemDeSelect(item: any) {

    this.morningslots = this.morningslots.slice(item.id)
  }

  public GetAfternoonSlotsID(item1: any) {

    this.aftrenoonslots.push(item1);

    if (this.aftrenoonslots.length == 2) {
      this.dis1 = 1;
    }
  }


  onItemDeSelect1(item1: any) {

    this.aftrenoonslots = this.aftrenoonslots.slice(item1.id)
  }

  public GetHospitalID(item: any) {

    this.hosipitalidd = item.id;
    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hosipitalidd).subscribe(
      data => {

        this.details = data;
        this.hospital_ClinicName = this.details[0].hospital_ClinicName
      }, error => {
      }
    )
  }
  public GetEveningSlotsID(item2: any) {

    this.eveningslots.push(item2);

    if (this.eveningslots.length == 2) {
      this.dis2 = 1;
    }
  }

  onItemDeSelect2(item2: any) {

    this.eveningslots = this.eveningslots.slice(item2.id)
  }


  public GetNightSlotsID(item3: any) {

    this.nightslots.push(item3);
    if (this.nightslots.length == 2) {
      this.dis3 = 1;
    }
  }

  onItemDeSelect3(item3: any) {

    this.eveningslots = this.eveningslots.slice(item3.id)
  }



  public GetHospitalClinicid(even) {

    this.hospitalid = even.target.value;
    if (this.hospitalid == 3) {
      this.hosipitalidd = 590
    }
    if (this.hospitalid == 4) {
      this.hosipitalidd = 591
    }
    this.GetAllHospitalclinicById();
    this.GetAvailabilityMaster()

  }

  public GetAllHospitalclinicById() {

    this.docservice.GetAllHospital_ClinicListByIDByLanguageID(this.hospitalid, this.languageid).subscribe(
      data => {

        this.hospitallist = data;

        this.hosdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false
        };

      }, error => {
      }
    )
  }

  public mrngfromlist: any;

  public GetMorningSlotsMasterbyid() {

    this.docservice.GetSlotsMasterByID(1, this.slottypeid).subscribe(
      data => {

        this.slotslist = data;
        this.mrngfromlist = this.slotslist;
        // this.slotsdd = {
        //   singleSelection: false,
        //   idField: 'id',
        //   textField: 'slots',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 3,
        //   allowSearchFilter: false,
        //   enableCheckAll: false
        // };
      }, error => {
      }
    )
  }

  public noonfromlist: any;
  public GetAfternoonSlotsMasterbyID() {

    this.docservice.GetSlotsMasterByID(2, this.slottypeid).subscribe(
      data => {

        this.slotslist1 = data;
        this.noonfromlist = this.slotslist1;

        // this.slotsdd1 = {
        //   singleSelection: false,
        //   idField: 'id',
        //   textField: 'slots',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 3,
        //   allowSearchFilter: false,
        //   enableCheckAll: false
        // };
      }, error => {
      }
    )
  }

  public evngfromlist: any;
  public GetEveningSlotsMasterByID() {

    this.docservice.GetSlotsMasterByID(3, this.slottypeid).subscribe(
      data => {

        this.slotslist2 = data;
        this.evngfromlist = this.slotslist2;
        // this.slotsdd2 = {
        //   singleSelection: false,
        //   idField: 'id',
        //   textField: 'slots',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 3,
        //   allowSearchFilter: false,
        //   enableCheckAll: false
        // };
      }, error => {
      }
    )
  }

  public nightfromlist: any;

  public GetNightSlotsMasterByID() {

    this.docservice.GetSlotsMasterByID(4, this.slottypeid).subscribe(
      data => {

        this.slotslist3 = data;
        this.nightfromlist = this.slotslist3;
        // this.slotsdd3 = {
        //   singleSelection: false,
        //   idField: 'id',
        //   textField: 'slots',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 3,
        //   allowSearchFilter: false,
        //   enableCheckAll: false
        // };
      }, error => {
      }
    )
  }




  public mrngtoid: any;
  public mrngtoslot: any;
  public mrngtolist: any;
  public noonfromid: any;
  public noonfromslot: any;
  public noontolist: any;
  public noontoid: any;
  public noontoslot: any;
  public evngfromid: any;
  public evngfromslot: any;
  public evngtolist: any;
  public evngtoid: any;
  public evngtoslot: any;
  public mrngfromid: any;
  public mrngfromslot: any;

  public nightfromid: any;
  public nightfromslot: any;
  public nighttolist: any;
  public nighttoid: any;
  public nightoslot: any;





  public getmrngfrom(even) {
    this.mrngfromid = even.target.value;
    var qwerty = this.mrngfromlist.filter(x => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slots;
    this.mrngtolist = this.mrngfromlist.filter(x => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }



  public getmrngto(even) {
    this.mrngtoid = even.target.value;
    var qwerty = this.mrngtolist.filter(x => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slots;
  }



  public getnoonfrom(even) {
    this.noonfromid = even.target.value;
    var qwerty = this.noonfromlist.filter(x => x.id == this.noonfromid);
    this.noonfromslot = qwerty[0].slots;
    this.noontolist = this.noonfromlist.filter(x => x.id > this.noonfromid);
    this.noontoid = "";
  }

  public getnoonto(even) {
    this.noontoid = even.target.value;
    var qwerty = this.noontolist.filter(x => x.id == this.noontoid);
    this.noontoslot = qwerty[0].slots;
  }

  public getevngfrom(even) {
    this.evngfromid = even.target.value;
    var qwerty = this.evngfromlist.filter(x => x.id == this.evngfromid);
    this.evngfromslot = qwerty[0].slots;
    this.evngtolist = this.evngfromlist.filter(x => x.id > this.evngfromid);
    this.evngtoid = "";
  }

  public getevngto(even) {
    this.evngtoid = even.target.value;
    var qwerty = this.evngtolist.filter(x => x.id == this.evngtoid);
    this.evngtoslot = qwerty[0].slots;
  }


  public getnightfrom(even) {
    this.nightfromid = even.target.value;
    var qwerty = this.nightfromlist.filter(x => x.id == this.nightfromid);
    this.nightfromslot = qwerty[0].slots;
    this.nighttolist = this.nightfromlist.filter(x => x.id > this.nightfromid);
    this.nighttoid = "";
  }


  public getnightto(even) {
    this.nighttoid = even.target.value;
    var qwerty = this.nighttolist.filter(x => x.id == this.nighttoid);
    this.nightoslot = qwerty[0].slots;
  }



  public adddetails() {

    if (this.dayid.length == 0) {
      Swal.fire('Please Select Day')
    }
    else if (this.doctorid == null || this.doctorid == 0) {
      Swal.fire('Please Select Doctor')
    }
    else {
      this.tablecount = 1;

      //mrng slots

      var mrgfrm = {
        slots: this.mrngfromslot,
        id: this.mrngfromid
      };
      this.morningslots.push(mrgfrm);

      var mrgto = {
        slots: this.mrngtoslot,
        id: this.mrngtoid
      };
      this.morningslots.push(mrgto);


      for (let i = 0; i < this.morningslots.length; i++) {
        this.morningslotarray.push(this.morningslots[i].slots);

        this.morningslotidarray.push(this.morningslots[i].id)
      }

      this.slotname = this.morningslotarray;
      this.mrng = this.slotname.join(' to ')
      this.slotnameid = this.morningslotidarray;
      this.mrngid = this.slotnameid.join(',')


      // afternoonslots

      // var noonfrm = {
      //   slots: this.noonfromslot,
      //   id: this.noonfromid
      // };
      // this.aftrenoonslots.push(noonfrm);

      // var noonto = {
      //   slots: this.noontoslot,
      //   id: this.noontoid
      // };
      // this.aftrenoonslots.push(noonto);


      // for (let i = 0; i < this.aftrenoonslots.length; i++) {
      //   this.afternoonslotarray.push(this.aftrenoonslots[i].slots);

      //   this.afternoonslotidarray.push(this.aftrenoonslots[i].id)
      // }

      // this.slotname1 = this.afternoonslotarray;
      // this.afternoon = this.slotname1.join(' to ');
      // this.slotnameid1 = this.afternoonslotidarray;
      // this.afternoonid = this.slotnameid1.join(',');


      // eveng slots

      // var evngfrm = {
      //   slots: this.evngfromslot,
      //   id: this.evngfromid
      // };
      // this.eveningslots.push(evngfrm);

      // var evngto = {
      //   slots: this.evngtoslot,
      //   id: this.evngtoid
      // };
      // this.eveningslots.push(evngto);


      // for (let i = 0; i < this.eveningslots.length; i++) {
      //   this.eveningarray.push(this.eveningslots[i].slots);

      //   this.eveningarrayid.push(this.eveningslots[i].id);
      // }

      // this.slotname2 = this.eveningarray;
      // this.evening = this.slotname2.join(' to ');
      // this.slotnameid2 = this.eveningarrayid;
      // this.eveningid = this.slotnameid2.join(',');

      //night slots

      // var nightfrm = {
      //   slots: this.nightfromslot,
      //   id: this.nightfromid
      // }
      // this.nightslots.push(nightfrm);

      // var nightto = {
      //   slots: this.nightoslot,
      //   id: this.nighttoid
      // }
      // this.nightslots.push(nightto);

      // for (let i = 0; i < this.nightslots.length; i++) {
      //   this.nightslotsarray.push(this.nightslots[i].slots);

      //   this.nightslotsarrayid.push(this.nightslots[i].id);
      // }
      // this.slotname3 = this.nightslotsarray;
      // this.night = this.slotname3.join(' to ');
      // this.slotnameid3 = this.nightslotsarrayid;
      // this.nightid = this.slotnameid3.join(',');


      // for (let i = 0; i < this.dayid.length; i++) {

      // for (let i = 0; i < this.dayslist.length; i++) {
      //   if (this.dayslist[i].id == this.dayid) {
      //     this.day = this.dayslist[i].dayOfTheWeek;
      //   }
      // }

      if (this.mrngAppointmenttype == '1') {
        this.mrngcolorcode = '#bae6fb'
        this.appontmenttypeid.push(1)
      }
      else if (this.mrngAppointmenttype == '2') {
        this.mrngcolorcode = '#4e66b0'
        this.appontmenttypeid.push(2)
      }
      else if (this.mrngAppointmenttype == '5') {
        this.mrngcolorcode = '#90EE90'
        this.appontmenttypeid.push(5)
      }

      // if (this.afternoonappointmentType == '1') {
      //   this.afternooncolorcode = '#bae6fb'
      //   this.appontmenttypeid.push(1)
      // }
      // else if (this.afternoonappointmentType == '2') {
      //   this.afternooncolorcode = '#4e66b0'
      //   this.appontmenttypeid.push(2)
      // }
      // else if (this.afternoonappointmentType == '5') {
      //   this.afternooncolorcode = '#90EE90'
      //   this.appontmenttypeid.push(5)
      // }

      // if (this.eveningappointmentType == '1') {
      //   this.evengcolorcode = '#bae6fb'
      //   this.appontmenttypeid.push(1)
      // }
      // else if (this.eveningappointmentType == '2') {
      //   this.evengcolorcode = '#4e66b0'
      //   this.appontmenttypeid.push(2)
      // }
      // else if (this.eveningappointmentType == '5') {
      //   this.evengcolorcode = '#90EE90'
      //   this.appontmenttypeid.push(5)
      // }

      // if (this.nightappointmenttype == '1') {
      //   this.nightcolorcode = '#bae6fb'
      //   this.appontmenttypeid.push(1)
      // }
      // else if (this.nightappointmenttype == '2') {
      //   this.nightcolorcode = '#4e66b0'
      //   this.appontmenttypeid.push(2)
      // }
      // else if (this.nightappointmenttype == '5') {
      //   this.nightcolorcode = '#90EE90'
      //   this.appontmenttypeid.push(5)
      // }
      var entity = {
        'Sno': this.idcount,
        'DoctorID': this.doctorid,
        'DoctorAvailability': this.name,
        'DoctorAvailabilityID': this.availabilityid,
        'Hospital_Clinic': this.hospital_ClinicName,
        'Hospital_ClinicID': this.hosipitalidd,
        // 'Day': this.dayid[i].dayOfTheWeek,
        // 'DayID': this.dayid[i].id,
        'Fees': this.fees,
        'Session1': this.session1,
        'Session2': this.session2,
        'Morning': this.mrng,
        'Afternoon': this.afternoon,
        'Evening': this.evening,
        'Night': this.night,
        'Morningid': this.mrngid,
        'Afternoonid': this.afternoonid,
        'Eveningid': this.eveningid,
        'Nightid': this.nightid,
        'mrngAppointmenttype': this.mrngAppointmenttype,
        'afternoonappointmentType': this.afternoonappointmentType,
        'eveningappointmentType': this.eveningappointmentType,
        'nightappointmenttype': this.nightappointmenttype,
        'MrngColorCode': this.mrngcolorcode,
        'Afternooncolorcode': this.afternooncolorcode,
        'Evngcolorcode': this.evengcolorcode,
        'Nightcolorcode': this.nightcolorcode,
        'StartTime': this.mrngfromslot,
        'EndTime': this.mrngtoslot
      }
      this.qwerty.push(entity);
      this.idcount = this.idcount + 1;
      debugger
      var mrngslots = this.mrngfromlist.findIndex(x => x.id == this.mrngtoid);
      this.mrngfromlist = this.mrngfromlist.slice(mrngslots + 1, this.mrngfromlist.length);
      debugger
    }
    this.session1 = "";
    this.session2 = "";
    this.cleardropdown1 = [];
    this.cleardropdown2 = [];
    this.cleardropdown3 = [];
    this.cleardropdown4 = [];
    this.abcd = "";
    this.dis2 = "";
    this.dis1 = "";
    this.dis3 = "";
    this.eveningslots.length = 0;
    this.morningslotarray.length = 0;
    this.morningslotidarray.length = 0;
    this.eveningarray.length = 0;
    this.afternoonslotarray.length = 0;
    this.nightslotsarray.length = 0;
    this.nightslots.length = 0;
    this.morningslots.length = 0;
    this.eveningslots.length = 0;
    this.aftrenoonslots.length = 0;
    this.mrngcolorcode = ""
    this.afternooncolorcode = ""
    this.evengcolorcode = ""
    this.nightcolorcode = ""
    this.mrngAppointmenttype = "",
      this.eveningappointmentType = "",
      this.afternoonappointmentType = "",
      this.nightappointmenttype = ""
    // this.dayid = []
    // this.cleardropdown5 = []

    this.mrngfromid = "";
    this.mrngtoid = "";
    this.noonfromid = "";
    this.noontoid = "";
    this.evngfromid = "";
    this.evngtoid = "";
    this.nightfromid = "";
    this.nighttoid = ""
  }

  public insertdetails() {
    debugger
    var entity = {
      'DoctorID': this.doctorid,
      'DoctorAvalibity': this.name,
      'Fees': this.fees,
      'OnlineBooking': 1,
      'InHospital': 1,
      'Hospital_ClinicID': this.hosipitalidd,
      'DoctorAvailabilityID': this.availabilityid,
    }
    this.docservice.InsertDoctorHospitalDetails(entity).subscribe(data => {

      if (data != 0) {
        debugger
        this.docid = data;
        this.insertbooktype();
        this.insertbookappointmenttype()
        this.insertdoctorslotsbyid();
        debugger
        // if (this.languageid == 1) {
        //   Swal.fire('Completed', 'Slots saved successfully', 'success');
        //   location.href = "#/DocWorkingDash"
        //   debugger
        // }
        // else {
        //   Swal.fire('Détails enregistrés');
        //   location.href = "#/DocWorkingDash"
        //   debugger
        // }
        this.tablecount = 0;
      }
      else {
        Swal.fire('OOPS', 'Doctor Already Exist');
      }
    })
  }




  public insertdoctorslotsbyid() {
    // this.docservice.InsertDoctorSlotsNew(this.dayid,this.qwerty,this.docid).subscribe(data => {
    //   debugger
      
    // })
    for (let j = 0; j < this.dayid.length; j++) {
      debugger
      for (let i = 0; i < this.qwerty.length; i++) {
        debugger
        var entity = {
          'Hospital_ClinicID': this.qwerty[i].Hospital_ClinicID,
          'DoctorID': this.qwerty[i].DoctorID,
          'DayID': this.dayid[j].id,
          'DoctorHospitalDetailsID': this.docid,
          'Morning': this.qwerty[i].Morningid,
          'Noon': this.qwerty[i].Afternoonid,
          'Evening': this.qwerty[i].Eveningid,
          'Night': this.qwerty[i].Nightid,
          'MrngAppointtypeID': this.qwerty[i].mrngAppointmenttype,
          'AfternoonAppointmentTypeID': this.qwerty[i].afternoonappointmentType,
          'EveningAppointmentTypeID': this.qwerty[i].eveningappointmentType,
          'NightAppointmentTypeID': this.qwerty[i].nightappointmenttype
        }
        this.docservice.InsertDoctorSlotByID(entity).subscribe(data => {
          debugger
          if (data != 0) {
          }
        })
      }
    }
    if (this.languageid == 1) {
      Swal.fire('Completed', 'Slots saved successfully', 'success');
      location.href = "#/MyWorkingDetails"
    }
    else {
      Swal.fire('Détails enregistrés');
      location.href = "#/MyWorkingDetails"
    }
  }




  public delete(Sno) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (Sno == this.qwerty[i].Sno) {

        this.qwerty.splice(i, 1);
      }
    }

  }
}
