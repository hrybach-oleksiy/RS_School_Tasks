import { AnimatedCarData } from '../types/interfaces';

const animateCar = (car: HTMLElement, distance: number, duration: number) => {
  const animatedCarIDs = <AnimatedCarData>{};
  const currentCar = car;
  let start = 0;

  function step(timestamp: number) {
    if (!start) {
      start = timestamp;
    }
    const elapsed = (timestamp - start) / duration;
    const translateValue: number = elapsed * distance;
    currentCar.style.transform = `translateX(${translateValue}px)`;

    if (elapsed < 1) {
      animatedCarIDs.id = window.requestAnimationFrame(step);
    }
  }

  animatedCarIDs.id = window.requestAnimationFrame(step);
  return animatedCarIDs;
};

export default animateCar;
