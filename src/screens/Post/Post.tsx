import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { api } from "@/utils/client/api";
import { z } from "zod";

// validation schema is used by server
export const validationSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(5),
});

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

export default function PostScreen() {
  const utils = api.useContext().post;
  const query = api.post.list.useQuery(undefined, {
    suspense: true,
  });

  const posts = query.data;

  const mutation = api.post.add.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  const methods = useZodForm({
    schema: validationSchema,
    defaultValues: {
      title: "",
      text: "",
    },
  });

  return (
    <>
      <h2 className="text-3xl font-bold">Posts</h2>

      <div className="flex flex-col gap-2 py-2">
        {posts &&
          posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden bg-white p-4 shadow sm:rounded-lg"
            >
              <small>
                <b>{post.slug}</b>
              </small>
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="my-2">{post.text}</p>
            </article>
          ))}
      </div>

      <h2 className="text-2xl font-bold">Add a post</h2>
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
          methods.reset();
        })}
        className="space-y-2"
      >
        <div>
          <label>
            Title
            <br />
            <input {...methods.register("title")} className="border" />
          </label>

          {methods.formState.errors.title?.message && (
            <p className="text-red-700">
              {methods.formState.errors.title?.message}
            </p>
          )}
        </div>
        <div>
          <label>
            Text
            <br />
            <textarea {...methods.register("text")} className="border" />
          </label>
          {methods.formState.errors.text?.message && (
            <p className="text-red-700">
              {methods.formState.errors.text?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="m-0 rounded-sm border-black bg-slate-500 p-2 font-bold text-white"
        >
          {mutation.isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
}
