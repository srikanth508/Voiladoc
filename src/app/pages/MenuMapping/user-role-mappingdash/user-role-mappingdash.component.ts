import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-role-mappingdash',
  templateUrl: './user-role-mappingdash.component.html',
  styleUrls: ['./user-role-mappingdash.component.css']
})
export class UserRoleMappingdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public search: any;


  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
  }

}
