import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

export const Platform = list({
  fields: {
    title: text(),
    slug: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    games: relationship({ ref: "Game.platforms", many: true }),
  },
});
