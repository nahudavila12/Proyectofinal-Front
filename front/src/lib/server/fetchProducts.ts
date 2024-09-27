import { IProperty } from "@/interfaces/Interfaces";


export async function fetchProperties() {
  
    try {
      const response = await fetch("http://localhost:5000/properties", {
        next:{revalidate: 3600}
      })

    
      const products = await response.json()
    
      return products;
      
    } catch (error) {
      console.log(error);
    }
  }
  
export async function fetchPropertiesById(uuid: string): Promise<IProperty> {
  const response = await fetch(`http://localhost:5000/properties/${uuid}`);
  const product = await response.json();
  return product;
  }


  export const postProperties = async (cartItems: IProperty[]) => {
    const products = cartItems.map((item) => item.uuid);
    const token = localStorage.getItem("token");
    const response = await fetch ("http://localhost:5000/properties", {
        method: "POST",  
        headers: {
            Authorization: `${token}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({products}),
    })
    const data = await response.json();
    return data;
  }

