import urllib.request
import urllib.parse
import re

url = 'https://www.openrice.com/zh/hongkong/restaurants?where=' + urllib.parse.quote('Library Restaurant and Bar')
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'zh-HK,zh;q=0.9,en-US;q=0.8,en;q=0.7'
})

html = urllib.request.urlopen(req).read().decode('utf-8')
# Extract all orstatic image links
photos = re.findall(r'https?://static\d+\.orstatic\.com/userphoto[^\s\"\'\>]+', html)

# Clean up lx/mx to lx (large resolution)
clean_photos = []
for p in photos:
    large_p = p.replace('mx.jpg', 'lx.jpg').replace('sx.jpg', 'lx.jpg')
    if large_p not in clean_photos and 'Coupon' not in large_p:
        clean_photos.append(large_p)

print("Real OpenRice CDN Photos extracted:")
for idx, p in enumerate(clean_photos):
    print(f"Photo {idx+1}: {p}")
