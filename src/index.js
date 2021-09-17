import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store/store";

ReactDOM.render(
	<ChakraProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</ChakraProvider>,
	document.getElementById("root")
);
