import axios from 'axios';
import { create } from 'ipfs-http-client';

export class MetadataService {
  private ipfs;

  constructor() {
    this.ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });
  }

  async uploadMetadata(metadata: any) {
    const result = await this.ipfs.add(JSON.stringify(metadata));
    return result.path;
  }

  async fetchMetadata(tokenURI: string) {
    if (tokenURI.startsWith('ipfs://')) {
      tokenURI = `https://ipfs.io/ipfs/${tokenURI.slice(7)}`;
    }
    
    const response = await axios.get(tokenURI);
    return response.data;
  }
}
