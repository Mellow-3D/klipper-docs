# 引脚分布

## RHT36/42引脚

### 步进电机驱动部分

* E电机

| 驱动 | 功能 | 引脚号 |
| :----: | :----: | :----- |
| E | EN | ***gpio7*** |
| E | STEP | ***gpio10*** |
| E | DIR | ***gpio9*** |
| E | UART | ***gpio8*** |


### 限位

| 限位 | 引脚号 |
| :----: | :----- |
| 1 | ***gpio18*** |
| 2 | ***gpio19*** |

### 加热控制

| 功能 | 引脚号 |
| :----: | :----- |
| 挤出加热 | ***gpio23*** |

### 温度传感器

| 功能 | 引脚号 |
| :----: | :----- |
| 挤出温度 | ***gpio26*** |

### 舵机与探针

| 功能 | 引脚号 |
| :----: | :----- |
| 舵机 | ***gpio21*** |
| 探针 | ***gpio27*** |

### 风扇

| 功能 | 引脚号 |
| :----: | :----- |
| 风扇0 | ***gpio25*** |
| 风扇1 | ***gpio24*** |

### RGB

| 功能 | 引脚号 |
| :----: | :----- |
| RGB1 | ***gpio15*** |

## SPI设备

* 软SPI

| 功能 | 引脚号 |
| :----: | :----- |
| MISO | ***gpio4*** |
| MOSI | ***gpio3*** |
| CLK | ***gpio2*** |
| ADXL345-CS | ***gpio6*** |
| MAX31865-CS | ***gpio5*** |
