// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("CrossChainNFT", "CCNFT") {
        tokenCounter = 0;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter += 1;
        return newTokenId;
    }

    function burnNFT(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    function getNFTMetadata(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
}
