import { fetchPaginate } from 'fetch-paginate';
import { config, Release, Solc } from '.';
import * as fs from 'fs';
import { join } from 'path';

export class SolcVersions {
  static async getRemoteVersions(): Promise<Solc[]> {
    const response = await fetchPaginate('https://api.github.com/repos/ethereum/solidity/releases?per_page=100');
    return response.items.map(element => new Solc(element as Release));
  }

  static solcFromVersion(version: string): Solc {
    return new Solc(JSON.parse(fs.readFileSync(join(config.versionsDirectory, version, 'meta.json'), 'utf8')));
  }

  static getLocalVersions(): Solc[] {
    return fs.readdirSync(config.versionsDirectory).map(i => this.solcFromVersion(i));
  }
}
