import { createFileRoute } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import services from "@/api";
import { listCharacters } from "@/constant/listCharacters";
import { TCharacter } from "@/types/entities/character";
import { useQuery } from "react-query";

export const Route = createFileRoute("/_protected/posts")({
  component: () => <Challenge />,
});

const Challenge = () => {
  const id = 1;
  const { data: responseData } = useQuery({
    queryKey: ["characters", id],
    queryFn: () => services.characters.getById(id),
  });
  const data = responseData?.data?.data;
  const getImage = (data: TCharacter, type: "small" | "large" | "medium") => {
    return data?.attributes?.image?.data.attributes?.formats[type].url;
  };

  const hostImg = "http://localhost:1337";

  return (
    <div className="grid gap-3 justify-items-center">
      {data ? (
        <img
          srcSet={`${"http://localhost:1337" + getImage(data, "small")}  1024w,
          ${"http://localhost:1337" + getImage(data, "medium")} 640w,
          ${"http://localhost:1337" + getImage(data, "large")}  320w`}
          sizes="(min-width: 36em) 33.3vw,
            100vw"
          src="small.jpg"
          alt="A rad wolf"
        />
      ) : null}

      <div className="grid gap-5 mt-4 md:grid-cols-3">
        <SelectCharacter />
        <SelectCharacter />
        <SelectCharacter />
      </div>
    </div>
  );
};
const SelectCharacter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a character" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {listCharacters().map((character) => (
            <SelectItem value={character}>{character}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
