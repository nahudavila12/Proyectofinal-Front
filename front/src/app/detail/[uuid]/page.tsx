import PropertyDetail from '@/components/Property-detail';
import { fetchPropertiesById } from '@/lib/server/fetchProperties';


export default async function PropertyDetailPage({ params }: { params: { uuid: string } }) {
  console.log('UUID:', params.uuid); // Agrega esta línea para verificar el UUID
  const property = await fetchPropertiesById(params.uuid);
  console.log('Property fetched:', property);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <PropertyDetail property={property} /> 
    </div>
  )
}
