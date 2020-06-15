import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar componentes
import { HomeComponent } from './home/home.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { MonitorRamComponent } from './monitor-ram/monitor-ram.component';
import { MonitorCpuComponent } from './monitor-cpu/monitor-cpu.component';

// Array de rutas
const appRoutes: Routes = [
	{path:'', component: HomeComponent},
	{path:'home', component: HomeComponent},
	{path:'procesos', component: ProcesosComponent},
	{path:'monitor-cpu', component: MonitorCpuComponent},
	{path:'monitor-ram', component: MonitorRamComponent},
	{path: '**', component: HomeComponent}
];

// Exportar modulo router.
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
