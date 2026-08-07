import { PortfolioHomepage } from "@/components/home/PortfolioHomepage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageSchema, projectItemListSchema, webPageSchema } from "@/lib/structuredData";
import { siteConfig } from "@/lib/site";

const title = siteConfig.title;
const description = siteConfig.description;

export default function HomePage() {
  return (
    <>
      <main className="home-page">
        <JsonLd data={pageSchema(
          webPageSchema({ name: title, description, path: "/" }),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          projectItemListSchema,
        )} />
        <PortfolioHomepage />
      </main>
    </>
  );
}
