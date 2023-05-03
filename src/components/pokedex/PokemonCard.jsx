import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  grass: "border-green-500",
  fire: "border-red-500",
  normal: "border-gray-500",
  fighting: "border-yellow-500",
  flying: "border-indigo-500",
  poison: "border-purple-500",
  ground: "border-yellow-900",
  rock: "border-gray-700",
  gug: "border-green-700",
  ghost: "border-indigo-900",
  steel: "border-gray-400",
  water: "border-blue-500",
  electric: "border-yellow-400",
  psychic: "border-pink-500",
  ice: "border-blue-200",
  dragon: "border-red-900",
  dark: "border-gray-900",
  fairy: "border-pink-300",
  unknown: "border-gray-500",
  shadow: "border-gray-900",
};

const textByType = {
  grass: "text-green-500",
  fire: "text-red-500",
  normal: "text-gray-500",
  fighting: "text-yellow-500",
  flying: "text-indigo-500",
  poison: "text-purple-500",
  ground: "text-yellow-900",
  rock: "text-gray-700",
  gug: "text-green-700",
  ghost: "text-indigo-900",
  steel: "text-gray-400",
  water: "text-blue-500",
  electric: "text-yellow-400",
  psychic: "text-pink-500",
  ice: "text-blue-200",
  dragon: "text-red-900",
  dark: "text-gray-900",
  fairy: "text-pink-300",
  unknown: "text-gray-500",
  shadow: "text-gray-900",
};

const backgroundByType = {
  grass: "from-green-500 to-green-50",
  fire: "from-red-500 to-red-50",
  normal: "from-orange-100 to-orange-200",
  fighting: "from-yellow-500 to-yellow-50",
  flying: "from-indigo-500 to-indigo-50",
  poison: "from-purple-500 to-purple-50",
  ground: "from-yellow-900 to-yellow-200",
  rock: "from-gray-700 to-gray-200",
  bug: "from-green-700 to-green-200",
  ghost: "from-indigo-900 to-indigo-200",
  steel: "from-gray-400 to-gray-200",
  water: "from-blue-500 to-blue-50",
  electric: "from-yellow-400 to-yellow-50",
  psychic: "from-pink-500 to-pink-50",
  ice: "from-blue-200 to-blue-50",
  dragon: "from-red-900 to-red-200",
  dark: "from-gray-900 to-gray-200",
  fairy: "from-pink-300 to-pink-50",
  unknown: "from-gray-500 to-gray-100",
  shadow: "from-gray-900 to-gray-100",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={` text-center border-8 rounded-md ${
        bordersByType[pokemon?.types[0].type.name]
      } `}
    >
      {/* seccion superior  */}
      <section
        className={`bg-gradient-to-b ${
          backgroundByType[pokemon?.types[0].type.name]
        }  relative h-[150px]`}
      >
        <div className=" absolute  -bottom-12 w-[200px] left-1/2 -translate-x-1/2  ">
          <img src={pokemon?.sprites.other["official-artwork"].front_default} />
          {/*  otro url de imagen  pokemon?.sprites.other.dream_world.front_defaultalt  */}
        </div>
      </section>

      {/* seccion inferior  */}
      <section className="mb-2 p-3 ">
        <h3 className={`mt-10 mb-1 capitalize font-bold text-3xl 
        ${textByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
        <h4 className="mb-1 capitalize font-semibold">{types}</h4>
        <span>Type</span>

        <hr />

        <section className=" grid grid-cols-3 gap-2 p-2 mt-2">
          {pokemon?.stats.map((stat) => (
            <div className="mt-3" key={stat.stat.name}>
              <h5 className="uppercase text-sm text-gray-500">{stat.stat.name}</h5>
              <span className={`mt-10 mb-1 font-bold text-lg 
        ${textByType[pokemon?.types[0].type.name]}`}>{stat.base_stat}</span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
