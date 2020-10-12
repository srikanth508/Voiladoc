import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.css']
})
export class PatientChatComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public patientiddd: any;
  public appointmentiddd: any;
  public appointmentdatetimee: any;
  public details: any;
  public doctorid: any;
  public chatconversation = "";
  public serverdate: any;
  public servertime: any;
  public serverdateandtime: any;
  public docmsges = [];
  public patientmsges = [];
  public istyping = false;
  public coversationarray = [];
  public patientname: any;
  public mobileno: any;
  public patientphoto: any;
  public docphoto: any;
  public chatID: any;
  public attachments = [];
  public attachmentsurl = [];
  public imageurl: any;
  public image: any;

  ngOnInit() {

    this.activatedroute.params.subscribe(params => {
     
      this.doctorid = params['docid'];
      this.patientiddd = params['patid'];

    }
    )
    this.image = 0;
    //this.doctorid = localStorage.getItem('userid');
    //this.doctorid = 394;
    // this.patientiddd = localStorage.getItem('patientID');
    //this.patientiddd = 421;
    // this.appointmentiddd = localStorage.getItem('appointmentID');
   
    this.docservice.GetChatID(this.doctorid, this.patientiddd).subscribe(res => {
     
      this.chatID = res;
      this.getPreviousChat();
      this.oberserableTimer();
      this.getserverdateandtime();
      this.GetDetails();
      this.appointmentiddd = 570;
      this.appointmentdatetimee = localStorage.getItem('appdate');
    })


  }

  public getserverdateandtime() {

    this.docservice.GetServerDateAndTime().subscribe(
      data => {

        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
      }
    )
  }

  public GetDetails() {
   
    this.docservice.GetBookAppointmentDetailsByID(this.appointmentiddd, this.doctorid, this.patientiddd).subscribe(
      data => {
        this.details = data[0];
        this.patientname = this.details.patientName,
          this.mobileno = this.details.mobileNumber,
          this.patientphoto = this.details.photoURL,
          this.docphoto = this.details.docphoto
      }, error => {
      }
    )
  }

  public dosendmsg() {
    this.getChat();
  }

  public getChat() {
    this.docservice.GetChatID(this.doctorid, this.patientiddd).subscribe(res => {
     

      if (res.length > 0) {
        this.chatID = res;
        this.InsertChatDetails();
      }
      else {
        var entity = {
          'DoctorID': this.doctorid,
          'PatientID': this.patientiddd
        }
        this.docservice.InsertChatMaster(entity).subscribe(data => {
         
          if (data != 0) {
            this.chatID = data;
            this.InsertChatDetails();
          }
        })
      }
    })
  }

  public InsertChatDetails() {
    let conversation = '[pat:-' + this.chatconversation + ';time:-' + this.servertime + ']';
   
    if (this.image == 0) {
      var entity = {
        'ChatID': this.chatID,
        'Message': conversation,
        'SenderID': this.patientiddd,
        'Sender': 'Patient',
        'MessageType': 1
      }
      this.docservice.InsertChatDetails(entity).subscribe(data => {
       
        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();

      })
    }
    else {
      var entitys = {
        'ChatID': this.chatID,
        'Message': this.imageurl,
        'SenderID': this.patientiddd,
        'Sender': 'Patient',
        'MessageType': 2
      }
      this.docservice.InsertChatDetails(entitys).subscribe(data => {
       
        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();

      })
    }
  }


  // public updatechat(conversation, appointmentid) {
  //   if (conversation == null) {
  //     conversation = "";
  //   }
  //   conversation = conversation + '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';
  //   var entity = {
  //     'AppointmentID': appointmentid,
  //     'ChatConversation': conversation,
  //   }
  //   this.docservice.UpdateDoctor_PatientChat(entity).subscribe(res => {
  //    
  //     let ttt = res;
  //     this.chatconversation = "";
  //     this.getPreviousChat();

  //   })
  // }

  public getPreviousChat() {
    this.docservice.GetChatDetails(this.chatID).subscribe(res => {
      let Chatconversation = res;
     
      this.coversationarray.length = 0;

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].Message.includes('[doc:-')) {

          var msg = Chatconversation[i].Message.substring(
            Chatconversation[i].Message.lastIndexOf("[doc:-") + 6,
            Chatconversation[i].Message.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].Message.substring(
            Chatconversation[i].Message.lastIndexOf("time:-") + 6,
            Chatconversation[i].Message.lastIndexOf("time:-") + 7 + 8
          );

          this.coversationarray.push({ user: 'doc', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].MessageType })
        }
        else if (Chatconversation[i].Message.includes('[pat:-')) {

          var msg = Chatconversation[i].Message.substring(
            Chatconversation[i].Message.lastIndexOf("[pat:-") + 6,
            Chatconversation[i].Message.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].Message.substring(
            Chatconversation[i].Message.lastIndexOf("time:-") + 6,
            Chatconversation[i].Message.lastIndexOf("time:-") + 7 + 8
          );
          this.coversationarray.push({ user: 'pat', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].MessageType })
        }
        else {

          if (Chatconversation[i].Sender == 'Patient') {
            this.coversationarray.push({ user: 'pat', chatmsg: Chatconversation[i].Message, time: chattime, msgtype: Chatconversation[i].MessageType })
          }
          if (Chatconversation[i].Sender == 'Doctor') {
            this.coversationarray.push({ user: 'doc', chatmsg: Chatconversation[i].Message, time: chattime, msgtype: Chatconversation[i].MessageType })
          }
        }
      }




    })
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {

      this.getPreviousChat();
      this.updateusertyping();
      this.getusertyping();
      var objDiv = document.getElementById("chatboxdiv");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  public updateusertyping() {
    if (this.chatconversation.length > 0) {
      this.docservice.UpdateIsTyping(this.appointmentiddd, true).subscribe(res => {
        let tt = res;
      })
    }
    else {
      this.docservice.UpdateIsTyping(this.appointmentiddd, false).subscribe(res => {
        let tt = res;
      })
    }
  }

  public getusertyping() {
    this.docservice.getChat(this.doctorid, this.patientiddd).subscribe(res => {
     
      let isUserTyping = res.filter(x => x.appointmentID == this.appointmentiddd);
      this.istyping = isUserTyping[0].isTyping;
      var objDiv = document.getElementById("chatboxdiv");
      objDiv.scrollTop = objDiv.scrollHeight;
    })
  }


  public onattachmentUpload(abcd) {
   
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
     
      let b = 'https://14.192.17.225' + a;
      this.imageurl = b;
      this.image = 1;
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
  }

}
