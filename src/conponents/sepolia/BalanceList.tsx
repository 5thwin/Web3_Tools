
import { web3Store } from '../../store/web3Store';
import { useCallback, useEffect, useState } from 'react';

interface BalanceListProps {
  account: string
}

export default function BalanceList({ account }: BalanceListProps) {
  const { web3 } = web3Store();
  const [balance, setBalance] = useState<string>('');
  const loadBalance = useCallback(async () => {
    const balance = await web3.eth.getBalance(account);
    const etherBalance = web3.utils.fromWei(balance, 'ether');
    setBalance(etherBalance);
  }, [account, web3])
  useEffect(() => {
    loadBalance();
  }, [loadBalance])
  return <div>
    <p className='text-lg text-center font-bold mt-2'>잔고: {balance}</p>
  </div>
}
