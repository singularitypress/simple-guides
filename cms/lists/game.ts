import { list } from "@keystone-6/core";
import { relationship, select, text } from "@keystone-6/core/fields";

export const Game = list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text(),
    hero: text(),
    verticalCover: text(),
    horizontalCover: text(),
    logo: text(),
    markdown: text({
      ui: {
        description:
          'Enter the path for the markdown files in the repo; i.e. "/guides/jerks.md"',
      },
    }),
    genres: relationship({ ref: "Genre.games", many: true }),
    platforms: relationship({ ref: "Platform.games", many: true }),
    slug: text({ validation: { isRequired: true }, isIndexed: "unique" }),
  },
});
