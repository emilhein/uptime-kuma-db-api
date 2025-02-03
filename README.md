# Uptime Kuma Database Client

[![npm version](https://img.shields.io/npm/v/uptime-kuma-db.svg)](https://www.npmjs.com/package/uptime-kuma-db)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

Unofficial Node.js client for interacting with Uptime Kuma's MariaDB database. Manage monitors directly through the database.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   - [Basic Setup](#basic-setup)


---

## Installation

```bash
npm install uptime-kuma-db
```

## Usage

### Basic seup

```js
const UptimeKumaDB = require('uptime-kuma-db');
async function manageMonitors() {
    const db = new UptimeKumaDB({
      host: 'localhost',
      user: 'kuma_user',
      password: 'kuma_password',
      database: 'kuma_db',
      port: 3306 // Default
    });
  
  try {
    // Create monitor
    const monitor = await db.createMonitor({
      name: 'API Status',
      type: 'http',
      url: 'https://api.example.com',
      interval: 30
    });

    // List monitors
    const allMonitors = await db.getMonitors();
    console.log('Monitors:', allMonitors);

    // Pause/Start
    await db.pauseMonitor(monitor.id);
    await db.startMonitor(monitor.id);

    // Delete
    await db.deleteMonitor(monitor.id);
  } finally {
    await db.close();
  }
}
```



### Example
