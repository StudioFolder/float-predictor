cd script
rm -rf test
mkdir test
mkdir test/10
mkdir test/30
mkdir test/100
mkdir test/250
mkdir test/500
mkdir test/850
mkdir test/1000
python create_test_data.py
rm -rf ../test
mv test ../

