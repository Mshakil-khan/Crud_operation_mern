import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,children:[
  ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'register',component:RegisterComponent},
  {path:"edit/:id",component:EditComponent},
  {path:"view/:id",component:ViewComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
