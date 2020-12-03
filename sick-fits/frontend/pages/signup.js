import SignupComponent from "../components/Signup";
import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Signup = () => (
  <Columns>
    <SignupComponent />
    <SignupComponent />
    <SignupComponent />
  </Columns>
);

export default Signup;
