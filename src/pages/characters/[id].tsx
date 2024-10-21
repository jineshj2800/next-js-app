import apolloClient from "../../lib/apolloClient";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import Image from "next/image";

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

const followCharacter = async ({ id }) => {
  const response = await fetch("/api/follow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: id }),
  });

  await response.json();
};

export default function Character({ character }) {
  const { image, name, status, location, gender, species, type, origin } =
    character;

  const router = useRouter();
  const id = router.query.id;

  const onFollow = useCallback(() => {
    followCharacter({ id });
  }, [id]);

  return (
    <div className="p-4 h-full w-full flex flex-row flex-wrap gap-4 justify-center">
      <Image
        src={image}
        className="flex-1 h-full w-full"
        alt={name}
        height={700}
        width={500}
      />
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
        <span>
          <button onClick={onFollow} className="flex px-1 follow-btn">
            Follow
          </button>
        </span>
      </div>
    </div>
  );
}

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

  return { props: { character: data.character } };
}
