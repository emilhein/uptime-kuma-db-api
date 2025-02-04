const mysql = require('mysql2');
// @ts-ignore

const crypto = require('crypto');

class UptimeKumaDB {
  pool: any;
  config: any;
  constructor(config: any) {
    this.config = config;
    this.pool = mysql.createPool(config).promise();
  }

  async getMonitors() {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM monitor');
      return rows;
    } finally {
      connection.release();
    }
  }
  async getMonitor(id: number) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT * FROM monitor WHERE id = ${id}`);


      return rows;
    } finally {
      connection.release();
    }
  }

  async createMonitorNotificationAssositation(params: { monitor_id: number, notification_id: number }) {
    if (!params.monitor_id || !params.notification_id) {
      throw new Error('Missing notification and/or monitorid');
    }
    const connection = await this.pool.getConnection();
    try {
      const query = `INSERT INTO monitor_notification SET ?`;
      const [result] = await connection.query(query, params);
      return { id: result.insertId, ...params };
    } finally {
      connection.release();
    }
  }
  async createMonitorTagAssositation(params: { monitor_id: number, tag_id: number, value: string }) {
    if (!params.monitor_id || !params.tag_id) {
      throw new Error('Missing tag and/or monitorid');
    }
    const defaultValues = { value: '' };
    const finalParams = { ...defaultValues, ...params };
    const connection = await this.pool.getConnection();
    try {
      const query = `INSERT INTO monitor_tag SET ?`;
      const [result] = await connection.query(query, finalParams);
      return { id: result.insertId, ...finalParams };
    } finally {
      connection.release();
    }
  }
  async createTag(params: { name: string }) {
    if (!params.name || typeof params.name !== 'string') {
      throw new Error('Invalid name');
    }

    const defaultValues = { color: '#2563EB' };
    const finalParams = { ...defaultValues, ...params };
    const connection = await this.pool.getConnection();
    try {
      const query = `INSERT INTO tag SET ?`;
      const [result] = await connection.query(query, finalParams);
      return { id: result.insertId, ...finalParams };
    } finally {
      connection.release();
    }
  }

  async createMonitor(params: { name: any; push_token: any; }) {
    // Validate required parameters
    if (!params.name || typeof params.name !== 'string') {
      throw new Error('Invalid name');
    }

    // Generate a random push token if not provided
    // @ts-ignore
    params.push_token = params.push_token || crypto.randomBytes(16).toString('hex');

    // Set default values for optional fields if not provided
    const defaultValues = {
      active: 1,
      user_id: 1,
      interval: 60,
      url: 'https://',
      type: 'push',
      weight: 2000,
      hostname: null,
      port: null,
      keyword: null,
      maxretries: 0,
      ignore_tls: 0,
      upside_down: 0,
      maxredirects: 10,
      accepted_statuscodes_json: '["200-299"]',
      dns_resolve_type: 'A',
      dns_resolve_server: '1.1.1.1',
      dns_last_result: null,
      retry_interval: 60,
      method: 'GET',
      body: null,
      headers: null,
      basic_auth_user: null,
      basic_auth_pass: null,
      docker_host: null,
      docker_container: '',
      proxy_id: null,
      expiry_notification: 0,
      mqtt_topic: '',
      mqtt_success_message: '',
      mqtt_username: '',
      mqtt_password: '',
      database_connection_string: null,
      database_query: null,
      auth_method: null,
      auth_domain: null,
      auth_workstation: null,
      grpc_url: null,
      grpc_protobuf: null,
      grpc_body: null,
      grpc_metadata: null,
      grpc_method: null,
      grpc_service_name: null,
      grpc_enable_tls: 0,
      radius_username: null,
      radius_password: null,
      radius_calling_station_id: null,
      radius_called_station_id: null,
      radius_secret: null,
      resend_interval: 0,
      packet_size: 56,
      game: null,
      http_body_encoding: null,
      description: null,
      tls_ca: null,
      tls_cert: null,
      tls_key: null,
      parent: 1,
      invert_keyword: 0,
      json_path: '$',
      expected_value: null,
      kafka_producer_topic: null,
      kafka_producer_brokers: '[]',
      kafka_producer_ssl: 0,
      kafka_producer_allow_auto_topic_creation: 0,
      kafka_producer_sasl_options: '{"mechanism":"None"}',
      kafka_producer_message: null,
      oauth_client_id: null,
      oauth_client_secret: null,
      oauth_token_url: null,
      oauth_scopes: null,
      oauth_auth_method: 'client_secret_basic',
      timeout: 48,
      gamedig_given_port_only: 1,
      mqtt_check_type: 'keyword',
      remote_browser: null,
      snmp_oid: null,
      snmp_version: '2c',
      json_path_operator: '==',
      cache_bust: 0,
      conditions: '[]',
      rabbitmq_nodes: '[]',
      rabbitmq_username: '',
      rabbitmq_password: ''
    };

    const finalParams = { ...defaultValues, ...params };

    const connection = await this.pool.getConnection();
    try {
      const query = `INSERT INTO monitor SET ?`;
      const [result] = await connection.query(query, finalParams);
      return { id: result.insertId, ...finalParams };
    } finally {
      connection.release();
    }
  }

  async deleteMonitor(id: number) {
    const connection = await this.pool.getConnection();
    try {
      const query = `DELETE FROM monitor WHERE id = ?`;
      const [result] = await connection.execute(query, [id]);
      return result.affectedRows > 0;
    } finally {
      connection.release();
    }
  }

  async startMonitor(id: number) {
    const connection = await this.pool.getConnection();
    try {
      const query = `UPDATE monitor SET active = 1 WHERE id = ?`;
      const [result] = await connection.execute(query, [id]);
      return result.affectedRows > 0;
    } finally {
      connection.release();
    }
  }

  async pauseMonitor(id: number) {
    const connection = await this.pool.getConnection();
    try {
      const query = `UPDATE monitor SET active = 0 WHERE id = ?`;
      const [result] = await connection.execute(query, [id]);
      return result.affectedRows > 0;
    } finally {
      connection.release();
    }
  }
  async customQuery(query: string) {
    const connection = await this.pool.getConnection();
    try {
        const [result] = await connection.execute(query);
        return result.affectedRows > 0;
    } finally {
        connection.release();
    }
}

  async close() {
    await this.pool.end();
  }
}

module.exports = UptimeKumaDB;