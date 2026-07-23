import urllib.request
import re
import json

url = 'https://www.openrice.com/zh/hongkong/r-library-restaurant-and-bar-r78921'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7'
})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find static openrice photo URLs
    images = re.findall(r'https://static\d+\.openrice\.com/userphoto/photo/[^\s\"\'\>]+', html)
    unique_imgs = list(set(images))
    print(f"Total found: {len(unique_imgs)}")
    for img in unique_imgs[:15]:
        print(img)
except Exception as e:
    print("Error fetching:", e)
