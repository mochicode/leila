import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthcheckComponent } from './questionnaire/healthcheck/healthcheck.component';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: 'healthcheck',
  component: HealthcheckComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
