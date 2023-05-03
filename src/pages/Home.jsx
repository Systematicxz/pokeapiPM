import React from "react";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")

  }
  return (
    <section className=" min-h-screen grid grid-rows-[1fr_auto]">
      {/* parte superior  */}
      <section className="place-items-center grid">
        <article className="p-5 flex flex-col text-center gap-4">
          <div className="pb-7">
            <img src="/images/pokedex.png" alt="" />
          </div>
          <h2 className="text-5xl font-bold text-red-600">Hello trainer!</h2>
          <p className="text-xl font-semibold"> Give me your name to start! :</p>
          <div className="flex justify-center pt-10">
          <form onSubmit={handleSubmit} className="flex w-auto h-[55px] border-2 rounded-md sm:w-auto">
            <input className="px-2 outline-none shadow-lg w-[350px] max-[430px]:w-[200px]" id="nameTrainer" type="text" placeholder="Your name..."/>
            <button className="mx-auto text-white font-medium p-2 shadow-lg bg-red-600 px-4 border-red-700 ">Start!</button>
          </form>
          </div>
        </article>
      </section>

      {/* footer */}
      <Footer />
    </section>
  );
};

export default Home;
