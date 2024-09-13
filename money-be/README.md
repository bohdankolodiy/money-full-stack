# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

## Requirements to launch the project

    1. Node.js: Install Node.js (v12+ is recommended for Fastify).
    2. Package Manager: Use either npm or yarn to manage dependencies.
    3. PostgreSQL: Ensure PostgreSQL is installed and running. You can install it locally or use a cloud-hosted service like AWS RDS, Heroku Postgres, or others.

## Commands to run the project:

    For build project : npm run build

    For only run : Run `npm run start` for a dev server. Navigate to `http://[::1]:3000`.

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

## Database Architecture
    This document outlines the database schema used for the application. The schema includes tables for managing users, chat functionality, and transaction history.

    ![alt text](https://github.com/bohdankolodiy/money-full-stack/tree/main/money-be/erd-db.drawio.png?raw=true)

    **Users Table**
    Stores user account information.

    id: Unique identifier for the user (Primary Key).
    email: User's email address.
    password: User's hashed password.
    wallet: User's wallet identifier.
    balance: User's account balance.
    is_verify: Flag indicating whether the user's email is verified.
    
    **History Table**
    Tracks actions and changes in user accounts.

    id: Unique identifier for the history record (Primary Key).
    amount: Amount associated with the action.
    action: Description of the action.
    userid: Identifier of the user performing the action.
    status: Status of the action.
    date: Date and time of the action.
    card: Card identifier if applicable.
    wallet: Wallet identifier if applicable.
    comment: Additional comments.
    transact_id: Transaction identifier if applicable.

    **Transactions Table**
    Records transactions between users.
    
    id: Unique identifier for the transaction (Primary Key).
    reciever_id: Identifier of the receiving user (Foreign Key referencing history.id).
    sender_id: Identifier of the sending user (Foreign Key referencing history.id).
    amount: Amount transferred.
    status: Status of the transaction.

    **Chat Table**
    Manages chat conversations between users.
    
    chat_id: Unique identifier for the chat (Primary Key).
    user1_id: Identifier of the first user in the chat (Foreign Key referencing users.id).
    user2_id: Identifier of the second user in the chat (Foreign Key referencing users.id).
    last_message_id: Identifier of the last message in the chat.
    wallet_1: Wallet identifier for the first user.
    wallet_2: Wallet identifier for the second user.

    **Messages Table**
    Stores individual messages sent in chats.
    
    message_id: Unique identifier for the message (Primary Key).
    text: Content of the message.
    send_date: Date and time when the message was sent.
    chat_id: Identifier of the chat where the message was sent (Foreign Key referencing chat.chat_id).
    sender_id: Identifier of the user who sent the message.
    
    






