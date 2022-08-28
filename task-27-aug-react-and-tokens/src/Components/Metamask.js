import React, { useState, useEffect } from 'react';
import InteractWithContract from './InteractWithContract';

function Metamask() {
  const [accountAddress, setAccountAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        console.log('No ethereum')
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccountAddress(accounts[0]);
      console.log("Accounts logic", accounts[0])
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    // Function
    const checkIfUserConnected = async () => {
      if(!window.ethereum){
        return ;
      } else {
        const accounts = await ethereum.request({
          method: 'eth_accounts',
        });
        setAccountAddress(accounts[0]);
        if(accounts[0]){
          setIsConnected(true);
        }
      }
    }

    // Call the function
    checkIfUserConnected();
  }, [])

  return (
    <React.Fragment>
      {!isConnected && 
         <button onClick={connectWallet}> Connect to Metamask</button>
      }
     
      {ethereum && isConnected && <p><i>Connected wallet address is : </i> <b className="account-address"><u>{accountAddress}</u></b></p>}
      <InteractWithContract />
    </React.Fragment>
  );
}

export default Metamask;