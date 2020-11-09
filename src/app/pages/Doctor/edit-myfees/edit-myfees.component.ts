import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-myfees',
  templateUrl: './edit-myfees.component.html',
  styleUrls: ['./edit-myfees.component.css']
})
export class EditMyfeesComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public doctorlist: any;
  public doctorid: any;
  public departmentlist: any;
  public departmentid: any;
  public departmentname: any;
  public hosptalist: any;
  public treatmentlist: any;
  public treatmentID: any;
  public doccommission: any;
  public voiladoccommission: any;
  public dochospitalid: any;

  public commission: any;
  public hospitalid: any;
  public fees: any;
  public qwerty = [];
  public tablecount: any;
  public hospitalname: any;
  public doctorname: any;
  public treatmentname: any;
  public idcount: any;
  public labels: any;
  public docdd = {}
  public dummlist: any;
  public id: any;
  public dummlistsss: any;
  public appointmenttype:any;
  public dummappointmenttype:any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
     
      this.id = params['id'];
    }
    )
    this.GetAllDoctors();
    this.tablecount = 0;
    this.idcount = 1;

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )

    this.getdoctorfeess()
    this.GetAppointmentType()
  }


  public GetAppointmentType() {
    this.docservice.GetBookAppointmentTypeMasterWebByLanguageID(this.languageid).subscribe(data => {
      this.appointmenttype = data;
      this.dummappointmenttype = data;

    }, error => {
    })
  }

  public appointmentypeid:any;

  public getdoctorfeess() {

    this.docservice.DoctorCommissionFees(this.languageid).subscribe(
      data => {
       
        this.dummlistsss = data;
        var list = this.dummlistsss.filter(x => x.id == this.id)
        this.doctorid = list[0].doctorID,
          this.doctorname = list[0].doctorName,
          this.departmentid = list[0].departmentID,
          this.treatmentID = list[0].treatmentID,
          this.fees = list[0].fees,
          this.doccommission = list[0].doctorCommission,
          this.voiladoccommission = list[0].voilaDocCommisiion,
          this.hospitalname = list[0].hospital_ClinicName,
          this.departmentname = list[0].departmentname,
          this.departmentid = list[0].departmentID,
          this.hospitalid=list[0].hospitaID,
          this.dochospitalid=list[0].doctorHospitalID
          this.appointmentypeid=list[0].appointmentTypeID
        this.GetALlTreatmentPlans()
        this.GetAppointmentType()
      }, error => {
      }
    )

  }


  SelectLabel
  public GetAllDoctors() {
    if (this.hospitalid == undefined) {
      this.docservice.GetDoctorHospitalDetailsDoctors(this.languageid).subscribe(
        data => {
         
          this.doctorlist = data;

          this.docdd = {
            singleSelection: true,
            idField: 'doctorID',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.docservice.GetDoctorHospitalDetailsDoctors(this.languageid).subscribe(
        data => {
         
          this.dummlist = data;
          this.doctorlist = this.dummlist.filter(x => x.hosid == this.hospitalid)

          this.docdd = {
            singleSelection: true,
            idField: 'doctorID',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )
    }

  }

  public GetDoctorID(item: any) {
   
    this.doctorid = item.doctorID;
   
    var list = this.doctorlist.filter(x => x.doctorID == this.doctorid)
   
    this.departmentid = list[0].departmentID,
      this.departmentname = list[0].departmentname,
      this.doctorname = list[0].doctorName

    this.docservice.GetDoctorHospitalsByDoctorID(this.languageid, this.doctorid).subscribe(
      data => {
       
        this.hosptalist = data;
        this.hospitalid = this.hosptalist[0].hospital_ClinicID,
          this.dochospitalid = this.hosptalist[0].id,
          this.hospitalname = this.hosptalist[0].hospital_ClinicName
      }, error => {
      }
    )

    this.GetAllHospital();
    this.GetALlTreatmentPlans();
  }

  public GetAllHospital() {
    this.docservice.GetDoctorHospitalsByDoctorID(this.languageid, this.doctorid).subscribe(
      data => {
       
        this.hosptalist = data;
        this.hospitalid = this.hosptalist[0].hospital_ClinicID,
          this.dochospitalid = this.hosptalist[0].id

      }, error => {
      }
    )
  }
  public GetALlTreatmentPlans() {
    this.docservice.GetTreatementPlanMaster(this.languageid, this.departmentid).subscribe(
      data => {
       
        this.treatmentlist = data;
      }, error => {
      }
    )
  }
  public GetTreatmentID(even) {
   
    this.treatmentID = even.target.value;
    var list = this.treatmentlist.filter(x => x.id == this.treatmentID)
    this.treatmentname = list[0].treatmentPlan
  }


  public GetDoccommission(doccommission) {
   
    this.voiladoccommission = 100 - Number(doccommission);
   
  }


  public GetHospitalID(even) {
   
    this.hospitalid = even.target.value;

    var list = this.hosptalist.filter(x => x.hospital_ClinicID == this.hospitalid)
    this.hospitalname = list[0].hospital_ClinicName,
      this.dochospitalid = list[0].id
  }


  public adddetails() {
   
    var entity = {
      'ID': this.id,
      'DoctorHospitalID': this.dochospitalid,
      'HospitaID': this.hospitalid,
      'DoctorID': this.doctorid,
      'TreatmentID': this.treatmentID,
      'Fees': this.fees,
      'DoctorCommission': this.doccommission,
      'VoilaDocCommisiion': this.voiladoccommission
    }
    this.docservice.UpdateDoctorCommissionFees(entity).subscribe(data => {
      Swal.fire('Fees Updated Successfully');
      location.href="#/MyFees"
    })

  }


}
