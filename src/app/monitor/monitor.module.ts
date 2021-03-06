import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { MonitorPage } from './monitor.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitorPage]
})
export class MonitorPageModule {}
