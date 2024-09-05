"use client";
import Script from "next/script";
import React from "react";

const languages = [
  { label: "English", value: "en", src: "https://flagcdn.com/h60/us.png" },
  { label: "Spanish", value: "es", src: "https://flagcdn.com/h60/es.png" },
  { label: "French", value: "fr", src: "https://flagcdn.com/h60/fr.png" },
  // Add additional languages as needed
];

const includedLanguages = languages.map(lang => lang.value).join(",");

function googleTranslateElementInit() {
  if (window.google) {
    new window.google.translate.TranslateElement({
      pageLanguage: "auto",
      includedLanguages,
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    }, "google_translate_element");
  }
}

export function GoogleTranslate({ prefLangCookie }: { prefLangCookie: string }) {
  const [langCookie, setLangCookie] = React.useState(decodeURIComponent(prefLangCookie));

  React.useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (value: string) => {
  setLangCookie(`/en/${value}`);
  const element = document.querySelector(".goog-te-combo") as HTMLSelectElement;
  if (element) {
    element.value = value;
    element.dispatchEvent(new Event("change"));
  }

  // Reinitialize the Google Translate element to ensure it picks up the changes
  if (window.google && window.google.translate) {
    googleTranslateElementInit();
  }
};


  return (
    <div>
      <div id="google_translate_element" style={{ visibility: "hidden", width: "1px", height: "1px" }}></div>
      <LanguageSelector onChange={onChange} value={langCookie} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}

function LanguageSelector({ onChange, value }) {
  const langCookie = value.includes("/") ? value.split("/")[2] : value;
  return (
    <select onChange={(e) => onChange(e.target.value)} value={langCookie}>
      {languages.map((it) => (
        <option value={it.value} key={it.value}>
          {it.label}
        </option>
      ))}
    </select>
  );
}
