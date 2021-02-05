import gsap from 'gsap';

export const FloatUserNameLabel = (): void => {
  gsap.to('.username', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatUsernameLabel = (): void => {
  gsap.to('.username', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};

export const FloatPasswordLabel = (): void => {
  gsap.to('.password', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatPasswordLabel = (): void => {
  gsap.to('.password', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};
