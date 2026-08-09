export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-black">
            ViralNews<span className="text-red-600">India</span>
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
            Independent journalism covering India, world affairs, business,
            technology, sports and culture.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Categories
          </h3>

          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <p>India</p>
            <p>World</p>
            <p>Business</p>
            <p>Technology</p>
            <p>Sports</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Company
          </h3>

          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <p>About Us</p>
            <p>Contact</p>
            <p>Advertise</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-gray-500">
          © 2026 ViralNewsIndia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}