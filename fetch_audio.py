import urllib.request
url = "https://upload.wikimedia.org/wikipedia/commons/3/36/Dial_up_modem_noises.ogg"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response, open('./audio/dialup.ogg', 'wb') as out_file:
    out_file.write(response.read())
print("Downloaded")
