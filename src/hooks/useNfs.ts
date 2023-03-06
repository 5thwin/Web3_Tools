import Web3 from 'web3';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';
import { AbiItem } from 'web3-utils';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Contract } from 'web3-eth-contract';

export default function useNft() {
	const [myAddress, setMyAddress] = useState('');
	const [ownerAddress, setOwnerAddress] = useState<string>();
	const [nftIds, setNftIds] = useState<number[]>([]);
	const [contract, setContract] = useState<Contract | undefined>(undefined);
	const [imgURIs, setImgURIs] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);

	const inputRef = useRef<HTMLInputElement>(null);

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
				setOwnerAddress(accounts[0]);
				const newContract = new web3.eth.Contract(
					CONTRACT_ABI as AbiItem[],
					CONTRACT_ADDRESS
				);
				setContract(newContract);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error('Web3 is not available');
		}
	}, []);
	const loadNfts = useCallback(async () => {
		/** 이더리움 계정이 소유한 NFT 토큰 ID의 배열을 반환*/
		try {
			if (!contract) {
				console.log('Can not find the contract');
				return;
			}
			const newNftIds: number[] = await contract.methods
				.tokensOfOwner(ownerAddress)
				.call();
			console.log(newNftIds);
			setNftIds(newNftIds);
		} catch (error) {
			console.error(error);
		}
	}, [contract, ownerAddress]);

	const loadImgURIsByPage = useCallback(
		async (page: number) => {
			if (!contract) {
				console.log('Can not find the contract');
				return [];
			}
			const newImgURIs: string[] = [];
			const fromIndex = page * 4;
			const toIndex =
				nftIds.length - 1 < fromIndex + 3 ? nftIds.length - 1 : fromIndex + 3;
			for (let i = fromIndex; i <= toIndex; i++) {
				const nftId = nftIds[i];
				const tokenURI = await contract.methods.tokenURI(nftId).call();
				const metadata = await axios.get(tokenURI);
				const image = metadata.data.image;
				newImgURIs.push(image);
			}
			setImgURIs(newImgURIs);
		},
		[contract, nftIds]
	);

	useEffect(() => {
		loadContract();
	}, [loadContract]);

	useEffect(() => {
		if (ownerAddress) {
			loadNfts();
		}
	}, [loadNfts, ownerAddress]);

	useEffect(() => {
		if (nftIds.length > 0) {
			loadImgURIsByPage(currentPage);
		}
	}, [currentPage, loadImgURIsByPage, nftIds]);

	const handleSearch = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		inputRef.current && setOwnerAddress(inputRef.current.value);
	}, []);
	const changeOwner = useCallback(
		(address: string) => {
			if (address !== ownerAddress) {
				setImgURIs([]);
				setCurrentPage(0);
				setOwnerAddress(address);
			}
		},
		[ownerAddress]
	);

	const getApprovedAddress = useCallback(
		async (nftId: number) => {
			try {
				if (!contract) return;
				const approvedAddress: string = await contract.methods
					.getApproved(nftId)
					.call();
				return approvedAddress;
			} catch (error) {
				console.error(error);
			}
		},
		[contract]
	);
	const approveTransfer = useCallback(
		async (nftId: number, address: string) => {
			try {
				if (!contract) return;
				await contract.methods
					.approve(address, nftId)
					.send({ from: myAddress });
			} catch (error) {
				console.error(error);
			}
		},
		[contract, myAddress]
	);
	const handleNextPage = useCallback(() => {
		const endPage = Math.floor(nftIds.length / 4);
		if (currentPage < endPage) {
			setCurrentPage((pre) => pre + 1);
		}
	}, [currentPage, nftIds]);
	const handlePreviousPage = useCallback(() => {
		if (currentPage > 0) {
			setCurrentPage((pre) => pre - 1);
		}
	}, [currentPage]);
	return {
		myAddress,
		inputRef,
		handleSearch,
		ownerAddress,
		setOwnerAddress,
		imgURIs,
		nftIds,
		getApprovedAddress,
		approveTransfer,
		handleNextPage,
		handlePreviousPage,
		changeOwner,
	};
}
