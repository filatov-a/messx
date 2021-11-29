const app = require("./app")

async function main(){
    const App = app.create()
    App.appStart()
}


main().catch((err) => {
    console.error(err);
    process.exit(1);
});
