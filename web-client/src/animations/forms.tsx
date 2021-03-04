import gsap from 'gsap';
import { TimelineLite } from 'gsap/all';
//  /* LOGIN / SIGN UP */

// USERNAME, FIRSTNAME LABEL
export const testi = (el: string): void => {
  gsap.to(el, {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const FloatUserNameLabel = (): void => {
  gsap.to('.username, .firstname', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatUsernameLabel = (): void => {
  gsap.to('.username, .firstname', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};
// PASSWORD
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

//EMAIL LABEL
export const FloatEmailLabel = (): void => {
  gsap.to('.email', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatEmailLabel = (): void => {
  gsap.to('.email', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};

//ADDRESS LABEL
export const FloatAddressLabel = (): void => {
  gsap.to('.address', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatAddressLabel = (): void => {
  gsap.to('.address', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};

//PHONE LABEL
export const FloatPhoneLabel = (): void => {
  gsap.to('.phone', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatPhoneLabel = (): void => {
  gsap.to('.phone', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};

//Upload LABEL
export const FloatUploadLabel = (): void => {
  gsap.to('.upload', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatUploadLabel = (): void => {
  gsap.to('.upload', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};
// FIRSTNAME LABEL
export const FloatLastNameLabel = (): void => {
  gsap.to('.lastname', {
    duration: 1,
    opacity: 1,
    y: -15,
    ease: 'expo.inOut',
  });
};

export const UnFloatLastNameLabel = (): void => {
  gsap.to('.lastname', {
    duration: 1,
    opacity: 0.4,
    y: 0,
    ease: 'expo.inOut',
  });
};

// FORMS
export const FadeInForm = (): void => {
  const tl = new TimelineLite();
  tl.to('.login', {
    duration: 1.5,
    opacity: 1,
    ease: 'expo.inOut',
  })
    .from('.title', {
      duration: 1,
      opacity: 0,
      y: 10,
      ease: 'expo.inOut',
    })
    .from(
      '.username-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.password-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.submit',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.separator',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.facebook',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.google',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    );
};

export const SignUpFadeIn = (): void => {
  const tl = new TimelineLite();
  tl.to('.signup', {
    duration: 0.5,
    opacity: 1,
    ease: 'expo.inOut',
  })
    .from('.title', {
      duration: 1,
      opacity: 0,
      y: 10,
      ease: 'expo.inOut',
    })
    .from(
      '.firstname-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.lastname-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.email-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.password-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.address-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.phone-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.upload-block',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.submit',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.separator',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.facebook',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    )
    .from(
      '.google',
      {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'expo.inOut',
      },
      '-=0.25'
    );
};
