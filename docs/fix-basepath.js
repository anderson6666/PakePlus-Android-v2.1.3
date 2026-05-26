
const fs = require('fs');
const path = require('path');

const jsFile = path.join(__dirname, 'assets', 'index-BIvBQkjC.js');

try {
  console.log('正在读取文件...');
  let content = fs.readFileSync(jsFile, 'utf8');
  
  console.log('正在替换 basename...');
  const oldStr = 'rx="/"';
  const newStr = 'rx="/PakePlus-Android-v2.1.3"';
  
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(jsFile, content, 'utf8');
    console.log('✅ 修改成功！');
    console.log('   old:', oldStr);
    console.log('   new:', newStr);
  } else {
    console.log('❌ 未找到需要替换的字符串');
    // 尝试查找其他可能的模式
    const rxMatch = content.match(/rx="([^"]+)"/);
    if (rxMatch) {
      console.log('找到 rx 配置:', rxMatch[0]);
    }
  }
} catch (error) {
  console.error('❌ 修改失败:', error.message);
}
