import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TicketTemplateService } from './services/ticket-template/ticket-template.service';
import { LoginService } from '../auth/services/login/login.service';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TicketTemplateService,
    LoginService
  ]
})
export class SharedModule { }
