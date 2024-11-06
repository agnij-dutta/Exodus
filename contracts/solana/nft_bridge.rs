use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use wormhole_anchor_sdk::wormhole;

#[program]
pub mod nft_bridge {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.state.bridge = ctx.accounts.bridge.key();
        Ok(())
    }

    pub fn lock_and_transfer(
        ctx: Context<LockAndTransfer>,
        token_id: u64,
        target_chain: u16,
        recipient: [u8; 32],
    ) -> Result<()> {
        // Lock NFT logic
        let message = vec![
            ctx.accounts.token_account.key().as_ref(),
            &token_id.to_le_bytes(),
            &recipient,
        ]
        .concat();

        // Post message to Wormhole
        wormhole::post_message(
            CpiContext::new(
                ctx.accounts.wormhole_program.to_account_info(),
                wormhole::PostMessage {
                    bridge: ctx.accounts.bridge.to_account_info(),
                    message: ctx.accounts.message.to_account_info(),
                    emitter: ctx.accounts.emitter.to_account_info(),
                    sequence: ctx.accounts.sequence.to_account_info(),
                    payer: ctx.accounts.payer.to_account_info(),
                    fee_collector: ctx.accounts.fee_collector.to_account_info(),
                    clock: ctx.accounts.clock.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                },
            ),
            0, // nonce
            message,
            target_chain,
        )?;

        Ok(())
    }
}