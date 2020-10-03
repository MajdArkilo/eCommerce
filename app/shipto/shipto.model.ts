export class ShipDetailsClass {
    private static instance: ShipDetailsClass;
    shippingInfo : any;
    private constructor() {
    }
    static getInstance(): ShipDetailsClass {
        if (!ShipDetailsClass.instance) {
            ShipDetailsClass.instance = new ShipDetailsClass();
        }

        return ShipDetailsClass.instance;
    }
    
}