# For this we are also using metaplex

## Installation

git clone https://github.com/metaplex-foundation/metaplex.git ~/metaplex
yarn install --cwd ~/metaplex/js/
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts --version

solana-keygen new --outfile ~/config/solana/devnet.json
solana config set --keypair ~/config/solana/devnet.json
ts-node C:\Users\Farasat\Desktop\~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload -e devnet -k C:\~\config\solana/devnet.json -cp config.json ./assets
ts-node C:\Users\Farasat\Desktop\~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload -e devnet -k C:\~\config\solana/devnet.json
