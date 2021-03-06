import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailComponent } from './company-detail.component';
import { RouterModule, Route } from '@angular/router';
import { UserGuard } from 'app/shared/guards/user.guard';
import { LanguageGuard } from 'app/shared/guards/language.guard';
import { CountryGuard } from 'app/shared/guards/country.guard';
import { CompanyTabComponent } from './company-tab/company-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { HomeModule } from 'app/home/home.module';

const routes: Route[] = [
  {
    path: 'company/:companyId',
    component: CompanyDetailComponent,
    canActivate: [
      LanguageGuard,
      UserGuard,
      CountryGuard
    ]
  }
];


@NgModule({
  declarations: [
    CompanyDetailComponent,
    CompanyTabComponent
  ],
  imports: [
    HomeModule,
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule,
    FusePipesModule,
    RouterModule.forChild(routes),
  ]
})
export class CompanyDetailModule { }
