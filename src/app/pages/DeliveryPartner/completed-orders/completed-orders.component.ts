import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public deliverycompanyid: any;
  public orderlist: any;
  public term: any;
  p: number = 1;
  public cancelid: any;
  public reason: any;
  public partnerlist: any;
  public medicalorderid: any;

  public labels: any;
  public languageid: any;
  public ordertype: any;
  public todaydate: any;

  startdate: any;
  enddate: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  labels1:any;
  ngOnInit() {
    this.Ordertypeid = 0;
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };



    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    var kkk = this.SDate.setDate(this.SDate.getDate() - 1);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.deliverycompanyid = localStorage.getItem('deliveryid');
    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.Getadmin_DeliveryLoginsOrdersEmployee_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.GetOrdersForDeliveryCompany();
    this.docservice.GetDeliveryPartnersByID(this.deliverycompanyid).subscribe(
      data => {
        debugger
        this.partnerlist = data;
      }, error => {
      }
    )

    
this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
  data => {
    debugger
    this.labels1 = data;
  }, error => {
  }
)



    this.getlanguage();
  }

  public getlanguage() {
    this.docservice.Getadmin_DeliveryLoginsOrdersEmployee_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }




  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }

  public GetOrdersForDeliveryCompany() {
    this.docservice.GetOrdersForDeliveryCompany(this.startdate, this.enddate).subscribe(
      data => {
        debugger
        let temp: any = data;
        this.orderlist = temp.filter(x => x.deliveredBit == 1);
      }, error => {
      }
    )
  }
  selectedDate(data) {
    debugger
    // var sdate=data.split('-')
    // this.startdate=sdate[0]
    // this.enddate=sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetOrdersForDeliveryCompany();
  }


  public acceptdelete(type, medicalOrderID, ar, id) {


    if (type == 1) {
      this.docservice.AccpetMedicineDeliveryByDeliveryCompany(medicalOrderID, ar, id).subscribe(
        data => {
          debugger
          Swal.fire('Complete', 'Action Completed');
          this.GetOrdersForDeliveryCompany();
        }, error => {
        }
      )
    }
    else {
      this.docservice.AccpetShoppingDeliveryByDeliveryCompany(ar, id).subscribe(
        data => {
          debugger
          Swal.fire('Complete', 'Action Completed');
          this.GetOrdersForDeliveryCompany();
        }, error => {
        }
      )
    }


  }


  public getid(type, mid) {
    this.ordertype = type;
    this.medicalorderid = mid;
  }

  public asssign(pid) {


    if (this.ordertype == 1) {
      var entity = {
        'MedicineOrderID': this.medicalorderid,
        'DeliveryCompanyID': this.deliverycompanyid,
        'PartnerID': pid,
        'Status': 'Assigned'
      }
      this.docservice.InsertDeliveryPartnerAssignedOrders(entity).subscribe(res => {
        let test = res;
        Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
        this.GetOrdersForDeliveryCompany();
      })
    }
    else {
      var entitytwo = {
        'OrderID': this.medicalorderid,
        'DeliveryCompanyID': this.deliverycompanyid,
        'PartnerID': pid,
        'Status': 'Assigned'
      }
      this.docservice.InsertDeliveryPartnerAssignedShoppingOrders(entitytwo).subscribe(res => {
        let test = res;
        Swal.fire(' Assigned', 'Order Assigned to delivery partner.');
        this.GetOrdersForDeliveryCompany();
      })
    }

  }
  public getglmasterexcel() {
    // let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(this.orderlist, "Completed Orders List");
  }

  public tableToJson(table) {
    debugger
    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    debugger;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  Ordertypeid
  public GetOrdertypeidID(event) {
    this.Ordertypeid = event.target.value;
    if (this.Ordertypeid == 0) {
      this.GetOrdersForDeliveryCompany();
    }
    else {
      this.docservice.GetOrdersForDeliveryCompany(this.startdate, this.enddate).subscribe(
        data => {
          debugger
          let temp: any = data;
          this.orderlist = temp.filter(x => x.deliveredBit == 1 && x.ordertypeid == this.Ordertypeid);
        }, error => {
        }
      )
    }
  }

}
