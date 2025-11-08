import { onlyGuestAction } from "@/app/_actions/only-guest-action";
import { SignInBox } from "./_components/login-box";

export default async function SignInPage() {
  await onlyGuestAction();

  return (
    <main className="flex grow items-center justify-center">
      <div className="my-6 flex w-full flex-col gap-4 lg:max-w-[30rem]">
        <SignInBox />
        {/* <SupportBox /> */}
      </div>
    </main>
  );
}
