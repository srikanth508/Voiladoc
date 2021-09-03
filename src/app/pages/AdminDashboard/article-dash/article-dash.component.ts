import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-article-dash',
  templateUrl: './article-dash.component.html',
  styleUrls: ['./article-dash.component.css']
})
export class ArticleDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public articlelist: any;
  labels: any;
  languageid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetArticles()
    this.getlanguage()
  }



  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  labels1:any;

  public GetArticles() {
    this.docservice.GetArticleForAdminForWeb().subscribe(
      data => {

        this.articlelist = data;
      },
      error => { }
    );
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }




  public GetDisableArticle(id) {
    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Disable This Article!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Disable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetDisableArticle(id).subscribe(res => {
            let test = res;
            this.GetArticles();
          })
          Swal.fire(
            'Disabled!',
            'Article has been Disabled.',
            'success'
          )
        }
        else {
          this.GetArticles();
        }
      })

    }
    else
    {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, désactiver !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetDisableArticle(id).subscribe(res => {
            let test = res;
            this.GetArticles();
          })
          Swal.fire(
            '',
            'Désactivé avec succès',
            'success'
          )
        }
        else {
          this.GetArticles();
        }
      })
    }

  
  }


  public GetEnableArticle(id) {
    ;
    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Enable This Article!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Enable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetEnableArticle(id).subscribe(res => {
            let test = res;
            this.GetArticles();
          })
          Swal.fire(
            'Enabled!',
            'Article has been Enabled.',
            'success'
          )
        }
        else {
          this.GetArticles();
        }
      })
    }
    else{
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Activer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetEnableArticle(id).subscribe(res => {
            let test = res;
            this.GetArticles();
          })
          Swal.fire(
            '',
            'Activé avec succès',
            'success'
          )
        }
        else {
          this.GetArticles();
        }
      })
    }
   
  }











  public DeleteArticle(id) {
    if(this.languageid==1)
    {
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Article!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteArticle(id).subscribe(res => {
            let test = res;
            this.GetArticles();
          })
          Swal.fire(
            'Deleted!',
            'Article has been Deleted.',
            'success'
          )
        }
        else {
          this.GetArticles();
        }
      })
    }else{
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteArticle(id).subscribe(res => {
            let test = res;
            this.GetArticles();
          })
          Swal.fire(
            'Supprimé!',
            'Article a été supprimé.',
            'success'
          )
        }
        else {
          this.GetArticles();
        }
      })
    }
   
  }
  photourl: any;

  phototypeid: any;



  public GetPhotoUrl(url, typeID) {
    this.photourl = url;
    this.phototypeid = typeID;
  }

  public opentab()
  {
    window.open(this.photourl, '_blank');
  }
}
