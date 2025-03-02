import Link from "next/link";

export default function Home() {
  return (
    <div className=" mt-16 flex items-center justify-center pb-20 gap-16 sm:p-20 ">
      <main className="flex flex-col gap-8 items-center text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black ">
          Welcome to the Student Registration System
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-700">
          Streamlining your journey to success with easy registration and
          management.
        </p>

        {/* Buttons Container */}
        <div className="flex gap-6 items-center flex-col sm:flex-row">
          {/* Login Button */}
          <Link
            href="/login"
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-gray-800 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
          >
            Login
          </Link>

          {/* Signup Button */}
          <Link
            href="/signup"
            className="rounded-full text-white bg-black hover:bg-gray-800 border border-black transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 sm:min-w-44"
          >
            Signup
          </Link>
        </div>
      </main>
    </div>
  );
}
