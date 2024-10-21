import Image from "next/image";
import { useRouter } from "next/router";

const CharacterList = ({ characters }) => {
  const { push } = useRouter();

  return (
    <div className="my-4 h-full w-full flex flex-wrap gap-4 justify-center">
      {characters.map(({ id, image, name }) => (
        <button
          key={id}
          onClick={() => push(`/characters/${id}`)}
          className="flex flex-col rounded-lg border-2 border-solid border-black overflow-hidden hover:border-cyan-500 hover:bg-slate-200 hover:opacity-90"
        >
          <Image
            src={image}
            className="flex-1"
            alt={name}
            width={300}
            height={300}
          />
          <div className="mx-auto text-center my-1 font-bold">{name}</div>
        </button>
      ))}
    </div>
  );
};

export default CharacterList;
