import axios from 'axios';

export class PriceConversionService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.COINGECKO_API_KEY;
  }

  async getPrice(tokenSymbol: string, targetCurrency: string): Promise<number> {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=${targetCurrency}`
      );
      return response.data[tokenSymbol][targetCurrency];
    } catch (error) {
      console.error('Error fetching price:', error);
      throw error;
    }
  }

  async convertPrice(
    amount: number,
    fromToken: string,
    toToken: string
  ): Promise<number> {
    const fromPrice = await this.getPrice(fromToken, 'usd');
    const toPrice = await this.getPrice(toToken, 'usd');
    return (amount * fromPrice) / toPrice;
  }
}
