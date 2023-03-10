import { useCallback, useState, useEffect } from 'react';
import { contractStore } from '../store/contractStore';

export default function useTransaction(account: string) {
	const { contract } = contractStore();
	const [nftIds, setNftIds] = useState<number[]>([]);
	const [approvedTransfers, setApprovedTransfers] = useState<
		Array<{ nftId: number; address: string }>
	>([]);

	const loadNfts = useCallback(async () => {
		/** 이더리움 계정이 소유한 NFT 토큰 ID의 배열을 반환*/
		try {
			if (!contract) {
				console.log('Can not find the contract');
				return;
			}
			/**변경  */
			const newNftIds: number[] = await contract.methods
				.tokensOfOwner(account)
				.call();
			console.log(newNftIds);
			setNftIds(newNftIds);
		} catch (error) {
			console.error(error);
		}
	}, [account, contract]);

	/** 승인된 NFT 전송 목록을 검색*/
	const loadApprovedTransfers = useCallback(async () => {
		try {
			if (!contract) return;

			const approvedTransfers: Array<{ nftId: number; address: string }> = [];

			for (const nftId of nftIds) {
				const approvedAddress: string = await contract.methods
					.getApproved(nftId)
					.call();

				if (approvedAddress !== '0x0000000000000000000000000000000000000000') {
					approvedTransfers.push({ nftId, address: approvedAddress });
				}
			}

			setApprovedTransfers(approvedTransfers);
		} catch (error) {
			console.error(error);
		}
	}, [contract, nftIds]);
	useEffect(() => {
		console.log(contract);
		loadNfts();
		loadApprovedTransfers();
	}, [contract, loadApprovedTransfers, loadNfts]);
	return { approvedTransfers };
}
