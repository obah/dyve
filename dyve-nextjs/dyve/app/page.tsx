import Features from "@/components/Features";
// import { GoogleTranslate } from "@/components/googleTranslate/GoogleTranslate";
import Hero from "@/components/Hero";
import QuickGuide from "@/components/QuickGuide";
import { cookies } from "next/headers";

export default function Home() {
  // Fetch the language preference from cookies
  const cookieStore = cookies();
  // const prefLangCookie = cookieStore.get("googtrans")?.value ?? "en";

  return (
    <div>
      {/* Pass the prefLangCookie to the client component */}
      {/* <GoogleTranslate prefLangCookie={prefLangCookie} /> */}
      <Hero />
      <Features />
      <QuickGuide />
    </div>
  );
}
