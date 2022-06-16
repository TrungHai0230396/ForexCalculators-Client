import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderInfo } from 'src/app/models/orderInfo';
import { OrderInfoService } from 'src/app/services/orderInfo.service';
import { EditComponent } from '../dialog/edit/edit.component';
import { CreateComponent } from '../dialog/create/create.component';
import { DeleteComponent } from '../dialog/delete/delete.component';

@Component({
  selector: 'app-orderInfo',
  templateUrl: './orderInfo.component.html',
  styleUrls: ['./orderInfo.component.css']
})
export class OrderInfoComponent implements OnInit {
  @ViewChild('createOrder') createOrder: CreateComponent | undefined;
  @ViewChild('updateOrder') updateOrder: EditComponent | undefined;
  @ViewChild('deleteOrder') deleteOrder: DeleteComponent | undefined;

  orderInfos: Array<OrderInfo> = new Array<OrderInfo>();
  constructor(private orderInfoService: OrderInfoService) { }

  ngOnInit(): void {
    this.orderInfoService.getOrderInfos().subscribe(res => {
      this.orderInfos = res;
    });
  }

  /**
   * doubleClickResult
   * @param event 
   */
  doubleClickResult(event: any){
    let target = event.target || event.srcElement || event.currentTarget;
    target.setAttribute("style", "display: none");
    target.parentNode.getElementsByClassName("div-btn-result")[0].setAttribute("style", "display: block");
  }

  /**
   * onClickResultBtnWin
   * @param event 
   */
  onClickResultBtnWin(event: any) {
    let target = event.target || event.srcElement || event.currentTarget;
    target.closest(".div-btn-result").setAttribute("style", "display: none");
    let divInputResult = target.parentNode.parentNode.getElementsByClassName("div-input-result")[0];
    divInputResult.setAttribute("style", "display: block");
    divInputResult.getElementsByClassName("input-result")[0].setAttribute("style", "border-color: green");
    divInputResult.getElementsByClassName("input-result")[0].setAttribute("result", "tp");
  }

  /**
   * onClickResultBtnLose
   * @param event \
   */
  onClickResultBtnLose(event: any) {
    let target = event.target || event.srcElement || event.currentTarget;
    target.closest(".div-btn-result").setAttribute("style", "display: none");
    let divInputResult = target.parentNode.parentNode.getElementsByClassName("div-input-result")[0];
    divInputResult.setAttribute("style", "display: block");
    divInputResult.getElementsByClassName("input-result")[0].setAttribute("style", "border-color: red");
    divInputResult.getElementsByClassName("input-result")[0].setAttribute("result", "sl");
  }

  onChangeInputResult(event: any) {
    let orderInfo: OrderInfo;
    let target = event.target || event.srcElement || event.currentTarget;
    let oderId: number =  target.parentNode.parentNode.parentNode.getElementsByClassName("orderId")[0].value;
    let result: number = target.value;
    if(target.getAttribute("result") == "sl") {
      result = -1*result;
    }
    this.orderInfoService.updateResult(oderId, result).subscribe(res => {
      orderInfo = res.data;
      let indexTarget = this.orderInfos.findIndex((obj => obj.id == orderInfo.id));
      this.orderInfos[indexTarget] = orderInfo;
    });
  }

  /**
   * onClickUpdate
   * @param event 
   */
  onClickUpdate(event: any) {
    let target = event.target || event.srcElement || event.currentTarget;
    let orderId: number = target.parentNode.parentNode.getElementsByClassName("orderId")[0].value;
    this.orderInfoService.findByIdOrderinfo(orderId).subscribe(res => {
      let orderInfo: OrderInfo  = res.data;
      this.updateOrder?.initFormEdit(orderId, orderInfo);
    });
  }

    /**
   * onClickDelete
   * @param event 
   */
     onClickDelete(event: any) {
      let target = event.target || event.srcElement || event.currentTarget;
      let orderId: number = target.parentNode.parentNode.getElementsByClassName("orderId")[0].value;
      this.deleteOrder?.getOrderIdFromParen(orderId);
    }

  /**
   * refersDataCreate
   * @param orderInfo 
   */
  refersDataCreate(orderInfo: OrderInfo) {
    this.orderInfos.push(orderInfo);
  }
  
  /**
   * refersDataEdit
   * @param orderId 
   */
  refersDataEdit(orderId: number) {
    this.orderInfoService.findByIdOrderinfo(orderId).subscribe(res => {
      let indexTarget = this.orderInfos.findIndex((obj => obj.id == orderId));
      this.orderInfos[indexTarget]= res.data;
    });

  }

  refersDataDelete(orderId: number) {
    let indexTarget = this.orderInfos.findIndex((obj => obj.id == orderId));
    this.orderInfos.splice(indexTarget, 1);
  }

  /**
   * clickCreate
   */
  clickCreate() {
    this.createOrder?.refersFormCreate();
  }
}
