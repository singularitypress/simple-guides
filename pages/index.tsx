import { InferGetStaticPropsType } from "next";
import Link from "next/link";

// Import the generated Lists API and types from Keystone
import { query } from ".keystone/api";
import Head from "next/head";

type Post = {
  id: string;
  title: string;
  slug: string;
};

// Home receives a `posts` prop from `getStaticProps` below
export default ({ games }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <main style={{ margin: "3rem" }}>
          <h1>Hello World! 👋🏻 </h1>
          <ul>
            {/* Render each post with a link to the content page */}
            {games.map((game) => (
              <li key={game.id}>
                <Link href={`/game/${game.slug}`}>
                  <a>{game.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export const getStaticProps = async () => {
  const games = (await query.Game.findMany({
    query: "id title slug",
  })) as Post[];
  return {
    props: {
      games,
    },
  };
};
