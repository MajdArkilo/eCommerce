import { animationFrameScheduler } from "rxjs";

export class CartDetailsClass {
    private static instance: CartDetailsClass;
    
    cart: any;
    private constructor() {
    }
    static getInstance(): CartDetailsClass {
        if (!CartDetailsClass.instance) {
            CartDetailsClass.instance = new CartDetailsClass();
        }

        return CartDetailsClass.instance;
    }

}