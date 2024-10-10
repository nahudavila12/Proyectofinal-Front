// src/app/detail/[uuid]/page.tsx
import { IProperty } from "@/interfaces/Interfaces"; 
import PropertyDetail from "@/components/Property-detail";
import { fetchPropertiesById } from "@/lib/server/fetchProperties";

const PropertyPage = async ({ params }: { params: { uuid: string } }) => {
  const { uuid } = params; 
  let property: IProperty | null = null;

  try {
    property = await fetchPropertiesById(uuid);
  } catch (error) {
    console.error("Error fetching property:", error);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <PropertyDetail property={property} />
    </div>
  );
};

export default PropertyPage;
