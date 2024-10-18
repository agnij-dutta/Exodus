use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgksCzFhLFPD");

#[program]
pub mod cross_chain_nft {
    use super::*;

    pub fn mint_wrapped_nft(ctx: Context<MintWrappedNFT>, token_uri: String) -> Result<()> {
        let nft_account = &mut ctx.accounts.nft_account;
        nft_account.token_uri = token_uri;
        Ok(())
    }
}

#[account]
pub struct WrappedNFT {
    pub token_uri: String,
}

#[derive(Accounts)]
pub struct MintWrappedNFT<'info> {
    #[account(init, payer = user, space = 8 + 64)]
    pub nft_account: ProgramAccount<'info, WrappedNFT>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
