// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Correctly specify the name and symbol for the ERC721 base constructor
    constructor() ERC721("CrossChainNFT", "CCNFT") {
        tokenCounter = 0; // Initialize the token counter
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId); // Mint the NFT
        _setTokenURI(newTokenId, tokenURI); // Set the token URI for metadata
        tokenCounter += 1; // Increment the counter
        return newTokenId; // Return the new token ID
    }

    function burnNFT(uint256 tokenId) public onlyOwner {
        _burn(tokenId); // Burn the NFT
    }

    function getNFTMetadata(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId); // Return the metadata URI
    }
}
