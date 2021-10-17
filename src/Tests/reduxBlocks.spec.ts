import { store } from '../store';
import { addBlock, BLOCKS_TO_DISPLAY, clearBlocks } from '../Slices/blockSlice';

const block = {
    "baseFeePerGas": "0xdf11a9543",
    "difficulty": "9864451469073708",
    "extraData": "0x65746865726d696e652d6575726f70652d7765737433",
    "gasLimit": 30000000,
    "gasUsed": 8977411,
    "hash": "0xdab61d0fbcf52fb65ab3910e53f4019bf01df384fd002c4f5f8c3a2241408391",
    "logsBloom": "0x99a04d03057050e19888a0caa002d24274129810c03c08200001a24a64108482001411802090914640c0db00802a03004201a1814800aca04e08a4000ca09a100100220004080d0a4a96720a203426f03428c800e8509000040315468e7693851210488a0220c0a0840519a324018c32770585508c0104747a000054110888042c10d12146053d1180c8116a58a20043cc013c01ed808f9aa839817c00112020861c880002c230036619029186009c1050c808c8041c08a1a123480699492041840c263a0382a822612501014c6c11040924120a0404401c00060586c83a71806a3a2499168a81920202146214048aa2060000d92025d1e2420628b459a85411",
    "miner": "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    "mixHash": "0xf0dd8379b03fadb457b650cdc7605b94f5655ac2cd4df33b7f6728b7f929231e",
    "nonce": "0x37dab30d7719d98e",
    "number": 13437807,
    "parentHash": "0xa39ec72d209ab2bc9c4a483f155ed69995bd1dece14e733394ee1a527c8f6e60",
    "receiptsRoot": "0xff235cab535ae52e221aa36f58ad7d56608549c8080ac1952fe3d6788d84441b",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": 27993,
    "stateRoot": "0x52b0d66292db795a873357f1e6fdaa811063053e6e864df67dfceb3296a844a9",
    "timestamp": 1634505234,
    "totalDifficulty": "32603122799407097553835",
    "transactionsRoot": "0x60977c31d32f0bd9e70232405aefe86c47a8b884fbd6ec4ae6425b2cb7269e82",
    "uncles": []
};

beforeEach(() => {
    store.dispatch(clearBlocks());
  });

test('Add a new block', () => {
    let state = store.getState().block.blocks;
    expect(state).toHaveLength(0);

    store.dispatch(addBlock(block));
    state = store.getState().block.blocks;
    expect(state).toContainEqual(block);
    expect(state).toHaveLength(1);

});

test(`Add a new block when the state has ${BLOCKS_TO_DISPLAY} blocks`, () => {
    let state = store.getState().block.blocks;
    expect(state).toHaveLength(0);

    //Load state
    Array.from(Array(BLOCKS_TO_DISPLAY)).forEach((_, index) => {
        store.dispatch(addBlock({...block, number: index}));
    })
    state = store.getState().block.blocks;
    expect(state).toHaveLength(BLOCKS_TO_DISPLAY);
    
    // Add new block
    store.dispatch(addBlock({...block, number: 11}));
    state = store.getState().block.blocks;
    expect(state).toHaveLength(BLOCKS_TO_DISPLAY);
    expect(state).toContainEqual({...block, number: 11});
});

test('Blocks are sorted in descending order', () => {
    let state = store.getState().block.blocks;
    expect(state).toHaveLength(0);

    store.dispatch(addBlock({...block, number: 3}));
    store.dispatch(addBlock({...block, number: 7}));
    store.dispatch(addBlock({...block, number: 1}));
    store.dispatch(addBlock({...block, number: 4}));

    state = store.getState().block.blocks;
    expect(state).toHaveLength(4);
    
    expect(state[0]).toEqual({...block, number: 7})
    expect(state[1]).toEqual({...block, number: 4})
    expect(state[2]).toEqual({...block, number: 3})
    expect(state[3]).toEqual({...block, number: 1})
});