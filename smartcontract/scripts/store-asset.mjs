// We will use NFT.Storage to store our digital asset and its metadata.
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.NFT_STORAGE_API_KEY

async function storeAsset() {
    // Create a new client connecting to NFT.Storage using the API key created.
    const client = new NFTStorage({ token: API_KEY })
    // Introduce the metadata consisting of name, description, and the image
    const metadata = await client.store({
        name: 'Test NFT',
        description: 'My Test NFT is an awesome artwork!',
        // Read the NFT asset directly from the file system from the assets directory
        image: new File(
            [await fs.promises.readFile('assets/art.png')],
            'art.png',
            { type: 'image/png' }
        ),
    })
    //  print the metadata URL
    console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });