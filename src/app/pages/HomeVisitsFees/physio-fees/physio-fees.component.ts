import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-physio-fees',
  templateUrl: './physio-fees.component.html',
  styleUrls: ['./physio-fees.component.css']
})
export class PhysioFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public labels: any;
  public physiolist: any;
  public physioid: any;
  public hospitalist: any;
  public hospitalid: any;
  public physihospitalid: any;
  public homevisitfee: any;
  public physiofee: any;
  public voiladoccommission: any;
  public physiofees: any;
  public hospitalclinicid: any;
  public dummphysiolist: any;
  public id: any;
  public showbutton: any;
  public showindependentradio: any;
  public independent: any;

  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');

    if (this.hospitalclinicid == undefined) {
      this.showindependentradio = 0;
    }
    else if (this.hospitalclinicid != undefined) {
      this.showindependentradio = 1;
    }

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0
      }
      else if (this.id != undefined) {
        this.showbutton = 1
        this.GetphysioFees()

      }
    }
    )

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    this.idcount = 1;
    this.getphysiotherapist();
    // this.GetTimings();
  }


  public starttime: any;
  public strttimeid: any;
  public endtimelist: any;
  public endtime: any;
  public endtimeid: any;


  public GetStartTime(even) {
    
    let list = even.target.value.split(',')

    this.starttime = list[0];
    this.strttimeid = list[1];
    this.endtimelist = this.Timeings.filter(x => x.id > this.strttimeid);
  }

  public GetEndTime(even) {
    
    let list = even.target.value.split(',');
    this.endtime = list[0];
    this.endtimeid = list[1];
  }



  Timeings: any;
  dummtimings: any;

  // public GetTimings() {
  //   this.docservice.GetSlotMasterTimings().subscribe(
  //     data => {

  //       this.Timeings = data;
  //       this.dummtimings = data;
  //     }, error => {
  //     }
  //   )
  // }







  public getphysiotherapist() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.physiolist = data;
          this.dummphysiolist = data;
        }, error => {
        }
      )
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummphysiolist = data;
          this.physiolist = this.dummphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }
  }

  public hospitalname: any;

  public GetphysioID(even) {

    this.physioid = even.target.value;
    
    var list1 = this.dummphysiolist.filter(x => x.physiotherapyID == this.physioid)
    this.physihospitalid = list1[0].id,
      this.hospitalid = list1[0].hospitalClinicID,
      this.hospitalname = list1[0].hospital_ClinicName
    this.physioname = list1[0].name
    

  }



  public qwerty = [];
  public idcount: any;
  public tablecount: any;


  public adddetails() {
    var entity = {
      'Sno': this.idcount,
      'PhysioID': this.physioid,
      'PhysioHospitalID': this.physihospitalid,
      'HospitalID': this.hospitalid,
      'HomeVisitFees': this.homevisitfee,
      'StartTime': this.starttime,
      'EndTime': this.endtime,
      'Physioname': this.physioname,
      'StartTimeID':this.strttimeid
    }
    this.qwerty.push(entity);
    this.idcount = this.idcount + 1;
    this.tablecount = 1;
    var mrngslots = this.Timeings.findIndex(x => x.id == this.endtimeid);
    this.Timeings = this.Timeings.slice(mrngslots, this.Timeings.length);
    this.starttime = "";
    this.endtime = "";
    this.endtimelist.length = 0;
    this.homevisitfee = "";
  }

  public insertdetails() {

    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'PhysioID': this.physioid,
        'PhysioHospitalID': this.physihospitalid,
        'HospitalID': this.hospitalid,
        'HomeVisitFees': this.qwerty[i].HomeVisitFees,
        'StartTime': this.qwerty[i].StartTime,
        'EndTime': this.qwerty[i].EndTime
      }
      this.docservice.InsertPhsyioTherapistCommissionDeatails(entity).subscribe(data => {
        if (data != 0) {

        }

      })
    }
    this.tablecount = 0;
    if (this.languageid == 1) {
      Swal.fire('Success', 'Details Saved Successfully');
       location.href = "#/PhysiFeedash"
    }
    if (this.languageid == 6) {
      Swal.fire('', 'Mis à jour avec succès !');
     location.href = "#/PhysiFeedash"
    }
    // else {
    //   if (this.languageid == 1) {
    //     location.href = "#/PhysiFeedash"
    //     Swal.fire("This Service Already Exists");
    //   }
    //   else if (this.languageid == 6) {
    //    location.href = "#/PhysiFeedash"
    //     Swal.fire("Ce service existe déjà");
    //   }

    // }

  }


  physiofeeslist: any;
  physioname: any;

  public GetphysioFees() {
    this.docservice.GetPhsyioTherapistCommissionDeatails(this.languageid).subscribe(
      data => {

        this.physiofeeslist = data;
        var list2 = this.physiofeeslist.filter(x => x.id == this.id)
        this.hospitalname = list2[0].hospital_ClinicName,
          this.homevisitfee = list2[0].homeVisitFees,
          this.physiofee = list2[0].physioFee,
          this.voiladoccommission = list2[0].voilaDocCommission,
          this.physioname = list2[0].name,
          this.starttime=list2[0].startTime,
          this.endtime=list2[0].endTime
      }, error => {
      }
    )
  }



  public updatedetails() {
    var entity1 = {
      'ID': this.id,
      'HomeVisitFees': this.homevisitfee,
      'PhysioFee': this.physiofee,
      'VoilaDocCommission': this.voiladoccommission
    }
    this.docservice.UpdatePhsyioTherapistCommissionDeatailsweb(entity1).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        location.href = "#/PhysiFeedash"
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
        location.href = "#/PhysiFeedash"
      }
    })
  }


  public physiolist1: any;

  public GetIndependentPhysiotherapist(even) {
    if (even.target.value == 1) {
      
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {
          this.dummphysiolist = data;
          this.physiolist1 = this.dummphysiolist.filter(x => x.hospitalClinicID != 613)
        }, error => {
        }
      )
    }
    else if (even.target.value == 2) {
      this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummphysiolist = data;
          this.physiolist1 = this.dummphysiolist.filter(x => x.hospitalClinicID == 613)
        }, error => {
        }
      )
    }
  }


  
  public delete(Sno) {
    
    for (let i = 0; i < this.qwerty.length; i++) {
      if (Sno == this.qwerty[i].Sno) {
      
        var mrngslots = this.dummtimings.findIndex(x => x.id ==  this.qwerty[i].StartTimeID);
        this.Timeings = this.dummtimings.slice(mrngslots, this.dummtimings.length);
        
        this.qwerty.splice(i, 1);
      }
    }
    if (this.qwerty.length == 0) {
      this.tablecount = 0;
    }

  }
}
