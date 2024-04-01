import { WinnerData } from '../types/interfaces';

const sortByAscending = (data: WinnerData[], key: keyof WinnerData): WinnerData[] => {
  return data.slice().sort((a, b) => {
    const aValue = Number(a[key]);
    const bValue = Number(b[key]);
    return aValue - bValue;
  });
};

const sortByDescending = (data: WinnerData[], key: keyof WinnerData): WinnerData[] => {
  return data.slice().sort((a, b) => {
    const aValue = Number(a[key]);
    const bValue = Number(b[key]);
    return bValue - aValue;
  });
};

export { sortByAscending, sortByDescending };
