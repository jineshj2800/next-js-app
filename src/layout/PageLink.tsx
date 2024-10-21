import Link from "next/link";

export const PageLink = ({ label, href }) => {
  return (
    <Link className="px-1 page-link h-8 my-auto" href={href}>
      {label}
    </Link>
  );
};
