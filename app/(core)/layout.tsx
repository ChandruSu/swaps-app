import { NavBar } from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`grid w-full grid-cols-1 grid-rows-[3rem_auto] bg-transparent p-4`}
    >
      <NavBar
        options={[
          { label: "Home", path: "/" },
          { label: "Explore", path: "/explore" },
          { label: "Dashboard", path: "/dashboard" },
          { label: "Account", path: "/account" },
        ]}
      />
      <div className="overflow-hidden p-16">{children}</div>
    </div>
  );
}
