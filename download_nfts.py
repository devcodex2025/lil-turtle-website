import requests
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

# Collections configuration
collections = [
    {
        'name': 'mini',
        'cid': 'bafybeigu2jy6e33ellha43tbpzhhbucvvnkevgxoht6f7biygjoipz53mm',
        'size': 24,
        'ext': 'webp'
    },
    {
        'name': 'crown',
        'cid': 'bafybeieebib47wlpeqktbug47hemiudjrdt4uxt4yo45jxfzt4lslbdpby',
        'size': 16,
        'ext': 'webp'
    }
]

base_dir = r"c:\Users\karbi\Desktop\Lil Turte\lil-turtle-website\public\nfts"

def download_image(cid, filename, filepath):
    """Download a single image from IPFS using multiple gateways"""
    gateways = [
        f"https://ipfs.io/ipfs/{cid}/{filename}",
        f"https://gateway.pinata.cloud/ipfs/{cid}/{filename}",
        f"https://{cid}.ipfs.w3s.link/{filename}",
    ]
    
    for url in gateways:
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            with open(filepath, 'wb') as f:
                f.write(response.content)
            return f"✅ Downloaded: {os.path.basename(filepath)}"
        except Exception as e:
            continue
    
    return f"❌ Failed: {os.path.basename(filepath)} - All gateways failed"

def download_collection(collection):
    """Download all images for a collection"""
    collection_dir = os.path.join(base_dir, collection['name'])
    os.makedirs(collection_dir, exist_ok=True)
    
    tasks = []
    for i in range(1, collection['size'] + 1):
        filename = f"{i}.{collection['ext']}"
        filepath = os.path.join(collection_dir, filename)
        tasks.append((collection['cid'], filename, filepath))
    
    return tasks

# Collect all download tasks
all_tasks = []
for collection in collections:
    all_tasks.extend(download_collection(collection))

print(f"Starting download of {len(all_tasks)} NFT images...")

# Download with thread pool for faster execution
with ThreadPoolExecutor(max_workers=10) as executor:
    futures = [executor.submit(download_image, cid, filename, filepath) for cid, filename, filepath in all_tasks]
    
    for future in as_completed(futures):
        print(future.result())

print(f"\n✅ Download complete! Total images: {len(all_tasks)}")
