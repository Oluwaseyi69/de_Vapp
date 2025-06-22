import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-no-repeat text-white flex flex-col
      bg-[center_top_-100px] md:bg-center lg:bg-top
      bg-cover sm:bg-[center_top_-100px] md:bg-cover
    "
      style={{ backgroundImage: `url('/images/faded.jpg')` }}
    >
      {/* <div className="absolute inset-0 bg-black/50 z-0" /> */}

      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          <span className="text-white">de</span>Vapp
        </h1>{" "}
      </header>
      {/* Main Content */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
        <div className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 text-center leading-tight">
          Make decisions
          <span className="text-primary p-4">
            <br className="hidden md:block" /> together, anonymously and fairly.
          </span>
        </div>
        <Link
          to="/signup"
          className="mt-6 bg-primary hover:bg-indigo-700 hover:scale-105 active:scale-95 text-white px-6 py-3 rounded-full text-lg transition transform duration-300 ease-in-out"
        >
          Get Started
        </Link>
      </main>
      {/* Footer (optional) */}
      <footer className="text-center text-sm text-gray-500 pb-4">
        &copy; {new Date().getFullYear()} deVapp. All rights reserved.
      </footer>
    </div>
  );
}
