// import dotenv from 'dotenv';
const dotenv = require('dotenv')
import path from 'path';
import fs from 'fs';

type Environment = "development" | "production";

class Env {

    private dotEnvDefault = '.env';
    private dotEnvDevelopment = '.env.development';
    private dotEnvProduction = '.env.production';


    private requiredKeys = [
        "NODE_ENV"
    ]

    constructor() {
        this.init();
    }

    init() {

        if (!fs.existsSync(this.dotEnvDefault)) {
            throw new Error("Please add a .env file to the root directory")
        }

        dotenv.config({
            path: path.resolve(process.cwd(), this.dotEnvDefault),
        });

        const environment = this.getEnvironment() || 'development';

        const envFile = this.getEnvFile(environment);

        // get a list of keys that _are not_ in .env but are required in this.requiredKeys
        const missingKeys = this.requiredKeys.map(key => {
            // get this required key from the .env.* file
            const variable = this.getEnvironmentVariable(key);

            // if the variable is not defined
            if (variable === undefined || variable === null) {
                return key;
            }
        })
            // filter out any undefined values
            .filter(value => value !== undefined);
        // if any keys are missing, throw an error.
        if (missingKeys.length) {
            const message = `
          The following required env variables are missing: 
              ${missingKeys.toString()}. 
          Please add them to your ${envFile} file
        `;
            throw new Error(message);
        }

        // re-configure dotenv with the new file
        dotenv.config({
            path: path.resolve(process.cwd(), envFile),
        });
    }

    getEnvFile(environment: Environment): string {
        switch (environment) {
            case 'development':
                return this.dotEnvDevelopment;
            case 'production':
                return this.dotEnvProduction;
            default:
                return this.dotEnvDefault;
        }
    }

    getEnvironmentVariable(variable: string): string {
        return process.env[variable] || 'development';
    }

    getEnvironment(): Environment | null {
        return (this.getEnvironmentVariable('NODE_ENV') as Environment);
    }

    isDevelopment() {
        return this.getEnvironment() === 'development';
    }

    isProduction() {
        return this.getEnvironment() === 'production';
    }
}

const env = new Env();

export default env;