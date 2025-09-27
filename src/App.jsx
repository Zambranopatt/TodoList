import { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const fetchApi = async () => {
    try {
      const res = await axios.get(api);
      console.log(res.data);
      setRecipes(res.data.meals || []);
    } catch (error) {
      console.error(error);
    }
  };

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
    fetchApi();
  }, []);

  return (
    <section className="bg min-h-screen p-10">
      <main className="text-center space-y-2">
        <h1 className="text-3xl ">Food Finder</h1>
        <p className="text-lg">Find the food you love</p>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
          placeholder="find dish"
          className="p-1"
        />
        <button className="btns bg-black hover:bg-gray-900" onClick={fetchApi}>
          Search
        </button>
      </main>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {recipes.length > 0 ? (
          recipes.map((el) => (
            <div
              key={el.idMeal}
              className="p-2 bg-white text-center overflow-hidden hover:scale-110 transition duration-300 "
            >
              <img
                src={el.strMealThumb}
                alt={el.strMealThumb}
                className="w-[140px] rounded-lg"
              />
              <p>{el.strMeal}</p>
            </div>
          ))
        ) : (
          <p>Food not found</p>
        )}
      </div>
    </section>
  );
};

export default App;
