import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(
      content, 
      { ariaLabelledBy: 'google-auth-modal'}
    ).result.then(
        result => {
          this.closeResult = `Closed with ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on backdrop'
    } else {
      return `with ${reason}`;
    }
  }

  ngOnInit() {
  }

}
