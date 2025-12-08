"use client";

// ============================================
// FHEVM Client SDK Integration
// ============================================
// This file provides FHE encryption functions for the frontend.
// For testnet/demo, we use mock implementations.
// In production with Zama testnet, replace with actual SDK imports.

// Type definitions (matching Zama SDK interfaces)
export interface FhevmInstance {
  createEncryptedInput: (contractAddress: string, userAddress: string) => EncryptedInput;
  generateKeypair: () => { publicKey: Uint8Array; privateKey: Uint8Array };
  createEIP712: (
    publicKey: Uint8Array,
    contractAddresses: string[],
    startTimestamp: number,
    durationDays: number
  ) => EIP712Message;
  userDecrypt: (
    handles: { handle: string; contractAddress: string }[],
    privateKey: Uint8Array,
    publicKey: Uint8Array,
    signature: string,
    contractAddresses: string[],
    userAddress: string,
    startTimestamp: number,
    durationDays: number
  ) => Promise<Record<string, bigint | boolean>>;
}

export interface EncryptedInput {
  add8: (value: number) => void;
  add16: (value: number) => void;
  add32: (value: number) => void;
  add64: (value: bigint) => void;
  add128: (value: bigint) => void;
  add256: (value: bigint) => void;
  addBool: (value: boolean) => void;
  addAddress: (address: string) => void;
  encrypt: () => Promise<{ handles: Uint8Array[]; inputProof: Uint8Array }>;
}

export interface EIP712Message {
  domain: Record<string, unknown>;
  types: Record<string, unknown>;
  message: Record<string, unknown>;
}

// Singleton instance
let fhevmInstance: FhevmInstance | null = null;

/**
 * Generate mock encrypted data (for testnet demo)
 * In production, this would use actual FHE encryption
 */
function generateMockEncryptedData(length: number = 32): Uint8Array {
  const data = new Uint8Array(length);
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(data);
  } else {
    for (let i = 0; i < length; i++) {
      data[i] = Math.floor(Math.random() * 256);
    }
  }
  return data;
}

/**
 * Create mock FHEVM instance for demo/testnet
 */
function createMockInstance(): FhevmInstance {
  return {
    createEncryptedInput: (_contractAddress: string, _userAddress: string): EncryptedInput => {
      const values: { type: string; value: unknown }[] = [];

      return {
        add8: (value: number) => values.push({ type: "uint8", value }),
        add16: (value: number) => values.push({ type: "uint16", value }),
        add32: (value: number) => values.push({ type: "uint32", value }),
        add64: (value: bigint) => values.push({ type: "uint64", value }),
        add128: (value: bigint) => values.push({ type: "uint128", value }),
        add256: (value: bigint) => values.push({ type: "uint256", value }),
        addBool: (value: boolean) => values.push({ type: "bool", value }),
        addAddress: (address: string) => values.push({ type: "address", value: address }),
        encrypt: async () => {
          // Generate mock handles for each value
          const handles = values.map(() => generateMockEncryptedData(32));
          const inputProof = generateMockEncryptedData(64);
          return { handles, inputProof };
        },
      };
    },
    generateKeypair: () => ({
      publicKey: generateMockEncryptedData(32),
      privateKey: generateMockEncryptedData(32),
    }),
    createEIP712: (
      _publicKey: Uint8Array,
      contractAddresses: string[],
      startTimestamp: number,
      durationDays: number
    ) => ({
      domain: {
        name: "FHEVM",
        version: "1",
        chainId: 9000, // Zama devnet
      },
      types: {
        Reencrypt: [
          { name: "publicKey", type: "bytes32" },
          { name: "contractAddresses", type: "address[]" },
          { name: "startTimestamp", type: "uint256" },
          { name: "durationDays", type: "uint256" },
        ],
      },
      message: {
        contractAddresses,
        startTimestamp,
        durationDays,
      },
    }),
    userDecrypt: async (handles) => {
      // Return mock decrypted values
      const results: Record<string, bigint | boolean> = {};
      handles.forEach((h, i) => {
        results[h.handle] = BigInt(1000 * (i + 1)); // Mock value
      });
      return results;
    },
  };
}

