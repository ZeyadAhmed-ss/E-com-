"use server"
import getMyToken from "@/src/utilities/getMyToken";

export async function getLoggedUserCart() {
    const token:any = await getMyToken();

     const headers = {
            token: token,
            "Content-Type": "application/json",
        }

        const res =await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, 
            {
            method: "GET",
            headers: headers,
           }
      )
      const data = await res.json();
      return data;

}