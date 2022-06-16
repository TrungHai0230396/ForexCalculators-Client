import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DeleteService } from 'src/app/services/dialog/delete.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @ViewChild('deleteOrderModal') deleteOrderModal: any;
  @Output() refersDataDelete: EventEmitter<any> = new EventEmitter();
  orderId: number = 0;
  constructor(private deleteService: DeleteService) { }

  ngOnInit(): void {
  }

    /**
     * onDelete
     */
     onDelete() {
      this.deleteService.deleteOrder(this.orderId).subscribe(res => {
        if (res.status == "ok") {
          this.refersDataDelete.emit(this.orderId);
          // close model
          this.deleteOrderModal.nativeElement.click();
        }
      });
    }

    getOrderIdFromParen(orderId: number) {
      this.orderId = orderId;
    }
}
