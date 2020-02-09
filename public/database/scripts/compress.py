from datetime import datetime
from datetime import timedelta

import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient("mongodb+srv://admin:admin@n-a-m-e-asvgv.mongodb.net/test?retryWrites=true&w=majority")
db = client.Campaign_Finance
c1 = db.RunningTotals
c2 = db.MonthlyRunningTotals

day_delta = timedelta(days = 1)

months = []

months.append(datetime(2018,9,1))
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

key_dict = {}

for entry in c1.find():
	key = (entry["Candidate ID"], entry["Donation Type"], entry["zip"])
	key_dict[key] = 0
print("Made key list")

for i in range(0,len(months)-1):
	print("Month " + str(i))
	c_date = months[i]
	donation_dict = key_dict
	while c_date < months[i+1]:
		print(c_date)
		day_values = {}
		for entry in c1.find({"Date":c_date}):  
			day_values[(entry["Candidate ID"], entry["Donation Type"], entry["zip"])] = entry["Amount"]
		for key in key_dict:
			if key in day_values:
				donation_dict[key] = day_values[key]
		c_date = c_date + day_delta
	write = []
	for donation in donation_dict:
		write.append({"Candidate ID":donation[0],"Donation Type":donation[1],"zip":donation[2],"Date":c_date,"Amount":donation_dict[donation]})
	res = c2.insert_many(write)
	print("Wrote Month")
print("fin.")
