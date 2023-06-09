import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainContentService } from './services/main-content/main-content.service';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    MainContentService
  ]
})
export class HomeModule { }
