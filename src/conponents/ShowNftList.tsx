import useNft from '../hooks/useNfs';

export default function ShowNftList() {
  const { myAddress, inputRef, handleSearch, ownerAddress, setOwnerAddress, imgURIs } = useNft()

  return (
    <div className='max-w-screen-md mx-auto' >
      <p className='text-lg'>Account : {myAddress}</p>
      <form className='m-1' onSubmit={handleSearch}>
        <input ref={inputRef} defaultValue={ownerAddress} className='border border-solid border-sky-500 rounded-md py-1 w-4/5 m-1'></input>
        <button className='px-2 py-1 font-bold border border-solid rounded-md border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500 transition-colors'>Search</button>
      </form>
      <button onClick={() => { setOwnerAddress('0x2cbCFa87aA570D72Ad7B376E729E167071F1cD33') }}>example</button>
      <p className='text-lg'>{ownerAddress}</p>
      <ul className=''>
        {imgURIs.map((imgURI, index) => (
          <li key={imgURI} className="w-48">
            <img src={imgURI} alt={imgURI} className='rounded-lg' />
          </li>
        ))}
      </ul>
    </div>
  );
}
