import { test } from "@/utils/test";

export default function App() {
  console.log("Test:", test);
  return (
    <div className="flex h-screen items-center justify-center bg-red-800">
      <h1 className=" font-bold text-yellow-300">Tailwind CSS is working!</h1>
    </div>
  );
}
