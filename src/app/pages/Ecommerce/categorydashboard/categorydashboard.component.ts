import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from 'src/app/hello-doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorydashboard',
  templateUrl: './categorydashboard.component.html',
  styleUrls: ['./categorydashboard.component.css']
})
export class CategorydashboardComponent implements OnInit {

  public catgeorylist: any;
  public CID: any;
  public term;
  public p;
  public languageid: any;
  constructor(public docservice: HelloDoctorService, private _router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.Getcategoryfordashboard();
    this.CID = this.ActivatedRoute.snapshot.params['id'];
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid)


  }


  labels
  public getlanguage1(LanguageID) {
    debugger;
    this.docservice.GetCategorydashboard_Labels(LanguageID).subscribe(
      data => {
        debugger;
        this.labels = data;
      },
      error => { }
    );
  }

  Getcategoryfordashboard() {
    debugger
    this.docservice.Getcategoryfordashboard().subscribe((res) => {
      this.catgeorylist = res;
    });
  }

  public DeleteCategory(id) {
    debugger
    this.docservice.DeleteCategory(id).subscribe(
      data => {
        debugger
        Swal.fire("Deleted Successfully");
        this.Getcategoryfordashboard()
      }, error => {
      }
    )
  }
}
