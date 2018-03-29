cd ~/public_html/met/folder/tmp/dist/static/data/gfs/
cd script
rm -rf data
cp -r ../data .
python wind_data_download.py
cp -R data ../
