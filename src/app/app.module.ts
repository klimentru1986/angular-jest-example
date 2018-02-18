import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalcComponent } from './components/calc/calc.component';
import { ObjToArrPipe } from './pipes/obj-to-arr.pipe';
import { CalcService } from './services/calc.service';
import { UsersApiService } from './services/users-api.service';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [AppComponent, CalcComponent, ObjToArrPipe, UsersListComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [CalcService, UsersApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
