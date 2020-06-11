const core = require("@actions/core");
const github = require("@actions/github");

const { GITHUB_TOKEN, GITHUB_SHA } = process.env;

async function createCheck() {
    const { data } = await octokit.checks.create({
        ...github.context.repo,
        name: CHECK_NAME,
        head_sha: GITHUB_SHA,
        status: "in_progress",
        started_at: new Date()
    });

    console.log(data)
}

async function run(){
    console.log("this is running!")
    createCheck()
}

run().catch(error => {
    console.log(error);
    core.setFailed(error.message);
});