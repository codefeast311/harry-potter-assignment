import React from 'react'
import PotionModal from './PotionModal'

const PotionCard = ({item}) => {
  return (
    <div
    className="border-2 border-gray-300 rounded-md p-4 flex flex-col"
  >
    <img
      src={item.attributes.image}
      alt={item.attributes.name}
      className="w-full h-64 object-cover"
    />
    <h2 className="text-xl font-bold">{item.attributes.name ? item.attributes.name : 'N/A'}</h2>
    <p className="text-sm">Description: {item.attributes.description ? item.attributes.description : 'N/A'}</p>
    <p className="text-sm">Difficulty: {item.attributes.difficulty ? item.attributes.difficulty : 'N/A'}</p>
    <p className="text-sm">
      Characteristic: {item.attributes.characteristics ? item.attributes.characteristics : 'N/A'}
    </p>
    <div className="mt-auto self-end">
      <PotionModal item={item} />
    </div>
  </div>
  )
}

export default PotionCard