// queryClient.js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import axios from "axios";

/* const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"; */

const API_BASE_URL = "http://localhost:3001";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

axios.defaults.baseURL = API_BASE_URL;

export { queryClient, QueryClientProvider };
