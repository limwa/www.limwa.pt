import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        lastModifiedAt: z.coerce.date().optional(),
    }),
});

const authors = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
    }),
})

export const collections = {
    blog,
    authors,
};