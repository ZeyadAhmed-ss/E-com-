"use server"
import { ICheckout } from "@/src/app/interface/online.interface";
import getMyToken from "@/src/utilities/getMyToken";

export async function onlinePayment(formValus:ICheckout, cartId:string){ 
    const token:any = await getMyToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({shippingAddress: formValus}),
    })

    const payload = await res.json();
    return payload;


}