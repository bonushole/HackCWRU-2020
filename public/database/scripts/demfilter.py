import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance

c1 = db.Candidates
c2 = db.DemPresCandidates

wdata = []
#Sanders, Warren, Buttigeg, Biden, Kloubuchar

for entry in data:
    wdata.append(entry)
print(wdata)
c2.insert_many(wdata)
