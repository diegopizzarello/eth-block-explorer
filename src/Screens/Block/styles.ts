import styled from "styled-components";
import { Typography } from "antd";

const { Text } = Typography;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
`;

export const Title = styled(Text)`
    text-align: center;
    font-size: 16px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle = styled.span`
    white-space: nowrap;
    margin-right: 24px;
`;
