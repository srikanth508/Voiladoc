import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-myfeedbacks',
  templateUrl: './myfeedbacks.component.html',
  styleUrls: ['./myfeedbacks.component.css']
})
export class MyfeedbacksComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public doctorid: any;
  public feedbacklist: any;
  public languageid:any;
  public term: any;
  public dummlist:any;
  p: number = 1;
public feedid:any;
public recomand:any;
public improve:any;
public feedlist:any;
public labels:any;



  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
  

   this.getdocfeedback11()
   this.languageid = localStorage.getItem('LanguageID');
   this.getlanguage();
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    ) 
  }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }
  public getdocfeedback11()
  {
    this.docservice.GetNewDoctorFeedBackByDoctorID(this.doctorid).subscribe(
      data => {
       
        this.feedlist = data;
        this.dummlist= this.feedbacklist
      }, error => {
      }
    )
  }
}



//   public getdocfeedback()
//   {
//     this.docservice.GetDoctorFeedById(this.doctorid,this.languageid).subscribe(
//       data => {
//        
//         this.feedbacklist = data;
//         this.dummlist= this.feedbacklist
//       }, error => {
//       }
//     )
//   }

//   public UpdateDoctorFeedbackRejectedBit(appointmentID) {
//    
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You Want to Reject This Appointment!",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Reject it!'
//     }).then((result) => {
//       if (result.value) {
//         this.docservice.UpdateDoctorFeedbackRejectedBit(appointmentID).subscribe(res => {
//           let test = res;
//           this.getdocfeedback()
//         })
//         Swal.fire(
//           'Deleted!',
//           'Feedback has been Rejected.',
//           'success'
//         )
//       }
//       else {
//         this.getdocfeedback()
//       }
//     })
//   }


  
//   public UpdateDoctorFeedbackAcceptedBit(appointmentID) {
//    
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You Want to Accept This Feedback!",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.value) {
//         this.docservice.UpdateDoctorFeedbackAcceptedBit(appointmentID).subscribe(res => {
//           let test = res;
//           this.getdocfeedback()
//         })
//         Swal.fire(
//           'Deleted!',
//           'Feedback has been Accepted.',
//           'success'
//         )
//       }
//       else {
//         this.getdocfeedback()
//       }
//     })
//   }





//   public getget(even) {
//     // this.featurelist.find(item => item.featureID == fid).checkbox = true;
//    
//     if (even.target.value == 1) {
//      
//       let dfsfd = this.dummlist.filter(x => x.accepted == 1);
//      
//       this.feedbacklist = dfsfd;
     
//     }
//     if (even.target.value == 2) {
//      
//       let dfsfd = this.dummlist.filter(x => x.rejected == 1);
//      
//       this.feedbacklist = dfsfd;
     
//     }
 

//   }







//   public UpdateDoctorFeedbackSwitchEnable(appointmentID) {
//    
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You Want to Enable This Feedback!",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Enable it!'
//     }).then((result) => {
//       if (result.value) {
//         this.docservice.UpdateDoctorFeedbackSwitchEnable(appointmentID).subscribe(res => {
//           let test = res;
//           this.getdocfeedback()
//         })
//         Swal.fire(
//           'Yes!',
//           'Feedback has been Enabled.',
//           'success'
//         )
//       }
//       else {
//         this.getdocfeedback()
//       }
//     })
//   }

//   public UpdateDoctorFeedbackSwitchDisable(appointmentID) {
//    
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You Want to Disable This Feedback!",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.value) {
//         this.docservice.UpdateDoctorFeedbackSwitchDisable(appointmentID).subscribe(res => {
//           let test = res;
//           this.getdocfeedback()
//         })
//         Swal.fire(
//           'Yes!',
//           'Feedback has been Disabled.',
//           'success'
//         )
//       }
//       else {
//         this.getdocfeedback()
//       }
//     })
//   }

//   public GetFeedbackID(id)
//   {
//    
//     this.feedid=id;
//     var list=this.feedbacklist.filter(x=>x.id=this.feedid)
//     this.recomand=list[0].isDoctorRecomended,
//     this.improve=list[0].improvementID
//   }
// }


