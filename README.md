# Live Stream - web service

[![Created Badge](https://badges.pufler.dev/created/libersoft-org/live-stream)](https://badges.pufler.dev) [![Updated Badge](https://badges.pufler.dev/updated/libersoft-org/live-stream)](https://badges.pufler.dev) [![Visits Badge](https://badges.pufler.dev/visits/libersoft-org/live-stream)](https://badges.pufler.dev)

## Development state

- Early stage, not completed

## License

- This software is developed under the license called [**Unlicense**](./LICENSE).

## Installation instructions

These are the installation instruction for **Debian Linux**:

1. Install system dependencies

```bash
apt update
apt -y upgrade
apt -y install git nginx nodejs npm
```

2. Download the latest version of this software:

```bash
git clone https://github.com/libersoft-org/live-stream.git
```

3. Set the NGINX web root folder of the web to **/root/live-stram/src/web** folder

4. Restart the NGINX server

```bash
service nginx restart
```

5. Create a **tmp** directory for unix socket

```bash
cd /root/live-stream/src/
mkdir tmp
```

6. Install Node.js dependencies

```bash
npm i
```

7. Create a **settings** and **database** files
```bash
node live.js --create-settings
node live.js --create-database
```

8. Start the **Live Stream Server**

```bash
node live.js
```

9. Open the web browser and navigate to your website

## Donations

Donations are important to support the ongoing development and maintenance of our open source projects. Your contributions help us cover costs and support our team in improving our software. We appreciate any support you can offer.

To find out how to donate our projects, please navigate here:

[![Donate](https://raw.githubusercontent.com/libersoft-org/documents/main/donate.png)](https://libersoft.org/donations)

Thank you for being a part of our projects' success!

## Star history

[![Star History Chart](https://api.star-history.com/svg?repos=libersoft-org/live-stream&type=Date)](https://star-history.com/#libersoft-org/live-stream&Date)