/**
 * Initialize the FHEVM instance
 * Must be called before any encryption operations
 */
export async function initFheInstance(): Promise<FhevmInstance> {
  if (fhevmInstance) {
    return fhevmInstance;
  }

  try {
    // Try to load actual SDK if available
    // For now, use mock implementation for demo
    console.log("Initializing FHEVM instance (mock mode for demo)...");
    fhevmInstance = createMockInstance();
    console.log("FHEVM instance initialized successfully (mock mode)");
    return fhevmInstance;
  } catch (error) {
    console.error("Failed to initialize FHEVM instance:", error);
    throw error;
  }
}

/**
 * Get the FHEVM instance (must be initialized first)
 */
export function getFheInstance(): FhevmInstance {
  if (!fhevmInstance) {
    throw new Error("FHEVM instance not initialized. Call initFheInstance() first.");
  }
  return fhevmInstance;
}

/**
 * Convert Uint8Array to hex string
 */
function toHexString(bytes: Uint8Array): `0x${string}` {
  return ("0x" + Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("")) as `0x${string}`;
}

/**
 * Encrypt a uint64 value for contract interaction
 * @param value The value to encrypt
 * @param contractAddress The contract that will receive the encrypted value
 * @param userAddress The user's address
 * @returns Encrypted handle and input proof
 */
export async function encryptUint64(
  value: bigint | number,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedAmount: `0x${string}`; inputProof: `0x${string}` }> {
  const instance = getFheInstance();

  // Create encrypted input
  const input = instance.createEncryptedInput(contractAddress, userAddress);
  input.add64(BigInt(value));

  // Encrypt and get handles + proof
  const encrypted = await input.encrypt();

  return {
    encryptedAmount: toHexString(encrypted.handles[0]),
    inputProof: toHexString(encrypted.inputProof),
  };
}

/**
 * Encrypt multiple uint64 values with a shared proof
 */
export async function encryptMultipleUint64(
  values: (bigint | number)[],
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedValues: `0x${string}`[]; inputProof: `0x${string}` }> {
  const instance = getFheInstance();

  // Create encrypted input
  const input = instance.createEncryptedInput(contractAddress, userAddress);

  // Add all values
  for (const value of values) {
    input.add64(BigInt(value));
  }

  // Encrypt
  const encrypted = await input.encrypt();

  return {
    encryptedValues: encrypted.handles.map(h => toHexString(h)),
    inputProof: toHexString(encrypted.inputProof),
  };
}

/**
 * Encrypt a boolean value
 */
export async function encryptBool(
  value: boolean,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedBool: `0x${string}`; inputProof: `0x${string}` }> {
  const instance = getFheInstance();

  const input = instance.createEncryptedInput(contractAddress, userAddress);
  input.addBool(value);

  const encrypted = await input.encrypt();

  return {
    encryptedBool: toHexString(encrypted.handles[0]),
    inputProof: toHexString(encrypted.inputProof),
  };
}

/**
 * Encrypt position parameters (collateral, leverage, isLong)
 */
export async function encryptPositionParams(
  collateral: bigint | number,
  leverage: bigint | number,
  isLong: boolean,
  contractAddress: string,
  userAddress: string
): Promise<{
  encryptedCollateral: `0x${string}`;
  encryptedLeverage: `0x${string}`;
  encryptedIsLong: `0x${string}`;
  inputProof: `0x${string}`;
}> {
  const instance = getFheInstance();

  const input = instance.createEncryptedInput(contractAddress, userAddress);
  input.add64(BigInt(collateral));
  input.add64(BigInt(leverage));
  input.addBool(isLong);

  const encrypted = await input.encrypt();

  return {
    encryptedCollateral: toHexString(encrypted.handles[0]),
    encryptedLeverage: toHexString(encrypted.handles[1]),
    encryptedIsLong: toHexString(encrypted.handles[2]),
    inputProof: toHexString(encrypted.inputProof),
  };
}

