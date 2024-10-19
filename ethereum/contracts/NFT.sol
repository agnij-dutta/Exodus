// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Event triggered when NFT is sent across chains
    event NFTTransferred(uint256 tokenId, string destinationChain, address recipient);

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
        burn(tokenId);
    }

    function getNFTMetadata(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function transferNFTToChain(uint256 tokenId, string memory destinationChain, address recipient) public {
        require(ownerOf(tokenId) == msg.sender, "Only owner can transfer");
        
        // Emit event to be picked up by Wormhole bridge
        emit NFTTransferred(tokenId, destinationChain, recipient);

        // Burn the token on the source chain
        _burn(tokenId);
    }

    function receiveNFT(uint256 tokenId, address recipient, string memory tokenURI) external onlyOwner {
        // Mint the token on the destination chain
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
