import React, { useEffect, useRef, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";

const Pokedex = () => {
  //? Array de pokemons
  const [pokemons, setPokemons] = useState([]);

  //? String para filtrar los pokemons por nombre
  const [pokemonName, setPokemonName] = useState("");

  //? Arreglo de tipos de pokemons posibles
  const [types, setTypes] = useState([]);

  //? String del tipo de pokemon actual, cambia de acuerdo al select
  const [currenType, setCurrenType] = useState("");

  //? Pagina actual
  const [currentPage, setCurrentPage] = useState(1); 

  //? Estado global donde se almacenan el nombre del usuario
  const nameTrainer = useSelector(store => store.nameTrainer);

  const input = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()));


  const paginationLogic = () => {
    // Cantidad de pokemons por pagina
    const POKEMONS_PER_PAGE = 12;

    // Pokemons que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

    // última pagina
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    // Bloque actual
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    // Paginas que se van a mostrar en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
    const maxPage =  actualBlock * PAGES_PER_BLOCK
    for(let i = minPage; i <= maxPage; i++){
      if(i <= lastPage){
        pagesInBlock.push(i)
      }
    }
    return {pokemonInPage, lastPage, pagesInBlock}
  }

  const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()

  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1){
      setCurrentPage(newCurrentPage) 
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }

  useEffect(() => {
    if(!currenType) {
          const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"

    axios
      .get(URL)
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.log(err));
    }
  }, [currenType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map(type => type.name)
        setTypes(newTypes)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(currenType) {
    const URL = `https://pokeapi.co/api/v2/type/${currenType}/`;
    axios
      .get(URL)
      .then((res) => {
        const pokemonsByType = res.data.pokemon.map((pokemon) => pokemon.pokemon)
        setPokemons(pokemonsByType)
      })
      .catch((err) => console.log(err));
    }
  }, [currenType]);

  useEffect(() => {
    setCurrentPage(1)
  },[pokemonName, currenType])

  useEffect(() => {
    setPokemonName("")
    input.current.value = ""
  },[currenType])

  return (
    <section className=" min-h-screen">
      <Header />
      {/* seccion de filtros y saludos  */}
      <section className=" py-8 px-10 xl:px-40">
        <h3 className="font-semibold">
          <strong className="truncate text-red-600">Welcome {nameTrainer},</strong> here you cand find you're favorite pokemon
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 my-4">
          <div className="flex w-auto h-[65px] p-2 shadow-lg border-2 
          rounded-md sm:w-auto">
            <input
              ref={input}
              className="outline-none p-5 max-[430px]:w-[200px] md:w-[400px]"
              id="pokemonName"
              type="text"
              placeholder="Search your pokemon "
            />
            <button className="bg-red-600 px-10 shadow-lg border-red-700 -mt-2 -mb-2 -mr-2 
            text-white font-semibold rounded-sm max-[430px]:px-3">Search</button>
          </div>
          <select className="h-[65px] p-2 border-2 shadow-lg outline-none rounded-md sm:w-[120px] bg-red-600 text-white font-semibold"  onChange={(e) => setCurrenType(e.target.value)}>
            <option value="">All</option>
            {types.map((type) => (
              <option className=" capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>

      {/* Paginacion */}
      <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
        {/* Pagina anterior */}
        <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-700 font-bold 
          text-white rounded-md cursor-pointer">{"<<"}</li>
        {/* Pagina anterior */}
        <li onClick={handleClickPreviousPage} className="p-3 bg-red-700 font-bold 
          text-white rounded-md cursor-pointer">{"<"}</li>
        {
          pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)}
           className={`p-3 font-bold 
          text-black rounded-md cursor-pointer border-2
          ${numberPage === currentPage && "bg-red-600 text-white border-red-600"}`} key={numberPage}>{numberPage}</li>)
        }
        {/* Pagina siguiente */}
        <li onClick={handleClickNextPage} className="p-3 bg-red-700 font-bold 
          text-white rounded-md cursor-pointer">{">"}</li>
             {/* ultima pagina */}
        <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-700 font-bold 
          text-white rounded-md cursor-pointer">{">>"}</li>
      </ul>

      {/* Lista de pokemons */}
      <section  className=" grid gap-8 px-10 max-w-[1250px] mx-auto 
        auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] py-4">
        {pokemonInPage.map(pokemon => 
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        )}
      </section>
    </section>
  );
};

export default Pokedex;
