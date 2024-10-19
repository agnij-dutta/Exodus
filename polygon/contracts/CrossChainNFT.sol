// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CrossChainNFT is ERC721URIStorage, Ownable ReentrancyGuard{
    uint256 public tokenCounter;

    // Wormhole event for cross-chain transfers
    event NFTTransferInitiated(uint256 tokenId, string destinationChain, address recipient);

    // Wormhole event for successful cross-chain receipt
    event NFTReceived(uint256 tokenId, address recipient, string tokenURI);

    constructor() ERC721("CrossChainNFT", "CCNFT") {
        tokenCounter = 0;
    }

    // Mint NFT with onlyOwner privilege for initial creation
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter += 1;
        return newTokenId;
    }

    // Initiate cross-chain transfer (burn on source chain)
    uint256 public transferFee = 0.01 ether;

    function initiateCrossChainTransfer(uint256 tokenId, string memory destinationChain, address recipient) public payable nonReentrant{
        require(ownerOf(tokenId) == msg.sender, "Only the NFT owner can transfer");
        require(msg.value >= transferFee, "Insufficient fee");

        // Emit event that Wormhole will capture and process
        emit NFTTransferInitiated(tokenId, destinationChain, recipient);

        // Burn the NFT on the source chain
        _burn(tokenId);
    }

    // Receive cross-chain NFT (mint on destination chain)
    function receiveCrossChainNFT(uint256 tokenId, address recipient, string memory tokenURI) public onlyOwner {
        // Mint the NFT on the destination chain
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        // Emit event to confirm successful receipt
        emit NFTReceived(tokenId, recipient, tokenURI);
    }
}
