import Header from "@/client/ui/atoms/Header";

export interface Props {}

export default function ErrorScreen({}: Props) {
  return (
    <div className="flex w-full flex-col gap-xs py-xs">
      <Header tag="h2">An error occurred</Header>
      <p className="text-white">
        Sorry, something went wrong and the app crashed. Please refresh the
        page!
      </p>
    </div>
  );
}
