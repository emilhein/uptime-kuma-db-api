const UptimeKumaDB = require('../../src/index');
require('dotenv').config();

describe('UptimeKumaDB Integration Tests', () => {
  let db;
  let testMonitorId;

  beforeAll(async () => {
    db = new UptimeKumaDB({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
  });

  afterAll(async () => {
    await db.close();
  });

  test('should create a new monitor', async () => {
    const monitor = await db.createMonitor({
      name: 'Test Monitor'
    });
    
    testMonitorId = monitor.id;
    expect(monitor).toMatchObject({
      id: expect.any(Number),
      name: 'Test Monitor',
      active: 1
    });
  });

  test('should retrieve monitors', async () => {
    const monitors = await db.getMonitors();
    expect(monitors.length).toBeGreaterThanOrEqual(1);
    expect(monitors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: testMonitorId,
          name: 'Test Monitor'
        })
      ])
    );
  });

  test('should update monitor status', async () => {
    const pauseSuccess = await db.pauseMonitor(testMonitorId);
    expect(pauseSuccess).toBe(true);

    const startSuccess = await db.startMonitor(testMonitorId);
    expect(startSuccess).toBe(true);
  });

  test('should delete a monitor', async () => {
    const deleteSuccess = await db.deleteMonitor(testMonitorId);
    expect(deleteSuccess).toBe(true);
  });

  test('should handle invalid monitor creation', async () => {
    await expect(db.createMonitor({}))
      .rejects
      .toThrow('Invalid name');
  });
});