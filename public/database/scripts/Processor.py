from datetime import datetime 

'''
individual_data = open("itcont.txt", "rt")
out = ""
out_line = ""

#1st Pass, remove unneeded data.
for entry in individual_data:
    tokens = entry.split('|')
    out_line = "" + tokens[0] + '|' + tokens[6] + '|' + tokens[10] + '|' + tokens[13] + '|' + tokens[14] + '\n'
    #print(out_line)
    out = out + out_line
individual_data.close()
print("1st Pass Read")

filtered_data = open("processed_data_1.txt", 'w')
txt = filtered_data.write(out)
filtered_data.close()
print("1st Pass Written")




#2nd Pass, Total daily amounts by (Candidate, Zip, Date, Type)
out = ""
dict = {}
out_line = ""

print("Start 2nd Pass")

individual_data = open("processed_data_1.txt", "rt")

#construct dictionary
for entry in individual_data:
    tokens = entry.split('|')
    key = (tokens[0],tokens[1],tokens[2],tokens[3])
    if key in dict:
        dict[key] += int(tokens[4])
    else:
        dict[key] = int(tokens[4])
individual_data.close()
print("2nd Pass Read")
   
for key in dict:
    out_line = "" + key[0] + "|" + key[1] + "|" + key[2] + "|"  + key[3] + "|" + str(dict[key]) + "\n"
    out = out + out_line
    
print("2nd Pass Constructed")

filtered_data = open("processed_data_2.txt", 'w')
txt = filtered_data.write(out)
filtered_data.close()
print("2nd Pass Written")


#3rd Pass, Generate Running Totals
'''
out = ""
dict = {}
out_line = ""


print("Start 3rd Pass")
individual_data = open("processed_data_2.txt", "rt")
candidate_zip_type_list = {}
date_list = []
day_totals_dict = {}
running_totals_dict = {}

for entry in individual_data:
    tokens = entry.split('|')
    if "" in tokens:
        continue
    date = tokens[3]
    dayKey = (tokens[0],tokens[1],tokens[2],date)
    daySum = int(tokens[4])
    if date not in date_list:
        date_list.append(date)
        
    day_totals_dict[dayKey] = daySum 
    if (tokens[0],tokens[1],tokens[2]) not in candidate_zip_type_list:
	candidate_zip_type_list[(tokens[0],tokens[1],tokens[2])] = 1
individual_data.close()
print("3rd Pass Data Read")

date_list.sort(key = lambda date: datetime.strptime(date, '%m%d%Y')) 
print("Dates Sorted")
l = len(date_list)
print(l)

for i in range(0,len(date_list)):
    for key in candidate_zip_type_list:
        k = (key[0], key[1], key[2], date_list[i])
        if k in day_totals_dict:
            tot = 0
            for j in range(i,0,-1):
                k2 = (key[0], key[1], key[2], date_list[j])
                if k2 in running_totals_dict:
                    tot = running_totals_dict[k2]
                    break
            tot += day_totals_dict[k]
            running_totals_dict[k] = tot
    print(str(i) + "/" + str(l))

print("3rd Pass Running Totals Created")

for key in running_totals_dict:
    out_line = "" + key[0] + "|" + key[1] + "|" + key[2] + "|" + key[3] + "|" + str(running_totals_dict[key]) + "\n"
    out = out + out_line
print("3rd Pass Constructed")

filtered_data = open("processed_data_3.txt", 'w')
txt = filtered_data.write(out)
filtered_data.close()
print("3rd Pass Written")










