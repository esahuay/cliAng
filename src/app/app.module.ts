import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from 'angular-tree-component';


import { AppComponent } from './app.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { MonitorCpuComponent } from './monitor-cpu/monitor-cpu.component';
import { MonitorRamComponent } from './monitor-ram/monitor-ram.component';
import { VarbolComponent } from './varbol/varbol.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcesosComponent,
    MonitorCpuComponent,
    MonitorRamComponent,
    HomeComponent,
    VarbolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    TreeModule.forRoot()
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
