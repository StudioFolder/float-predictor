import pygrib
import math
import wget
#import urllib.request
import datetime
import os
from PIL import Image
import json
#conda install -c anaconda
#file = 'gfs.t00z.pgrb2.1p00.f000' #example filename

def latLonToXYZ(lat,lon,radius=200):
	theta=(lon+180)*(math.pi/180)
	phi   = (90-lat)*(math.pi/180)
	x = -((radius) * math.sin(phi)*math.cos(theta))
	z = ((radius) * math.sin(phi)*math.sin(theta))
	y = ((radius) * math.cos(phi))
	return (x,y,z)

def renderImages(filename,n):
	img = Image.new( 'RGB', (360,181), "black")
	pixels = img.load() # create the pixel map
	grbs = pygrib.open(filename)
	grbs.seek(0)
	u_wind_values=grbs.select(name="10 metre U wind component")[0].values
	v_wind_values=grbs.select(name="10 metre V wind component")[0].values
	maxv=0
	minv=10000000
	for r in u_wind_values:
		for x in r:
			if x > maxv:
				maxv=x
			if x < minv:
				minv=x
	for r in v_wind_values:
		for x in r:
			if x > maxv:
				maxv=x
			if x < minv:
				minv=x
	print(minv)
	print(maxv)
	print("BEFORE-----> MIN:"+str(minv)+" MAX: "+str(maxv))

	maxv=0
	minv=10000000

	for lat in range(img.size[1]):
		for lon in range(img.size[0]):
			x,y,z=latLonToXYZ(lat,lon)
			x1,y1,z1=latLonToXYZ(lat+v_wind_values[lat][lon],lon+u_wind_values[lat][lon])
			pixels[lon,lat] = (math.ceil(x1-x+128), math.ceil(y1-y+128), math.ceil(z1-z+128)) # set the colour accordingly
			if math.ceil(x1-x+128) > maxv:
				maxv=math.ceil(x1-x+128)
			if math.ceil(y1-y+128) > maxv:
				maxv=math.ceil(y1-y+128)
			if math.ceil(z1-z+128) > maxv:
				maxv=math.ceil(z1-z+128)
			if math.ceil(x1-x+128) < minv:
				minv=math.ceil(x1-x+128)
			if math.ceil(y1-y+128) < minv:
				minv=math.ceil(x1-x+128)
			if math.ceil(z1-z+128) < minv:
				minv=math.ceil(x1-x+128)
	print("MIN:"+str(minv)+" MAX: "+str(maxv))
	img.save(str(n)+".jpg")



def renderJson(filename,n):
	img = Image.new( 'RGB', (360,181), "black")
	pixels = img.load() # create the pixel map
	grbs = pygrib.open(filename)
	#print(grbs)
	grbs.seek(0)
	#print(grbs)
	#for g in grbs:
	#	print(g)
	#print(grbs.select(name="U component of wind")[0]);
	#print(grbs.select(name="V component of wind")[0])
	#return;
	#print(grbs.select(name="10 metre U wind component")[0]);
	#print(grbs.select(name="10 metre V wind component")[0])

	#u_wind_values=grbs.select(name="10 metre U wind component")[0].values
	#v_wind_values=grbs.select(name="10 metre V wind component")[0].values
	u_wind_values=grbs.select(name="U component of wind")[0].values
	v_wind_values=grbs.select(name="V component of wind")[0].values

	data=[];
	for lat in range(img.size[1]):
		for lon in range(img.size[0]):
			x,y,z=latLonToXYZ(lat,lon)
			x1,y1,z1=latLonToXYZ(lat+v_wind_values[lat][lon]*0.1,lon+u_wind_values[lat][lon]*0.1)
			#data.extend([x,y,z,0])
			#data.extend([round(x1-x,2),round(y1-y,2),round(z1-z,2)])
			data.extend([round(x1-x,5),round(y1-y,5),round(z1-z,5)])
	with open("windjson/"+str(n)+".json", 'w') as outfile:
		json.dump({'data':data}, outfile, separators=(',',':'))

def downloadData():
	#rm *.json
	#wget -O 0.json http://float.aerocene.org/traj4multi2d.php?0,250,35.652832,139.839478%2052.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,52.520645,13.409779,
	latlons=[];
	for i in range(8):
		latlons.append(52.520645)
		latlons.append(13.409779)
	url="http://float.aerocene.org/traj4multi2d.php?"+str(0)+",250,35.652832,139.839478%20"
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
		url="http://float.aerocene.org/traj4multi2d.php?"+str(i+1)+",250,35.652832,139.839478%20"
		start=len(j)-8
		end=len(j)
		print(str(start)+" "+str(end))
		for i in range(start , end):
			url+=str(j[i][2])+','+str(j[i][3])+','
		print(url)

def renderJson2(filename,n):
	img = Image.new( 'RGB', (360,181), "black")
	pixels = img.load() # create the pixel map
	grbs = pygrib.open(filename)
	grbs.seek(0)
	u_wind_values=grbs.select(name="U component of wind")[0].values
	v_wind_values=grbs.select(name="V component of wind")[0].values

	data=[];
	j = json.load(open('geo6.json'))
	#print(j)

	vertices=iter(j['vertices']);

	minLat=10000000;
	maxLat=-10000000;
	minLng=10000000;
	maxLng=-10000000;

	for lat,lon in zip(vertices,vertices):


		if lat < minLat:
			minLat=lat
		if lon < minLng:
			minLng=lon
		if lat > maxLat:
			maxLat=lat
		if lon > maxLng:
			maxLng=lon


		clat=lat;#180-lat-90;

		x,y,z=latLonToXYZ(clat,lon)
		#if lon>330:
		#	x1,y1,z1=latLonToXYZ(lat+v_wind_values[lat+90][lon]*2,lon+u_wind_values[lat+90][lon]*0.2)

		#else:
		llat=int(round(180-(round(lat)+90)))
		llon=int(round(lon))
		x1,y1,z1=latLonToXYZ(clat+v_wind_values[llat][llon]*0.2,llon+u_wind_values[llat][llon]*0.2)

		#x1,y1,z1=latLonToXYZ((180-lat)-90,lon)
		#if lon>180-5 and lon<180+5:#lat>-2 and lat<2 and
		#x1,y1,z1=latLonToXYZ((180-lat)-90,lon+5)
		data.extend([round(x1-x,2),round(y1-y,2),round(z1-z,2)])
	with open("windjson/"+str(n)+".json", 'w') as outfile:
		json.dump({'data':data}, outfile, separators=(',',':'))
	print(str(minLat)+" "+str(maxLat));
	print(str(minLng)+" "+str(maxLng));
#http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.2017120200
def process():
	for i in range(0,24*16,24):
		h=str(i).zfill(3) ;
		print(h)
		today="gfs."+datetime.datetime.today().strftime('%Y%m%d')+"00"
		filename="gfs.t00z.pgrb2.1p00.f"+h;
		#url="http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file="+filename+"&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2F"+today
		url="http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file="+filename+"&lev_250_mb=on&var_UGRD=on&var_VGRD=on&dir=%2F"+today
		print(url)
		wget.download(url)
		renderJson2(filename,i)
process()
downloadData()
