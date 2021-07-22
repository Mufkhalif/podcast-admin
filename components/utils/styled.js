import styled from "styled-components";

export const Container = styled.div`
  margin: ${(props) => (props.isNotCenter ? "50px" : "50px auto")};
  max-width: 960px;
  text-align: left;
`;

export const Title = styled.h1`
  color: white;
  font-family: poppins;
  margin-bottom: 20px;
  cursor: pointer;

  :hover {
    border-bottom: 1px sold white;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
