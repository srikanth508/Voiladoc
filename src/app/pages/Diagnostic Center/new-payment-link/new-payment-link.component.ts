import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-payment-link',
  templateUrl: './new-payment-link.component.html',
  styleUrls: ['./new-payment-link.component.css']
})
export class NewPaymentLinkComponent implements OnInit {
  languageid: any;
  id: any;
  showbit: any;
  paymentlinklist: any;
  paymentlink: any;
  labels: any;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {

        this.id = params['id'];
        if (this.id == undefined) {
            this.showbit = 0;
        }
        else if (this.id != undefined) {
            this.showbit = 1;
            this.docservice.GetDiagnosticPaymentLinkMaster(localStorage.getItem('diagnosticid')).subscribe(data => {
                this.paymentlinklist = data;
                var list = this.paymentlinklist.filter(x => x.id == this.id);
                this.paymentlink = list[0].paymentLink
            })
        }
    }
    )
    this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
        data => {

            this.labels = data;
        },
        error => { }
    );
  }

  public InsertDetailes() {
    var entity = {
        DiagnosticID: localStorage.getItem('diagnosticid'),
        PaymentLink: this.paymentlink
    }
    this.docservice.InsertDiagnosticPaymentLinkMaster(entity).subscribe(res => {
        if (this.languageid == 1) {
            Swal.fire('Success', 'Added Successfully')
            location.href = "#/PaymentLinkDash"
        }
        else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec Succés');
            location.href = "#/PaymentLinkDash"
        }
    })
}
public UpdateDetailes() {
    var entity = {
        ID: this.id,
        DiagnosticID: localStorage.getItem('diagnosticid'),
        PaymentLink: this.paymentlink
    }
    this.docservice.UpdateDiagnosticPaymentLinkMaster(entity).subscribe(res => {
        if (this.languageid == 1) {
            Swal.fire('Success', 'Updated Successfully')
            location.href = "#/PaymentLinkDash"
        }
        else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec Succés')
            location.href = "#/PaymentLinkDash"
        }
    })
}
}
