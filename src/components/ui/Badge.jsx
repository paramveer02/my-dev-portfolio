export default function Badge({ className = "", children }) {
  return (
    <span
      className={`inline-block rounded-full bg-white/10 text-gray-300 border border-gray-700 px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
