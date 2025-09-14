export default function Pagination({ page, setPage, totalPages }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 my-4">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded w-full sm:w-auto disabled:opacity-50 hover:bg-red-500 hover:text-white transition"
      >
        Prev
      </button>
      <span className="px-2 text-center">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded w-full sm:w-auto disabled:opacity-50 hover:bg-red-500 hover:text-white transition"
      >
        Next
      </button>
    </div>
  );
}
