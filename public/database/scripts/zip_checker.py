
import json
file = open("zips-to-coords.json", 'rw')
j_string = file.read()

raw_zips = json.loads(j_string)

zips = [x["zip_code"] for x in raw_zips]

print(zips)
