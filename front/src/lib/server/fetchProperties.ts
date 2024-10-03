import { IProperty } from "@/interfaces/Interfaces";


export async function fetchProperties() {
  
    try {
      const response = await fetch("http://localhost:3001/properties", {
        next:{revalidate: 3600}
      })

    
      const products = await response.json()
    
      return products;
      
    } catch (error) {
      console.log(error);
    }
  }
  
export async function fetchPropertiesById(uuid: string): Promise<IProperty> {
  const response = await fetch(`http://localhost:3001/properties/${uuid}`);
  const product = await response.json();
  return product;
  }


  // export const postProperties = async (cartItems: IProperty[]) => {
  //   const products = cartItems.map((item) => item.uuid);
  //   const token = localStorage.getItem("token");
  //   const response = await fetch ("http://localhost:3001/properties", {
  //       method: "POST",  
  //       headers: {
  //           Authorization: `${token}`,
  //           "Content-Type" : "application/json",
  //       },
  //       body: JSON.stringify({products}),
  //   })
  //   const data = await response.json();
  //   return data;
  // }


  export const postProperties = async (cartItems: IProperty[]) => {
    try {
      const products = cartItems.map((item) => item.uuid);
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://localhost:3001/properties/addProperty/:id", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ products })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
  };