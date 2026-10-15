import Link from "next/link";
export default function NotFound() {
  return <section className="page-hero"><div className="wrap"><h1>Page not found</h1><p className="lead">The page you wanted has moved or no longer exists.</p><Link href="/" className="btn">Back to home</Link></div></section>;
}
