import { Component } from '@angular/core';
import { CrudSerivceService } from '../services/crud-serivce.service';
import Swal from 'sweetalert2';
import { NavigationExtras, Router } from '@angular/router';

interface userTypeData{
  name:string,
  email:string,
  mobile:number,
  work:string,
  location:string,
  age:number

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {
  getAllUser:userTypeData[]=[];
  constructor(private getUserService:CrudSerivceService,private router:Router){
   this.getAllRegisteredUser()
  }


  getAllRegisteredUser(){
    this.getUserService.getRegisterUserData("/getData").subscribe((res)=>{
      if(res.status){
        Swal.fire({
          titleText:`Status : ${res.status}`,
          text:res.message,
          icon:"success",
          iconColor:'green',
          toast:true,
          animation:true,
          timer:3000,
          timerProgressBar:true,
          position:'bottom-right',
          
        })
       this.getAllUser=res.data
       console.log(this.getAllUser)


      }else{
        Swal.fire({
          titleText:`Status : ${res.status}`,
          text:res.message,
          icon:"error",
          iconColor:'red',
          toast:true,
          animation:true,
          timer:3000,
          timerProgressBar:true,
          position:'bottom-right'
        })
      }
    })
  }

  redirectToEditPage(value){  
    console.log(value)
    value=value._id
    console.log(value)
    this.router.navigate(['/edit',value])
  }

  redirectToViewPage(value){  
    console.log(value)
    value=value._id
    console.log(value)
    this.router.navigate(['/view',value])
  }

  DeleteById(value){  
    console.log(value)
    value=value._id
    console.log(value)
    this.getUserService.deleteUserById(`/deleteById/${value}`).subscribe((res)=>{
      console.log(res)
      if(res){
        Swal.fire({
          titleText:`Status : ${res.status}`,
          text:res.message,
          icon:"success",
          iconColor:'green',
          toast:true,
          animation:true,
          timer:3000,
          timerProgressBar:true,
          position:'bottom-right'
        })
        this.getAllRegisteredUser()
      }
    },((err)=>{
      console.log(err)
    }))
  }

  //deleteById
}

