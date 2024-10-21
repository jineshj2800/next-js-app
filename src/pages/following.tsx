import { CharacterList } from "../components/characters/CharacterList";
import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

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

const FollowingPage = ({ data }) => {
  return <CharacterList characters={data} />;
};

// This gets called on every request
//getStaticProps
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
  console.log(followedCharacters);

  //   await new Promise((resolve) => setTimeout(() => resolve(null), 3000));

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

  // Pass data to the page via props
  return { props: { data: result } };
}
export default FollowingPage;
