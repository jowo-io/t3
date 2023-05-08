import Button from "@/client/ui/atoms/Button";
import Spinner from "@/client/ui/atoms/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

// validation schema is used by server
export const validationSchema = z.object({
  title: z.string().min(2).max(200),
  text: z.string().min(5).max(5000),
});

type ValidationSchema = z.infer<typeof validationSchema>;

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

type Props = {
  onSubmit: (values: ValidationSchema) => void;
};

export default function PostAddScreen({ onSubmit }: Props) {
  const methods = useZodForm({
    schema: validationSchema,
    defaultValues: {
      title: "",
      text: "",
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-2 py-2">
      <h2 className="text-3xl font-bold text-white">Add a post</h2>
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await onSubmit(values);
          methods.reset();
        })}
        className="space-y-2"
      >
        <div>
          <label>
            <span className="text-white">Title</span>
            <br />
            <input
              {...methods.register("title")}
              className="w-full border p-1"
            />
          </label>

          {methods.formState.errors.title?.message && (
            <p className="text-red-700">
              {methods.formState.errors.title?.message}
            </p>
          )}
        </div>
        <div>
          <label>
            <span className="text-white">Text</span>
            <br />
            <textarea
              {...methods.register("text")}
              className="w-full border p-1"
            />
          </label>
          {methods.formState.errors.text?.message && (
            <p className="text-red-700">
              {methods.formState.errors.text?.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? (
            <Spinner size="small" intent="secondary" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
