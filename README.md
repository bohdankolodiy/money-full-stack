# money-full-stack

## Requirements to launch the project

    1. Node.js: Install Node.js (v12+ is recommended for Fastify).
    2. Package Manager: Use either npm or yarn to manage dependencies.
    3. PostgreSQL: Ensure PostgreSQL is installed and running. You can install it locally or use a cloud-hosted service like AWS RDS, Heroku Postgres, or others.
    4. Angular CLI: Install Angular CLI globally. It provides a command-line interface for Angular development.
    5. For EMAIL service use https://ethereal.email/login - login & pass are in env file in money-be folder

## Commands to run the project:

    For build project containers run : npm run docker:build
    For run project docker image: npm run docker:compose

    For only run : For a dev server(money-be) navigate to `http://localhost:3000`. For a dev client server(money-fe) navigate to `http://localhost:4200`.

## Description of the project

The Money Platform is a comprehensive financial management system designed to provide users with a seamless and secure way to handle their digital transactions. Here’s an overview of its key features:

    User Registration and E-Wallet Management:

        User Accounts: Each user can register on the platform to create a personal account.
        E-Wallets: Upon registration, users are assigned their own e-wallet, which serves as a digital repository for their funds.

    Financial Transactions:

        Peer-to-Peer Payments: Users can transfer money to other users using their e-wallet numbers, facilitating easy and direct financial transactions.
        Deposits and Withdrawals: The platform supports depositing money into and withdrawing funds from users' e-wallets to and from their credit cards, ensuring flexible management of funds.

    Communication:

        In-App Chat: Users can engage in real-time conversations within the platform, allowing them to discuss their financial operations and transactions securely with other wallet owners.
