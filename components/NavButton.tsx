import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function NavButton({ children, href, className }: Props) {
  return (
    <Link href={href}
    className={`inline-flex items-center justify-center
        py-2 px-6 rounded-full           
        border border-neutral-300
        hover:border-neutral-500 hover:bg-neutral-50
        transition
        text-sm font-bold ${className ?? ""}`}>
    {children}
    </Link>
  )
}