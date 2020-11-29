import App, { Container } from "next/app";
import Page from "../components/Page";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

// const MyApp = ({ Component }) => {
//   return (
//     <Container>
//       <p>I'm on every page.</p>
//       <Component />
//     </Container>
//   );
// };

export default MyApp;
