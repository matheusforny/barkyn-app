This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the packages from inside the barkyn-app folder

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!

## What was accomplished

The page requests the product data from a fake url and allows users to add each product to a cart, selecting its size and color.

After that, the user can go to the checkout page, where they will be able to review the purchase and register their mailing adress before simulating a purchase

## What I would do different

First, I unfortunately skipped over the unit tests. Had I remembered them, I would implement the tests as I was developing the code

Second, I would make the Size buttons more user-friendly. They must inform the user that they're mandatory, and I would set a default value for them.

Third, I would refactor the code to be more concise. As this is my first time using Next.js, I definitely would follow the desired pattern more often
