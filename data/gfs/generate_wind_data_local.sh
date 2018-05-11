cd script
rm -rf data
mkdir data
mkdir data/10
mkdir data/30
mkdir data/100
mkdir data/250
mkdir data/500
mkdir data/850
mkdir data/1000
python wind_data_download_local.py || { echo 'exit';exit 1; }
rm -rf ../data
mv data ../
