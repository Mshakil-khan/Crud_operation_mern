import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudSerivceService } from 'src/app/services/crud-serivce.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,private registerService:CrudSerivceService){

  }

  ngOnInit(){
    this.userForm=this.formBuilder.group({
      name:["",[Validators.required]],
      email:["",[Validators.required]],
      mobile:["",[Validators.required]],
      work:["",[Validators.required]],
      location:["",[Validators.required]],
      age:["",[Validators.required]]
    })
  }

  onSubmit(){
    console.log(this.userForm.controls['name'].value);
    if(!this.userForm.invalid){
      let registerObject={
        name:this.userForm.controls['name'].value,
        email:this.userForm.controls['email'].value,
        mobile:this.userForm.controls['mobile'].value,
        work:this.userForm.controls['work'].value,
        location:this.userForm.controls['location'].value,
        age:this.userForm.controls['age'].value,

      }
        this.registerService.registerUserData(registerObject,"/register").subscribe((res)=>{
          if(res && res.status){
            console.log(res)
            Swal.fire({
              titleText:`Status : ${res.status}`,
              text:res.message,
              icon:"success",
              iconColor:'green',
              toast:true,
              animation:true,
              timer:3000,
              timerProgressBar:true,
              showCloseButton:true,
              position:'bottom-right'
            })
            this.router.navigate(['/home'])
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
        },((err)=>{
          
          Swal.fire({
            titleText:`Status : ${err.status}`,
            text:err.message,
            icon:"error",
            iconColor:'red',
            toast:true,
            animation:true,
            timer:3000,
            timerProgressBar:true,
            position:'bottom-right'
          })


        }))
    }
    else{
      Swal.fire({
        titleText:'Error Occured',
        text:"Please Complete your form!",
        icon:"error",
        iconColor:'red',
        toast:false,
        animation:true,
        timer:5000,
        timerProgressBar:true,
        confirmButtonText:'OK',
        showCloseButton:true,
        position:'top'
      })
    }
  }
}
