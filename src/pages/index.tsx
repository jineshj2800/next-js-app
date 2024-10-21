import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

import CharacterList from "../components/characters/CharacterList";

const CHARACTERS_LIST_QUERY = gql`
  query characters {
    characters {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

const HomePage = ({ data }) => {
  return <CharacterList characters={data.characters.results} />;
};

export async function getStaticProps() {
  const client = apolloClient();

  const { data } = await client.query({
    query: CHARACTERS_LIST_QUERY,
  });

  return { props: { data } };
}
export default HomePage;
