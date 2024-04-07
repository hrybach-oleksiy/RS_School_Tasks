// import BaseComponent from '../app/components/BaseComponent';

export interface InputProps {
  classNames?: string[];
  id: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: string;
  checked?: string;
  onChange?: EventListener;
}

export interface RoutesPath {
  path: string;
  callback: () => void;
}

// export interface RoutesPath {
//   path: string;
// }
