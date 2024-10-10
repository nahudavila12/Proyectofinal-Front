import { IProperty } from "@/interfaces/Interfaces";

// Obtener todas las propiedades
export async function fetchProperties(): Promise<IProperty[]> {
  try {
    const response = await fetch(`http://localhost:3001/properties`, {
      next: { revalidate: 3 },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const properties: IProperty[] = await response.json();
    return properties;
  } catch (error) {
    console.error("Error al obtener propiedades:", error);
    throw error; // Lanza el error para manejarlo donde sea necesario
  }
}

// Obtener propiedad por ID (UUID)
export async function fetchPropertiesById(uuid: string): Promise<IProperty> {
  try {
    const response = await fetch(`http://localhost:3001/properties/${uuid}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const property: IProperty = await response.json();
    return property;
  } catch (error) {
    console.error(`Error al obtener propiedad con uuid ${uuid}:`, error);
    throw error;
  }
}

// Agregar propiedades (POST)
export const postProperties = async (cartItems: IProperty[]): Promise<IProperty[]> => {
  try {
    const products = cartItems.map((item) => item.uuid);
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3001/properties/addProperty/:id", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const properties: IProperty[] = await response.json(); // Aseguramos que devolvemos un array de propiedades
    return properties;
  } catch (error) {
    console.error("Error al agregar propiedades:", error);
    throw error;
  }
};
