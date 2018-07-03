import numpy as np
import math
import wget
import os
import json

def latLonToXYZ(lat,lon,radius=200):
	theta=(lon+180)*(math.pi/180)
	phi   = (90-lat)*(math.pi/180)
	x = -((radius) * math.sin(phi)*math.cos(theta))
	z = ((radius) * math.sin(phi)*math.sin(theta))
	y = ((radius) * math.cos(phi))
	return (x,y,z)

def generateWindJson(filename, n, mb):
	data = np.load(filename);
	columnsNum = len(data['u'][0]);
	rowsNum = len(data['u']); 
	u_wind_values = data['u'];
	v_wind_values = data['v'];
	
	print(str(columnsNum) + ' ' + str(rowsNum));
	data=[];
	j = json.load(open('geo6.json'))
	vertices=iter(j['vertices']);

	for lat,lon in zip(vertices,vertices):
		x,y,z=latLonToXYZ(lat,lon)
		llat=int(round(180-(round(lat)+90)))
		llon=int(round(lon))
		#x1,y1,z1=latLonToXYZ(lat+v_wind_values[llat][llon]*0.2,llon+u_wind_values[llat][llon]*0.2)
		x1,y1,z1=latLonToXYZ(lat+v_wind_values[llat*4][llon*4]*0.2,llon+u_wind_values[llat*4][llon*4]*0.2)
		data.extend([round(x1-x,2),round(y1-y,2),round(z1-z,2)])
	with open("data/"+str(mb)+"/"+str(n * 3)+".json", 'w') as outfile:
		json.dump({'data':data}, outfile, separators=(',',':'))

def process(mb):
	for i in range(0,8*16,8):
		# filename = "~/public_html/met/gfs-" + str(mb).zfill(4) + "/"+"uv-"+str(i).zfill(4)+".npz";
		filename = "uv-"+str(i).zfill(4)+".npz";
		url = "http://floatpredictor.aerocene.org/scripts/gfs-" +str(mb).zfill(4) + "/"+filename;
		print(url);
		wget.download(url);
		generateWindJson(filename, i, mb);
		os.remove(filename);

for i in [10, 30, 100, 250, 500, 850, 1000]:
	process(i)

