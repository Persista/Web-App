import Image from "next/image";
import { Inter } from "next/font/google";
import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Container className="bg-red-500">
      <p className="font-sans">Hello world!</p>
      <p className="font-inter">Hello world!</p>
    </Container>
  );
}
