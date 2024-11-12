import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { ABI } from "../../utils/ABI";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    const contractAddress = process.env.NEXT_PUBLIC_TODO_CONTRACT_ADDRESS;

    const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            setIsConnected(true);
            setAccount(accounts[0]);
        } else {
            setIsConnected(false);
            setAccount(null);
        }
    };

    useEffect(() => {
        const initializeConnection = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    const ethersProvider = new ethers.BrowserProvider(window.ethereum);
                    const signer = ethersProvider.getSigner();
                    const contractInstance = new ethers.Contract(contractAddress, ABI, signer);
                    setProvider(ethersProvider);
                    setContract(contractInstance);
                    setAccount(accounts[0]);
                    setIsConnected(true);
                }
            }
        };

        initializeConnection();

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
        }

        return () => {
            if (window.ethereum && handleAccountsChanged) {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            }
        };
    }, [contractAddress]);

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const ethersProvider = new ethers(window.ethereum);
                const signer = ethersProvider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, ABI, signer);
                setProvider(ethersProvider);
                setContract(contractInstance);
                setAccount(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        } else {
            alert("MetaMask is not installed!");
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setAccount(null);
        setProvider(null);
        setContract(null);
    };

    return (
        <WalletContext.Provider value={{ isConnected, account, provider, contract, connectMetaMask, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
