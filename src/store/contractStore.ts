import { create } from 'zustand';
import { Contract } from 'web3-eth-contract';

interface Web3State {
	contract?: Contract;
	setContract: (value: Contract) => void;
}
export const contractStore = create<Web3State>((set) => ({
	contract: undefined,
	setContract: (value) => set({ contract: value }),
}));
