

# Qredit Explorer QSLP

Requires:

Install Node:
```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install PM2
```
npm install -g pm2
```

Install packages
```
npm install
```

Update the datafiles (optional, but recommended)

Run cd node_modules/geoip-lite && npm run-script updatedb license_key=YOUR_LICENSE_KEY to update the data files. (Replace YOUR_LICENSE_KEY with your license key obtained from maxmind.com)

Start the program:
```
pm2 start app.js
```

