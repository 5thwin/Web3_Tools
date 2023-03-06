import useNft from '../../hooks/useNfs';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function ShowNftList() {
  const { myAddress, inputRef, handleSearch, ownerAddress, setOwnerAddress, nftIds, imgURIs, handlePreviousPage, handleNextPage } = useNft()

  return (
    <div className='max-w-screen-lg h-[800px] mx-auto pt-14 rounded-md flex flex-col justify-center' >
      <p className='text-center font-extrabold text-5xl'>CloneX NFT 리스트 출력</p>
      <p className='text-lg mt-2 mx-auto'>접속 계정: {myAddress}</p>
      <form className='m-1 mx-auto text-lg' onSubmit={handleSearch}>
        <input ref={inputRef} placeholder="Enter the account address" className='border border-solid border-main rounded-md px-1 py-1 w-[480px] m-1 '></input>
        <button className='px-2 py-1 font-bold border border-solid rounded-md border-main text-main hover:text-white hover:bg-main transition-colors'>Search</button>
      </form>
      <div className='flex w-1/2 mx-auto justify-around'>
        <button onClick={() => { setOwnerAddress('0xe53C07d063F4d9aB3D6687e887Bf6ccDaca6F70a') }}>User1</button>
        <button onClick={() => { setOwnerAddress('0xe53C07d063F4d9aB3D6687e887Bf6ccDaca6F70a') }}>User2</button>
        <button onClick={() => { setOwnerAddress('0xe53C07d063F4d9aB3D6687e887Bf6ccDaca6F70a') }}>User3</button>
      </div>
      <p className='flex justify-center text-3xl font-extrabold'>User
        <span className='mx-2 font-bold text-main'>
          <Link to={`https://etherscan.io/address/${ownerAddress}`} target="_blank">
            {ownerAddress?.substring(0, 9)}...{ownerAddress?.substring(ownerAddress.length - 7)}
          </Link>
        </span>
        has
      </p>
      <div className='flex pt-6 h-56 justify-center'>
        <button className={`text-main ${nftIds.length === 0 && "hidden"}`} onClick={handlePreviousPage}><BsChevronCompactLeft size={56} /></button>
        <ul className='flex w-[800px]'>
          {imgURIs.map((imgURI) => (
            <li key={imgURI} className="w-48 mx-1">
              <img src={imgURI} alt={imgURI} className='rounded-lg' />
            </li>
          ))}
        </ul>
        <button className={`text-main ${nftIds.length === 0 && "hidden"}`} onClick={handleNextPage}><BsChevronCompactRight size={56} /></button>
      </div>
    </div >
  );
}
