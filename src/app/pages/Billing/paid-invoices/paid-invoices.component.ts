import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-paid-invoices',
    templateUrl: './paid-invoices.component.html',
    styleUrls: ['./paid-invoices.component.css']
})
export class PaidInvoicesComponent implements OnInit {
    invoiceslist: any;
    term: any;
    type: any;
    show: number;
    totalamount:any;
    constructor(public docservice: HelloDoctorService) { }

    ngOnInit() {
        this.show = 0;
    }
    public Getsentinvoices(type) {
        this.docservice.GetSentInvoice(type).subscribe(data => {
            this.invoiceslist = data;
            this.invoiceslist = this.invoiceslist.filter(x => x.paid == 1);
            this.totalamount = this.invoiceslist.map(a => a.paidAmount).reduce(function(a, b) {
                return a + b;
              });
        })
    }

    public GetType(even) {
        this.show = 1;
        this.type = even.target.value;
        this.Getsentinvoices(this.type);
    }
}
