import { SignInBox } from "./_components/sign-in-box";
import { SupportBox } from "./_components/support-box";

export default function SignInPage() {
  return (
    <main className="flex grow items-center justify-center">
      <div className="flex max-w-[30rem] flex-col gap-6">
        <SignInBox />
        <SupportBox />
      </div>
    </main>
  );
}
