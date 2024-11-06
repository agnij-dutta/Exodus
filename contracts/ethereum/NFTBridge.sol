pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@certusone/wormhole-solidity-sdk/contracts/interfaces/IWormhole.sol";

contract NFTBridge {
    IWormhole private wormhole;
    mapping(address => mapping(uint256 => bool)) public lockedTokens;
    mapping(bytes32 => bool) public processedVAAs;

    event NFTLocked(address indexed token, uint256 indexed tokenId, bytes32 recipient, uint16 targetChain);
    event NFTUnlocked(address indexed token, uint256 indexed tokenId, address recipient);

    constructor(address _wormhole) {
        wormhole = IWormhole(_wormhole);
    }

    function lockAndTransfer(
        address token,
        uint256 tokenId,
        uint16 targetChain,
        bytes32 recipient
    ) external payable {
        require(!lockedTokens[token][tokenId], "Token already locked");
        
        IERC721(token).transferFrom(msg.sender, address(this), tokenId);
        lockedTokens[token][tokenId] = true;

        bytes memory payload = abi.encode(token, tokenId, msg.sender, recipient);
        uint256 messageId = wormhole.publishMessage{value: msg.value}(
            0, // nonce
            payload,
            targetChain
        );

        emit NFTLocked(token, tokenId, recipient, targetChain);
    }

    function completeTransfer(bytes memory encodedVAA) external {
        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole.parseAndVerifyVM(encodedVAA);
        require(valid, reason);
        require(!processedVAAs[vm.hash], "Transfer already processed");
        
        processedVAAs[vm.hash] = true;
        
        (address token, uint256 tokenId, address originalSender, bytes32 recipient) = 
            abi.decode(vm.payload, (address, uint256, address, bytes32));
        
        lockedTokens[token][tokenId] = false;
        IERC721(token).transferFrom(address(this), address(uint160(uint256(recipient))), tokenId);
        
        emit NFTUnlocked(token, tokenId, address(uint160(uint256(recipient))));
    }
}
