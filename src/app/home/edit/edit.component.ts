import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudSerivceService } from 'src/app/services/crud-serivce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userForm:FormGroup;
  getId:any;
constructor(private activateRoute:ActivatedRoute,private router:Router,private crudService:CrudSerivceService,private formBuilder:FormBuilder){
   this.userForm=this.formBuilder.group({
    name:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required]),
    mobile:new FormControl("",[Validators.required]),
    work:new FormControl("",[Validators.required]),
    location:new FormControl("",[Validators.required]),
    age:new FormControl("",[Validators.required])
     })
}

ngOnInit(): void {
  this.activateRoute.paramMap.subscribe((result)=>{
    // console.log(result)
    // console.log(result['params']['id'])
    this.getId=result['params']['id'];
    this.crudService.getUserById(`/getById/${this.getId}`).subscribe((res)=>{
      console.log(res)
      res=res.data
      if(res){
        Swal.fire({
          titleText:`Fetch`,
          text:"Successfully",
          icon:"success",
          iconColor:'green',
          toast:true,
          animation:true,
          timer:3000,
          timerProgressBar:true,
          position:'bottom-right',
          
        })
        this.userForm.setValue({
          name:res.name,
          mobile:res.mobile,
          email:res.mobile,
          work:res.work,
          location:res.location,
          age:res.age
        })
      }
      else{
        Swal.fire({
          titleText:`Status : ${res.status}`,
          text:res.message,
          icon:"error",
          iconColor:'green',
          toast:true,
          animation:true,
          timer:3000,
          timerProgressBar:true,
          position:'bottom-right',
          
        })
      }
    },((err)=>{
      Swal.fire({
        text:err.message,
        icon:"success",
        iconColor:'green',
        toast:true,
        animation:true,
        timer:3000,
        timerProgressBar:true,
        position:'bottom-right',
        
      })
    }))
  })
}

onSubmit(){
console.log(this.userForm)
if(!this.userForm.invalid){
  let registerObject={
    name:this.userForm.controls['name'].value,
    email:this.userForm.controls['email'].value,
    mobile:this.userForm.controls['mobile'].value,
    work:this.userForm.controls['work'].value,
    location:this.userForm.controls['location'].value,
    age:this.userForm.controls['age'].value,

  }
    this.crudService.putRegisterUserData(registerObject,`/updateById/${this.getId}`).subscribe((res)=>{
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
