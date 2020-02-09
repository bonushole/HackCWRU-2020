from datetime import datetime

import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance
collection = db.RunningTotals

data = open("processed_data_4.txt", 'rt')
dicts = []
for entry in data:
    tokens = entry.split('|')
    try:
    	dict = {"Candidate ID" : tokens[0], "Donation Type" : tokens[1], "zip" : tokens[2], "Date" : datetime.strptime(tokens[3], '%m%d%Y'), "Amount" : int(tokens[4])}
        dicts.append(dict)
    except:
	print("invalid date in line: " + entry)
    if len(dicts) >= 1000:
	res = collection.insert_many(dicts)
	dicts = []
