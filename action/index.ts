const core = require("./node_modules/@actions/core");
const github = require("./node_modules/@actions/github");

const { GITHUB_TOKEN, GITHUB_SHA } = process.env;

const CHECK_NAME = "build";
const octokit = github.getOctokit(GITHUB_TOKEN)

async function createCheck(): Promise<number> {
    console.log("Creating a check suite")
    const { data } = await octokit.checks.create({
        name: CHECK_NAME,
        head_sha: GITHUB_SHA,
        owner: "konradpabjan",
        repo: "actions-checks-test",
        status: "in_progress",
        started_at: new Date()
    });

    console.log(data)

    return Number(data.id)
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function updateCheck(id, checkResults) {
    await octokit.checks.update({
        owner: "konradpabjan",
        repo: "actions-checks-test",
        ...checkResults,
        name: CHECK_NAME,
        check_run_id: id
    });
  }


async function run(){
    console.log("this is running!")
    const id = await createCheck()
    console.log("id is " + id)
    const conclusion = "failure"

    console.log
    await updateCheck(id, {
        conclusion,
        status: "completed",
        output: Object.assign(
          {},
          {
            title: "Broken Links Check",
            summary:
              conclusion === "failure"
                ? "🚫 **Broken internal links found**"
                : "✅ **All interal links are working!**",
            text: "some text"
          }
        )
    });

    console.log("we are done!")

    await delay(15000);

    console.log("done with the long sleep")

    await delay(15000);

    console.log("done with the long sleep")

    await delay(15000);

    console.log("done with the long sleep")

    await delay(15000);

    console.log("done with the long sleep")
}

run().catch(error => {
    console.log(error);
    core.setFailed(error.message);
});