from datetime import datetime

import pymongo
from pymongo import MongoClient


client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance
col = db.MonthlyRunningTotalsFlat
dest = db.MonthlyRunningCountyTotals
zip_to_c = db.ZipToC

months = []

import json
file = open("zips-to-coords.json", 'rw')
j_string = file.read()

raw_zips = json.loads(j_string)

ziplists = [x["zip_code"] for x in raw_zips]
print("json imported")
months.append(datetime(2018,10,1))
months.append(datetime(2018,11,1))
months.append(datetime(2018,12,1))
months.append(datetime(2019,1,1))
months.append(datetime(2019,2,1))
months.append(datetime(2019,3,1))
months.append(datetime(2019,4,1))
months.append(datetime(2019,5,1))
months.append(datetime(2019,6,1))
months.append(datetime(2019,7,1))
months.append(datetime(2019,8,1))
months.append(datetime(2019,9,1))
months.append(datetime(2019,10,1))

bigboyzips = {}
for element in zip_to_c.find({}):
	bigboyzips[str(int(element["zip"]))] = element["County"]

print("zip master dict made")
def county_mapper(key):
	zip = key[0]
	county = bigboyzips[zip]

	return (county, key[1], key[2])




for month in months:
	print("Current Date is: " + str(month))
	collection = {}
	new_collection = {}
	for entry in col.find({"Date":month}):
		collection[(entry["zip"], entry["Candidate ID"],entry["Donation Type"])] = entry["Amount"]
	print("collection made")
	for entry in collection:
		
		key = county_mapper(entry)
		if key in new_collection:	
			new_collection[key] += collection[entry]
		else:
			new_collection[key] = collection[entry]
	upload = []
	print("creating upload set")
	for entry in new_collection:
		if len(entry[0]) == 5:
			upload.append({"Candidate ID": entry[1],"Donation Type":entry[2],"County":entry[0],"Date":month,"Amount":new_collection[entry]})
	print("uploading")
	res = dest.insert_many(upload)
				 
print("fin.")
