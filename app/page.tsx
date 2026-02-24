import BookList from "./components/booklist";

export default function Home() {
  return (
    
    <main className="min-h-screen text-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <BookList />
      </div>
    </main>
  );
}