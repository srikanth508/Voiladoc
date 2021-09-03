import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate, ɵNullViewportScroller } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-new-appointment',
    templateUrl: './new-appointment.component.html',
    styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
    testlist: any;
    type: number;
    idcount: number;
    appointmentid: any;
    constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
    public patientdd = {}
    public patientslist: any;
    public patientid: any;
    languageid: any;
    labels: any;
    diagnosticid: any;
    labels1: any;
    SelectLabel: any;
    options: NgDateRangePickerOptions;
    packageslist: any;
    public todaydate: any;
    SDate = new Date();
    EDate = new Date();
    startdate: any;
    enddate: any;
    value: any;
    public today = new Date();
    dayidslist: any;
    dayid: any;
    morningslotslist: any;
    afternoonslotslist: any;
    eveningslotslist: any;
    nigntslotslist: any;
    selectedtestlist = [];
    selectedpackagelist = [];
    allselectedtestandpakages = [];
    table: number;
    totalamount: any;
    homesample: boolean;
    diagnosticslotid: any;
    slotname: any;
    ngOnInit() {

        this.type = 1;

        this.idcount = 1;
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

        var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
        var lll = this.EDate.setDate(this.EDate.getDate() + 7);

        const format = 'yyyy-MM-dd';
        const myDate = new Date();
        const locale = 'en-US';
        this.todaydate = formatDate(myDate, format, locale);
        this.selecteddate = this.todaydate;
        this.diagnosticid = localStorage.getItem('diagnosticid');
        this.startdate = formatDate(kkk, format, locale);
        this.enddate = formatDate(lll, format, locale);
        this.languageid = localStorage.getItem('LanguageID');
        this.diagnosticid = localStorage.getItem('diagnosticid');

        // document.getElementById("defaultOpen").style.display = "block";

        this.docservice.GetDiagnosticCenterTestsByID(this.diagnosticid, this.languageid).subscribe(data => {
            this.testlist = data;
        })
        //  document.getElementById("def_open").click();
        this.Getlanagage();
        this.GetPatients();
      
        var gsDayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        var d = new Date(this.todaydate);
        var dayName = gsDayNames[d.getDay()];
        this.docservice.GetDayID(dayName).subscribe(data => {

            this.dayidslist = data;
            this.dayid = this.dayidslist[0].dayID;

            this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.todaydate, 1, this.dayid).subscribe(
                data => {

                    this.morningslotslist = data;
                }, error => {
                }
            )
            this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.todaydate, 2, this.dayid).subscribe(
                data => {

                    this.afternoonslotslist = data;
                }, error => {
                }
            )
            this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.todaydate, 3, this.dayid).subscribe(
                data => {

                    this.eveningslotslist = data;
                }, error => {
                }
            )
            this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.todaydate, 4, this.dayid).subscribe(
                data => {

                    this.nigntslotslist = data;
                }, error => {
                }
            )
        })
    }
    search: any;

    public Getlanagage() {
        this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
            data => {

                this.labels = data;
                this.SelectLabel = this.labels[0].select;
                this.search = this.labels[0].search

            }, error => {
            }
        )

        this.docservice.GetAdmin_DiagnosticLoginOrdersAndOrderReport_Label(this.languageid).subscribe(
            data => {

                this.labels1 = data;
            }, error => {
            }
        )
    }
    public GetPatients() {
        this.docservice.GetDiagnosticpatients(this.diagnosticid).subscribe(
            data => {

                this.patientslist = data;

                this.patientdd = {
                    singleSelection: true,
                    idField: 'patientID',
                    textField: 'patientName',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    itemsShowLimit: 3,
                    allowSearchFilter: true,
                    searchPlaceholderText: this.search,
                };
            },
            error => { }
        );
    }

    patientname: any;
    public GetPatientID(item: any) {

        this.patientid = item.id;
        var list = this.patientslist.filter(x => x.id == this.patientid)
        this.patientname = list[0].patientName
    }

    public openCity(evt, cityName) {

        var i, tabcontent, tablinks;
        if (cityName == "Tests") {
            this.type = 1;
            this.docservice.GetDiagnosticCenterTestsByID(this.diagnosticid, this.languageid).subscribe(data => {
                this.testlist = data;
            })
        }
        else {
            this.type = 2;
            this.docservice.GetDiagnosticPackagesByIDMob(this.diagnosticid, this.languageid).subscribe(data => {
                this.packageslist = data;
            })
        }
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }


    public GetSelectedTests(even, list) {
        ;
        if (even.target.checked == true) {
            this.selectedtestlist.push(list);
        }
        else {
            ;
            for (let k = 0; k < this.selectedtestlist.length; k++) {
                var index = this.selectedtestlist.indexOf(this.selectedtestlist);
                ;
                if (index === -1) {
                    ;
                    this.selectedtestlist.splice(index, 1);
                } else {
                    this.selectedtestlist.push(this.selectedtestlist);
                }
            }
        }
    }
    public GetSelectedPackages(even, list) {
        ;
        if (even.target.checked == true) {
            this.selectedpackagelist.push(list);
        }
        else {
            ;
            for (let k = 0; k < this.selectedpackagelist.length; k++) {
                var index = this.selectedpackagelist.indexOf(this.selectedpackagelist);
                ;
                if (index === -1) {
                    ;
                    this.selectedpackagelist.splice(index, 1);
                } else {
                    this.selectedpackagelist.push(this.selectedpackagelist);
                }
            }
        }
    }

    public AddAll() {
        ;
        this.table = 1;
        if (this.type == 1) {
            for (let i = 0; i < this.selectedtestlist.length; i++) {
                var testentity = {
                    Sno: this.idcount,
                    TestID: this.selectedtestlist[i].id,
                    Testorpackage: this.selectedtestlist[i].testName,
                    Price: this.selectedtestlist[i].price,
                    PackageID: null
                }
                this.allselectedtestandpakages.push(testentity);
                this.idcount = this.idcount + 1;
                this.totalamount = this.allselectedtestandpakages.map(a => a.Price).reduce(function (a, b) {
                    return a + b;
                });
            }
            this.selectedtestlist = [];
        }
        else {
            for (let i = 0; i < this.selectedpackagelist.length; i++) {
                var packgeentity = {
                    Sno: this.idcount,
                    TestID: null,
                    Testorpackage: this.selectedpackagelist[i].packageName,
                    Price: this.selectedpackagelist[i].price,
                    PackageID: this.selectedpackagelist[i].id
                }
                this.allselectedtestandpakages.push(packgeentity);
                this.idcount = this.idcount + 1;
                this.totalamount = this.allselectedtestandpakages.map(a => a.Price).reduce(function (a, b) {
                    return a + b;
                });
            }
            this.selectedpackagelist = [];
        }

    }

    public delete(Sno) {

        for (let i = 0; i < this.allselectedtestandpakages.length; i++) {

            if (Sno == this.allselectedtestandpakages[i].Sno) {

                this.allselectedtestandpakages.splice(i, 1);
                this.totalamount = this.allselectedtestandpakages.map(a => a.Price).reduce(function (a, b) {
                    return a + b;
                });
            }
        }

    }

    public slottime: any;

    public BookAppointment() {

        var entity = {
            PatientID: this.patientid,
            DiagnosticCenterID: this.diagnosticid,
            DiagnosticSlotID: this.diagnosticslotid,
            Date: this.todaydate,
            TotalPrice: this.totalamount,
            HomeSampleBit: this.homesample,
            DiagnopatientNmae: this.patientname,
            SlotTime: this.slotname
        }

        this.docservice.InsertDiagnosticAppointments(entity).subscribe(data => {
            this.appointmentid = data;

            ;
            if (data != undefined) {
                for (let k = 0; k < this.allselectedtestandpakages.length; k++) {
                    var entity2 = {
                        DiagnosticCenterTestsID: this.allselectedtestandpakages[k].TestID,
                        PackageID: this.allselectedtestandpakages[k].PackageID,
                        DiagnosticAppointmentsID: this.appointmentid
                    }
                    this.docservice.InsertDiagnosticBookedTests(entity2).subscribe(data => {

                        if (data != undefined) {

                        }
                    })
                }
            }
            if (this.languageid == 1) {
                Swal.fire("Booked Successfully");
                location.href = "#/DiagnosticAppointmentDash";
            }
            else {
                Swal.fire("Réservé");
                location.href = "#/DiagnosticAppointmentDash";
            }

        })
    }

    public GetDiagnosticSlotID(slist) {
        ;
        this.diagnosticslotid = slist.id;
        this.slotname = slist.slotName;
    }
    selecteddate: any;
    selectedDate(even) {

        this.selecteddate = even.toLocaleString().split(',')[0];
        if (this.homesample == true) {

            var gsDayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            var d = new Date(this.todaydate);
            var dayName = gsDayNames[d.getDay()];
            this.docservice.GetDayID(dayName).subscribe(data => {

                this.dayidslist = data;
                this.dayid = this.dayidslist[0].dayID;
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 1, this.dayid).subscribe(
                    data => {

                        this.morningslotslist = data;
                        this.morningslotslist = this.morningslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 2, this.dayid).subscribe(
                    data => {

                        this.afternoonslotslist = data;
                        this.afternoonslotslist = this.afternoonslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 3, this.dayid).subscribe(
                    data => {

                        this.eveningslotslist = data;
                        this.eveningslotslist = this.eveningslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 4, this.dayid).subscribe(
                    data => {

                        this.nigntslotslist = data;
                        this.nigntslotslist = this.nigntslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )

            })

        }
        else {
            var gsDayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            var d = new Date(this.todaydate);
            var dayName = gsDayNames[d.getDay()];
            this.docservice.GetDayID(dayName).subscribe(data => {

                this.dayidslist = data;
                this.dayid = this.dayidslist[0].dayID;
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 1, this.dayid).subscribe(
                    data => {

                        this.morningslotslist = data;
                        this.morningslotslist = this.morningslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 2, this.dayid).subscribe(
                    data => {

                        this.afternoonslotslist = data;
                        this.afternoonslotslist = this.afternoonslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 3, this.dayid).subscribe(
                    data => {

                        this.eveningslotslist = data;
                        this.eveningslotslist = this.eveningslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 4, this.dayid).subscribe(
                    data => {

                        this.nigntslotslist = data;
                        this.nigntslotslist = this.nigntslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )

            })

        }
    }


    public onChange() {
        ;
        if (this.homesample == true) {
            var gsDayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            var d = new Date(this.todaydate);
            var dayName = gsDayNames[d.getDay()];
            this.docservice.GetDayID(dayName).subscribe(data => {

                this.dayidslist = data;
                this.dayid = this.dayidslist[0].dayID;
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 1, this.dayid).subscribe(
                    data => {

                        this.morningslotslist = data;
                        this.morningslotslist = this.morningslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 2, this.dayid).subscribe(
                    data => {

                        this.afternoonslotslist = data;
                        this.afternoonslotslist = this.afternoonslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 3, this.dayid).subscribe(
                    data => {

                        this.eveningslotslist = data;
                        this.eveningslotslist = this.eveningslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 4, this.dayid).subscribe(
                    data => {

                        this.nigntslotslist = data;
                        this.nigntslotslist = this.nigntslotslist.filter(x => x.typeID == 1);
                    }, error => {
                    }
                )

            })

        }
        else {
            this.homesample = false
            var gsDayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            var d = new Date(this.todaydate);
            var dayName = gsDayNames[d.getDay()];
            this.docservice.GetDayID(dayName).subscribe(data => {

                this.dayidslist = data;
                this.dayid = this.dayidslist[0].dayID;
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 1, this.dayid).subscribe(
                    data => {

                        this.morningslotslist = data;
                        this.morningslotslist = this.morningslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 2, this.dayid).subscribe(
                    data => {

                        this.afternoonslotslist = data;
                        this.afternoonslotslist = this.afternoonslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 3, this.dayid).subscribe(
                    data => {

                        this.eveningslotslist = data;
                        this.eveningslotslist = this.eveningslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )
                this.docservice.GetDiagnosticSlotsWeb(this.diagnosticid, this.selecteddate, 4, this.dayid).subscribe(
                    data => {

                        this.nigntslotslist = data;
                        this.nigntslotslist = this.nigntslotslist.filter(x => x.typeID == 2);
                    }, error => {
                    }
                )

            })

        }
    }

}
