import useNft from '../../hooks/useNfs';
import { useEffect } from 'react';

type NtfLmgListProps = {
  owner?: string
}

export default function NtfLmgList({ owner }: NtfLmgListProps) {
  const { imgURIs } = useNft();
  useEffect(() => { console.log(imgURIs) }, [imgURIs])
  return (<ul className='flex'>
    {imgURIs.map((imgURI, index) => (
      <li key={imgURI} className="w-48">
        <img src={imgURI} alt={imgURI} className='rounded-lg' />
      </li>
    ))}
  </ul>)
}
