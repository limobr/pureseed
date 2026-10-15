/** Re-mounts on every navigation, so each page slides/fades in smoothly. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
