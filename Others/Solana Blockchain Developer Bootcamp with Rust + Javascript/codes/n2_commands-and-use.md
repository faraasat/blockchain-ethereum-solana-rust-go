# Commands

cargo install spl-token-cli

solana-keygen new --> to create keypair for wallet

solana-keygen pubkey --> to see public key

solana balance --url devnet

solana airdrop 200 CgZK2KMJ8KqY3rHnFwbnnFcHfgEiBWTGsdiZBC2AG2Zm --url devnet

spl-token create-token --url devnet (BSUj8STGZUDKFc4pwkoUomByKdAPwLJsJkQBMhMEQLWc)

spl-token create-account BSUj8STGZUDKFc4pwkoUomByKdAPwLJsJkQBMhMEQLWc --url devnet --> to create account for this particular token and it will be an empty account (B7fPs4FF3FUrZLGGeVGm1QcXKLg886qZ2mfA4wTfXxj1)

spl-token balance B7fPs4FF3FUrZLGGeVGm1QcXKLg886qZ2mfA4wTfXxj1 --url devnet

spl-token mint BSUj8STGZUDKFc4pwkoUomByKdAPwLJsJkQBMhMEQLWc 1000 --url devnet

circulating token is the number of tokens being used by solana users
spl-token supply BSUj8STGZUDKFc4pwkoUomByKdAPwLJsJkQBMhMEQLWc --url devnet

spl-token authorize BSUj8STGZUDKFc4pwkoUomByKdAPwLJsJkQBMhMEQLWc mint --disable --url devnet --> to renounce our ability to mint tokens

spl-token burn B7fPs4FF3FUrZLGGeVGm1QcXKLg886qZ2mfA4wTfXxj1 50 --url devnet

to send token to someone they must be holding solana wallet and most common is phantom wallets
spl-token transfer BSUj8STGZUDKFc4pwkoUomByKdAPwLJsJkQBMhMEQLWc 150 6vcuPg2Qej2hxvCLV2f2F6igFyEF48B41NRtgofFKwh2 --url devnet
