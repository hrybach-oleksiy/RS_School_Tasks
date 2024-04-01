import { Endpoint, HTTPMethod } from '../../types/enums';
import { CarData, WinnerData } from '../../types/interfaces';

export default class Model {
  private garageLink: string = `http://127.0.0.1:3000/${Endpoint.GARAGE}`;

  private engineLink: string = `http://127.0.0.1:3000/${Endpoint.ENGINE}`;

  private winnerLink: string = `http://127.0.0.1:3000/${Endpoint.WINNERS}`;

  private totalCars: number = 0;

  private totalWinners: number = 0;

  public get totalCarsValue() {
    return this.totalCars;
  }

  public get totalWinnersValue() {
    return this.totalWinners;
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

  public async updateTotalCarsValue() {
    try {
      const response = await fetch(`${this.garageLink}`, { method: HTTPMethod.GET });
      const data = await response.json();
      this.totalCars = data.length;
    } catch (error) {
      console.error('Error updating total cars value:', error);
    }
  }

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

  public startEngine = async (id: number) => {
    try {
      const response = await fetch(`${this.engineLink}?id=${id}&status=started`, { method: HTTPMethod.PATCH });
      return await response.json();
    } catch (error) {
      console.error('Error occurred while starting Engine:', error);
      throw error;
    }
  };

  public stopEngine = async (id: number) => {
    try {
      const response = await fetch(`${this.engineLink}?id=${id}&status=stopped`, { method: HTTPMethod.PATCH });
      return await response.json();
    } catch (error) {
      console.error('Error occurred while stopping Engine:', error);
      throw error;
    }
  };

  public driveEngine = async (id: number) => {
    try {
      const response = await fetch(`${this.engineLink}?id=${id}&status=drive`, { method: HTTPMethod.PATCH });
      return response.status !== 200 ? { success: false } : { ...(await response.json()) };
    } catch (error) {
      console.error('Error occurred while driving Engine:', error);
      throw error;
    }
  };

  public getAllWinners = async (): Promise<WinnerData[]> => {
    try {
      const response = await fetch(`${this.winnerLink}`, { method: HTTPMethod.GET });
      return await response.json();
    } catch (error) {
      console.error('Error getting all winners:', error);
      throw error;
    }
  };

  // TODO: make all methods using arrow function
  public getWinners = async (page: number, limit = 10) => {
    try {
      const response = await fetch(`${this.winnerLink}?_page=${page}&_limit=${limit}`, { method: HTTPMethod.GET });
      this.totalWinners = Number(response.headers.get('X-Total-count'));
      return await response.json();
    } catch (error) {
      console.error('Error getting winners:', error);
      throw error;
    }
  };

  public async updateTotalWinnersValue() {
    try {
      const response = await fetch(`${this.winnerLink}`, { method: HTTPMethod.GET });
      const data = await response.json();
      this.totalWinners = data.length;
    } catch (error) {
      console.error('Error updating total winners value:', error);
    }
  }

  public getWinner = async (id: number) => {
    try {
      const response = await fetch(`${this.winnerLink}/${id}`, { method: HTTPMethod.GET });

      return await response.json();
    } catch (error) {
      console.error('Error occurred while fetching the winner:', error);
      throw error;
    }
  };

  public addWinner = async (winnerProps: WinnerData) => {
    try {
      await fetch(this.winnerLink, {
        method: HTTPMethod.POST,
        body: JSON.stringify(winnerProps),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error occurred while adding winner to the List:', error);
      throw error;
    }
  };

  public deleteWinner = async (id: number) => {
    try {
      await fetch(`${this.winnerLink}/${id}`, {
        method: HTTPMethod.DELETE,
      });
    } catch (error) {
      console.error('Error occurred while deleting winner from the List:', error);
      throw error;
    }
  };

  public updateWinner = async (winnerProps: CarData) => {
    try {
      await fetch(`${this.winnerLink}/${winnerProps.id}`, {
        method: HTTPMethod.PUT,
        body: JSON.stringify(winnerProps),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error occurred while updating winner in the List:', error);
      throw error;
    }
  };
}
