import pygrib
import math
import wget
#import urllib.request
import datetime
import os
from PIL import Image
import json

def downloadData():
	#rm *.json
	#wget -O 0.json http://floatpredictor.aerocene.org/traj4multi2d.php?0,250,35.652832,139.839478%2052.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,
	latlons=[];
	for i in range(8):
		latlons.append(52.520645)
		latlons.append(13.409779)
	url="http://floatpredictor.aerocene.org/traj4multi2d.php?"+str(0)+",250,35.652832,139.839478%20"
	for i in latlons:
		url+=str(i);
		url+=','
		#if i < len(latlons)-1:
	print(url)
	for i in range(16):
		name="test/"+str(i)+".json"
		#urllib.request.urlretrieve(url, filename=name)
		#filename=wget.download(url)
		wget.download(url,name);
		j = json.load(open(name))
		j = j['d']
		url="http://floatpredictor.aerocene.org/traj4multi2d.php?"+str(i+1)+",250,35.652832,139.839478%20"
		start=len(j)-8
		end=len(j)
		print(str(start)+" "+str(end))
		for i in range(start , end):
			url+=str(j[i][2])+','+str(j[i][3])+','
		print(url)

downloadData()
