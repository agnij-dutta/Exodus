// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Constructor with correct arguments for the base ERC721 constructor
    constructor() ERC721("CrossChainNFT", "CCNFT") {
        tokenCounter = 0; // Initialize the token counter
    }

    // Minting function
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId); // Mint the NFT to the recipient
        _setTokenURI(newTokenId, tokenURI); // Set the metadata URI for the NFT
        tokenCounter += 1; // Increment the token counter
        return newTokenId; // Return the new token ID
    }

    // Function to burn an NFT
    function burnNFT(uint256 tokenId) public onlyOwner {
        _burn(tokenId); // Burn the NFT
    }

    // Function to get metadata URI of an NFT
    function getNFTMetadata(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId); // Return the metadata URI of the specified token ID
    }
}
