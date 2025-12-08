# Shadow Protocol

**Private Leveraged Pre-IPO Trading Platform** powered by Zama fhEVM

Trade pre-IPO company shares with complete privacy. Your positions, balances, and trading activity are encrypted on-chain using Fully Homomorphic Encryption (FHE).

## Why Privacy Matters

Traditional DeFi trading exposes everything on-chain:
- Everyone sees your positions and entry prices
- Whales can front-run your trades
- Your trading strategy is public
- Portfolio size reveals wealth

Shadow Protocol solves this with **encrypted trading**:
- Position sizes are hidden (euint64)
- Entry/exit prices are encrypted
- Owner addresses can be anonymous (eaddress)
- Only YOU can decrypt your data

## FHE Features Used

This project demonstrates comprehensive use of Zama fhEVM capabilities:

### Encrypted Data Types
| Type | Usage |
|------|-------|
| `euint8` | Error codes, bonus multipliers |
| `euint64` | Balances, positions, prices, leverage |
| `ebool` | Long/short flags, conditions |
| `eaddress` | Anonymous position owners |

### FHE Operations
| Operation | Description |
|-----------|-------------|
| `FHE.add()` | Add encrypted balances |
| `FHE.sub()` | Subtract encrypted amounts |
| `FHE.mul()` | Calculate position sizes |
| `FHE.div()` | Compute ratios and shares |
| `FHE.eq()` | Encrypted equality check |
| `FHE.ne()` | Encrypted inequality check |
| `FHE.ge()` | Greater than or equal |
| `FHE.gt()` | Greater than comparison |
| `FHE.le()` | Less than or equal |
| `FHE.lt()` | Less than comparison |
| `FHE.min()` | Get minimum of two values |
| `FHE.max()` | Get maximum of two values |
| `FHE.select()` | Conditional value selection |

### Advanced Features
| Feature | Description |
|---------|-------------|
| `FHE.randEuint64()` | On-chain encrypted random numbers |
| `FHE.randEuint8()` | Bounded random generation |
| `FHE.allowTransient()` | Gas-optimized temporary permissions |
| `FHE.allow()` | ACL permission grants |
| `FHE.allowThis()` | Contract self-permission |
| `externalEuint64` | External encrypted inputs |
| `FHE.fromExternal()` | Convert to internal types |

### Privacy-Preserving Features

**Encrypted Error Handling**
```solidity
euint8 internal ERROR_INSUFFICIENT_BALANCE;
mapping(address => EncryptedError) private _lastErrors;
```

**Anonymous Trading**
```solidity
struct AnonymousPosition {
    eaddress encryptedOwner;  // Nobody knows who owns this!
    euint64 collateral;
    euint64 size;
    // ...
}
```

**Encrypted Limit Orders**
```solidity
struct EncryptedLimitOrder {
    euint64 encryptedTriggerPrice;  // Anti-frontrunning
    euint64 encryptedCollateral;
    // ...
}
```

**Random Bonus Generation**
```solidity
function generateRandomBonusMultiplier() external returns (euint8) {
    return FHE.randEuint8(16);  // 0-15% random bonus
}
```

## Architecture

```
contracts/
  core/
    ShadowVault.sol         # Main trading vault
    ShadowLiquidityPool.sol # LP pool with advanced FHE
    ShadowOracle.sol        # Price feed oracle
  tokens/
    ShadowUSD.sol           # Stablecoin with encrypted balances
  interfaces/
    IShadowTypes.sol        # Shared types and structs
frontend/
  src/
    lib/fhe/client.ts       # FHE encryption utilities
```

## Quick Start

### Prerequisites
- Node.js v20+
- npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test
```

### Deploy to Sepolia

```bash
# Set environment variables
npx hardhat vars set MNEMONIC
npx hardhat vars set INFURA_API_KEY

# Deploy
npx hardhat deploy --network sepolia
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Key Functions

### ShadowVault

| Function | Description |
|----------|-------------|
| `deposit()` | Deposit encrypted collateral |
| `withdraw()` | Withdraw encrypted amount |
| `openPosition()` | Open leveraged position |
| `closePosition()` | Close position with PNL |
| `openAnonymousPosition()` | Trade with hidden identity |
| `createLimitOrder()` | Anti-frontrunning limit orders |
| `generateRandomPositionSalt()` | Random ID generation |

### ShadowLiquidityPool

| Function | Description |
|----------|-------------|
| `provideLiquidity()` | Stake encrypted amounts |
| `withdrawLiquidity()` | Withdraw LP tokens |
| `claimRewardsOptimized()` | Gas-efficient claims |
| `compareStakes()` | Encrypted stake ranking |
| `calculatePoolShare()` | Encrypted share calculation |

## Tech Stack

- **Smart Contracts**: Solidity 0.8.24 + Zama fhEVM
- **Frontend**: Next.js 14 + wagmi + viem
- **FHE SDK**: @zama-fhe/relayer-sdk
- **Testing**: Hardhat + Chai

## Hackathon

Built for **Zama Bounty Program** - demonstrating real-world FHE applications in DeFi.

## License

BSD-3-Clause-Clear
