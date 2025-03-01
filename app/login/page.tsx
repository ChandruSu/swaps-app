import { auth, signIn } from "@/auth";
import { Panel } from "@/components/Panel";
import Image from "next/image";
import { redirect } from "next/navigation";

export function AuthButton({
  name,
  image,
  onClick,
}: {
  name: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <form action={onClick} className="w-full">
      <button
        type="submit"
        className="flex items-center w-full justify-between rounded-lg bg-white px-6 py-3 text-xl font-semibold text-slate-500 transition-all duration-200 hover:-translate-y-1"
      >
        <p>{name}</p>
        <Image src={image} width={24} height={24} alt={name} />
      </button>
    </form>
  );
}

export default async function Page() {
  const session = await auth()
  if (session?.user) {
    return redirect("/")
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <Panel className="mb-12">
        <div className="flex min-w-[20rem] flex-col gap-8">
          <h2 className="pb-6 text-center text-3xl font-semibold">Login</h2>
          <AuthButton
            name="Google"
            image="/google-brands.svg"
            onClick={async () => {
              "use server";
              await signIn("google");
            }}
          />
          <AuthButton
            name="Facebook"
            image="/facebook-brands.svg"
            onClick={async () => {
              "use server";
              await signIn("facebook");
            }}
          />
        </div>
      </Panel>
    </div>
  );
}
