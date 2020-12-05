import SignupComponent from "../components/Signup";
import Signin from "../components/Signin";
import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Signup = () => (
  <Columns>
    <SignupComponent />
    <Signin />
  </Columns>
);

export default Signup;
