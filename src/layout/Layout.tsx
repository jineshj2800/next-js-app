import { PageLink } from "./PageLink.tsx";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex h-10 flex-none my-4 nav-bar">
        <PageLink label="Home" href="/home" />
        <PageLink label="Following" href="/following" />
        <PageLink label="Contact Us" href="/contact-us" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
