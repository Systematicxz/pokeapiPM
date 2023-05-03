import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((res) => console.log(res.data));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgres}%`;
  };

  const backgroundByType2 = {
    grass: "bg-green-500",
    fire: "bg-red-500",
    normal: "bg-gray-500",
    fighting: "bg-yellow-500",
    flying: "bg-indigo-500",
    poison: "bg-purple-500",
    ground: "bg-yellow-900",
    rock: "bg-gray-700",
    gug: "bg-green-700",
    ghost: "bg-indigo-900",
    steel: "bg-gray-400",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    psychic: "bg-pink-500",
    ice: "bg-blue-200",
    dragon: "bg-red-900",
    dark: "bg-gray-900",
    fairy: "bg-pink-300",
    unknown: "bg-gray-500",
    shadow: "bg-gray-900",
    bug: "bg-gray-500",
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

  return (
    <section>
      <Header />

      <section className=" px-2 py-14">
        <article className="max-w-[768px] mx-auto shadow-xl p-2">
          {/* Seccion superior */}
          <section
            className={`bg-gradient-to-b ${
              backgroundByType[pokemon?.types[0].type.name]
            } relative h-[150px]`}
          >
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          {/* Informacion general */}
          <section>
            <div
              className={`p-4 mt-4 border-2 w-max mx-auto capitalize font-bold text-3xl  
            ${textByType[pokemon?.types[0].type.name]}`}
            >
              <h3>#{pokemon?.id}</h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2
                className={`mt-4 mb-1 capitalize font-bold text-5xl  
            ${textByType[pokemon?.types[0].type.name]}`}
              >
                {pokemon?.name}
              </h2>
              <hr />
            </div>

            <div className="flex justify-center gap-6 text-center">
              <div>
                <h5>Weight</h5>
                <strong>{pokemon?.weight}</strong>
              </div>
              <div>
                <h5>Height</h5>
                <strong>{pokemon?.height}</strong>
              </div>
            </div>

            <section className="grid md:grid-cols-2 gap-4 p-5">
              {/* Tipos */}
              <section className="text-center">
                <h3 className="font-bold">Types</h3>

                <section className={`grid grid-cols-2 gap-4 capitalize mt-5`}>
                  {pokemon?.types.map((type) => (
                    <article
                      className={`p-2 px-8 border-[1px] border-gray-300 text-center font-bold text-white ${
                        backgroundByType2[type.type.name]
                      } `}
                      key={type.type.name}
                    >
                      {type.type.name}
                    </article>
                  ))}
                </section>
              </section>

              {/* Habilidades */}
              <section className="text-center">
                <h3 className="font-bold">Abilities</h3>
                <section className="grid grid-cols-2 gap-4 capitalize mt-4">
                  {pokemon?.abilities.map((ability) => (
                    <article
                      className="p-2 px-8 border-[1px] 
                        border-gray-300 capitalize truncate font-bold bg-gray-600 text-white"
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </article>
                  ))}
                </section>
              </section>
            </section>
          </section>

          {/* seccion de stats */}
          <section className="p-10">
            <h3 className="text-4xl font-semibold">Stats</h3>
            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className=" flex justify-between mt-8">
                    <h5 className="uppercase font-semibold">
                      {stat.stat.name}:
                    </h5>
                    <span>{stat.base_stat}/255</span>
                  </section>

                  <div className="bg-gray-100 h-6 rounded-md">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-md`}
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
