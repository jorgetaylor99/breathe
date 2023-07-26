# Breathe: Asthma Self-Monitoring Web Application

## Overview

Breathe is a web-based application designed to help individuals with asthma monitor their condition. Developed using a tech stack of MongoDB, Mongoose, Node.js, Express.js, Bootstrap, and EJS, it provides an intuitive interface and a wide range of features:

- Symptom Tracker: Log symptoms and identify potential triggers.
- Peak Flow Monitoring: Record and visualize peak flow readings over time.
- Medication Tracker: Keep track of medication usage and set reminders.
- Weather and Pollen Levels: View local weather and pollen level data.
- Educational Resources: Access a range of resources to better understand and manage asthma.

## Installation

To install and run Breathe locally, follow the steps below:

1. Clone the repository from GitHub:

    ```bash
    git clone https://github.com/jorgetaylor99/breathe.git
    ```

2. Navigate into the breathe directory:

    ```bash
    cd breathe
    ```

3. In order to connect to the database, you will need to create a `.env` file in the root of your project and add the following lines:

    ```
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/db
    SECRET="secret"
    ```

4. Ensure MongoDB is running on your machine. If MongoDB is not already installed, you can download it from [here](https://www.mongodb.com/try/download/community). To start MongoDB, run the following command in a separate terminal:

    ```bash
    mongod
    ```

5. With MongoDB running and the `.env` file properly configured, install the project dependencies:

    ```bash
    npm install
    ```

6. Start the application:

    ```bash
    nodemon ./bin/www
    ```

7. Now, the application should be running at [http://localhost:3000](http://localhost:3000)

Enjoy using Breathe!
