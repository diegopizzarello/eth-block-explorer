import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { RouteComponentProps } from '@reach/router';
import { BlockTransactionObject } from 'web3-eth';

interface BlockProps extends RouteComponentProps {
    blockNumber?: string;
}

// We can assume the app will be running in a browser that has MetaMask installed.
const web3 = new Web3(Web3.givenProvider);

const Block = ({ blockNumber }: BlockProps) => {
    const [block, setBlock] = useState<BlockTransactionObject | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getBlock = async() => {
            if (!blockNumber) {
                return;
            }
            web3.eth.getBlock(blockNumber, true, (error, result) => {
                if (!error) {
                    setBlock(result);
                } else {
                    setError(error);
                }
                setIsLoading(false);
            });
        }
        getBlock();
    }, [blockNumber]);


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <div>
            {block && (
                <span>{block.number}</span>
            )}
        </div>
    )
};

export default Block;