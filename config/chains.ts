export const CHAIN_CONFIG = {
    ethereum: {
        if: 1,
        rpc: process.env.NEXT_PUBLIC_ETH_RPC_URL,
        explorer: 'https://etherscan.io',
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
        }
    },
    avalanche: {
        id: 43114,
        rpc: process.env.NEXT_PUBLIC_AVAX_RPC_URL,
        explorer: 'https://snowtrace.io',
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
        }
    },
    solana: {
        id: 1399811149,
        rpc: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
        explorer: 'https://explorer.solana.com',
        nativeCurrency: {
            name: 'Solana',
            symbol: 'SOL',
            decimals: 9
        }
    }
};