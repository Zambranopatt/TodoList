import { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Filipino
`;
  const fetchApi = async () => {
    try {
      const res = await axios.get(api);
      console.log(res.data);
      setRecipes(res.data.meals);
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
    <section className="h-screen px-10 flex flex-col">
      <div className="text-center pt-10 space-y-3">
        <h1 className="text-4xl tracking-wider">Food Finder</h1>
        <p className="text-lg">Find the food you love</p>
        <input
          type="text"
          ref={searchRef}
          placeholder="adobo"
          className=" px-2 py-1"
        />
        <button className="btns bg-black hover:bg-gray-900">Search</button>
      </div>
      <div className="flex flex-wrap items-center justify-center  ">
        {recipes &&
          recipes.map((el, k) => (
            <div key={k} className="flex flex-col items-center p-3">
              <img src={el.strMealThumb} className="w-[150px]" alt="" />
              <p>{el.strMeal}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default App;
