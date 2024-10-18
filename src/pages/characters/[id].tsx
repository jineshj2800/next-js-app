// import { useRouter } from "next/router";
import apolloClient from "../../lib/apolloClient";
import { gql } from "@apollo/client";

const CHARACTER_QUERY = gql`
  query character($id: ID!) {
    character(id: $id) {
      status
      type
      image
      name
      location {
        name
        id
      }
      gender
      species
      id
      origin {
        name
      }
    }
  }
`;

// const CHARACTERS_LIST_QUERY = gql`
//   query characters {
//     characters {
//       results {
//         id
//         name
//         image
//         species
//       }
//     }
//   }
// `;

export default function Character({ character }) {
  const { image, name, status, location, gender, species, type, origin } =
    character;

  return (
    <div className="p-4 h-full w-full flex flex-row flex-wrap gap-4 justify-center">
      <img src={image} className="flex-1 h-full w-full" alt={name} />
      <div className="flex-1 flex flex-col font-black text-xl">
        <div>
          Name: <span className="italic font-normal">{name}</span>
        </div>
        <div>
          Status: <span className="italic font-normal">{status}</span>
        </div>
        <div>
          Gender: <span className="italic font-normal">{gender}</span>
        </div>
        <div>
          Species: <span className="italic font-normal">{species}</span>
        </div>
        <div>
          Type: <span className="italic font-normal">{type || "N/A"}</span>
        </div>
        <div>
          Location:
          <span className="italic font-normal">{location.name}</span>
        </div>
        <div>
          Origin: <span className="italic font-normal">{origin.name}</span>
        </div>
      </div>
    </div>
  );
  //   return JSON.stringify(data);
}

//getStaticProps
export async function getServerSideProps({ params }) {
  const { id } = params;
  const client = apolloClient();

  const { data } = await client.query({
    query: CHARACTER_QUERY,
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
  });

  //   await new Promise((resolve) => setTimeout(() => resolve(null), 3000));

  // Pass data to the page via props
  return { props: { character: data.character } };
}

// export async function getStaticPaths() {
//   //   const { id } = context.query;
//   const client = apolloClient();

//   const { data } = await client.query({
//     query: CHARACTERS_LIST_QUERY,
//     notifyOnNetworkStatusChange: true,
//   });

//   // Pass data to the page via props
//   return {
//     paths: data.characters.results.map(({ id }) => ({ params: { id } })),
//     fallback: false,
//   };
// }
