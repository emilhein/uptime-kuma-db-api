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



## Available Methods

### `getMonitors()`

Retrieves all monitors from the database.

**Returns:**
- `Promise<Array>` - An array of monitor objects.

### `getMonitor(id)`

Retrieves a monitor by its ID.

**Parameters:**
- `id` (number) - The ID of the monitor.

**Returns:**
- `Promise<Object>` - The monitor object if found.

### `createMonitor(monitorData)`

Creates a new monitor.

**Parameters:**
- `monitorData` (object) - The data for the new monitor.
  - `name` (string) - Name of the monitor.
  - `push_token` (string, optional) - Push token. If not provided, a random token will be generated.

**Returns:**
- `Promise<Object>` - The created monitor object.

### `deleteMonitor(id)`

Deletes a monitor by its ID.

**Parameters:**
- `id` (number) - The ID of the monitor to delete.

**Returns:**
- `Promise<boolean>` - `true` if the monitor was deleted successfully.

### `startMonitor(id)`

Activates a monitor by its ID.

**Parameters:**
- `id` (number) - The ID of the monitor.

**Returns:**
- `Promise<boolean>` - `true` if the monitor was successfully started.

### `pauseMonitor(id)`

Pauses a monitor by its ID.

**Parameters:**
- `id` (number) - The ID of the monitor.

**Returns:**
- `Promise<boolean>` - `true` if the monitor was successfully paused.

### `createMonitorNotificationAssositation(params)`

Associates a notification with a monitor.

**Parameters:**
- `params` (object) -
  - `monitor_id` (number) - ID of the monitor.
  - `notification_id` (number) - ID of the notification.

**Returns:**
- `Promise<Object>` - The created association.

### `createMonitorTagAssositation(params)`

Associates a tag with a monitor.

**Parameters:**
- `params` (object) -
  - `monitor_id` (number) - ID of the monitor.
  - `tag_id` (number) - ID of the tag.
  - `value` (string) - Value of the tag.

**Returns:**
- `Promise<Object>` - The created association.

### `createTag(params)`

Creates a new tag.

**Parameters:**
- `params` (object) -
  - `name` (string) - Name of the tag.

**Returns:**
- `Promise<Object>` - The created tag object.

### `customQuery(query)`

Executes a custom SQL query.

**Parameters:**
- `query` (string) - The SQL query to execute.

**Returns:**
- `Promise<Array>` - Result set of the query.

### `close()`

Closes the database connection.

**Returns:**
- `Promise<void>`

## Considerations

- **Direct Database Modifications:** Interacting directly with the database can cause inconsistencies, especially if Uptime Kuma is running simultaneously.
- **No Official API:** This library fills the gap due to the absence of an official Uptime Kuma API.

## License

MIT License
