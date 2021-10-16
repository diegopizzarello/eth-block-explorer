import styled from "styled-components";
import { Avatar as AntdAvatar, Typography } from 'antd';

const { Text } = Typography;

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const BlockContainer = styled.div`
    display: flex;
    padding: 8px;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 768px) { 
        width: 600px;
    }
`;

export const RowContainer = styled.div`
    display: flex;
    width: 195px;
    margin-right: 24px;
    @media screen and (min-width: 768px) { 
        margin-right: 0px;
    }
`

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const MinerContainer = styled.div`
    display: none;
    @media screen and (min-width: 768px) { 
        display: flex;
        flex-direction: column;
    }
`

export const Avatar = styled(AntdAvatar)`
    border-radius: 8px;
    color: #77838f;
    background: rgba(119,131,143,.1);
    margin-right: 8px;
`;

export const Timestamp = styled.span`
    font-size: 12px;
    color: #77838f;
    font-weight: 400;
`;

export const MinerHash = styled(Text)`
    font-size: 14px;
    color: #77838f;
    font-weight: 400;
    width: 130px;
`;
