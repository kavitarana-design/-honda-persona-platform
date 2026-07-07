import { notFound } from "next/navigation";
import PersonaChat from "@/components/PersonaChat";
import { PERSONAS } from "@/lib/personas";

// Render each persona chat on demand instead of pre-generating all of them. The static
// pre-render step (generateStaticParams) was intermittently crashing the Next dev worker
// ("Jest worker encountered ... child process exceptions"); dynamic rendering avoids it.
export const dynamic = "force-dynamic";

export default async function PersonaChatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const persona = PERSONAS[slug];
  if (!persona) notFound();
  return <PersonaChat persona={persona} />;
}
