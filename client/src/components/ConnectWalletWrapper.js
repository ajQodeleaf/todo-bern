'use client';
import { useWallet } from "../context/WalletContext";
import ConnectWallet from "./ConnectWallet";
import Header from "./Header";

export default function ConnectWalletWrapper({ children }) {
    const { isConnected } = useWallet();
    return isConnected ? (<>{<Header />}{children}</>) : <ConnectWallet />;
}