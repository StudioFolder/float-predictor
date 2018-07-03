import pygrib
import math
import wget
import datetime
import os
from PIL import Image
import json

def latLonToXYZ(lat,lon,radius=200):
	theta=(lon+180)*(math.pi/180)
	phi   = (90-lat)*(math.pi/180)
	x = -((radius) * math.sin(phi)*math.cos(theta))
	z = ((radius) * math.sin(phi)*math.sin(theta))
	y = ((radius) * math.cos(phi))
	return (x,y,z)

def generateWindDataJson(filename, n, mb):
	grbs = pygrib.open(filename)
	grbs.seek(0)
	u_wind_values=grbs.select(name="U component of wind")[0].values
	v_wind_values=grbs.select(name="V component of wind")[0].values
	data=[];
	j = json.load(open('geo6.json'))
	vertices=iter(j['vertices']);

	for lat,lon in zip(vertices,vertices):
		x,y,z=latLonToXYZ(lat,lon)
		llat=int(round(180-(round(lat)+90)))
		llon=int(round(lon))
		x1,y1,z1=latLonToXYZ(lat+v_wind_values[llat][llon]*0.2,llon+u_wind_values[llat][llon]*0.2)
		data.extend([round(x1-x,2),round(y1-y,2),round(z1-z,2)])
	with open("data/"+str(mb)+"/"+str(n)+".json", 'w') as outfile:
		json.dump({'data':data}, outfile, separators=(',',':'))

def process(mb):
	for i in range(0,24*16,24):
		h=str(i).zfill(3);
		print(h);
		today="gfs."+datetime.datetime.today().strftime('%Y%m%d')+"00";
		filename="gfs.t00z.pgrb2.1p00.f"+h;
		url="http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file="+filename+"&lev_"+str(mb)+"_mb=on&var_UGRD=on&var_VGRD=on&dir=%2F"+today;
		print(url);
		wget.download(url);
		generateWindDataJson(filename, i, mb);
		os.remove(filename);

for i in [10, 30, 100, 250, 500, 850, 1000]:
	process(i)
