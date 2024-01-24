# 香橙派使用说明

本次教程使用FLY CM4扩展版与**香橙派CM4**为例

## 注意事项：

- 确保在安装扩展板前，上位机已经关闭电源。
- 避免在潮湿或灰尘环境中使用扩展板。
- 安装屏幕时，请注意不要带电拔插注意屏线方向，以免造成损坏。
- 安装风扇时，请注意风扇的电流和电压规格，以免造成损坏。
- **香橙派只能使用中间的RS232接口，FAN口！！！！**
- **香橙派因系统问题无法使用FPC屏幕扩展接口！！！**



## 串口使用方法

使用下方命令打开系统设置找到**uart2-m0**与**pwm11-m1**打开然后重启系统

```
sudo orangepi-config
```



## FAN使用方法

需要自行给香橙派装rpi微控制器否则无法使用风扇接口

教程：[RPi 微控制器](https://www.klipper3d.org/zh/RPi_microcontroller.html?h=rpi)

```
[mcu host]       
serial: /tmp/klipper_host_mcu 

[temperature_sensor orangepi]
sensor_type: temperature_host

[temperature_fan core_fan] 
pin: host:gpiochip4/gpio16
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

