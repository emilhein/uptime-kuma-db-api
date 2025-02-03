CREATE TABLE IF NOT EXISTS monitor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  active TINYINT(1) DEFAULT 1,
  push_token VARCHAR(255),
  -- Add other columns from your actual schema
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);