/**
 * Request user decryption of encrypted values
 * Uses EIP-712 signature for authorization
 */
export async function requestUserDecryption(
  handles: { handle: `0x${string}`; contractAddress: string }[],
  userAddress: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: any
): Promise<Record<string, bigint | boolean>> {
  const instance = getFheInstance();

  // Generate keypair for decryption
  const keypair = instance.generateKeypair();

  // Get contract addresses from handles
  const contractAddresses = Array.from(new Set(handles.map((h) => h.contractAddress)));

  // Create EIP-712 message
  const startTimestamp = Math.floor(Date.now() / 1000);
  const durationDays = 1;

  const eip712 = instance.createEIP712(
    keypair.publicKey,
    contractAddresses,
    startTimestamp,
    durationDays
  );

  // Sign the EIP-712 message
  const signature = await signer.signTypedData(
    eip712.domain,
    eip712.types,
    eip712.message
  );

  // Request decryption
  const handlePairs = handles.map((h) => ({
    handle: h.handle,
    contractAddress: h.contractAddress,
  }));

  const decrypted = await instance.userDecrypt(
    handlePairs,
    keypair.privateKey,
    keypair.publicKey,
    signature,
    contractAddresses,
    userAddress,
    startTimestamp,
    durationDays
  );

  return decrypted;
}

/**
 * Encrypt an Ethereum address for anonymous trading
 */
export async function encryptAddress(
  address: string,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedAddress: `0x${string}`; inputProof: `0x${string}` }> {
  const instance = getFheInstance();

  const input = instance.createEncryptedInput(contractAddress, userAddress);
  input.addAddress(address);

  const encrypted = await input.encrypt();

  return {
    encryptedAddress: toHexString(encrypted.handles[0]),
    inputProof: toHexString(encrypted.inputProof),
  };
}

/**
 * Encrypt parameters for anonymous position opening
 */
export async function encryptAnonymousPositionParams(
  collateral: bigint | number,
  leverage: bigint | number,
  isLong: boolean,
  ownerAddress: string,
  contractAddress: string,
  userAddress: string
): Promise<{
  encryptedCollateral: `0x${string}`;
  encryptedLeverage: `0x${string}`;
  encryptedIsLong: `0x${string}`;
  encryptedOwner: `0x${string}`;
  inputProof: `0x${string}`;
}> {
  const instance = getFheInstance();

  const input = instance.createEncryptedInput(contractAddress, userAddress);
  input.add64(BigInt(collateral));
  input.add64(BigInt(leverage));
  input.addBool(isLong);
  input.addAddress(ownerAddress);

  const encrypted = await input.encrypt();

  return {
    encryptedCollateral: toHexString(encrypted.handles[0]),
    encryptedLeverage: toHexString(encrypted.handles[1]),
    encryptedIsLong: toHexString(encrypted.handles[2]),
    encryptedOwner: toHexString(encrypted.handles[3]),
    inputProof: toHexString(encrypted.inputProof),
  };
}

/**
 * Encrypt various integer sizes (8, 16, 32, 64, 128, 256 bits)
 */
export async function encryptUint(
  value: bigint | number,
  bits: 8 | 16 | 32 | 64 | 128 | 256,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedValue: `0x${string}`; inputProof: `0x${string}` }> {
  const instance = getFheInstance();

  const input = instance.createEncryptedInput(contractAddress, userAddress);

  switch (bits) {
    case 8:
      input.add8(Number(value));
      break;
    case 16:
      input.add16(Number(value));
      break;
    case 32:
      input.add32(Number(value));
      break;
    case 64:
      input.add64(BigInt(value));
      break;
    case 128:
      input.add128(BigInt(value));
      break;
    case 256:
      input.add256(BigInt(value));
      break;
  }

  const encrypted = await input.encrypt();

  return {
    encryptedValue: toHexString(encrypted.handles[0]),
    inputProof: toHexString(encrypted.inputProof),
  };
}

/**
 * Check if FHEVM is initialized
 */
export function isFheInitialized(): boolean {
  return fhevmInstance !== null;
}
