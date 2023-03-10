import useSepolia from '../../hooks/useSepolia';
import BalanceList from './BalanceList';
import TransactionList from './TransactionList';

export default function SepoliaContainer() {
  const { myAddress } = useSepolia();
  return <div className='pt-14'>
    <div className='max-w-screen-lg mx-auto h-[700px] flex flex-col justify-center'>
      <p className='text-center text-red-400'>*본 기능은 Sepolia 테스트 네트워크 상에서만 작동합니다.</p>
      <p className='text-center font-extrabold text-5xl'>Sepolia NFT Tools</p>
      <p className='text-lg text-center font-bold mt-2'>접속 계정: <span className='text-main'>{myAddress}</span></p>
      <BalanceList account={myAddress} />
      <TransactionList account={myAddress} />
    </div>
  </div>
}
