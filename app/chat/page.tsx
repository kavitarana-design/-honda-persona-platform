import { redirect } from "next/navigation";
import { DEFAULT_PERSONA_SLUG } from "@/lib/personas";

export default function ChatIndex() {
  redirect(`/chat/${DEFAULT_PERSONA_SLUG}`);
}
