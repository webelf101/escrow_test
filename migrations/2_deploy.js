const ERC20 = artifacts.require("ERC20");
const Escrow = artifacts.require("Escrow");

const migration = async (deployer, network, accounts) => {
    await Promise.all([
        deployToken(deployer, network),
    ]);
};

module.exports = migration;

async function deployToken(deployer, network) {
    await deployer.deploy(ERC20, "Test Token", "TST");
    await deployer.deploy(Escrow, ERC20.address);
};