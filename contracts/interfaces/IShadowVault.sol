// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { externalEuint64, externalEbool, euint64 } from "@fhevm/solidity/lib/FHE.sol";

/**
 * @title IShadowVault
 * @notice Interface for the main Shadow Protocol vault
 */
interface IShadowVault {
    /// @notice Deposit collateral into the vault
    function deposit(
        externalEuint64 encryptedAmount,
        bytes calldata inputProof
    ) external;

    /// @notice Withdraw collateral from the vault
    function withdraw(
        externalEuint64 encryptedAmount,
        bytes calldata inputProof
    ) external;

    /// @notice Open a new leveraged position
    function openPosition(
        bytes32 assetId,
        externalEuint64 encryptedCollateral,
        externalEuint64 encryptedLeverage,
        externalEbool encryptedIsLong,
        bytes calldata inputProof
    ) external returns (uint256 positionId);

    /// @notice Close an existing position
    function closePosition(uint256 positionId) external;

    /// @notice Get user's encrypted balance
    function getBalance(address user) external view returns (euint64);

    /// @notice Get position details
    function getPosition(uint256 positionId) external view returns (
        address owner,
        bytes32 assetId,
        bool isOpen,
        uint256 openTimestamp
    );
}
