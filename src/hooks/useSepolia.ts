import {
	CHAINLINK_CONTRACT_ABI,
	CHAINLINK_CONTRACT_ADDRESS,
} from '../constants';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { useCallback, useEffect, useState } from 'react';
import { web3Store } from '../store/web3Store';
import { contractStore } from '../store/contractStore';

export default function useSepolia() {
	const { web3, setWeb3 } = web3Store();
	const { contract, setContract } = contractStore();
	const [myAddress, setMyAddress] = useState('');

	const loadContract = useCallback(async () => {
		// Check if web3 is available
		if (typeof window.ethereum !== 'undefined') {
			const newWeb3 = new Web3(window.ethereum);
			try {
				//  메타마스크 지갑과 연결된 계정 정보를 가져오기
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				// 현재 계정 주소 가져오기
				const accounts = await newWeb3.eth.getAccounts();
				const newContract = new newWeb3.eth.Contract(
					CHAINLINK_CONTRACT_ABI as AbiItem[],
					CHAINLINK_CONTRACT_ADDRESS
				);
				setMyAddress(accounts[0]);
				setWeb3(newWeb3);
				setContract(newContract);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error('Web3 is not available');
		}
	}, [setContract, setWeb3]);

	useEffect(() => {
		loadContract();
	}, [loadContract]);

	return {
		web3,
		contract,
		myAddress,
		loadContract,
	};
}
