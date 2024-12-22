import re

def fix_mysql_backup(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 表名映射
    tables_mapping = {
        '_bookmarktotag': '_BookmarkToTag',
        '_posttotag': '_PostToTag',
        '_prisma_migrations': '_prisma_migrations',
        '_recipetotag': '_RecipeToTag',
        'bookmark': 'Bookmark',
        'bookmarkcategory': 'BookmarkCategory',
        'category': 'Category',
        'ingredient': 'Ingredient',
        'nutrition': 'Nutrition',
        'post': 'Post',
        'recipe': 'Recipe',
        'tag': 'Tag',
        'tagcategory': 'TagCategory',
        'unit': 'Unit',
        'user': 'User',
        'viewhistory': 'ViewHistory'
    }
    
    # 2. 分离创建表语句和插入数据语句
    create_tables = []
    insert_data = {}  # 使用字典存储每个表的插入语句
    current_block = []
    in_create_table = False
    current_table = None
    
    for line in content.split('\n'):
        if line.strip().startswith('CREATE TABLE'):
            in_create_table = True
            current_block = [line]
            # 提取当前表名
            match = re.search(r'CREATE TABLE (?:IF NOT EXISTS )?`(\w+)`', line)
            if match:
                current_table = match.group(1).lower()
        elif in_create_table:
            current_block.append(line)
            if line.strip().endswith(';'):
                in_create_table = False
                create_tables.append('\n'.join(current_block))
                current_block = []
        elif line.strip().startswith('INSERT INTO'):
            # 提取插入语句的表名
            match = re.search(r'INSERT INTO `(\w+)`', line)
            if match:
                table_name = match.group(1).lower()
                if table_name not in insert_data:
                    insert_data[table_name] = []
                insert_data[table_name].append(line)
    
    # 3. 修正表名和约束
    for old_name, new_name in tables_mapping.items():
        # 处理创建表语句
        create_tables = [
            re.sub(
                rf'CREATE TABLE (?:IF NOT EXISTS )?`{old_name}`',
                f'CREATE TABLE IF NOT EXISTS `{new_name}`',
                stmt,
                flags=re.IGNORECASE
            ) for stmt in create_tables
        ]
        create_tables = [
            re.sub(
                rf'REFERENCES `{old_name}`',
                f'REFERENCES `{new_name}`',
                stmt,
                flags=re.IGNORECASE
            ) for stmt in create_tables
        ]
        
        # 更新插入数据的表名
        if old_name.lower() in insert_data:
            insert_data[new_name] = [
                re.sub(
                    rf'INSERT INTO `{old_name}`',
                    f'INSERT INTO `{new_name}`',
                    stmt,
                    flags=re.IGNORECASE
                ) for stmt in insert_data[old_name.lower()]
            ]
            del insert_data[old_name.lower()]
    
    # 4. 修正外键约束名
    constraint_pattern = r'CONSTRAINT `(.+?)` FOREIGN KEY'
    constraints = {}
    for i, stmt in enumerate(create_tables):
        matches = list(re.finditer(constraint_pattern, stmt))
        for match in matches:
            old_name = match.group(1)
            if old_name in constraints:
                new_name = f"{old_name}_{len(constraints)}"
                stmt = stmt.replace(f'CONSTRAINT `{old_name}`', f'CONSTRAINT `{new_name}`')
            constraints[old_name] = True
        create_tables[i] = stmt
    
    # 5. 定义表的创建和数据插入顺序
    table_order = [
        'User',                  # 基础表
        'Category',             # 基础表
        'TagCategory',          # 基础表
        'Tag',                  # 依赖 TagCategory
        'BookmarkCategory',     # 基础表
        'Unit',                 # 基础表 - 移到前面
        'Post',                 # 依赖 User, Category
        'Recipe',              # 依赖 User, Category
        'Bookmark',            # 依赖 BookmarkCategory
        'Ingredient',          # 依赖 Recipe, Unit
        'Nutrition',           # 依赖 Recipe
        'ViewHistory',         # 依赖 Post
        '_BookmarkToTag',      # 依赖 Bookmark, Tag
        '_PostToTag',          # 依赖 Post, Tag
        '_RecipeToTag',        # 依赖 Recipe, Tag
        '_prisma_migrations'   # 独立表
    ]
    
    # 6. 按顺序组合 SQL
    final_sql = [
        "SET FOREIGN_KEY_CHECKS=0;",
        "SET NAMES utf8mb4;",
        "SET CHARACTER SET utf8mb4;"
    ]
    
    # 添加表创建语句
    for table in table_order:
        for stmt in create_tables:
            if f'CREATE TABLE IF NOT EXISTS `{table}`' in stmt:
                final_sql.append(stmt)
                break
    
    final_sql.append("SET FOREIGN_KEY_CHECKS=1;")
    
    # 添加数据插入语句
    inserted_tables = set()  # 跟踪已插入数据的表
    for table in table_order:
        if table in insert_data and table not in inserted_tables:
            if table == 'Ingredient':
                # 确保在插入 Ingredient 数据前先插入 Unit 数据
                if 'Unit' in insert_data and 'Unit' not in inserted_tables:
                    final_sql.extend(insert_data['Unit'])
                    inserted_tables.add('Unit')
            final_sql.extend(insert_data[table])
            inserted_tables.add(table)
    
    # 写入文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(final_sql))

if __name__ == '__main__':
    fix_mysql_backup(
        'blog_demo_backup.sql',
        'blog_demo_backup_fixed.sql'
    ) 