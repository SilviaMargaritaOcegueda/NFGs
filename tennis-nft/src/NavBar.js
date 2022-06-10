import React from "react";

const NavBar = ({ accounts, setAccounts}) => {
    // setting isConnceted to 0 for not connected to wallet
    const isConnceted = Boolean(accounts[0]);

    // try to conncet if not conncetd with conncetAccount asynchronus function
    async function connectAccount(){
        // check if meta mask is there
        if (window.ethereum) {
            // grab accounts that comes from the meta mask (all of them)
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            // set accounts to accounts from meta mask
            setAccounts(accounts)
        }
    }

    return (
        <div>
            {/* Logo left */}
            <div>Logo</div>
            {/* right conncet button */}
            {isConnceted ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connected</button>
            )}
        </div>
    );
};

export default NavBar;