要将Linux系统的时区更改为其他时区，请按照以下步骤操作：

1. 使用SSH连接上位机。
2. 输入以下命令以更改系统时区：

```bash
sudo timedatectl set-timezone <TIMEZONE>
```

请将`<TIMEZONE>`替换为您希望使用的时区代码。您可以在[iana.org](https://www.iana.org/time-zones)网站上查找时区代码。例如，如果您想将系统时区更改为北京时区（Asia/Shanghai），可以输入以下命令：

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

现在，你的系统时区已经成功更改为上海时间。你可以通过以下命令验证时区设置：

```bash
date
```



# 太平洋地区
|       时区        | 中文名   |
| :------------: | :----------- |
|  Pacific/Majuro   | 马朱罗   |
|  Pacific/Midway   | 中途岛   |
| Pacific/Honolulu  | 檀香山   |
|   Pacific/Guam    | 关岛     |
| Pacific/Auckland  | 奥克兰   |
|   Pacific/Fiji    | 斐济     |
| Pacific/Tongatapu | 东加塔布 |

# 美洲
|      时区      | 中文名       |
| :------------: | :----------- |
| Aerica/Anchorage | 安克雷奇|
| Aerica/Los_Angeles | 美国太平洋时间 (洛杉矶) |
| Aerica/Tijuana | 美国太平洋时间 (提华纳) |
| Aerica/Phoenix | 美国山区时间 (凤凰城) |
| Aerica/Chihuahua | 奇瓦瓦|
| Aerica/Denver | 美国山区时间 (丹佛) |
| Aerica/Costa_Rica | 美国中部时间 (哥斯达黎加) |
| Aerica/Chicago | 美国中部时间 (芝加哥) |
| Aerica/Mexico_City | 美国中部时间 (墨西哥城) |
| Aerica/Regina | 美国中部时间 (里贾纳) |
| Aerica/Bogota | 哥伦比亚时间 (波哥大) |
| Aerica/New_York | 美国东部时间 (纽约) |
| Aerica/Caracas | 委内瑞拉时间 (加拉加斯) |
| Aerica/Barbados | 大西洋时间 (巴巴多斯) |
| Aerica/Manaus | 亚马逊标准时间 (马瑙斯) |
| Aerica/Santiago | 圣地亚哥|
| Aerica/St_Johns | 纽芬兰时间 (圣约翰) |
| Aerica/Sao_Paulo | 圣保罗|
| Aerica/Argentina/Buenos_Aires | 布宜诺斯艾利斯
| Aerica/Godthab | 戈特霍布|
| Aerica/Montevideo | 乌拉圭时间 (蒙得维的亚) |

# 大西洋
|      时区      | 中文名       |
| :------------: | :----------- |
| Aantic/South_Georgia | 南乔治亚|
| Aantic/Azores | 亚述尔群岛|
| Aantic/Cape_Verde | 佛得角|
| Africa/Casablanca | 卡萨布兰卡|

# 欧洲
|      时区      | 中文名       |
| :------------: | :----------- |
Europe/London | 格林尼治标准时间 (伦敦)
Europe/Amsterdam | 中欧标准时间 (阿姆斯特丹)
Europe/Belgrade | 中欧标准时间 (贝尔格莱德)
Europe/Brussels | 中欧标准时间 (布鲁塞尔)
Europe/Sarajevo | 中欧标准时间 (萨拉热窝)
Europe/Athens | 东欧标准时间 (雅典)
Europe/Helsinki | 东欧标准时间 (赫尔辛基)
Europe/Minsk | 明斯克
Europe/Moscow | 莫斯科

# 非洲
|      时区      | 中文名       |
| :------------: | :----------- |
Africa/Windhoek | 温得和克
Africa/Brazzaville | 西部非洲标准时间 (布拉扎维)
Africa/Cairo | 东欧标准时间 (开罗)
Africa/Harare | 中部非洲标准时间 (哈拉雷)
Africa/Nairobi | 东部非洲标准时间 (内罗毕)

# 亚洲
|      时区      | 中文名       |
| :------------: | :----------- |
Asia/Amman | 东欧标准时间 (安曼)
Asia/Beirut | 东欧标准时间 (贝鲁特)
Asia/Jerusalem | 以色列时间 (耶路撒冷)
Asia/Baghdad | 巴格达
Asia/Kuwait | 科威特
Asia/Tehran | 伊朗标准时间 (德黑兰)
Asia/Baku | 巴库
Asia/Tbilisi | 第比利斯
Asia/Yerevan | 埃里温
Asia/Dubai | 迪拜
Asia/Kabul | 阿富汗时间 (喀布尔)
Asia/Karachi | 卡拉奇
Asia/Oral | 乌拉尔
Asia/Yekaterinburg | 叶卡捷林堡
Asia/Calcutta | 加尔各答
Asia/Colombo | 科伦坡
Asia/Katmandu | 尼泊尔时间 (加德满都)
Asia/Almaty | 阿拉木图
Asia/Rangoon | 缅甸时间 (仰光)
Asia/Krasnoyarsk | 克拉斯诺亚尔斯克
Asia/Bangkok | 曼谷
Asia/Shanghai | 中国标准时间 (北京)
Asia/Hong_Kong | 香港时间 (香港)
Asia/Irkutsk | 伊尔库茨克时间 (伊尔库茨克)
Asia/Kuala_Lumpur | 吉隆坡
Australia/Perth | 佩思
Asia/Taipei | 台北时间 (台北)
Asia/Seoul | 首尔
Asia/Tokyo | 日本时间 (东京)
Asia/Yakutsk | 雅库茨克时间 (雅库茨克)
Asia/Vladivostok | 海参崴时间 (符拉迪沃斯托克)
Asia/Magadan | 马加丹时间 (马加丹)

# 大洋洲
|      时区      | 中文名       |
| :------------: | :----------- |
Australia/Adelaide | 阿德莱德
Australia/Darwin | 达尔文
Australia/Brisbane | 布里斯班
Australia/Hobart | 霍巴特
Australia/Sydney | 悉尼
