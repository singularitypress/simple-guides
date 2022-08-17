import { query } from ".keystone/api";

export const getGame = async (slug: string, queryStr: string) => {
  const game = await query.Game.findOne({
    where: { slug },
    query: queryStr,
  });
  if (!game) {
    return { notFound: true };
  }
  return { props: { game } };
};
