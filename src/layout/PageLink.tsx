export const PageLink = ({ label, href }) => {
  return (
    <a className="px-1 page-link h-8 my-auto" href={href}>
      {label}
    </a>
  );
};
