import React, { useEffect, useState, useMemo } from 'react';
import Web3 from 'web3';
import { RouteComponentProps } from '@reach/router';
import { BlockTransactionObject, Transaction } from 'web3-eth';
import { Input, Table } from 'antd';

import { HeaderContainer, HeaderTitle, Container, Title } from './styles';
import getColumns from './tableSettings';

interface BlockProps extends RouteComponentProps {
    blockNumber?: string;
}

// We can assume the app will be running in a browser that has MetaMask installed.
const web3 = new Web3(Web3.givenProvider);

const columns = getColumns(web3);

interface TrasanctionFee extends Transaction {
    transactionFee?: number;
}

const addTransactionFee = async (block: BlockTransactionObject): Promise<TrasanctionFee[]> => {
    return await Promise.all(block.transactions.map(async (transaction) => {
        const { gasPrice, hash } = transaction;
        try {
            const receipt = await web3.eth.getTransactionReceipt(hash);
            const transactionFee = Number(gasPrice) * receipt.gasUsed;
            return { ...transaction, transactionFee };
        } catch (e) {
            return transaction;
        }
    }));
}

const Block = ({ blockNumber }: BlockProps) => {
    const [block, setBlock] = useState<BlockTransactionObject | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (!blockNumber) {
            return;
        }
        web3.eth.getBlock(blockNumber, true, async (error, result) => {
            if (!error) {
                result.transactions = await addTransactionFee(result);
                setBlock(result);
            } else {
                setError(error);
            }
            setIsLoading(false);
        });
    }, [blockNumber]);

    const memoizedDataSource = useMemo(() => {
        if (!block?.transactions) {
            return [];
        }

        // Add key for Antd table
        const dataSource = block.transactions.map(transaction => ({ key: transaction.hash, ...transaction }));

        return filter ?
            dataSource.filter(transaction => transaction.from === filter || transaction.to === filter)
            : dataSource;
    }, [filter, block?.transactions]);

    if (error) {
        return <div>{error.message}</div>
    }

    const Header = () => (
        <HeaderContainer>
            <HeaderTitle>
                {`${block?.transactions.length ?? 'Loading'} transactions`}
            </HeaderTitle>
            <Input
                placeholder="Search by wallet address"
                onChange={(e) => setFilter(e.target.value)}
                allowClear
                style={{ maxWidth: 480 }}
            />
        </HeaderContainer>
    )

    return (
        <Container>
            <Title strong>Transactions for block {blockNumber}</Title>
            <Table
                loading={isLoading}
                title={Header}
                scroll={{ x: 800 }}
                dataSource={memoizedDataSource}
                columns={columns}
            />
        </Container>
    )
};

export default Block;