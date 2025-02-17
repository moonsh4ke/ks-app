import { configDotenv } from "dotenv";

// Loads test environment file when testing locally.
// When testing using CI, the env should be set in the CI pipeline
configDotenv({'path': './.env.local.test'})

const dbUrl = `${process.env.DATABASE_URL}/db_${process.env.JEST_WORKER_ID}`!;

declare global {
    var dbUrl: string;
}

global.dbUrl = dbUrl