import React, { useEffect } from 'react';
import Web3 from 'web3';

const BlockList = () => {
    useEffect(() => {
        // We can assume the app will be running in a browser that has MetaMask installed.
        const web3 = new Web3(Web3.givenProvider);
        web3.eth.subscribe('newBlockHeaders', (error, result) => {
            if (!error) {
                console.log('result ', result.number);
            } else {
                console.error(error);
            }
        });
    }, []);

    return (
        <div>
            <span>block list</span>
        </div>
    )
};

export default BlockList;