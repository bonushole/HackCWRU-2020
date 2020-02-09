

ccls = {}

ccl = open("ccl1.txt", 'rt')
for entry in ccl:
    tokens = entry.split("|")
    ccls[tokens[3]] = tokens[0]
ccl.close()

ccl2 = open("ccl2.txt", 'rt')
for entry in ccl2:
    tokens = entry.split("|")
    if tokens[3] not in ccls:
     ccls[tokens[3]] = tokens[0]
ccl2.close()

out = ""
out_line = ""

data = open("processed_data_3.txt", 'rt')
for entry in data:
    tokens = entry.split("|")
    try:
    	out_line = ""+ ccls[tokens[0]] + "|" + tokens[1] + "|" + tokens[2] + "|" + tokens[3] + "|" + tokens[4]
    	out = out + out_line
    except:
	#print("missing candidate ID in line: " + entry)
	out_line = ""

data.close()

wr = open("processed_data_4.txt", 'w')
txt = wr.write(out)
wr.close()
