pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
        string targetChain;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;
    
    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price,
        string targetChain
    );
    
    event NFTSold(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed seller,
        uint256 price
    );

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price,
        string memory _targetChain
    ) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not owner of NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)), "NFT not approved");

        listingCounter++;
        listings[listingCounter] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true,
            _targetChain
        );

        emit NFTListed(
            listingCounter,
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            _targetChain
        );
    }

    function buyNFT(uint256 _listingId) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.isActive = false;
        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );

        payable(listing.seller).transfer(msg.value);

        emit NFTSold(
            _listingId,
            msg.sender,
            listing.seller,
            listing.price
        );
    }
}
