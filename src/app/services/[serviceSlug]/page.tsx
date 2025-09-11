import { ServiceDetailClientPage } from "@/components/service-detail-client-page";
import { servicesData } from "@/data/services-data";
import { notFound } from "next/navigation";

type ServiceKeys = keyof typeof servicesData;

export async function generateStaticParams() {
    return Object.keys(servicesData).map((slug) => ({
        serviceSlug: slug,
    }));
}

export default function ServiceDetailPage({ params }: { params: { serviceSlug: string }}) {
    const { serviceSlug } = params;

    if (!(serviceSlug in servicesData)) {
        notFound();
    }
    
    const service = servicesData[serviceSlug as ServiceKeys];

    return <ServiceDetailClientPage service={service} />;
}
