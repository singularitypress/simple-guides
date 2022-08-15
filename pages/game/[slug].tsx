import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Link from "next/link";

import { query } from ".keystone/api";
import Head from "next/head";

type Game = {
  id: string;
  title: string;
  description: string;
};

export default ({ game }: { game: Game }) => {
  return (
    <>
      <Head>
        <title>{game.title}</title>
      </Head>
      <main style={{ margin: "3rem" }}>
        <div>
          <Link href="/">
            <a>&larr; back home</a>
          </Link>
        </div>
        <h1>{game.title}</h1>
        <p>{game.description}</p>
      </main>
    </>
  );
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const games = (await query.Game.findMany({
    query: `slug`,
  })) as { slug: string }[];

  const paths = games
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => `/game/${slug}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const game = (await query.Game.findOne({
    where: { slug: params!.slug as string },
    query: "id title description",
  })) as Game | null;
  if (!game) {
    return { notFound: true };
  }
  return { props: { game } };
};
