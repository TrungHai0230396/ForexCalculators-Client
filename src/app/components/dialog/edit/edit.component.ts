import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderInfo } from 'src/app/models/orderInfo';
import { PipValuePerLot } from 'src/app/models/pipValuePerLot';
import { EditService } from 'src/app/services/dialog/edit.service';
import { OrderInfoService } from 'src/app/services/orderInfo.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('editOrderModal') editOrderModal: any;
  @Output() refersDataEdit: EventEmitter<any> = new EventEmitter();
  orderId: number = 0;
  orderInfo: OrderInfo = new OrderInfo();
  pipValuePerLots: Array<PipValuePerLot> = new Array<PipValuePerLot>();

  constructor(private editService: EditService, private orderInfoService:OrderInfoService) { }

  orderFormEdit : FormGroup = new FormGroup({
    pipValuePerLot: new FormControl(new PipValuePerLot()),
    stopLoss: new FormControl(),
    entry: new FormControl(),
    takeProfit: new FormControl(),
    amoutToRisk: new FormControl(),
  });

  ngOnInit(): void {
    this.orderInfoService.getPipValuePerLots().subscribe(res => {
      this.pipValuePerLots = res;

      // default select option
      this.orderFormEdit.patchValue({
        pipValuePerLot: this.pipValuePerLots[0]
      });
    });
  }

  /**
   * onUpdate
   */
  onUpdate() {
    this.editService.updateOrder(this.orderId, this.orderFormEdit.value).subscribe(res => {
      this.refersDataEdit.emit(res.data.id);
      // close model
      this.editOrderModal.nativeElement.click();
    });
  }

  /**
   * initFormEdit (data from paren)
   * @param orderId orderId
   * @param orderInfo orderInfo
   */
  initFormEdit(orderId: number, orderInfo: OrderInfo) {
    this.orderId = orderId;
    this.orderInfo = orderInfo;
    let indexTarget = this.pipValuePerLots.findIndex((obj => obj.id == this.orderInfo.pipValuePerLot.id));

    this.orderFormEdit = new FormGroup({
      pipValuePerLot: new FormControl(this.pipValuePerLots[indexTarget]),
      stopLoss: new FormControl(this.orderInfo.stopLoss),
      entry: new FormControl(this.orderInfo.entry),
      takeProfit: new FormControl(this.orderInfo.takeProfit),
      amoutToRisk: new FormControl(this.orderInfo.amoutToRisk),
    });
  }
}
