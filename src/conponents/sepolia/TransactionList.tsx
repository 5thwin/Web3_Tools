import useTransaction from '../../hooks/useTransaction';

interface TransactionListProps {
  account: string,
}

export default function TransactionList({ account }: TransactionListProps) {
  const { approvedTransfers } = useTransaction(account);
  return <div>
    <ul>
      {approvedTransfers.map((transfer) => <li>
        <p>id:{transfer.nftId}, address:{transfer.address}</p>
      </li>)}
    </ul></div>
}
