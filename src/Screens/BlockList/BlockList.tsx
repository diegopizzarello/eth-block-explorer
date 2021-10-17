import React, { useEffect } from 'react';
import Web3 from 'web3';
import { RouteComponentProps } from "@reach/router"
import { List, Typography } from 'antd';

import { Container } from './styles';
import BlockItem from './BlockItem';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addBlock, BLOCKS_TO_DISPLAY, clearBlocks } from '../../Slices/blockSlice';

// We can assume the app will be running in a browser that has MetaMask installed.
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

const { Text } = Typography;

interface BlockListProps extends RouteComponentProps {
    blockNumber?: string;
}

const BlockList = (_: BlockListProps) => {
    const blocks = useAppSelector((state) => state.block.blocks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
            if (!error) {
                dispatch(addBlock(result));
            } else {
                console.error(error);
            }
        });

        return () => {
            subscription.unsubscribe(function (error, success) {
                if (success) {
                    console.log('Successfully unsubscribed!');
                }
            });
        }
    }, [dispatch]);

    useEffect(() => {
        const getLastBlocks = async () => {
            const latest = await web3.eth.getBlockNumber();

            const blockNumbers = Array.from(Array(BLOCKS_TO_DISPLAY)).map((_, index) => latest - index).reverse();

            blockNumbers.forEach((blockNumber) => {
                web3.eth.getBlock(blockNumber, (error, block) => {
                    if (!error) {
                        dispatch(addBlock(block));
                    }
                });
            })
        }
        dispatch(clearBlocks())
        getLastBlocks();
    }, [dispatch]);

    return (
        <Container>
            <List
                loading={!blocks}
                dataSource={blocks}
                header={<Text style={{ marginLeft: 16, fontSize: 17}}>Latest {BLOCKS_TO_DISPLAY} blocks</Text>}
                renderItem={block => <List.Item><BlockItem block={block} /></List.Item>}
            />
        </Container>
    )
};

export default BlockList;