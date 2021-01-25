import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 30px;
  margin-top: 20px;
  @media (max-width: 1000px) {
    width: calc(100%-32px);
    margin: 0 16px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
`;
export default Wrapper;
