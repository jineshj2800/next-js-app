import dynamic from "next/dynamic";
import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

import { EmptyPlaceholder } from "../components/EmptyPlaceholder";

const CHARACTERS_LOOKUP_QUERY = gql`
  query charactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
      species
    }
  }
`;

const CharacterList = dynamic(
  () => import("../components/characters/CharacterList"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const FollowingPage = ({ data }) => {
  return data?.length ? (
    <CharacterList characters={data} />
  ) : (
    <EmptyPlaceholder />
  );
};

export async function getServerSideProps() {
  const client = apolloClient();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/follow`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { storedData: followedCharacters } = await response.json();

  let result = [];

  if (followedCharacters.length) {
    const { data } = await client.query({
      query: CHARACTERS_LOOKUP_QUERY,
      variables: {
        ids: followedCharacters,
      },
    });
    result = data.charactersByIds;
  }

  return { props: { data: result } };
}
export default FollowingPage;
