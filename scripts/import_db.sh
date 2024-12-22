#!/bin/bash

# 修复备份文件
python3 scripts/fix_mysql_backup.py

# 删除并重建数据库
mysql -u root -p <<-EOSQL
DROP DATABASE IF EXISTS blog_demo;
CREATE DATABASE blog_demo;
EOSQL

# 导入修复后的备份
mysql -u root -p blog_demo < blog_demo_backup_fixed.sql

# 验证导入
mysql -u root -p <<-EOSQL
USE blog_demo;
SELECT COUNT(*) FROM User;
SELECT COUNT(*) FROM Post;
SELECT COUNT(*) FROM Category;
EOSQL