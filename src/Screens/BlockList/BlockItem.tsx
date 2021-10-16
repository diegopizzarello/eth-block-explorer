import React from 'react';
import { BlockTransactionString, BlockHeader } from 'web3-eth';
import { formatDistanceToNow } from 'date-fns'
import { Button, Typography } from 'antd';
import { navigate } from "@reach/router"

import { BlockContainer, Avatar, ColumnContainer, RowContainer, MinerContainer, Timestamp, MinerHash } from './styles';

const { Text } = Typography;

interface BlockItemProps {
    block: BlockHeader | BlockTransactionString
}

const BlockItem = ({ block }: BlockItemProps) => {
    return (
        <BlockContainer>
            <RowContainer>
                <Avatar shape="square" size="large" >Bk</Avatar>
                <ColumnContainer>
                    <Text strong>{block.number}</Text>
                    <Timestamp>
                        {formatDistanceToNow(
                            new Date(Number(block.timestamp) * 1000),
                            { addSuffix: true, includeSeconds: true }
                        )}
                    </Timestamp>
                </ColumnContainer>
            </RowContainer>
            <MinerContainer>
                <Text>Miner</Text>
                <MinerHash ellipsis copyable>{block.miner}</MinerHash>
            </MinerContainer>
            <Button onClick={() => navigate(`block/${block.number}`)}>See transactions</Button>
        </BlockContainer>
    )
}

export default BlockItem;