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
    // if (progress >= 1 && !btnResetRace.hasAttribute('disabled')) {
    //   if (resultRace.length === 0) addWinner(car, duration);
    //   resultRace.push(car);
    // }
  }

  animatedCarIDs.id = window.requestAnimationFrame(step);
  return animatedCarIDs;
};

export default animateCar;
