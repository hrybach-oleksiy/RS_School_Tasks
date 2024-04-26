import { carBrands, carModels } from './carList';

const getRandomName = () => {
  const randomNumBrand = Math.floor(Math.random() * carBrands.length);
  const randomNumModel = Math.floor(Math.random() * carModels.length);

  return `${carBrands[randomNumBrand]} ${carModels[randomNumModel]}`;
};

export default getRandomName;
