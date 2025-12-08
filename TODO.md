# Shadow Protocol - Development TODO

## Proje Durumu: 5/10

### Kritik Eksikler (Hackathon icin SART)

#### 1. Kontrat Duzeltmeleri
- [ ] Kontratlari ZamaDevnetConfig'den inherit ettir
  ```solidity
  // Yanlis:
  contract ShadowVault {

  // Dogru:
  import { ZamaDevnetConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
  contract ShadowVault is ZamaDevnetConfig {
  ```

- [ ] FHE import'larini duzelt
  ```solidity
  import { FHE, euint64, externalEuint64, ebool, externalEbool } from "@fhevm/solidity/lib/FHE.sol";
  ```

- [ ] externalEuint64 + FHE.fromExternal() kullan (kullanici inputlari icin)
  ```solidity
  // Yanlis:
  function deposit(bytes32 encryptedAmount, bytes calldata inputProof) external {

  // Dogru:
  function deposit(externalEuint64 encryptedAmount, bytes calldata inputProof) external {
      euint64 amount = FHE.fromExternal(encryptedAmount, inputProof);
  ```

- [ ] FHE.allowThis() ve FHE.allow() ekle tum encrypted degerlere
  ```solidity
  // Her encrypted deger olusturuldugunda:
  FHE.allowThis(encryptedValue);  // Kontrat erisebilsin
  FHE.allow(encryptedValue, msg.sender);  // Kullanici erisebilsin
  ```

#### 2. Frontend Entegrasyonu
- [ ] @zama-fhe/relayer-sdk entegrasyonu
  ```typescript
  import { createInstance, SepoliaConfig } from '@zama-fhe/relayer-sdk';
  const instance = await createInstance(SepoliaConfig);
  ```

- [ ] createEncryptedInput dogru kullan
  ```typescript
  const buffer = instance.createEncryptedInput(contractAddress, userAddress);
  buffer.add64(BigInt(amount));
  const ciphertexts = await buffer.encrypt();
  // ciphertexts.handles[0], ciphertexts.inputProof
  ```

- [ ] User decryption flow ekle
  ```typescript
  const clearValue = await fhevm.userDecryptEuint(
    FhevmType.euint64,
    encryptedHandle,
    contractAddress,
    userSigner
  );
  ```

#### 3. Deploy & Test
- [ ] Zama Devnet'e deploy et (chainId: 8009)
- [ ] En az temel testler yaz (deposit, withdraw, openPosition)
- [ ] Contract addresslerini frontend config'e ekle

### Onemli Eksikler

#### 4. UI/UX Gelistirmeleri
- [ ] Trade Card / Share Card komponenti (kapatilan pozisyonlar icin)
  - Entry Price, Close Price
  - PNL ($ ve %)
  - Asset, Leverage, Long/Short
  - Tarih + Shadow Protocol branding

- [ ] Position Details Modal
  - Acik pozisyonlari goruntuleme
  - Kapatma butonu

- [ ] Real-time fiyat guncelleme (Oracle'dan)

#### 5. Dokumantasyon
- [ ] README guncelle
  - Proje aciklamasi
  - Kurulum adimlari
  - Demo videosu linki
  - Zama hackathon bilgisi

- [ ] Demo video kaydet (2-3 dk)

- [ ] README'ye "Neden Gizlilik Onemli?" yazisi ekle
  - Kullanicinin kendi yazisini baz al
  - FHE'nin avantajlarini anlat
  - Neden pre-IPO trading icin privacy kritik?

### Onemli Ozellikler (Eklenecek)

- [ ] Dark Mode toggle (header'a ekle)

- [ ] Advanced Chart (TradingView tarzı)
  - 1s, 5s, 15s, 30s, 1m, 5m, 15m, 30m, 1h, 4h, 1d, 1w, 1M timeframe'ler
  - Candlestick, Line, Area chart tipleri
  - Drawing tools (trend line, fibonacci, vs)
  - Indicators (MA, EMA, RSI, MACD, Bollinger)
  - Fullscreen mode

- [ ] News / Company Info Sutunu
  - Son yatirim turlari (Series A, B, C vs)
  - Valuation bilgisi
  - Kurulus tarihi
  - Sektor
  - Onemli haberler

- [ ] Limit Order
  - Belirli fiyattan pozisyon ac
  - Open orders listesi
  - Cancel order

- [ ] Stop Loss / Take Profit
  - Pozisyon acilirken SL/TP belirle
  - Otomatik kapanma
  - Trailing stop loss (opsiyonel)

- [ ] Partial Close
  - Pozisyonun %25, %50, %75 veya custom % kapatma
  - Kalan pozisyon devam etsin

- [ ] APY Calculator (LP Pool icin)
  - Yatirim miktari gir
  - Tahmini kazanc goster (epoch bazli)
  - Risk uyarisi: "Gercek getiri degiskendir"

- [ ] Portfolio Analytics sayfasi
  - Toplam PNL (all-time)
  - 1 haftalik / 1 aylik / 3 aylik PNL
  - Win rate (kazanan trade sayisi / toplam trade)
  - Trade history listesi (tarih, asset, entry, exit, PNL)
  - Grafik: PNL over time

- [ ] Trade Card / Share Card
  - Kapatilan pozisyon icin paylasilabilir kart
  - Entry/Exit price, PNL, leverage, asset
  - Twitter/X share butonu

### Nice to Have (Zaman kalirsa)

- [ ] Transaction history sayfasi
- [ ] Mobile responsive UI
- [ ] Keyboard shortcuts (T: trade, W: wallet, M: markets)

---

## Tamamlanan Isler

- [x] Smart Contracts tasarimi (ShadowVault, ShadowUSD, ShadowOracle, ShadowLiquidityPool)
- [x] Frontend temel yapisi (Next.js 14, wagmi, viem)
- [x] Trade sayfasi UI
- [x] Wallet sayfasi (Deposit, Withdraw, Faucet, LP Staking, Transfer)
- [x] Markets sayfasi
- [x] Docs sayfasi
- [x] LP Staking UI
- [x] Confidential Transfer UI
- [x] GitHub repo (Himess/shadow-protocol)
- [x] Zama testnet deploy config

---

## Notlar

### Zama fhEVM Onemli Noktalar:
1. Encrypted degerler `euint64`, `ebool` gibi tipler
2. Kullanici inputlari `externalEuint64` olmali
3. `FHE.fromExternal()` ile internal tipe cevrilmeli
4. Her encrypted deger icin ACL izni verilmeli (allow/allowThis)
5. Decryption icin ya user decrypt ya public decrypt kullanilmali

### Deployment:
- Zama Devnet: https://devnet.zama.ai (chainId: 8009)
- Sepolia Testnet: Ethereum Sepolia (chainId: 11155111)
