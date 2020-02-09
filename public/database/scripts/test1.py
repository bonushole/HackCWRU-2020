import pymongo
from pymongo import MongoClient
from datetime import datetime

client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance
collection = db.MonthlyRunningTotalsFlat
collection2 = db.ZipToC
date = datetime(2018, 10, 1)
can = ['P60007168', 'P00009621', 'P80006117', 'P00010298', 'P80000722']
print(collection2.count_documents({"County":"None_None"}))
	#print(element)
