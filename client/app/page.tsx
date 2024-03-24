import { Header } from "@/Components/Header";
import { Hero } from "@/Components/Hero";

export default function Home() {
  return (
    <>
      <Header />

      <main className=" bg-customwhite dark:bg-customblack">
        <Hero />
      </main>
    </>
  );
}
