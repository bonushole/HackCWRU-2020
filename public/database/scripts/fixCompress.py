from datetime import datetime

from uszipcode import SearchEngine, SimpleZipcode, Zipcode

import pymongo
from pymongo import MongoClient

search = SearchEngine()
client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance
col = db.MonthlyRunningTotalsFlat
zip_to_c = db.ZipToC

month = datetime(2018,10,1)
zip_dict = {}
for entry in col.find({"Date":month}):
	zip_dict[entry["zip"]] = entry["zip"]

print("found all zips")
ret_list = []

import json
file = open("zips-to-coords.json", 'rw')
j_string = file.read()

raw_zips = json.loads(j_string)

d = {}
for x in raw_zips:
	d[x["zip_code"]] = x["loc"]

jsonzips = [x["zip_code"] for x in raw_zips]



for zip in zip_dict:
	print(zip_dict[zip])
	try:
	
		zipcode = search.by_zipcode(int(zip_dict[zip]))	
		county = zipcode.county
		state = zipcode.state
#from json
		lat = d[zip_dict[zip]]["lat"]
		long = d[zip_dict[zip]]["lng"]

		countystate = "" + str(county)+ "_"+str(state)
		if countystate == "None_None":
			countystate = zip_dict[zip]
		ret_list.append({"zip":zip,"County":countystate,"lat":lat,"long":long})
	except:
		print("error in entry: " + zip)
print("found all counties")

r = zip_to_c.insert_many(ret_list)
