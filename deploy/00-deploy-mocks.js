const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // includes: checks if variable is inside array
    if (developmentChains.includes(network.name)) {
        // or chainId == "31337"
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER], //constructor parameters
        })
        log("Mocks deployed!")
        log("------------------------------------------") // marks end of specific script
    }
}

module.exports.tags = ["all", "mocks"]
