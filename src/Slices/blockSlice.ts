import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// TODO: Fix types
interface BlockState {
    blocks: any[]
}

export const BLOCKS_TO_DISPLAY = 10;

const initialState: BlockState = {
    blocks: [],
}

export const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        addBlock: (state, action: PayloadAction<any>) => {

            if (!state.blocks.find((block) => block.number === action.payload.number)) {
                // Store only 10 blocks
                const blocks = [action.payload, ...state.blocks].slice(0, BLOCKS_TO_DISPLAY);

                // Sort by block number
                blocks.sort((firstBlock, secondBlock) => firstBlock.number < secondBlock.number ? 1 : -1);

                state.blocks = blocks;
            }
        },
        clearBlocks: (state) => {
            state.blocks = [];
        }
    },
})

export const { addBlock, clearBlocks } = blockSlice.actions

export const selectBlocks = (state: RootState) => state.block.blocks

export default blockSlice.reducer