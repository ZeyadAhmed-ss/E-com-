"use server"
import getMyToken from "@/src/utilities/getMyToken";
import { count } from "console";

export async function UpdateProductToCart(id:string,countNumber:number) {

    const token = await getMyToken();
    const payload = {
        count: countNumber,}


        const headers = {
            token: token,
            "Content-Type": "application/json",
        }

if(token){
          const res =await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
            {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(payload),
           }
      )
    
      const data = await res.json();
      return data;
}
}

