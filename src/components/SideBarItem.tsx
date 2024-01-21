import Link from "next/link";
import Image from "next/image";

type SideBarItemProps = {
  icon: string;
  iconActive: string;
  text: string;
  href: string;
  pathname: string;
};
function SideBarItem({
  icon,
  iconActive,
  text,
  href,
  pathname,
}: SideBarItemProps) {
  return (
    <Link className="flex items-center gap-2 hover:opacity-80" href={href}>
      <Image
        src={pathname === href ? iconActive : icon}
        width={40}
        height={40}
        alt=""
      />
      <h1
        className={`text-center ${
          pathname === href ? "text-teal-950" : "text-slate-400"
        } text-lg font-semibold`}
      >
        {text}
      </h1>
    </Link>
  );
}

export default SideBarItem;
