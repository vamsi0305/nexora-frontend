import urllib.request
import urllib.error

urls = [
    "http://localhost:3000/",
    "http://localhost:3000/login",
    "http://localhost:3000/register",
    "http://localhost:3000/feed",
    "http://localhost:3000/explore",
    "http://localhost:3000/dashboard",
    "http://localhost:3000/notifications",
    "http://localhost:3000/settings",
    "http://localhost:3000/admin",
    "http://localhost:3000/guidelines"
]

for url in urls:
    try:
        res = urllib.request.urlopen(url)
        print(f"{url}: {res.status}")
    except urllib.error.HTTPError as e:
        print(f"{url}: {e.code}")
    except Exception as e:
        print(f"{url}: {str(e)}")
