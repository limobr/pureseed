import Image from "next/image";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { logo, site } from "@/lib/data";

export default function Header() {
  return (
    <>
      <div className="bar">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={`tel:${site.phone}`}>{site.phone}</a>
      </div>
      <header className="hdr">
        <div className="wrap hdr-main">
          <Link href="/" className="logo" aria-label="PureSeed home">
            <Image src={logo} alt="PureSeed" width={900} height={281} priority sizes="160px" />
          </Link>
          <NavMenu />
        </div>
      </header>
    </>
  );
}
