import re

with open('assets/index-BIvBQkjC.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 查找关键词数组的开始和结束
match = re.search(r'const K=\[(.+?)\];K\.sort', content, re.DOTALL)
if match:
    array_content = match.group(1)
    # 检查引号是否配对
    quotes = array_content.count('"')
    print(f'关键词数组内容长度: {len(array_content)} 字符')
    print(f'引号数量: {quotes}')
    if quotes % 2 == 0:
        print('✅ 引号数量正确（偶数）')
    else:
        print('❌ 引号数量错误（奇数）')

    # 检查最后一个关键词
    keywords = array_content.split('",')
    print(f'关键词数量: {len(keywords)}')
    print(f'最后一个关键词: {keywords[-1][:100]}')
else:
    print('❌ 未找到关键词数组')
