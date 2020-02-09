import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance
collection = db.Candidates

data = open("cn.txt", 'rt')
dicts = []
for entry in data:
    tokens = entry.split('|')
    try:
	dict = {"Candidate ID" : tokens[0], "Candidate Name" : tokens[1], "Party" : tokens[2], "State" : tokens[4], "Office" : tokens[5]}
	dicts.append(dict)
    except:
	print("Invalid data in line: " + entry)
    if len(dicts) >= 1000:
	res = collection.insert_many(dicts)
	dicts = []
