import { Endpoint, HTTPMethod } from '../../types/enums';
import { CarData } from '../../types/interfaces';

export default class Model {
  private garageLink: string = `http://127.0.0.1:3000/${Endpoint.GARAGE}`;

  private totalCars: number = 0;

  public get totalCarsValue() {
    return this.totalCars;
  }

  public getAllCars = async (page: number, limit = 7): Promise<CarData[]> => {
    try {
      const response = await fetch(`${this.garageLink}?_page=${page}&_limit=${limit}`, { method: HTTPMethod.GET });
      this.totalCars = Number(response.headers.get('X-Total-count'));

      return await response.json();
    } catch (error) {
      console.error('Error occurred while fetching the list of cars:', error);
      throw error;
    }
  };

  public getCar = async (id: number): Promise<CarData> => {
    try {
      const response = await fetch(`${this.garageLink}/${id}`, { method: HTTPMethod.GET });

      return await response.json();
    } catch (error) {
      console.error('Error occurred while fetching the car:', error);
      throw error;
    }
  };

  public addCar = async (carProps: CarData) => {
    console.log(carProps);
    try {
      await fetch(this.garageLink, {
        method: HTTPMethod.POST,
        body: JSON.stringify(carProps),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error occurred while adding car to the Garage:', error);
      throw error;
    }
  };

  public updateCar = async (carProps: CarData) => {
    try {
      await fetch(`${this.garageLink}/${carProps.id}`, {
        method: HTTPMethod.PUT,
        body: JSON.stringify(carProps),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error occurred while updating car in the Garage:', error);
      throw error;
    }
  };

  public deleteCar = async (id: number) => {
    try {
      await fetch(`${this.garageLink}/${id}`, {
        method: HTTPMethod.DELETE,
      });
    } catch (error) {
      console.error('Error occurred while deleting car from the Garage:', error);
      throw error;
    }
  };
}
