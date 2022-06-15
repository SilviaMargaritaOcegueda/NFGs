<html>
<body>
<h1>NFT for Tennis</h1>
<h2>This project is aimed for ...</h2>
<h2>Here, we are establishing the Metadata for our TennisNFT, which includes the Images and JSON files</h2>
<p>Each NFT has its own metadata - name, image, description, etc. We just can't save all those details on the smart contract </p>
<p>Each NFT gets an unique URI, which will only be saved on the smart contract so that the NFT marketplace (like OpenSea) can look up and pull data to post it on their website. </p>
<p>However, it is not hosted on the blockchain. We need an external URL to host the metadata. By external URL, I mean the link to the JSON file. We must create one JSON file for each NFT ID </p>
<p>And, we can host the metadata on Moralis - <strong>Moralis Static Hosting</strong> </p>
<h4>Steps to create and host NFT Metadata</h4>
<p>Step 1: Open a new folder in Visual Studio Code and copy the above contents onto your device </p>
<p>Step 2: There are three main file types here - <br>
(i)<code>index.html</code> (front-end landing page which is mandatory to host anything online)<br>
(ii)  <code>image</code> files (the NFT collection). You can design your own NFT image files using Paint or any other software<br>
and <br>
(iii) the<code>JSON</code>files that contains the metadata associated with each NFT</p>
<p>Step 3: Open the Terminal in Visual Studio Code and install Moralis Admin Client</p>
<p>><code>npm install -g moralis-admin-cli</code></p>
<p>Step 4: Open your browser and go to the <a href="admin.moralis.io" target="_blank">Moralis Admin Website</a> and sign up</p>
<p>Step 5: Once your Moralis account is created, Go the Moralis Admin Homepage -> Create a Server</p>
<p>Step 6: Mention the details for your server.</p>
<ul>
    <li>Mention your server name</li>
    <li>Mention the region</li>
    <li>Choose the type of network - testnet (since we are only practising now)</li>
    <li>Choose the chain you would require - I chose Rinkeby</li>
</ul>
<p>Step 7: Once you server gets created, click on <code>View Details</code>. This will give you the server details. Let this tab be open in your browser; you will need these details now</p>
<p>Step 8: Come back to Visual Studio Code's terminal and deploy your server by typing the following command</p>
<p>><code>moralis-admin-cli deploy</code></p>
<p>Step 9: Now, your terminal will prompt you to <code>Sepcify Moralis API key</code>. Copy the <code>CLI API Key</code> from your Moralis Admin window on the browser and paste it here. Press <code>Enter</code></p>
<p>Step 10: Next, the terminal will ask <code>Specify Moralis API Secret</code>. Copy the <code>CLI API Secret</code> from your Moralis Admin panel and paste it here. Press <code>Enter</code></p>
<p>Step 11: The terminal will show you the list of servers that were deployed in your Moralis server. And now the terminal will ask you to choose the server you want to connect to.
<br>
<code>(0) Tennis_NFT</code>
<code>(1) Second_server</code>
<p>Step 12: Choose the server instance you are running now. In my case, I am running this Tennis_NFT server. So I have input <code>0</code> in the terminal.</p>
<p>Step 13: The terminal will give you the site where the site was deployed successfully. Copy this URL. You will need it in several places. The URL will look something like this <code>https://lqm5lovruqm4.moralisweb3.com</code></p>
<p>Step 13: Go and visit this URL. You will now see the content that you have written in your <code>index.html</code> file.</p>





</body>
</html>