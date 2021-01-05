import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { DocDashboardDetailsComponent } from '../../Doctor/doc-dashboard-details/doc-dashboard-details.component';
@Component({
  selector: 'app-payment-link-dashboard',
  templateUrl: './payment-link-dashboard.component.html',
  styleUrls: ['./payment-link-dashboard.component.css']
})
export class PaymentLinkDashboardComponent implements OnInit {
  languageid: any;
  labels: any;
  paymentlinklist: any;
  term: any;
  public count: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetLables();
    this.GetPaymentlink();
  }
  public GetLables() {
    this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
        data => {

            this.labels = data;
        },
        error => { }
    );
}

public GetPaymentlink() {
    this.docservice.GetDiagnosticPaymentLinkMaster(localStorage.getItem('diagnosticid')).subscribe(data => {
        this.paymentlinklist = data;
        this.count = this.paymentlinklist.length;
    })
}

public Delete(id) {

    this.docservice.DeleteDiagnosticPaymentLinkMaster(id).subscribe(data => {
        if (data != undefined) {
            this.GetPaymentlink();
            if (this.languageid == 1) {
                Swal.fire("Deleted Successfully");
            }
            else {
                Swal.fire("Supprimé avec Succès")
            }
        }
    })
}

}
