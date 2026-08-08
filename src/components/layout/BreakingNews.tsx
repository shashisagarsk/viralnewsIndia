import { Zap } from "lucide-react";

export default function BreakingNews() {
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-7xl items-center px-4">
        <div className="flex shrink-0 items-center gap-2 bg-red-600 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white">
          <Zap size={14} fill="currentColor" />
          Breaking
        </div>

        <div className="overflow-hidden px-4">
          <p className="truncate text-sm font-medium text-gray-700">
            Latest headlines: Markets remain active as major global developments
            continue to unfold
          </p>
        </div>
      </div>
    </div>
  );
}