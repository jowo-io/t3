import Button from "@/client/ui/atoms/Button";
import Header from "@/client/ui/atoms/Header";
import { useRouter } from "next/router";

export interface Props {}

export default function ErrorNotFoundScreen({}: Props) {
  const { push } = useRouter();

  return (
    <div className="flex w-full flex-col gap-xs py-xs">
      <Header tag="h1">404</Header>
      <Header tag="h4">Sorry, that page doesn&quot;t exist.</Header>
      <p className="mb-md text-white">
        But don&quot;t worry, you can find plenty of other things by navigating
        back to the homepage.
      </p>
      <Button size="lg" onClick={() => push("/")}>
        Back to homepage
      </Button>
    </div>
  );
}
