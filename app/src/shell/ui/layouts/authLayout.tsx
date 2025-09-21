/* **
 * Component
 ** */

export function AuthLayout({ children }: { children: React.ReactNode }) {
  /* Render */

  return (
    <div
      className="bg-base-color-pri flex h-screen w-full items-center justify-center"
      id="auth-layout"
    >
      {children}
    </div>
  );
}
