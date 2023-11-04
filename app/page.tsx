import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Persista",
  description: "Holding Customers made easy",
};

import Login from "./Login";

export default function Home() {
  return <Login />;
}
