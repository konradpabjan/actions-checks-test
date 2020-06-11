const core = require("./node_modules/@actions/core");
const github = require("./node_modules/@actions/github");

const { GITHUB_TOKEN, GITHUB_SHA } = process.env;

const CHECK_NAME = "Check Broken Links";

async function createCheck() {

    const octokit = github.getOctokit(GITHUB_TOKEN)

    const { data } = await octokit.checks.create({
        name: CHECK_NAME,
        head_sha: GITHUB_SHA,
        owner: "konradpabjan",
        repo: "actions-checks-test",
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