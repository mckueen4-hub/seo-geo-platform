import urllib.request
import urllib.parse
import re

query = 'Library Restaurant and Bar'
search_url = f'https://www.openrice.com/zh/hongkong/restaurants?where={urllib.parse.quote(query)}'

req = urllib.request.Request(search_url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-HK,zh;q=0.9,en-US;q=0.8,en;q=0.7'
})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("HTML length:", len(html))
    # Extract any openrice photos
    imgs = re.findall(r'https?://[^\s\"\'\>]*(?:openrice|orstatic)[^\s\"\'\>]*(?:photo|restaurant|photo-large)[^\s\"\'\>]*', html, re.IGNORECASE)
    print("Found images:", list(set(imgs))[:10])
except Exception as e:
    print("Error:", e)
