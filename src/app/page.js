import Footer from "./Footer";
import HomePage from "./HomePage";

export default function Home() {
  return (
    <div className="h-screen w-full relative flex flex-col justify-between">
      <HomePage />
      <div className="sticky absolute w-screen bottom-0">
        <Footer />
      </div>
    </div>
  );
}
