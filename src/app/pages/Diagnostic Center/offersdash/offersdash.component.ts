import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-offersdash',
  templateUrl: './offersdash.component.html',
  styleUrls: ['./offersdash.component.css']
})
export class OffersdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public diagnosticid: any;
  public diagnosticlist: any;
  public term: any;
  p: number = 1;
  public languageid:any;
  public labels:any;
  ngOnInit() {

    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.getdiagnosticofferbydiagnosticid();

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
  }


  public getlanguage()
  {
    this.docservice.GetAdmin_PharmacyLoginOffers_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    ) 
  }




  public getdiagnosticofferbydiagnosticid() {
    debugger
    this.docservice.GetDiagnosticOfferByDiagnosticID(this.diagnosticid).subscribe(
      data => {
        debugger
        this.diagnosticlist = data;
      }, error => {
      }
    )
  }
  public deletediagnosticoffers(id)
  {
    debugger
    this.docservice.DeleteDiagnosticOffer(id).subscribe(
      data => {
        debugger
        Swal.fire("Deleted Successfully");
        this.getdiagnosticofferbydiagnosticid();
      }, error => {
      }
    )

  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }
}
