const PlaceholderPage = ({ page }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
    <p className="text-4xl mb-4">{page === "reviews" ? "★" : "⚙"}</p>
    <p className="text-lg font-bold text-gray-900 capitalize">{page}</p>
    <p className="text-sm text-gray-400 mt-1">This section is coming soon.</p>
  </div>
);

export default PlaceholderPage;