import {
	CHAINLINK_CONTRACT_ABI,
	CHAINLINK_CONTRACT_ADDRESS,
} from '../constants';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import axios from 'axios';
import { Contract } from 'web3-eth-contract';
import { useCallback, useEffect, useState } from 'react';
import { web3Store } from '../store/web3Store';

export default function useSepolia() {
	const { web3, setWeb3 } = web3Store();
	const [contract, setContract] = useState<Contract | undefined>(undefined);
	const [myAddress, setMyAddress] = useState('');

	const loadContract = useCallback(async () => {
		// Check if web3 is available
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum);
			try {
				//  메타마스크 지갑과 연결된 계정 정보를 가져오기
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				// 현재 계정 주소 가져오기
				const accounts = await web3.eth.getAccounts();
				setMyAddress(accounts[0]);
				const newContract = new web3.eth.Contract(
					CHAINLINK_CONTRACT_ABI as AbiItem[],
					CHAINLINK_CONTRACT_ADDRESS
				);
				setWeb3(web3);
				setContract(newContract);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error('Web3 is not available');
		}
	}, [setWeb3]);

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
