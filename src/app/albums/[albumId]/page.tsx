import PageWraper from "@/app/components/PageWraper";
interface PageProps {
  params: Promise<{ albumId: string }>;
}




async function page({ params }: PageProps) {
  const { albumId } = await params;
  

  return (
    <PageWraper>
      <div className="text-white flex flex-col items-start">
        {albumId}
        <div className="flex  flex-wrap gap-2 md:gap-6 w-full justify-around md:justify-start">
        </div>
      </div>
    </PageWraper>
  );
}

export default page;
