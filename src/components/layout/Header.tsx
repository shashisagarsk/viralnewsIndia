const categories = [
  "Home",
  "India",
  "World",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Lifestyle",
];

export default function Header() {
  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-gray-500">
          <div>Saturday, August 08, 2026</div>

          <div className="hidden items-center gap-4 md:flex">
            <span>About</span>
            <span>Contact</span>
            <span>Advertise</span>
            <span>Subscribe</span>
          </div>
        </div>
      </div>

      {/* Logo Area */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-7">
        <div>
          <h1 className="text-4xl font-black tracking-[-2px] text-gray-950">
            NEWS<span className="text-red-600">24</span>
          </h1>

          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[4px] text-gray-400">
            Independent News & Journalism
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-y border-gray-200">
        <nav className="mx-auto max-w-7xl px-4">
          <div className="flex overflow-x-auto">
            {categories.map((category, index) => (
              <a
                key={category}
                href="#"
                className={`whitespace-nowrap px-4 py-4 text-[13px] font-bold uppercase tracking-wide transition ${
                  index === 0
                    ? "border-b-2 border-red-600 text-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {category}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}