export const STATIC_ROUTES = {
  HOME: {
    Path: '',
    RouterLink: '/',
    Title: 'SHOP.CO | Home',
  },

  ABOUT: {
    Path: 'about',
    RouterLink: '/about',
    Title: 'SHOP.CO | About Us',
  },

  CONTACTS: {
    Path: 'contacts',
    RouterLink: '/contacts',
    Title: 'SHOP.CO | Contacts',
  },

  USER: {
    Path: 'user',
    RouterLink: '/user',
    CH: {
      LOGIN: {
        Path: 'login',
        RouterLink: '/user/login',
        Title: 'SHOP.CO | Login',
      },
      REGISTER: {
        Path: 'register',
        RouterLink: '/user/register',
        Title: 'SHOP.CO | Register',
      },
      FORGOT: {
        Path: 'forgot',
        RouterLink: '/user/forgot',
        Title: 'SHOP.CO | Forgot',
      },
      OTP: {
        Path: 'otp',
        RouterLink: '/user/otp',
        Title: 'SHOP.CO | Otp',
      },
    },
  },

  SHOP: {
    Path: 'shop',
    RouterLink: '/shop',
    Title: 'SHOP.CO | shop',
    CH: {
      CART: {
        Path: 'cart',
        RouterLink: '/shop/cart',
        Title: 'SHOP.CO | Cart',
      },
      CHECKOUT: {
        Path: 'checkout',
        RouterLink: '/shop/checkout',
        Title: 'SHOP.CO | Checkout',
      },
    },
  },

  NOT_FOUND: {
    Path: '**',
    RouterLink: '/**',
    Title: 'SHOP.CO | Not Found',
  },
};
