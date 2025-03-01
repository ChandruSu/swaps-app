import { NavBar } from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`grid h-screen w-full grid-cols-1 grid-rows-[3rem_auto] overflow-hidden bg-transparent p-4`}
    >
      <NavBar
        options={[
          { label: "Explore", path: "/explore" },
          { label: "Dashboard", path: "/dashboard" },
          { label: "Inbox", path: "/inbox" },
          { label: "Account", path: "/account" },
        ]}
      />
      <div className="h-full overflow-hidden p-4">{children}</div>
    </div>
  );
}
