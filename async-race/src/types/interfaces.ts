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
