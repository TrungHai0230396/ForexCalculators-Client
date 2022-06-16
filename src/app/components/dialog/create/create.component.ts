import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PipValuePerLot } from 'src/app/models/pipValuePerLot';
import { CreateService } from 'src/app/services/dialog/create.service';
import { OrderInfoService } from 'src/app/services/orderInfo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('addOrderModal') addOrderModal: any;
  @Output() refersDataCreate: EventEmitter<any> = new EventEmitter();
  pipValuePerLots: Array<PipValuePerLot> = new Array<PipValuePerLot>();
  constructor(private createService: CreateService, private orderInfoService:OrderInfoService) { }

  orderFormCreate : FormGroup = new FormGroup({
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
      this.orderFormCreate.patchValue({
        pipValuePerLot: this.pipValuePerLots[0]
      });
    });
  }

  /**
   * onCreate
   */
  onCreate() {
    this.createService.createOrder(this.orderFormCreate.value).subscribe(res => {
      this.refersDataCreate.emit(res.data);
      // close model
      this.addOrderModal.nativeElement.click();
    });
  }

  /**
   * refersFormCreate
   */
  refersFormCreate() {
    this.orderFormCreate.patchValue({
      pipValuePerLot: this.pipValuePerLots[0],
      stopLoss: '',
      entry: '',
      takeProfit: ''
    });
  }
}
