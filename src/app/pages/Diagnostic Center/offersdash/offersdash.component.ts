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
       
        this.labels = data;
      }, error => {
      }
    ) 
  }




  public getdiagnosticofferbydiagnosticid() {
   
    this.docservice.GetDiagnosticOfferByDiagnosticID(this.diagnosticid).subscribe(
      data => {
       
        this.diagnosticlist = data;
      }, error => {
      }
    )
  }
  public deletediagnosticoffers(id)
  {
   
    this.docservice.DeleteDiagnosticOffer(id).subscribe(
      data => {
       
        Swal.fire("Deleted Successfully");
        this.getdiagnosticofferbydiagnosticid();
      }, error => {
      }
    )

  }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }
}
