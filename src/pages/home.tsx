import { CharacterList } from "../components/characters/CharacterList";
import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

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

// This gets called on every request
//getStaticProps
export async function getServerSideProps() {
  const client = apolloClient();

  //   await new Promise((resolve) => setTimeout(() => resolve(null), 3000));

  const { data } = await client.query({
    query: CHARACTERS_LIST_QUERY,
  });

  // Pass data to the page via props
  return { props: { data } };
}
export default HomePage;
