const mongoose = require("mongoose");
const chalk = require("chalk");

//----------------------------------------------------------------------------------

const { MONGO_URI: mongoUri } = process.env;

//----------------------------------------------------------------------------------

const connectDb = () => {
    return new Promise((resolve, reject) => {
        if (!mongoUri) {
            console.log(chalk.red.inverse("mongo uri is not found"));
            return reject();
        }

        mongoose
            .connect(mongoUri, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then((res) => {
                console.log(
                    chalk.green.inverse("Database connection successful")
                );
                return resolve();
            })
            .catch((err) => {
                console.log(err);
                console.log(
                    chalk.red.inverse(
                        "There is some error in database connection"
                    )
                );
                return reject();
            });
    });
};

//----------------------------------------------------------------------------------

module.exports = connectDb;
