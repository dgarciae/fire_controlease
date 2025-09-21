import { useMediaQuery } from "../../core";

/* **
 * Component
 ** */

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  /* Mobile layout */

  if (isMobile) {
    return (
      <div className="flex h-screen flex-col">
        <main className="flex-1 overflow-auto p-2">{children}</main>
        <div className="flex-shrink-0">
          <_Bottombar />
        </div>
      </div>
    );
  }

  /* Desktop layout */

  return (
    <div className="flex h-screen gap-x-6 py-12">
      <div className="h-full px-6 py-24">
        <_Sidebar />
      </div>
      <div>{children}</div>
    </div>
  );
}

/* **
 * Bottombar
 ** */

function _Bottombar() {
  return (
    <div className="relative flex h-16 w-screen items-center justify-center rounded-t-lg border-t border-gray-900 bg-gradient-to-t from-gray-800 via-gray-800 to-gray-700 text-white shadow-lg">
      Bottombar
    </div>
  );
}

/* **
 * Sidebar
 ** */

function _Sidebar() {
  return (
    <div className="relative flex h-full w-20 flex-col items-center justify-between rounded-lg border-gray-900 bg-gradient-to-b from-gray-800 to-gray-500 py-6 text-white shadow-md">
      Sidebar
    </div>
  );
}
