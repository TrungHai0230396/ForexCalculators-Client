import { PipValuePerLot } from "./pipValuePerLot";

export class OrderInfo {
    id: number = 0;
    pipValuePerLot: PipValuePerLot = new PipValuePerLot; 
    stopLoss : number = 0;
    entry : number = 0;
    takeProfit : number = 0;
    lot : number = 0;
    pip : number = 0;
    accountBalance : number = 0;
    riskByPercent : number = 0;
    amoutToRisk : number = 0;
    pipValue : number = 0;
    createdAt : Date = new Date();
    updatedAt : Date = new Date();
    result : number = 0;
    resultRiskReward : number = 0;
}
