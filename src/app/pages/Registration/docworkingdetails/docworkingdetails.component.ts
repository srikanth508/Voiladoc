import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-docworkingdetails',
  templateUrl: './docworkingdetails.component.html',
  styleUrls: ['./docworkingdetails.component.css']
})
export class DocworkingdetailsComponent implements OnInit {


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
  public dayid = [];
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
  cleardropdown5 = []
  public search: any;

  ngOnInit() {

    this.mrngfromid = "";
    this.mrngtoid = "";
    this.noonfromid = "";
    this.noontoid = "";
    this.evngfromid = "";
    this.evngtoid = "";
    this.nightfromid = "";
    this.nighttoid = ""

    // this.booktypeid = [1, 2]
    this.dummid = localStorage.getItem('hospitalid');
    this.hosipitalidd = localStorage.getItem('hospitalid');

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
        this.search = this.labels[0].search;
      }, error => {
      }
    )


    this.Getdoctorlist();
    this.GetDaysMaster();

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

  public Getdoctorlist() {

    if (this.dummid == undefined) {
      this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
        data => {

          this.doctorlist = data;
          this.dummlist = data;
          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
          };
        }, error => {
        }
      )
    }
    else if (this.dummid != undefined) {

      this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hosipitalidd)
          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
          };
        }, error => {
        }
      )
    }
  }


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
      this.booktypeid.push(item7);
      if (this.languageid == 1) {
        Swal.fire('On Demand Disabled as of Now')
      }
      else {
        Swal.fire('Service à la demande désactivé.')
      }
    }
    else {
      this.booktypeid.push(item7);
    }
  }

  public onItemDeSelect7(item7: any) {

    this.booktypeid = this.booktypeid.slice(item7.id)
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
  }


  onItemDeSelect1(item1: any) {
    
    this.dayid = this.dayid.slice(item1.id)
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

  slottypeid: any;
  departmentid: any;

  public GetDoctorID(item: any) {
    this.doctorid = item.id;
    
    var list = this.dummlist.filter(x => x.id == this.doctorid)
    this.slottypeid = list[0].slotDurationID,
      this.hosipitalidd = list[0].hospitalClinicID,
      this.hospital_ClinicName = list[0].hospital_ClinicName
    this.departmentid = list[0].departmentID
    
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

public itemid:any;

  onItemDeslectDay(item: any) {

     this.itemid=item.id;
    
    this.dayid.splice(this.itemid, 1);
    // this.dayid = this.dayid.slice(this.itemid)
  }



  public GetAfternoonSlotsID(item1: any) {

    this.aftrenoonslots.push(item1);

    if (this.aftrenoonslots.length == 2) {
      this.dis1 = 1;
    }
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
  public dummslotslist: any;

  public GetMorningSlotsMasterbyid() {

    this.docservice.GetSlotsMasterByID(1, this.slottypeid).subscribe(
      data => {

        this.slotslist = data;
        this.dummslotslist = data;

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



  // public getnoonfrom(even) {
  //   this.noonfromid = even.target.value;
  //   var qwerty = this.noonfromlist.filter(x => x.id == this.noonfromid);
  //   this.noonfromslot = qwerty[0].slots;
  //   this.noontolist = this.noonfromlist.filter(x => x.id > this.noonfromid);
  //   this.noontoid = "";
  // }

  // public getnoonto(even) {
  //   this.noontoid = even.target.value;
  //   var qwerty = this.noontolist.filter(x => x.id == this.noontoid);
  //   this.noontoslot = qwerty[0].slots;
  // }

  // public getevngfrom(even) {
  //   this.evngfromid = even.target.value;
  //   var qwerty = this.evngfromlist.filter(x => x.id == this.evngfromid);
  //   this.evngfromslot = qwerty[0].slots;
  //   this.evngtolist = this.evngfromlist.filter(x => x.id > this.evngfromid);
  //   this.evngtoid = "";
  // }

  // public getevngto(even) {
  //   this.evngtoid = even.target.value;
  //   var qwerty = this.evngtolist.filter(x => x.id == this.evngtoid);
  //   this.evngtoslot = qwerty[0].slots;
  // }


  // public getnightfrom(even) {
  //   this.nightfromid = even.target.value;
  //   var qwerty = this.nightfromlist.filter(x => x.id == this.nightfromid);
  //   this.nightfromslot = qwerty[0].slots;
  //   this.nighttolist = this.nightfromlist.filter(x => x.id > this.nightfromid);
  //   this.nighttoid = "";
  // }


  // public getnightto(even) {
  //   this.nighttoid = even.target.value;
  //   var qwerty = this.nighttolist.filter(x => x.id == this.nighttoid);
  //   this.nightoslot = qwerty[0].slots;
  // }




  public adddetails() {
    if (this.dayid.length == 0) {
      Swal.fire('Please Select Day')
    }
    else if (this.doctorid == null || this.doctorid == 0) {
      Swal.fire('Please Select Doctor')
    }
    else if (this.mrngAppointmenttype == undefined || this.mrngAppointmenttype == 0) {
      Swal.fire('Please Select Appointment Type')
    }
    else if (this.mrngfromid == "" || this.mrngtoid == "") {
      Swal.fire('Please Enter Select Timings')
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


      if (this.mrngAppointmenttype == '1') {
        this.mrngcolorcode = '#322C6C'
        this.appontmenttypeid.push(1)
      }
      else if (this.mrngAppointmenttype == '2') {
        this.mrngcolorcode = '#4D65AF'
        this.appontmenttypeid.push(2)
      }
      else if (this.mrngAppointmenttype == '5') {
        this.mrngcolorcode = '#0099FF'
        this.appontmenttypeid.push(5)
      }
      else if (this.mrngAppointmenttype == '6') {
        this.mrngcolorcode = '#FFC000'
        this.appontmenttypeid.push(5)
      }


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
        'EndTime': this.mrngtoslot,
        'MrngFromID': this.mrngfromid
      }
      this.qwerty.push(entity);
      this.idcount = this.idcount + 1;
      
      var mrngslots = this.mrngfromlist.findIndex(x => x.id == this.mrngtoid);
      this.mrngfromlist = this.mrngfromlist.slice(mrngslots + 1, this.mrngfromlist.length);
      
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
    this.fees = "";
    this.mrngtolist.length=0;

  }
  // }


  public insertdetails() {
    
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
        
        this.docid = data;
        this.insertbooktype();
        this.insertbookappointmenttype()
        this.insertdoctorslotsbyid();
        

        this.tablecount = 0;
      }
      else {
        Swal.fire('OOPS', 'Doctor Already Exist');
      }
    })
  }



  public insertdoctorslotsbyid() {

    for (let j = 0; j < this.dayid.length; j++) {
      
      for (let i = 0; i < this.qwerty.length; i++) {
        
        var entity = {
          'Hospital_ClinicID': this.qwerty[i].Hospital_ClinicID,
          'DoctorID': this.qwerty[i].DoctorID,
          'DayID': this.dayid[j].id,
          'DoctorHospitalDetailsID': this.docid,
          'Morning': this.qwerty[i].Morningid,
          'MrngAppointtypeID': this.qwerty[i].mrngAppointmenttype,
          'Fees': this.qwerty[i].Fees,
        }
        this.docservice.InsertDoctorSlotByID(entity).subscribe(data => {
          
          if (data != 0) {
          }
        })
      }
    }
    if (this.languageid == 1) {
      Swal.fire('Completed', 'Slots saved successfully', 'success');
      location.href = "#/DocWorkingDash"
    }
    else {
      Swal.fire('Détails enregistrés');
      location.href = "#/DocWorkingDash"
    }
  }



  public delete(Sno) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (Sno == this.qwerty[i].Sno) {

        var mrngslots = this.dummslotslist.findIndex(x => x.id == this.qwerty[i].MrngFromID);
        this.mrngfromlist = this.dummslotslist.slice(mrngslots, this.dummslotslist.length);
        this.qwerty.splice(i, 1);
      }
    }

  }

}
