import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/client/ui/atoms/Button";
import Spinner from "@/client/ui/atoms/Spinner";
import { addPostValidation, AddPostValidation } from "@/schema/validation";
import { Textarea, Input } from "@/client/ui/zod";
import Header from "@/client/ui/atoms/Header";

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

export interface Props {
  onSubmit: (values: AddPostValidation) => void;
}

export default function PostAddScreen({ onSubmit }: Props) {
  const methods = useZodForm({
    schema: addPostValidation,
    defaultValues: {
      title: "",
      text: "",
    },
  });

  return (
    <div className="w-full">
      <Header tag="h2">Add a post</Header>

      <form
        onSubmit={methods.handleSubmit(async (values) => {
          console.log("values", values);
          await onSubmit(values);
          methods.reset();
        })}
      >
        <Input
          label="Title"
          placeholder="e.g. My awesome post"
          error={methods.formState.errors.title?.message}
          {...methods.register("title")}
        />

        <Textarea
          label="Text"
          placeholder="e.g. Blah blah, blah blah..."
          error={methods.formState.errors.text?.message}
          {...methods.register("text")}
        />

        <Button type="submit" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? (
            <Spinner size="sm" intent="secondary" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
