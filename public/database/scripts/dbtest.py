import json
import datetime as datetime
import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance

#Find Bernie Sanders' Donations for dates before 2/2/2019
d = datetime.datetime(2018, 1, 1)
id = []
print(str(d))
collection = db.Candidates

dat = collection.find_one({"Candidate Name" : "SANDERS, BERNARD", "Office" : "P"})
id.append( dat["Candidate ID"])


dat = collection.find_one({"Candidate Name" : "WARREN, ELIZABETH", "Office" : "P"})
id.append( dat["Candidate ID"])


dat = collection.find_one({"Candidate Name" : "KLOBUCHAR, AMY J.", "Office" : "P"})
id.append( dat["Candidate ID"])


dat = collection.find_one({"Candidate Name" : "BUTTIGIEG, PETE", "Office" : "P"})
id.append( dat["Candidate ID"])


dat = collection.find_one({"Candidate Name" : "BIDEN, JOSEPH R JR", "Office" : "P"})
id.append( dat["Candidate ID"])



print(id)

collection = db.RunningTotals
out = []
#for i in id:
#	for entry in collection.find({"Candidate ID": i, "Date" : {"$gt":d}}):
#		out.append(""+str(entry["Date"]) + "|" + entry["zip"] + "|" + str(entry["Amount"])+"\n")

#print(out)
