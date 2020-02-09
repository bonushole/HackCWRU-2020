from datetime import datetime

import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance
col = db.MonthlyRunningTotals
dest = db.MonthlyRunningTotalsFlat

months = []


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

for month in months:
	print("Current Date is: " + str(month))
	collection = {}
	new_collection = {}
	for entry in col.find({"Date":month}):
		collection[(entry["zip"], entry["Candidate ID"],entry["Donation Type"])] = entry["Amount"]
	for entry in collection:
		if len(entry[0]) != 5:
			key = (entry[0][0:5],entry[1],entry[2])
			if key in new_collection:
				new_collection[key] += collection[entry]
			else:
				new_collection[key] = collection[entry]
		else:
			if entry in new_collection:	
				new_collection[entry] += collection[entry]
			else:
				new_collection[entry] = collection[entry]	
	upload = []
	for entry in new_collection:
		if len(entry[0]) == 5:
			upload.append({"Candidate ID": entry[1],"Donation Type":entry[2],"zip":entry[0],"Date":month,"Amount":new_collection[entry]})
	
	res = dest.insert_many(upload)
				 
print("fin.")
