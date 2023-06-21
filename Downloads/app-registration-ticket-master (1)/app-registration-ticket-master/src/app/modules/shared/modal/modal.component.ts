import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  
  @Input() modalTitle!:string;
  @Input() modalContent!:string;

  public flagShowModal:boolean = true;

  ngOnInit(): void {
    
  }

  closeModal(){
    this.flagShowModal = false;
  }


}
