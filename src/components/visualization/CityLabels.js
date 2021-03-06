/**
 * CityLabels.js - creates and defines the behaviour of city labels.
 * A bi-dimensional array organizes cities in tiles (32x16),
 * making it immediate to retrieve the close cities.
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

/* eslint-disable */

import _ from 'lodash';
import Util from './Util';
import THREELabel from './THREELabel';


const city_tiles = [
[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
,[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
,[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
,[[],[],[],[],[],[],[],[],[],[],[{"city": "Punta Arenas","lat": -53.167,"lng": -70.933}],[{"city": "Ushuaia","lat": -54.8,"lng": -68.3}],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
,[[],[],[],[],[],[],[],[],[],[],[{"city": "San Carlos de Bariloche","lat": -41.15,"lng": -71.3}],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[{"city": "Hobart","lat": -42.883,"lng": 147.317}],[],[{"city": "Invercargill","lat": -46.417,"lng": 168.3}]]
,[[],[],[],[],[],[],[],[],[],[],[{"city": "Concepción","lat": -36.833,"lng": -73.05},{"city": "Valparaíso","lat": -33.05,"lng": -71.617},{"city": "Santiago","lat": -33.45,"lng": -70.667}],[{"city": "Mendoza","lat": -32.883,"lng": -68.817},{"city": "Córdoba","lat": -31.4,"lng": -64.183},{"city": "Bahía Blanca","lat": -38.717,"lng": -62.267},{"city": "Rosario","lat": -32.95,"lng": -60.667}],[{"city": "Buenos Aires","lat": -34.6,"lng": -58.367},{"city": "Montevideo","lat": -34.917,"lng": -56.167},{"city": "Chuí","lat": -33.683,"lng": -53.45},{"city": "Pelotas","lat": -31.767,"lng": -52.333}],[],[],[],[],[],[],[{"city": "Cape Town","lat": -33.917,"lng": 18.417}],[{"city": "Port Elizabeth","lat": -33.95,"lng": 25.6}],[],[],[],[],[],[],[],[],[{"city": "Mandurah","lat": -32.517,"lng": 115.717},{"city": "Perth","lat": -31.95,"lng": 115.85}],[],[{"city": "Adelaide","lat": -34.917,"lng": 138.6}],[{"city": "Melbourne","lat": -37.8,"lng": 144.95},{"city": "Canberra","lat": -35.3,"lng": 149.117}],[{"city": "Wollongong","lat": -34.433,"lng": 150.883},{"city": "Sydney","lat": -33.85,"lng": 151.2},{"city": "Newcastle","lat": -32.917,"lng": 151.75}],[]]
,[[{"city": "Nukuʻalofa","lat": -21.133,"lng": -175.2}],[],[{"city": "Avarua","lat": -21.2,"lng": -159.767}],[],[{"city": "Adamstown","lat": -25.067,"lng": -130.1}],[],[],[],[],[],[{"city": "La Serena","lat": -29.9,"lng": -71.25},{"city": "Antofagasta","lat": -23.65,"lng": -70.4},{"city": "Iquique","lat": -20.217,"lng": -70.15}],[{"city": "Calama","lat": -22.467,"lng": -68.933}],[{"city": "Asunción","lat": -25.267,"lng": -57.667},{"city": "Campo Grande","lat": -20.433,"lng": -54.633},{"city": "Ciudad del Este","lat": -25.417,"lng": -54.617},{"city": "Assis","lat": -22.65,"lng": -50.4}],[{"city": "São Paulo","lat": -23.55,"lng": -46.633},{"city": "Rio de Janeiro","lat": -22.9,"lng": -43.233},{"city": "Vitória","lat": -20.317,"lng": -40.333}],[],[],[],[],[],[],[{"city": "Gaborone","lat": -24.65,"lng": 25.9},{"city": "Bloemfontein","lat": -29.1,"lng": 26.217},{"city": "Francistown","lat": -21.167,"lng": 27.5},{"city": "Johannesburg","lat": -26.2,"lng": 28.033},{"city": "Pretoria","lat": -25.733,"lng": 28.183}],[{"city": "Durban","lat": -29.883,"lng": 31.05},{"city": "Lobamba","lat": -26.467,"lng": 31.2},{"city": "Maputo","lat": -25.967,"lng": 32.583}],[],[{"city": "Saint-Denis","lat": -20.867,"lng": 55.45},{"city": "Port Louis","lat": -20.167,"lng": 57.5}],[],[],[],[],[],[{"city": "Port Hedland","lat": -20.3,"lng": 118.6}],[],[],[],[{"city": "Rockhampton","lat": -23.367,"lng": 150.5},{"city": "Brisbane","lat": -27.467,"lng": 153.017}],[{"city": "Kingston","lat": -29.067,"lng": 167.967},{"city": "Nouméa","lat": -22.267,"lng": 166.45}]]
,[[{"city": "Apia","lat": -13.833,"lng": -171.833},{"city": "Pago Pago","lat": -14.267,"lng": -170.7}],[{"city": "Alofi","lat": -19.05,"lng": -169.917}],[],[{"city": "Papeete","lat": -17.533,"lng": -149.567}],[],[],[],[],[],[],[{"city": "Lima","lat": -12.033,"lng": -77.017},{"city": "Cusco","lat": -13.5,"lng": -71.967},{"city": "Maracaibo","lat": -10.65,"lng": -71.633},{"city": "Arequipa","lat": -16.4,"lng": -71.533}],[{"city": "Rio Branco","lat": -10.117,"lng": -69.35},{"city": "La Paz","lat": -16.5,"lng": -68.15},{"city": "Santa Cruz de la Sierra","lat": -17.8,"lng": -63.167}],[{"city": "Cuiabá","lat": -15.583,"lng": -56.083}],[{"city": "Brasília","lat": -15.8,"lng": -47.9}],[{"city": "Ilhéus","lat": -14.783,"lng": -39.05}],[],[],[{"city": "Jamestown","lat": -15.917,"lng": -5.733}],[],[],[{"city": "Livingstone","lat": -17.85,"lng": 25.867},{"city": "Lubumbashi","lat": -11.667,"lng": 27.467},{"city": "Lusaka","lat": -15.417,"lng": 28.283},{"city": "Ndola","lat": -12.967,"lng": 28.633}],[{"city": "Harare","lat": -17.817,"lng": 31.05},{"city": "Lilongwe","lat": -13.983,"lng": 33.783},{"city": "Blantyre","lat": -15.783,"lng": 35}],[{"city": "Moroni","lat": -11.75,"lng": 43.2},{"city": "Mamoudzou","lat": -12.783,"lng": 45.217},{"city": "Antananarivo","lat": -18.933,"lng": 47.517}],[],[],[],[],[],[],[],[],[{"city": "Darwin","lat": -12.45,"lng": 130.833}],[{"city": "Cairns","lat": -16.917,"lng": 145.767},{"city": "Townsville","lat": -19.25,"lng": 146.817}],[],[{"city": "Port Vila","lat": -17.75,"lng": 168.3}]]
,[[],[],[],[],[],[],[],[],[],[],[{"city": "Iquitos","lat": -3.733,"lng": -73.25}],[{"city": "Porto Velho","lat": -8.75,"lng": -63.9},{"city": "Manaus","lat": -3.1,"lng": -60.017}],[],[],[{"city": "Fortaleza","lat": -3.767,"lng": -38.567},{"city": "Maceió","lat": -9.65,"lng": -35.717},{"city": "Recife","lat": -8.067,"lng": -34.867}],[],[],[],[],[{"city": "Luanda","lat": -8.833,"lng": 13.233},{"city": "Kinshasa","lat": -4.317,"lng": 15.317}],[{"city": "Bujumbura","lat": -3.383,"lng": 29.367}],[{"city": "Mwanza","lat": -2.517,"lng": 32.9},{"city": "Nairobi","lat": -1.283,"lng": 36.817},{"city": "Zanzibar City","lat": -6.167,"lng": 39.2},{"city": "Dar es Salaam","lat": -6.817,"lng": 39.267}],[],[{"city": "Victoria","lat": -4.617,"lng": 55.45}],[],[],[],[],[{"city": "Padang","lat": -0.95,"lng": 100.35},{"city": "Palembang","lat": -2.983,"lng": 104.75},{"city": "Jakarta","lat": -6.133,"lng": 106.75},{"city": "Bogor","lat": -6.6,"lng": 106.8}],[{"city": "Semarang","lat": -6.967,"lng": 110.417},{"city": "Malang","lat": -7.967,"lng": 112.617},{"city": "Surabaya","lat": -7.233,"lng": 112.733},{"city": "Balikpapan","lat": -1.25,"lng": 116.817}],[{"city": "Dili","lat": -8.55,"lng": 125.583},{"city": "Ambon","lat": -3.7,"lng": 128.167}],[],[{"city": "Jayapura","lat": -2.533,"lng": 140.717},{"city": "Port Moresby","lat": -9.467,"lng": 147.167}],[{"city": "Honiara","lat": -9.433,"lng": 159.95}],[{"city": "Yaren District","lat": -0.55,"lng": 166.917}]]
,[[],[],[],[],[],[],[],[],[],[{"city": "San José","lat": 9.933,"lng": -84.083}],[{"city": "Panama City","lat": 8.983,"lng": -79.517},{"city": "Quito","lat": 0.25,"lng": -78.583},{"city": "Medellín","lat": 6.233,"lng": -75.567},{"city": "Bogotá","lat": 4.6,"lng": -74.067}],[{"city": "Boa Vista","lat": 2.817,"lng": -60.65}],[{"city": "Paramaribo","lat": 5.867,"lng": -55.167},{"city": "Cayenne","lat": 4.917,"lng": -52.317},{"city": "Macapá","lat": 0.033,"lng": -51.05}],[{"city": "Belém","lat": 1.467,"lng": -48.483}],[],[],[{"city": "Rabi Island","lat": 3.133,"lng": -12.05},{"city": "Conakry","lat": 9.517,"lng": -13.7},{"city": "Freetown","lat": 8.467,"lng": -13.267},{"city": "Monrovia","lat": 6.317,"lng": -10.767}],[{"city": "Yamoussoukro","lat": 6.817,"lng": -5.283},{"city": "Abidjan","lat": 5.333,"lng": -4.017},{"city": "Tamale","lat": 9.4,"lng": -0.85},{"city": "Accra","lat": 5.55,"lng": -0.2}],[{"city": "Lomé","lat": 6.133,"lng": 1.2},{"city": "Lagos","lat": 6.45,"lng": 3.383},{"city": "São Tomé","lat": 0.333,"lng": 6.683},{"city": "Libreville","lat": 0.383,"lng": 9.45},{"city": "Douala","lat": 4.05,"lng": 9.7}],[{"city": "Yaoundé","lat": 3.867,"lng": 11.517},{"city": "Bangui","lat": 4.35,"lng": 18.583}],[],[{"city": "Addis Ababa","lat": 9.017,"lng": 38.733}],[{"city": "Hargeisa","lat": 9.5,"lng": 44},{"city": "Mogadishu","lat": 2.033,"lng": 45.35}],[],[],[{"city": "Malé","lat": 4.167,"lng": 73.5},{"city": "Colombo","lat": 6.883,"lng": 79.867},{"city": "Sri Jayawardenapura-Kotte","lat": 6.9,"lng": 79.883}],[{"city": "Kandy","lat": 7.283,"lng": 80.633},{"city": "Batticaloa","lat": 7.717,"lng": 81.7}],[{"city": "Banda Aceh","lat": 5.55,"lng": 95.317},{"city": "Medan","lat": 3.583,"lng": 98.667},{"city": "Phuket (city)","lat": 7.883,"lng": 98.4},{"city": "Surat Thani","lat": 9.133,"lng": 99.333}],[{"city": "George Town","lat": 5.417,"lng": 100.317},{"city": "Kuala Lumpur","lat": 3.133,"lng": 101.683},{"city": "Kota Bharu","lat": 6.133,"lng": 102.25},{"city": "Malacca Town","lat": 2.183,"lng": 102.383},{"city": "Singapore","lat": 1.367,"lng": 103.8}],[{"city": "Kuching","lat": 1.55,"lng": 110.35},{"city": "Miri","lat": 4.383,"lng": 113.967},{"city": "Kota Kinabalu","lat": 5.967,"lng": 116.083}],[{"city": "Zamboanga City","lat": 6.9,"lng": 122.067},{"city": "Tagbilaran","lat": 9.65,"lng": 123.85},{"city": "Davao City","lat": 7.5,"lng": 126}],[{"city": "Koror","lat": 7.35,"lng": 134.467},{"city": "Melekeok","lat": 7.5,"lng": 134.617}],[],[{"city": "Weno","lat": 7.45,"lng": 151.85},{"city": "Palikir","lat": 6.917,"lng": 158.183}],[]]
,[[],[],[{"city": "Hilo","lat": 19.7,"lng": -155.1}],[],[],[],[],[],[{"city": "Mexico City","lat": 19.4,"lng": -99.117},{"city": "Puebla","lat": 19.05,"lng": -98.2},{"city": "Veracruz","lat": 19.183,"lng": -96.133},{"city": "Guatemala City","lat": 14.633,"lng": -90.55}],[{"city": "San Salvador","lat": 13.683,"lng": -89.183},{"city": "Belize City","lat": 17.483,"lng": -88.183},{"city": "Tegucigalpa","lat": 14.083,"lng": -87.217},{"city": "Managua","lat": 12.133,"lng": -86.25}],[{"city": "Cartagena","lat": 10.4,"lng": -75.5},{"city": "Port-au-Prince","lat": 18.533,"lng": -72.333},{"city": "Oranjestad","lat": 12.517,"lng": -70.033}],[{"city": "Santo Domingo","lat": 18.483,"lng": -69.917},{"city": "Caracas","lat": 10.5,"lng": -66.917},{"city": "San Juan","lat": 18.45,"lng": -66.067},{"city": "Kingstown","lat": 13.167,"lng": -61.233},{"city": "Fort-de-France","lat": 14.6,"lng": -61.083}],[{"city": "Bridgetown","lat": 13.083,"lng": -59.617}],[],[],[{"city": "Praia","lat": 14.917,"lng": -23.517}],[{"city": "Dakar","lat": 14.683,"lng": -17.433},{"city": "Thiès","lat": 14.833,"lng": -17.1},{"city": "Brikama","lat": 13.267,"lng": -16.65},{"city": "Nouakchott","lat": 18.1,"lng": -15.95},{"city": "Bissau","lat": 11.85,"lng": -15.583}],[{"city": "Bamako","lat": 12.65,"lng": -8},{"city": "Koulikoro","lat": 12.983,"lng": -7.567},{"city": "Timbuktu","lat": 16.767,"lng": -3},{"city": "Ouagadougou","lat": 12.35,"lng": -1.533}],[{"city": "Niamey","lat": 13.517,"lng": 2.1},{"city": "Kano","lat": 12,"lng": 8.517}],[{"city": "N'Djamena","lat": 12.1,"lng": 15.05}],[],[{"city": "Omdurman","lat": 15.65,"lng": 32.483},{"city": "Khartoum","lat": 15.633,"lng": 32.533},{"city": "Asmara","lat": 15.333,"lng": 38.933}],[{"city": "Djibouti (city)","lat": 11.583,"lng": 43.133},{"city": "Sana'a","lat": 15.35,"lng": 44.2}],[],[],[{"city": "Hyderabad","lat": 17.367,"lng": 78.467},{"city": "Mumbai","lat": 18.95,"lng": 72.817},{"city": "Pune","lat": 18.517,"lng": 73.85},{"city": "Bangalore","lat": 12.967,"lng": 77.567}],[{"city": "Chennai","lat": 13.083,"lng": 80.267}],[{"city": "Port Blair","lat": 11.667,"lng": 92.75},{"city": "Naypyidaw","lat": 19.75,"lng": 96.1},{"city": "Yangon","lat": 16.8,"lng": 96.167},{"city": "Chiang Mai","lat": 18.783,"lng": 98.983}],[{"city": "Bangkok","lat": 13.75,"lng": 100.483},{"city": "Nakhon Ratchasima","lat": 14.967,"lng": 102.1},{"city": "Phnom Penh","lat": 11.55,"lng": 104.917},{"city": "Ho Chi Minh City","lat": 10.767,"lng": 106.683},{"city": "Da Nang","lat": 16.067,"lng": 108.233}],[],[{"city": "Manila","lat": 14.583,"lng": 120.967},{"city": "Iloilo City","lat": 10.683,"lng": 122.55}],[],[{"city": "Dededo","lat": 13.517,"lng": 144.833},{"city": "Saipan","lat": 15.183,"lng": 145.75}],[],[]]
,[[],[],[{"city": "Honolulu","lat": 21.3,"lng": -157.817}],[],[],[],[],[{"city": "Chihuahua","lat": 28.1,"lng": -106},{"city": "Durango","lat": 24.017,"lng": -104.667},{"city": "Guadalajara","lat": 20.667,"lng": -103.35},{"city": "Monterrey","lat": 25.667,"lng": -100.3}],[{"city": "San Antonio","lat": 29.533,"lng": -98.467},{"city": "Houston","lat": 29.75,"lng": -95.367},{"city": "New Orleans","lat": 29.967,"lng": -90.067}],[{"city": "Mérida","lat": 20.967,"lng": -89.617},{"city": "Tampa","lat": 27.967,"lng": -82.467},{"city": "Havana","lat": 23.133,"lng": -82.383},{"city": "Miami","lat": 25.783,"lng": -80.217}],[{"city": "Nassau","lat": 25.05,"lng": -77.333},{"city": "Santiago de Cuba","lat": 20.017,"lng": -75.8},{"city": "Cockburn Town","lat": 21.45,"lng": -71.133}],[],[],[],[],[],[{"city": "Las Palmas de Gran Canaria","lat": 28.133,"lng": -15.433},{"city": "El Aaiún","lat": 27.15,"lng": -13.2}],[],[],[{"city": "Sabha","lat": 27.033,"lng": 14.433}],[],[{"city": "Suez","lat": 29.967,"lng": 32.55},{"city": "Luxor","lat": 25.683,"lng": 32.65},{"city": "Jeddah","lat": 21.533,"lng": 39.167},{"city": "Medina","lat": 24.467,"lng": 39.6},{"city": "Mecca","lat": 21.417,"lng": 39.817}],[{"city": "Riyadh","lat": 24.7,"lng": 46.717},{"city": "Kuwait City","lat": 29.367,"lng": 47.967}],[{"city": "Doha","lat": 25.283,"lng": 51.533},{"city": "Abu Dhabi","lat": 24.467,"lng": 54.367},{"city": "Dubai","lat": 25.267,"lng": 55.3},{"city": "Muscat","lat": 23.6,"lng": 58.533}],[{"city": "Karachi","lat": 24.85,"lng": 67}],[{"city": "Ahmedabad","lat": 23.017,"lng": 72.567},{"city": "Surat","lat": 21.167,"lng": 72.817},{"city": "Jaipur","lat": 26.917,"lng": 75.817},{"city": "New Delhi","lat": 28.617,"lng": 77.2},{"city": "Nagpur","lat": 21.067,"lng": 79.017}],[{"city": "Kanpur","lat": 26.45,"lng": 80.333},{"city": "Kathmandu","lat": 27.7,"lng": 85.333},{"city": "Kolkata","lat": 22.567,"lng": 88.367},{"city": "Shigatse","lat": 29.267,"lng": 88.867}],[{"city": "Dhaka","lat": 23.7,"lng": 90.367},{"city": "Lhasa","lat": 29.65,"lng": 91.117},{"city": "Guwahati","lat": 26.167,"lng": 91.767},{"city": "Chittagong","lat": 22.367,"lng": 91.8},{"city": "Shillong","lat": 25.567,"lng": 91.883}],[{"city": "Kunming","lat": 25.067,"lng": 102.683},{"city": "Hanoi","lat": 21.033,"lng": 105.85},{"city": "Chongqing","lat": 29.55,"lng": 106.5},{"city": "Hai Phong","lat": 20.85,"lng": 106.683}],[{"city": "Guangzhou","lat": 23.1,"lng": 113.267},{"city": "Macau","lat": 22.167,"lng": 113.55},{"city": "Shenzhen","lat": 22.55,"lng": 114.1},{"city": "Hong Kong","lat": 22.3,"lng": 114.2}],[{"city": "Taichung","lat": 24.15,"lng": 120.667},{"city": "Taipei","lat": 25.033,"lng": 121.633},{"city": "Okinawa","lat": 26.333,"lng": 127.8}],[],[],[],[]]
,[[],[],[],[],[],[{"city": "San Francisco","lat": 37.767,"lng": -122.417},{"city": "Sacramento","lat": 38.55,"lng": -121.467}],[{"city": "Los Angeles","lat": 34.05,"lng": -118.25},{"city": "San Diego","lat": 32.767,"lng": -117.15},{"city": "Tijuana","lat": 32.517,"lng": -117.033},{"city": "Mexicali","lat": 32.667,"lng": -115.467},{"city": "Las Vegas","lat": 36.167,"lng": -115.133},{"city": "Phoenix","lat": 33.433,"lng": -112.067}],[{"city": "Albuquerque","lat": 35.1,"lng": -106.6},{"city": "El Paso","lat": 31.783,"lng": -106.417},{"city": "Denver","lat": 39.733,"lng": -104.983}],[{"city": "Austin","lat": 30.267,"lng": -97.767},{"city": "Oklahoma City","lat": 35.467,"lng": -97.533},{"city": "Dallas","lat": 32.767,"lng": -96.8},{"city": "Kansas City","lat": 39.1,"lng": -94.567},{"city": "St. Louis","lat": 38.617,"lng": -90.183}],[{"city": "Memphis","lat": 35.117,"lng": -89.967},{"city": "Nashville","lat": 36.167,"lng": -86.783},{"city": "Indianapolis","lat": 39.783,"lng": -86.15},{"city": "Louisville","lat": 38.25,"lng": -85.75},{"city": "Cincinnati","lat": 39.133,"lng": -84.5},{"city": "Atlanta","lat": 33.75,"lng": -84.383},{"city": "Jacksonville","lat": 30.317,"lng": -81.65}],[{"city": "Raleigh","lat": 35.817,"lng": -78.633},{"city": "Washington","lat": 38.883,"lng": -77.033},{"city": "Baltimore","lat": 39.283,"lng": -76.617},{"city": "Philadelphia","lat": 39.95,"lng": -75.167}],[],[{"city": "Porto Alegre","lat": 30.033,"lng": -51.217}],[],[],[{"city": "Horta (Azores)","lat": 38.533,"lng": -28.633},{"city": "Ponta Delgada","lat": 37.733,"lng": -25.667}],[],[{"city": "Lisbon","lat": 38.7,"lng": -9.183},{"city": "Marrakech","lat": 31.633,"lng": -8},{"city": "Casablanca","lat": 33.533,"lng": -7.583},{"city": "Seville","lat": 37.367,"lng": -5.983},{"city": "Gibraltar","lat": 36.133,"lng": -5.35},{"city": "Málaga","lat": 36.717,"lng": -4.417},{"city": "Valencia","lat": 39.483,"lng": -0.367}],[{"city": "Palma","lat": 39.567,"lng": 2.65},{"city": "Algiers","lat": 36.7,"lng": 3.217}],[{"city": "Tunis","lat": 36.8,"lng": 10.167},{"city": "Tripoli","lat": 32.9,"lng": 13.183},{"city": "Valletta","lat": 35.9,"lng": 14.5}],[{"city": "Athens","lat": 37.967,"lng": 23.717},{"city": "İzmir","lat": 38.433,"lng": 27.15},{"city": "Alexandria","lat": 31.2,"lng": 29.917}],[{"city": "Cairo","lat": 30.05,"lng": 31.217},{"city": "Ankara","lat": 39.867,"lng": 32.833},{"city": "Nicosia","lat": 35.167,"lng": 33.35},{"city": "Tel Aviv","lat": 32.083,"lng": 34.8},{"city": "Jerusalem","lat": 31.783,"lng": 35.217},{"city": "Beirut","lat": 33.883,"lng": 35.5},{"city": "Damascus","lat": 33.5,"lng": 36.283}],[{"city": "Baghdad","lat": 33.317,"lng": 44.417},{"city": "Arbil","lat": 36.333,"lng": 44.017},{"city": "Tabriz","lat": 38.083,"lng": 46.283}],[{"city": "Tehran","lat": 35.683,"lng": 51.417},{"city": "Mashhad","lat": 36.3,"lng": 59.6}],[{"city": "Kandahar","lat": 31.617,"lng": 65.717},{"city": "Kabul","lat": 34.533,"lng": 69.167}],[{"city": "Islamabad","lat": 33.717,"lng": 73.067},{"city": "Lahore","lat": 31.55,"lng": 74.333}],[],[],[{"city": "Lanzhou","lat": 36.033,"lng": 103.8},{"city": "Chengdu","lat": 30.65,"lng": 104.067}],[{"city": "Taiyuan","lat": 37.867,"lng": 112.55},{"city": "Zhengzhou","lat": 34.75,"lng": 113.633},{"city": "Beijing","lat": 39.9,"lng": 116.4},{"city": "Nanjing","lat": 32.05,"lng": 118.767}],[{"city": "Hangzhou","lat": 30.25,"lng": 120.167},{"city": "Shanghai","lat": 31.2,"lng": 121.5},{"city": "Pyongyang","lat": 39.033,"lng": 125.75},{"city": "Seoul","lat": 37.55,"lng": 126.983}],[{"city": "Hiroshima","lat": 34.383,"lng": 132.45},{"city": "Osaka","lat": 34.683,"lng": 135.5},{"city": "Kyoto","lat": 35.017,"lng": 135.767},{"city": "Tokyo","lat": 35.683,"lng": 139.767}],[],[],[]]
,[[],[],[],[],[],[{"city": "Vancouver","lat": 49.25,"lng": -123.1},{"city": "Portland","lat": 45.517,"lng": -122.667},{"city": "Seattle","lat": 47.6,"lng": -122.317}],[{"city": "Salt Lake City","lat": 40.75,"lng": -111.883}],[],[{"city": "Winnipeg","lat": 49.9,"lng": -97.133},{"city": "Minneapolis","lat": 44.967,"lng": -93.25}],[{"city": "Milwaukee","lat": 47.05,"lng": -87.95},{"city": "Chicago","lat": 41.867,"lng": -87.617},{"city": "Detroit","lat": 42.333,"lng": -83.05},{"city": "Cleveland","lat": 41.483,"lng": -81.667}],[{"city": "Toronto","lat": 43.65,"lng": -79.383},{"city": "Ottawa","lat": 45.417,"lng": -75.683},{"city": "New York City","lat": 40.717,"lng": -74},{"city": "Montreal","lat": 45.5,"lng": -73.55},{"city": "Boston","lat": 42.35,"lng": -71.05}],[{"city": "Saint John","lat": 45.267,"lng": -66.05},{"city": "City of Halifax","lat": 44.667,"lng": -63.6},{"city": "Charlottetown","lat": 46.233,"lng": -63.133}],[{"city": "Saint-Pierre","lat": 46.767,"lng": -56.167}],[],[],[],[],[{"city": "Porto","lat": 41.15,"lng": -8.633},{"city": "Madrid","lat": 40.4,"lng": -3.683},{"city": "Bilbao","lat": 43.25,"lng": -2.917}],[{"city": "Barcelona","lat": 41.383,"lng": 2.183},{"city": "Paris","lat": 48.867,"lng": 2.333},{"city": "Lyon","lat": 45.767,"lng": 4.833},{"city": "Marseille","lat": 43.3,"lng": 5.367},{"city": "Geneva","lat": 46.2,"lng": 6.15},{"city": "Monaco","lat": 43.733,"lng": 7.4},{"city": "Strasbourg","lat": 48.583,"lng": 7.75},{"city": "Zurich","lat": 47.367,"lng": 8.55},{"city": "Milan","lat": 45.467,"lng": 9.183}],[{"city": "Munich","lat": 48.133,"lng": 11.567},{"city": "Rome","lat": 41.9,"lng": 12.5},{"city": "Naples","lat": 40.833,"lng": 14.25},{"city": "Ljubljana","lat": 46.067,"lng": 14.5},{"city": "Zagreb","lat": 45.817,"lng": 15.983},{"city": "Vienna","lat": 48.2,"lng": 16.367},{"city": "Sarajevo","lat": 43.85,"lng": 18.35},{"city": "Budapest","lat": 47.467,"lng": 19.05}],[{"city": "Belgrade","lat": 44.817,"lng": 20.45},{"city": "Thessaloniki","lat": 40.633,"lng": 22.95},{"city": "Sofia","lat": 42.7,"lng": 23.333},{"city": "Bucharest","lat": 44.433,"lng": 26.1},{"city": "Istanbul","lat": 41,"lng": 28.967}],[{"city": "Odessa","lat": 46.467,"lng": 30.733}],[{"city": "Yerevan","lat": 40.183,"lng": 44.517},{"city": "Tbilisi","lat": 41.717,"lng": 44.783}],[{"city": "Nukus","lat": 42.467,"lng": 59.6}],[{"city": "Tashkent","lat": 41.267,"lng": 69.217}],[{"city": "Namangan","lat": 41.633,"lng": 71.967},{"city": "Almaty","lat": 43.267,"lng": 76.883}],[],[],[{"city": "Ulan Bator","lat": 47.917,"lng": 106.917}],[],[{"city": "Shenyang","lat": 41.783,"lng": 123.45},{"city": "Changchun","lat": 43.883,"lng": 125.317},{"city": "Harbin","lat": 45.75,"lng": 126.633},{"city": "Chongjin","lat": 41.8,"lng": 129.783}],[{"city": "Vladivostok","lat": 43.133,"lng": 131.9}],[{"city": "Sapporo","lat": 43.067,"lng": 141.35}],[],[]]
,[[{"city": "Adak","lat": 51.883,"lng": -176.633}],[],[],[],[{"city": "Sitka","lat": 57.05,"lng": -135.317},{"city": "Juneau","lat": 58.35,"lng": -134.5}],[],[{"city": "Calgary","lat": 51.033,"lng": -114.05},{"city": "Edmonton","lat": 53.567,"lng": -113.517}],[{"city": "Saskatoon","lat": 52.117,"lng": -106.65},{"city": "Regina","lat": 50.433,"lng": -104.617}],[],[],[],[{"city": "Puerto Williams","lat": 54.933,"lng": -67.617}],[{"city": "Stanley","lat": 51.683,"lng": -57.85}],[],[],[],[],[{"city": "Dublin","lat": 53.333,"lng": -6.267},{"city": "Belfast","lat": 54.6,"lng": -5.917},{"city": "Edinburgh","lat": 55.95,"lng": -3.15},{"city": "Manchester","lat": 53.467,"lng": -2.233},{"city": "London","lat": 51.5,"lng": -0.117}],[{"city": "Brussels","lat": 50.833,"lng": 4.35},{"city": "Rotterdam","lat": 51.933,"lng": 4.467},{"city": "Amsterdam","lat": 52.367,"lng": 4.883},{"city": "Frankfurt","lat": 50.1,"lng": 8.683}],[{"city": "Oslo","lat": 59.95,"lng": 10.75},{"city": "Copenhagen","lat": 55.667,"lng": 12.567},{"city": "Berlin","lat": 52.517,"lng": 13.417},{"city": "Prague","lat": 50.083,"lng": 14.417},{"city": "Stockholm","lat": 59.35,"lng": 18.067}],[{"city": "Warsaw","lat": 52.233,"lng": 21},{"city": "Riga","lat": 56.967,"lng": 24.133},{"city": "Tallinn","lat": 59.433,"lng": 24.75},{"city": "Vilnius","lat": 54.683,"lng": 25.283}],[{"city": "Saint Petersburg","lat": 59.933,"lng": 30.333},{"city": "Kiev","lat": 50.45,"lng": 30.517},{"city": "Moscow","lat": 55.75,"lng": 37.6}],[],[{"city": "Samara","lat": 53.233,"lng": 50.167},{"city": "Perm","lat": 58,"lng": 56.317}],[],[{"city": "Astana","lat": 51.183,"lng": 71.45},{"city": "Omsk","lat": 54.983,"lng": 73.367}],[{"city": "Novosibirsk","lat": 55.017,"lng": 82.933}],[],[{"city": "Bratsk","lat": 56.167,"lng": 101.617}],[],[],[],[],[{"city": "Magadan","lat": 59.567,"lng": 150.8},{"city": "Petropavlovsk-Kamchatsky","lat": 53.017,"lng": 158.65}],[]]
,[[],[],[],[{"city": "Anchorage","lat": 61.217,"lng": -149.883},{"city": "Fairbanks","lat": 64.833,"lng": -147.7}],[],[],[{"city": "Yellowknife","lat": 62.45,"lng": -114.4}],[],[],[],[],[{"city": "Iqaluit","lat": 63.75,"lng": -68.517}],[{"city": "Nuuk","lat": 64.167,"lng": -51.75}],[],[],[{"city": "Reykjavík","lat": 64.133,"lng": -21.933}],[],[{"city": "Tórshavn","lat": 62,"lng": -6.783}],[{"city": "Bergen","lat": 60.367,"lng": 5.4}],[],[{"city": "Tampere","lat": 61.5,"lng": 23.75},{"city": "Helsinki","lat": 60.167,"lng": 24.933}],[],[],[],[],[],[{"city": "Norilsk","lat": 69.35,"lng": 88.2}],[],[],[],[{"city": "Yakutsk","lat": 62.033,"lng": 129.733}],[],[],[],[]]
,[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[{"city": "Longyearbyen","lat": 78.217,"lng": 15.55}],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
];
/* eslint-enable */

const THREE = require('three');
/* number of visible cities */
const NUM_LABELS = 12;

class CityLabels {
  constructor(scene, camera, radius) {
    this.cityLabels = [];
    this.rotationIndex = 0;
    this.camera = camera;
    this.scene = scene;
    this.radius = radius;
    this.fpsCount = 0;
    this.indexList = [];
    for (let i = 0; i < NUM_LABELS; i += 1) {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.001, 5, 5),
        new THREE.MeshBasicMaterial({ color: 0xffffff }));
      scene.add(sphere);
      const label = new THREELabel(scene, camera, 'Colfax-Medium', 11, 'rgba(30,30,30,0)', 'rgba(255,255,255,1)', sphere);
      this.cityLabels.push(label);
    }
  }

  updatePosition() {
    _.each(this.cityLabels, (l) => { l.updatePosition(); });
  }

  setVisible(visible) {
    _.each(this.cityLabels, (l) => { l.setVisible(visible); });
  }

  setScale(t) {
    _.each(this.cityLabels, (l) => { l.setScale(t); });
  }

  /**
   * Updates the visible cities every 30 frames.
   * @param {Vec3} position
   * explorer 3d position
   */
  update(position) {
    if (this.fpsCount > 30) {
      const coord = Util.XYZ2LatLon(position);
      this.get(coord);
      if (this.cityList.length > 0) {
        this.rotationIndex = this.rotationIndex % this.cityLabels.length;
        this.cityLabels[this.rotationIndex].setCity(this.cityList[0]);
        this.rotationIndex += 1;
        this.cityList.shift();
      }
      this.fpsCount = 0;
    }
    this.fpsCount += 1;
  }

  /**
   * Mapping lat lng coordinates to city tile array position
   * @param {Object} coord
   */
  static getNormalisedCoordinates(coord) {
    return {
      lat: Math.max(0, Math.min(city_tiles.length - 1, (coord.lat + 90) / 10)),
      lng: Math.max(0, Math.min(city_tiles[0].length - 1, (((coord.lng) + 180) % 360) / 10)),
    };
  }

  /**
   * Fill the cityList array with the closest cities. It also get cities from close tiles.
   * @param {Object} coord
   */
  get(coord) {
    const c = CityLabels.getNormalisedCoordinates(coord);
    // console.log(c);
    const lat = Math.floor(c.lat);
    const lng = Math.floor(c.lng);
    if (lat !== this.lastLat || this.lastLng !== lng) {
      this.cityList = [];
      const box = {
        minLat: Math.max(0, Math.floor(c.lat - 0.5)),
        maxLat: Math.min(city_tiles.length - 1, Math.floor(c.lat + 0.5)),
        minLng: Math.max(0, Math.floor(c.lng - 0.5)),
        maxLng: Math.min(city_tiles[0].length - 1, Math.floor(c.lng + 0.5)),
      };
      const tmpIndexList = [];
      for (let y = box.minLat; y <= box.maxLat; y += 1) {
        for (let x = box.minLng; x <= box.maxLng; x += 1) {
          const index = (y * 36) + x;
          if (this.indexList.indexOf(index) < 0) {
            // this.cityList.concat(list[y][x]);
            for (let i = 0; i < city_tiles[y][x].length; i += 1) {
              this.cityList.push(city_tiles[y][x][i]);
            }
            tmpIndexList.push(index);
          }
        }
      }
      this.indexList = tmpIndexList;
    }
    this.lastLat = lat;
    this.lastLng = lng;
    return this.cityList;
  }
}
export default CityLabels;
