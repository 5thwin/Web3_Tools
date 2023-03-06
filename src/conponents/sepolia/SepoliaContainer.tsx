import useSepolia from '../../hooks/useSepolia';
import BalanceList from './BalanceList';

export default function SepoliaContainer() {
  const { web3, myAddress } = useSepolia();
  return <div className='pt-14'>
    <div className='max-w-screen-lg mx-auto h-[700px] flex flex-col justify-center'>
      <p>*본 기능은 Sepolia 테스트 네트워크 상에서만 작동합니다.</p>
      <p>현 계정: {myAddress}</p>
      <BalanceList account={myAddress} />
    </div>
  </div>
}
