import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-role-menu-mapping',
  templateUrl: './role-menu-mapping.component.html',
  styleUrls: ['./role-menu-mapping.component.css']
})
export class RoleMenuMappingComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  languageid: any;
  rolelist: any;
  Menulist: any;
  menudd = {}
  menuid: any;
  submenulist: any;
  showdash: any;
  id: any;
  RoleMappinglist: any;
  submenuid: any;
  showbutton: any;
  menuname: any;

  savedlist=[]
  showdashupdate:any;

  ngOnInit() {

    this.roleid = 0
    this.languageid = localStorage.getItem('LanguageID');

    this.activatedroute.params.subscribe(params => {
      
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0
      }
      else if (this.id != undefined) {
        this.showbutton = 1
      }

      this.docservice.GetMenuRoleMappingTable(this.languageid).subscribe(
        data => {
          this.RoleMappinglist = data;

          var list = this.RoleMappinglist.filter(x => x.id == this.id)
          this.menuid = list[0].menuID,
            this.roleid = list[0].roleID,
            this.submenuid = list[0].submenuid,
            this.menuname = list[0].menus
          

          this.menusarray.push(list)
          this.docservice.GetSubMenuMaster(this.languageid, this.menuid).subscribe(
            data => {
              
              this.submenulist = data;
              for (let i = 0; i < this.submenulist.length; i++) {
                let ggff = this.RoleMappinglist.filter(x => x.submenuID == this.submenulist[i].id);
                
                if (ggff.length > 0) {
                  
                  this.submenulist[i]["isChecked"] = true;
                  var entity1 = {
                    'RoleID': this.roleid,
                    'menuID': this.submenulist[i].menuID,
                    'submenuID': this.submenulist[i].id
                  }
                  this.savedlist.push(entity1)
                }
                else {
                  this.submenulist[i]["isChecked"] = false;
                }
              }
            }, error => {
            }
          )
          this.showdash = 1

          
        }, error => {
        }
      )
    }
    )

    this.GetRoleMaster()
    this.GetMenuMaster()
  }

  

  public GetRoleMaster() {
    this.docservice.GetRoleTypesMasterByAdminLogins(this.languageid).subscribe(
      data => {

        this.rolelist = data;
      }, error => {
      }
    )
  }



  public GetMenuMaster() {

    this.docservice.GetMenuMaster(this.languageid).subscribe(
      data => {

        this.Menulist = data;
        this.menudd = {
          singleSelection: true,
          idField: 'id',
          textField: 'menus',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }


  public GetMenuID(item: any) {
    this.menuid = item.id
    this.GetSubmenuMater()
    this.showdash = 1
  }

  public GetSubmenuMater() {
    
    
    this.docservice.GetSubMenuMaster(this.languageid, this.menuid).subscribe(
      data => {

        this.submenulist = data;
      }, error => {
      }
    )
  }


  menusarray = []

  public GetMenuslist(even, list) {
    
    if (even.target.checked == true) {
      this.menusarray.push(list)
    }
    else if (even.target.checked == false) {
      
      this.menusarray.splice(this.menusarray.indexOf(list), 1);
      // list.selected=0;
    }
  }
  roleid: any;

  public GetRoleID(even) {
    this.roleid = even.target.value;
  }

  public dummarray = [];



  public InsertSaveMenus() {
    
    for (let i = 0; i < this.menusarray.length; i++) {
      var entity = {
        'RoleID': this.roleid,
        'MenuID': this.menusarray[i].menuID,
        'SubmenuID': this.menusarray[i].id
      }
      this.dummarray.push(entity)
      
    }
    this.docservice.InsertMenuRoleMappingTable(this.dummarray).subscribe(data => {
      if (data != 0) {
        Swal.fire('Saved successfully');
        location.href = "#/RolemenuDash"
      }
    })
  }


  public GetSavedList(even, list) {
    
    if (even.target.checked == true) {
      this.savedlist.push(list)
    }
    else if (even.target.checked == false) {
      
      this.savedlist.splice(this.savedlist.indexOf(list), 1);
      // list.selected=0;
    }
  }


  updatedummarray=[]

  public UpdateMenunus() {
    
    this.docservice.DeleteMenuRoleMappingTable(this.roleid,this.menuid).subscribe(data=>{
      
      for (let i = 0; i < this.savedlist.length; i++) {
        var entity = {
          'RoleID': this.roleid,
          'MenuID': this.savedlist[i].menuID,
          'SubmenuID': this.savedlist[i].submenuID
        }
        this.updatedummarray.push(entity)
        
      }
      this.docservice.InsertMenuRoleMappingTable(this.updatedummarray).subscribe(data => {
        if (data != 0) {
          Swal.fire('Updated Successfully');
          location.href = "#/RolemenuDash"
        }
      })
    })
  }

  
}
