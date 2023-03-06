import Web3 from 'web3';
import { create } from 'zustand';

interface Web3State {
	web3: Web3;
	setWeb3: (value: Web3) => void;
}
export const web3Store = create<Web3State>((set) => ({
	web3: new Web3(),
	setWeb3: (value) => set({ web3: value }),
}));
