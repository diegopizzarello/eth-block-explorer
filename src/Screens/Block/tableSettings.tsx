import { Typography } from 'antd';
import Web3 from 'web3';

const { Text } = Typography;

const columns = (web3: Web3) => [
    {
        title: 'Tx hash',
        dataIndex: 'hash',
        key: 'hash',
        ellipsis: true,
    },
    {
        title: 'From',
        dataIndex: 'from',
        key: 'from',
        width: 180,
        render: (from: string) => <Text copyable ellipsis>{from}</Text>
    },
    {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
        width: 180,
        render: (to: string) => <Text copyable ellipsis>{to}</Text>
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: 180,
        render: (value: string) => `${web3.utils.fromWei(value).substring(0,7)} ETH`
    },
    {
        title: 'Tx fee',
        dataIndex: 'transactionFee',
        key: 'transactionFee',
        width: 180,
        render: (fee: number) => !fee ? 'No data' : `${web3.utils.fromWei(String(fee)).substring(0,7)} ETH`
    },
];

export default columns;