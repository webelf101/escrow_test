const ERC20 = artifacts.require("ERC20");
const Escrow = artifacts.require("Escrow");

contract("Example Test", async accounts => {
    it("mint 20 token to Buyer 1", async () => {
        await ERC20.deployed();
        await Escrow.deployed();
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let twenty = web3.utils.toBN(20 * 10 ** 18);
        await ERC20token.methods.mint(accounts[1], twenty.toString()).send({from:accounts[0]});
        let balance = await ERC20token.methods.balanceOf(accounts[1]).call();
        assert.equal(balance.valueOf().toString(), twenty.toString());
    });

    it("mint 40 token to Buyer 2", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let forty = web3.utils.toBN(40 * 10 ** 18);
        await ERC20token.methods.mint(accounts[2], forty.toString()).send({from:accounts[0]});
        let balance = await ERC20token.methods.balanceOf(accounts[2]).call();
        assert.equal(balance.valueOf().toString(), forty.toString());
    });

    it("offer 3 priced Coffee by Seller 1", async () => {
        await ERC20.deployed();
        await Escrow.deployed();
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let three = web3.utils.toBN(3 * 10 ** 18);
        await EscrowContract.methods.offer("Coffee", three.toString()).send({from:accounts[3]});
    });

    it("offer 5 priced T-Shirt by Seller 2", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let five = web3.utils.toBN(5 * 10 ** 18);
        await EscrowContract.methods.offer("T-Shirt", five.toString()).send({from:accounts[4]});
    });

    it("offer 2.5 priced Tea by Seller 1", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let two_five = web3.utils.toBN(2.5 * 10 ** 18);
        await EscrowContract.methods.offer("Tea", two_five.toString()).send({from:accounts[3]});
    });

    it("offer 3.5 priced Cake by Seller 1", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let three_five = web3.utils.toBN(3.5 * 10 ** 18);
        await EscrowContract.methods.offer("Cake", three_five.toString()).send({from:accounts[3]});
    });

    it("offer 8 priced Shorts by Seller 2", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let eight = web3.utils.toBN(8 * 10 ** 18);
        await EscrowContract.methods.offer("Shorts", eight.toString()).send({from:accounts[4]});
    });

    it("offer 12 priced Hoody by Seller 2", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let twelve = web3.utils.toBN(12 * 10 ** 18);
        await EscrowContract.methods.offer("Hoody", twelve.toString()).send({from:accounts[4]});
    });

    it("order T-Shirt by Buyer 1", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let price = await EscrowContract.methods.getPrice("T-Shirt").call();
        await ERC20token.methods.approve(Escrow.address, price.toString()).send({from:accounts[1]});
        await EscrowContract.methods.order("T-Shirt").send({from:accounts[1]});
    });

    it("mint 10 token to Buyer 1", async () => {
        await ERC20.deployed();
        await Escrow.deployed();
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let ten = web3.utils.toBN(10 * 10 ** 18);
        await ERC20token.methods.mint(accounts[1], ten.toString()).send({from:accounts[0]});
    });

    it("order Hoody by Buyer 2", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let price = await EscrowContract.methods.getPrice("Hoody").call();
        await ERC20token.methods.approve(Escrow.address, price.toString()).send({from:accounts[2]});
        await EscrowContract.methods.order("Hoody").send({from:accounts[2]});
    });

    it("complete T-Shirt by Buyer 1", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        await EscrowContract.methods.complete("T-Shirt").send({from:accounts[1]});
    });

    it("order Coffee by Buyer 1", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let price = await EscrowContract.methods.getPrice("Coffee").call();
        await ERC20token.methods.approve(Escrow.address, price.toString()).send({from:accounts[1]});
        await EscrowContract.methods.order("Coffee").send({from:accounts[1]});
    });

    it("order Cake by Buyer 1", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let price = await EscrowContract.methods.getPrice("Cake").call();
        await ERC20token.methods.approve(Escrow.address, price.toString()).send({from:accounts[1]});
        await EscrowContract.methods.order("Cake").send({from:accounts[1]});
    });

    it("complain Hoody by Buyer 1", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        await EscrowContract.methods.complain("Hoody").send({from:accounts[2]});
    });

    it("order Tea by Buyer 2", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        let price = await EscrowContract.methods.getPrice("Tea").call();
        await ERC20token.methods.approve(Escrow.address, price.toString()).send({from:accounts[2]});
        await EscrowContract.methods.order("Tea").send({from:accounts[2]});
    });

    it("complete Coffee by Buyer 1", async () => {
        let EscrowContract = new web3.eth.Contract(Escrow.abi, Escrow.address);
        await EscrowContract.methods.complete("Coffee").send({from:accounts[1]});
    });

    it("Buyer 1's balance", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let balance = await ERC20token.methods.balanceOf(accounts[1]).call();
        console.log(web3.utils.fromWei(web3.utils.toBN(balance)).toString());
    });

    it("Seller 2's balance", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let balance = await ERC20token.methods.balanceOf(accounts[4]).call();
        console.log(web3.utils.fromWei(web3.utils.toBN(balance)).toString());
    });

    it("Total amount held in Escrow", async () => {
        let ERC20token = new web3.eth.Contract(ERC20.abi, ERC20.address);
        let balance = await ERC20token.methods.balanceOf(Escrow.address).call();
        console.log(web3.utils.fromWei(web3.utils.toBN(balance)).toString());
    });
});