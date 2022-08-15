import { config } from "@keystone-6/core";
import * as lists from "./cms/lists";
import { withAuth, session } from "./cms/auth";

export default config(
  withAuth({
    server: {
      port: 8000,
    },
    db: {
      provider: (process.env.PROVIDER as "sqlite" | "postgresql") ?? "sqlite",
      url: `${process.env.DB}`,
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (context: any) => !!context.session?.data,
    },
  }),
);
