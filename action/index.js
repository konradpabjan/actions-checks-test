const core = require("@actions/core");
const github = require("@actions/github");

async function run(){
    console.log("this is running!")
}

run().catch(error => {
    console.log(error);
    core.setFailed(error.message);
});