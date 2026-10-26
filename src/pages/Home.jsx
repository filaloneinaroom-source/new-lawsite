import { useState } from "react";
import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/ServicesSection";
import ArticlesSection from "../components/home/ArticlesSection";
import About from "../components/home/About";
import BookingSection from "../components/home/BookingSection";
import { useScrollTo } from "../hooks/useScrollTo";

export default function Home(){
  const scrollTo = useScrollTo();
  const [preset, setPreset] = useState(null);
  // новый объект при каждом выборе — форма реагирует даже на ту же услугу
  const book = title => { setPreset({ title }); scrollTo("booking"); };

  return (
    <>
      <Hero />
      <ServicesSection onBook={book} />
      <ArticlesSection />
      <About />
      <BookingSection preset={preset} />
    </>
  );
}
