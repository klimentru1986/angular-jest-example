import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalcComponent } from './components/calc/calc.component';
import { ObjToArrPipe } from './pipes/obj-to-arr.pipe';
import { CalcService } from './services/calc.service';

@NgModule({
  declarations: [AppComponent, CalcComponent, ObjToArrPipe],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [CalcService],
  bootstrap: [AppComponent]
})
export class AppModule {}
