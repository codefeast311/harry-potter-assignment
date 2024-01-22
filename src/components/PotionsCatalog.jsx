import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PotionModal from "./PotionModal";
import CircularProgress from "@mui/material/CircularProgress";
const PotionsCatalog = () => {
  const [allPotions, setAllPotions] = useState([]);
  const [potions, setPotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [characteristicFilter, setCharacteristicFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.potterdb.com/v1/potions?page[size]=10&page[number]=${currentPage}`
        );
        setPotions(response.data.data);
        setAllPotions(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const filteredPotions = allPotions.filter(
      (potion) =>
        potion?.attributes?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      //   ||
      // potion?.attributes?.characteristics
      //   ?.toLowerCase()
      //   .includes(searchTerm.toLowerCase())
      // potion?.attributes?.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (difficultyFilter) {
      const filteredPotionsByDifficulty = filteredPotions.filter(
        (potion) => potion?.attributes?.difficulty === difficultyFilter
      );
      setPotions(filteredPotionsByDifficulty);
      return;
    }

    if (characteristicFilter) {
      const filteredPotionsByCharacteristic = filteredPotions.filter(
        (potion) => potion?.attributes?.characteristics === characteristicFilter
      );
      setPotions(filteredPotionsByCharacteristic);
      return;
    }

    setPotions(filteredPotions);
  }, [searchTerm, difficultyFilter, allPotions, characteristicFilter]);

  console.log(potions);
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Harry Potter Potions Catalog</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search by name"
          className="border-2 border-gray-300 rounded-md p-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        >
          <option value="">Filter by Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select
          onChange={(e) => setCharacteristicFilter(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        >
          <option value="">Filter by Characteristic</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {potions.map((item, index) => (
          <div
            key={index}
            className="border-2 border-gray-300 rounded-md p-4 flex flex-col"
          >
            <img
              src={item.attributes.image}
              alt={item.attributes.name}
              className="w-full h-64 object-cover"
            />
            <h2 className="text-xl font-bold">{item.attributes.name}</h2>
            <p className="text-sm">{item.attributes.description}</p>
            <p className="text-sm">Difficulty: {item.attributes.difficulty}</p>
            <p className="text-sm">
              Characteristic: {item.attributes.characteristics}
            </p>
            <div className="mt-auto self-end">
              <PotionModal item={item} />
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}

      {potions.length === 0 && !loading && (
        <div className="text-center col-span-full">
          <h1 className="text-2xl font-bold">No potions found</h1>
        </div>
      )}
      <div className="flex justify-center">
        <Pagination
          count={15}
          variant="outlined"
          onChange={(event, page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default PotionsCatalog;
