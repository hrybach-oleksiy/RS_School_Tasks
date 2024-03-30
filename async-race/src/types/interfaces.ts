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

export interface CarData {
  name: string;
  color: string;
  id?: number;
}

export interface AnimatedCarData {
  [key: string | number]: number | string;
  id: number;
}
