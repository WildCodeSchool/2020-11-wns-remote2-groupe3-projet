import gsap from 'gsap';
import { TimelineLite } from 'gsap/all';

export const MenuAnimations = (): void => {
  const tl = new TimelineLite();
  tl.from('.menu-logo', {
    duration: 2,
    opacity: 0,
    x: -55,
    ease: 'expo.inOut',
  })
    .from(
      '.menu-signup-button',
      {
        duration: 1.7,
        opacity: 0,
        x: 95,
        ease: 'expo.inOut',
      },
      '-=2.5'
    )
    .from(
      '.menu-signup-text',
      {
        duration: 1,
        opacity: 0,
        x: 135,
        ease: 'back',
      },
      '-=1'
    );
};
