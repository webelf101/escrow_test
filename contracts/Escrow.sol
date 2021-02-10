// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * At its core, Protocol makes use of an escrow arrangement to
 * securely hold funds until a commercial transaction has completed.
 * In this exercise, we explore how escrow works in a naïve version
 * of the Boson Protocol core exchange mechanism.
 * Our system involves two parties, Sellers and Buyers. Each party
 * has an Account with a balance (in whatever currency you like),
 * which they can Credit with funds and from which they can make
 * payments.
 * The parties engage in the following activities, respectively:
 * ● Sellers:
 * ○ Offer items for sale, with each item consisting of a title
 * and a price; and
 * ○ Fulfil orders for items, performed out-of-band.
 * ● Buyers:
 * ○ Order items offered by sellers;
 * ○ Complete orders once they have received their purchase; and
 * ○ Complain about orders if they never receive their purchase.
 * The escrow arrangement functions as follows:
 * ● When a Buyer places an Order for an item, they place payment
 * into escrow for that item.
 * ● When a Buyer receives their purchase and Completes, the payment
 * is paid from escrow to the Seller.
 * ● When a Buyer fails to receive their purchase and Complains,
 * the payment is refunded from escrow to the Buyer.
 * ● If the Buyer does nothing, the payment remains in escrow.
 * Your goal is to build a system to process such transactions
 * according to the example input provided below.
 */

interface IERC20 {

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    function mint(address account, uint256 amount) external returns (bool);

    function burn(uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Escrow {

    IERC20 public token;

    mapping(uint256 => uint256) private _offerList;
    mapping(uint256 => address) private _offererList;
    mapping(address => mapping(uint256 => uint256)) private _orderList;

    constructor (address token_) {
        token = IERC20(token_);
    }

    function offer(string memory item, uint256 price) external {
        require(_offerList[uint256(keccak256(abi.encode(item)))] == 0, "Already offered");
        _offerList[uint256(keccak256(abi.encode(item)))] = price;
        _offererList[uint256(keccak256(abi.encode(item)))] = msg.sender;
    }

    function getPrice(string memory item) external view returns (uint256) {
        return _offerList[uint256(keccak256(abi.encode(item)))];
    }

    function order(string memory item) external returns (bool) {
        uint256 price = _offerList[uint256(keccak256(abi.encode(item)))];
        require(price > 0, "Not offered");
        _orderList[msg.sender][uint256(keccak256(abi.encode(item)))] += 1;
        token.transferFrom(msg.sender, address(this), price);
        return true;
    }

    function complete(string memory item) external returns (bool) {
        require(_orderList[msg.sender][uint256(keccak256(abi.encode(item)))] > 0, "Not ordered");
        _orderList[msg.sender][uint256(keccak256(abi.encode(item)))] -= 1;
        token.transfer(_offererList[uint256(keccak256(abi.encode(item)))], _offerList[uint256(keccak256(abi.encode(item)))]);
        return true;
    }

    function complain(string memory item) external returns (bool) {
        require(_orderList[msg.sender][uint256(keccak256(abi.encode(item)))] > 0, "Not ordered");
        _orderList[msg.sender][uint256(keccak256(abi.encode(item)))] -= 1;
        token.transfer(msg.sender, _offerList[uint256(keccak256(abi.encode(item)))]);
        return true;
    }
}