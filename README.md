### Local testing

For local testing; use a docker container running postgresql:

    docker run --name some-postgres -p 5440:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres

Then, add the database URI to .env.local.test; for the previous example it would be:

    DATABASE_URL ='postgresql://postgres:mysecretpassword@localhost:5440'

Run the npm test script:

    npm run test