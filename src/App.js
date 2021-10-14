import logo from "./MageLogo.jpg";
import React, { useEffect } from "react";
import "./App.css";
import { useMoralis } from "react-moralis";
import { Button, Box, Heading } from "@chakra-ui/react";
import { Container, Center } from "@chakra-ui/react";

const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();

  return (
    <Button
      display={"block"}
      colorScheme="red"
      variant="solid"
      isLoading={isAuthenticating}
      onClick={() => logout()}
      disabled={isAuthenticating}>
      Logout
    </Button>
  );
};

// ---------- APP -------------
function App() {
  const {
    authenticate,
    isWeb3Enabled,
    isAuthenticated,
    user,
    enableWeb3,
    Moralis,
  } = useMoralis();

  async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
      // mobileLinks: [
      //   "metamask",
      //   "trust",
      //   "rainbow",
      //   "argent",
      //   "imtoken",
      //   "pillar",
      // ],
      signingMessage: "Welcome!",
    });
    console.log(user);
  }

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
      console.log("web3 activated");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  // ----- Authenticate in Metamask---------
  if (!isAuthenticated && !user) {
    console.log(user);
    return (
      <Container maxW="container.lg">
        <Center>
          <img width={500} height={500} src={logo} alt="logo" />
        </Center>
        <br />
        <Center>
          <Heading as="h2" size="3xl" p={10}>
            Wallet authentication
          </Heading>
        </Center>
        <Center>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => authenticate({ signingMessage: "Hello youtube" })}>
            Sign in using Metamask
          </Button>
        </Center>
        <br />
        <Center>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => authWalletConnect()}>
            Sign in using Wallet Connect
          </Button>
        </Center>
        <br />
      </Container>
    );
  }

  return (
    <Box display={"block"} p={35} className="App">
      <LogoutButton />
      <Center>
        <img width={500} height={500} src={logo} alt="logo" />
      </Center>

      <Center>
        <Heading as="h2" size="3xl" p={10}>
          Wallet Logged in
        </Heading>
      </Center>
    </Box>
  );
}

export default App;
