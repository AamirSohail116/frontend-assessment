import Search from "../components/Search";

export default function HomePage() {
  return (
    <main className="px-4 py-32 max-w-[1300px] mx-auto">
      <h1 className="text-2xl text-gray-900 font-bold mb-4">
        📈 Stock Tracker
      </h1>
      <Search />
    </main>
  );
}
