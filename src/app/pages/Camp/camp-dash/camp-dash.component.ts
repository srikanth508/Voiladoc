import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-camp-dash',
  templateUrl: './camp-dash.component.html',
  styleUrls: ['./camp-dash.component.css']
})
export class CampDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public camplist: any;
  public term: any;
  p: number = 1;
  public id: any;

  ngOnInit() {
    this.gethospitalclinicamp();
  }

  public gethospitalclinicamp() {
   
    this.docservice.GetHospital_ClinicCamp().subscribe(
      data => {
       
        this.camplist = data;
      }, error => {
      }
    )
  }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }
  public DeletehosipitalClinicCamp(id) {
   
    this.docservice.DeleteHospital_ClinicCamp(id).subscribe(
      data => {
       
        this.gethospitalclinicamp();
        
       Swal.fire("Deleted Successfully");
    
      }, error => {
      }
    )
  }
}
