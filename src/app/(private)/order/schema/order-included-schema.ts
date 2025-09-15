import z from "zod";

export const orderIncludedSchema = z.object({
  included: z.string("Insira informações válidas").optional(),
  excluded: z.string("Insira informações válidas").optional(),
  teamNotes: z.string("Insira informações válidas").optional(),
});

export type orderIncludedType = z.infer<typeof orderIncludedSchema>;
