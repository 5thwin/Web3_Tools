import { Link } from 'react-router-dom';

export default function HeaderBar() {
  return <div className='w-full h-14 bg-transparent flex justify-between items-center fixed min-w-[980px] z-50'>
    <span className='ml-10 font-extrabold text-2xl'>Platfarm Subject</span>
    <div className='flex'>
      <p className='text-xl font-semibold mr-10 text-main'><Link to='/'>CloneX list</Link></p>
      <p className='text-xl font-semibold mr-10'><Link to='/sepolia'>Sepolia</Link></p>
    </div >
  </div>
}
