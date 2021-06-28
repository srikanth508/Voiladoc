import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-enable-local-doctor',
  templateUrl: './enable-local-doctor.component.html',
  styleUrls: ['./enable-local-doctor.component.css']
})
export class EnableLocalDoctorComponent implements OnInit {
  public languageid: any;
  public labels: any;
  public localdoclist: any;
  public term: any;
  p: number = 1;
  public count:any;
  public enabledisable:any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        
        this.labels = data;
      }, error => {
      }
    )
    this.getlocaldoctors();
  }
  public pageChanged(even) {
    
    let fgdgfgd = even;
    this.p = even;
  }


  public getlocaldoctors() {
    this.docservice.GetLocalDoctorRegistration(this.languageid).subscribe(
      data => {
        
        this.localdoclist = data;
        this.enabledisable=this.localdoclist[0].enableDisable
        this.count= this.localdoclist.length
      }, error => {
      }
    )
  }


  
public deletedoctorregistration(id) {
  ;
  Swal.fire({
    title: 'Are you sure?',
    text: "You Want to Delete This Doctor!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.docservice.DeleteLocalDoctorRegistration(id).subscribe(res => {
        let test = res;
        this.getlocaldoctors();
      })
      Swal.fire(
        'Deleted!',
        'Doctor has been deleted.',
        'success'
      )
    }
    else {
      this.getlocaldoctors();
    }
  })
}


public enablelocaldoc()
{
  this.docservice.GetLocalDoctorRegistrationEnable().subscribe(res => {
    let test = res;
    this.getlocaldoctors();
    Swal.fire('Success','Local Doctors Enabled Successfully')
  })
}

public disablelocaldoc()
{
  this.docservice.GetLocalDoctorRegistrationDisable().subscribe(res => {
    let test = res;
    this.getlocaldoctors();
    Swal.fire('Success','Local Doctors Disabled Successfully')
  })
}
}
