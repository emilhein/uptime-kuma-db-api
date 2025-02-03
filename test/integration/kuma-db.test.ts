import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';
const  UptimeKumaDB  = require('../../src/index');
require('dotenv').config();

describe('UptimeKumaDB Integration Tests', () => {
    let db: any;
    // let testMonitorId: number;

    beforeAll(async () => {
        db = new UptimeKumaDB({
            host: process.env.DB_HOST!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_NAME!,
            port: parseInt(process.env.DB_PORT || '3306')
        });
    });

    afterAll(async () => {
        await db.close();
    });

    // test('should create and manage monitors', async () => {
    //     // Create
    //     const monitor = await db.createMonitor({
    //         name: 'TypeScript Test Monitor'
    //     });
    //     testMonitorId = monitor.id;

    //     // Verify creation
    //     expect(monitor).toHaveProperty('id');
    //     expect(monitor.name).toBe('TypeScript Test Monitor');

    //     // List
    //     const monitors = await db.getMonitors();
    //     expect(monitors.some((m: { id: number; }) => m.id === testMonitorId)).toBe(true);

    //     // Delete
    //     const deleteResult = await db.deleteMonitor(testMonitorId);
    //     expect(deleteResult).toBe(true);
    // });

    test('should handle invalid monitor creation', async () => {
        await expect(db.createMonitor({} as any))
            .rejects
            .toThrow('Invalid name');
    });
});