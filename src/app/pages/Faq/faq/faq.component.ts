import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public description: any;
  public id: any;
  public showbit: any;
  public faq: any;
  public faqlist: any;
  public term: any;
  public labels: any;
  public dropzonelable: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
    this.activatedroute.params.subscribe(params => {


      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
        this.getfaq()
      }
    }
    )
    this.description = "";
    this.typeid = 0;


    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }
  public getfaq() {
    this.docservice.GetFrequentlyAskedQuestions(this.languageid).subscribe(
      data => {

        this.faqlist = data;

        var list = this.faqlist.filter(x => x.id == this.id)
        this.faq = list[0].faq,
          this.description = list[0].answers,
          this.typeid = list[0].typeID
      }, error => {
      }
    )
  }

  public typeid: any;
  public faqid: any;

  public GetTypeID(even) {
    
    this.typeid = even.target.value;
  }

  public insertdetails() {
    if(this.typeid==0)
    {
      Swal.fire("Please Select Type")
    }
    else
    {
      var entity = {
        'Faq': this.faq,
        'answers': this.description,
        'LanguageID': this.languageid,
        'TypeID': this.typeid
      }
      this.docservice.InsertFrequentlyAskedQuestions(entity).subscribe(data => {
        if (data != 0) {
          this.faqid = data;
          this.insertattachments();
          Swal.fire('Success', 'Data Added Successfully')
          location.href = "#/FaqDash"
  
        }
      })
    }
   
  }


  public insertattachments() {
    
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'FaqID': this.faqid,
        'PhotoUrl': this.attachmentsurl[i]
      }
      this.docservice.InsertFAQ_Attachments(entity).subscribe(data => {
        
        if (data != 0) {
          // Swal.fire('Success', 'Data Added Successfully')
         

        }
      })
    }
  }




  public updatedetails() {

    var entity = {
      'ID': this.id,
      'Faq': this.faq,
      'answers': this.description,
      'TypeID': this.typeid
    }
    this.docservice.UpdateFrequentlyAskedQuestions(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Data Updated Successfully')
      location.href = "#/FaqDash"

    })
  }





  public dummshowsignatureurl = []
  public attachments = [];
  public attachmentsurl = [];
  public showphoto = [];

  public onattachmentUpload(abcd) {
    this.dummshowsignatureurl = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }


  public uploadattachments() {
    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      this.dummshowsignatureurl.push(res);
      let a = this.dummshowsignatureurl[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }
}
