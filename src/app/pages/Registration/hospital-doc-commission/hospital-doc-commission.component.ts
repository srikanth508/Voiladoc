import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hospital-doc-commission',
  templateUrl: './hospital-doc-commission.component.html',
  styleUrls: ['./hospital-doc-commission.component.css']
})
export class HospitalDocCommissionComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  languageid: any;
  hospitalcliniclist: any;
  hospitadd = {}
  hospitalclinicid: any;
  doccommission: any;
  nursecommission: any;
  physiocommission: any;
  midwifecommission: any;
  id: any;
  hospitalclinicname: any;
  commissionlist:any;
  showbtn:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
     
      this.id = params['id'],
        this.hospitalclinicname = params['hospital_ClinicName'];
        this.gethospitalcommssions()
        if(this.id==undefined)
        {
          this.showbtn=1
        }
        else{
          this.showbtn=2
        }

    }
    )
    
    this.gethosptilclinicforadmin()
  }


  public gethosptilclinicforadmin() {
   
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
       
        this.hospitalcliniclist = data;
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }


  public GetHospitalID(item: any) {
   
    this.hospitalclinicid = item.id;
  }


  public insertdetails() {
    if (this.hospitalclinicid == undefined || this.hospitalclinicid == null) {
      Swal.fire('Please Select Hospital Clinic')
    }
    else {
     
      var entity = {
        'HospitalClinicID': this.hospitalclinicid,
        'DoctorCommission': this.doccommission,
        'NurseCommision': this.nursecommission,
        'PhysioCommission': this.physiocommission,
        'Midwifecommisiion': this.midwifecommission
      }
      this.docservice.InsertHospitalCommissions(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Registred Successfully')
          location.href = "#/HospitalDocDash"
        }
        else {
          Swal.fire('Success', 'Hospital Already Exists')
          location.href = "#/HospitalDocDash"
        }
      })
    }
  }

  public gethospitalcommssions() {
    this.docservice.GetHospitalCommissions(this.languageid).subscribe(
      data => {
       
        this.commissionlist = data;
        var list=this.commissionlist.filter(x=>x.id==this.id)
        this.doccommission=list[0].doctorCommission,
        this.nursecommission=list[0].nurseCommision,
        this.physiocommission=list[0].physioCommission,
        this.midwifecommission=list[0].midwifecommisiion
      }, error => {
      }
    )
  }



  public updatedetails() {
     
      var entity = {
        'ID': this.id,
        'DoctorCommission': this.doccommission,
        'NurseCommision': this.nursecommission,
        'PhysioCommission': this.physiocommission,
        'Midwifecommisiion': this.midwifecommission
      }
      this.docservice.UpdateHospitalCommissions(entity).subscribe(data => {
      let res=data
          Swal.fire('Success', 'Details Updated Successfully')
          location.href = "#/HospitalDocDash"
      })
    
  }
}


