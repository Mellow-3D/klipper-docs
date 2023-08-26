# 设备连接

## Printer

### 1. 报错信息

![printer](../../images/guides/klippererro/printer.png)

### 2. 报错原因

系统正在连接下位机

### 3. 解决方法

等待10秒左右即可



# mcu 'xxxx': Unable to connect

## 1. 报错信息

![mcu](../../images/guides/klippererro/mcu.png)

## 2. 报错原因

上位机无法连接到主板

## 3. 解决方法

1. 检查**连接线**是否正常连接
2. 查看**固件编译参数**与官网提供是否一致
3. 通过SSH软件等查看是否可以找到设备，如果可以找到设备`请检查配置里面的ID是否正确`



# Error 'MCU 'mcu' shutdown: ADC out of range....

## 1.报错信息

![adc](../../images/guides/klippererro/adcout.png)

## 2. 报错原因

Klipper 检测到温度超过最大或最小阀值（热敏电阻可能开路或者短路），系统将进入关闭保护模式。

### 3. 解决方法

1. 检查热敏型号是否正确
2. 检查热敏Pin脚是否正确
3. 检查热敏是否有短路
