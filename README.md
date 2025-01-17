# Project Overview

This project is heavily inspired by the original [ToastD](https://www.toastd.in/) website, with several added functionalities to enhance the user experience. Key features include a dynamic homepage, product cart management, an interactive reels section, and more.

**Deployed Link:** [https://toastd.vercel.app/](https://toastd.vercel.app/)

---

## Technologies and Tools

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** JavaScript (JSX)
- **CSS:** [TailwindCSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Notification:** [React Hot Toast](https://react-hot-toast.com/)
- **Components:** [Material UI](https://mui.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## Key Features

### 1. Homepage

- Displays a list of products with the option to add them to the cart.
- Integrated animations using Framer Motion.
- Tooltips (Material UI) to show product descriptions.
- Includes an account, side navbar, and cart button.
- Footer contains links to the reels and home page.

### 2. Side Navbar

- Includes dummy links for most options, except for the home and reels links.

### 3. Account Page

- "Coming Soon..." message.

### 4. Cart

- View items added to the cart with the total amount displayed.
- Ability to place an order.

### 5. Reels Section

- Features a back-to-home button and autoplay with unmuted video.
- Click on the screen to start or stop the video.
- Like and unlike functionality.
- Share button to share videos on social media.
- Animation for video tags that redirect to the homepage.
- Only the video currently in view will play, while others will pause.

### Deployment

- Deployed on [Vercel](https://vercel.com/).

---

## Issues & Solutions

- **Issue:** Using `useState` to manage like state or mute state caused unnecessary re-renders.

  - **Solution:** Replaced `useState` with `useRef` to prevent re-renders.

- **Issue:** Using `useRef` prevented icon updates, resulting in only text updates.
  - **Solution:** Modified the approach to ensure icons are updated properly.

---

## Improvements

- Add animation for liking a video.
- Replace text-based interactions with icons for a more visual experience.
- Enhance the share modal for better user interaction.

---

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the Repository**

2. **Install the necessary dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

---
