export default function Pagination({ page, setPage, totalPages }) {
  if (!totalPages || totalPages <= 1) return null; // ✅ agar 1 hi page hai ya koi items nahi to pagination hide

  return (
    <div className="flex justify-center items-center gap-2 my-4">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-red-500 hover:text-white transition"
      >
        Prev
      </button>
      <span className="px-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-red-500 hover:text-white transition"
      >
        Next
      </button>
    </div>
  );
}
