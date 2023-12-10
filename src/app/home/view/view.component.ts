import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudSerivceService } from 'src/app/services/crud-serivce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  getId:any;
  getAllData:any;
constructor(private activateRoute:ActivatedRoute,private crudService:CrudSerivceService){

}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((res)=>{
      this.getId=res['params']['id'];
      this.crudService.getUserById(`/getById/${this.getId}`).subscribe((res)=>{
        console.log(res)
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
          this.getAllData=res.data;
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
  
}
