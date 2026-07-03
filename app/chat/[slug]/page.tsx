import { notFound } from "next/navigation";
import PersonaChat from "@/components/PersonaChat";
import { PERSONAS } from "@/lib/personas";

export function generateStaticParams() {
  return Object.keys(PERSONAS).map((slug) => ({ slug }));
}

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
