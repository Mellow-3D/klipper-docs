# 树莓派使用说明

本次教程使用FLY CM4扩展版与**树莓派CM4**为例

## 注意事项：

- 确保在安装扩展板前，上位机已经关闭电源。
- 避免在潮湿或灰尘环境中使用扩展板。
- 安装屏幕时，请注意不要带电拔插注意屏线方向，以免造成损坏。
- 安装风扇时，请注意风扇的电流和电压规格，以免造成损坏。
- 请注意UART1已经默认启用无需在配置
- **树莓派可以使用全部接口！！！**
- **树莓派系统要求在2024年1月1号之后！！！建议备份配置重新安装系统！！！**



## 串口使用方法

**正在完善仅供参考**

* 树莓派刷好最新系统后需要在**编辑boot盘下的config.txt文件**
* 在**config.txt**中添加即可

```
dtoverlay=uart3
```

uart1的id为

```
[mcu] 
serial: /dev/ttyAMA0
baud: 250000
restart_method:command
```

uart3的id为

```
[mcu] 
serial: /dev/ttyAMA1
baud: 250000
restart_method:command
```

### 接线方法

**正在作图**

## FAN使用方法

添加配置

```
[mcu host]       
serial: /tmp/klipper_host_mcu 

[temperature_sensor Raspberry Pi]
sensor_type: temperature_host

[temperature_fan core_fan] 
pin: host:gpio12
max_power: 1.0
sensor_type: temperature_host   #设置为上位机主控温度
control:watermark                  #控制方式
target_temp: 48                   #上位机散热风扇启动温度
min_temp: 0                     #最低温度，低于此温度将会报错
max_temp: 90                    #最高温度，高于此温度将会报错
off_below: 0.10
kick_start_time: 0.50
max_speed: 0.8                   #最大转速，为满功率运转时的80%
min_speed: 0.3                    #最小转速，为满功率运转时的30%
```

### 接线方法

**正在作图**

## 屏幕使用方法

### 接线方法

**正在作图**
