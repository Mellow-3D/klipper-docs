## 操作教程

[7寸WiFi电容屏幕控制多台机器](https://www.bilibili.com/video/BV1mr421b7Bf/?spm_id_from=333.788&vd_source=36affb37d7228751cd1fcbbda487dfdf)

## Klipper配置

### LED配置

```
[led LED]
white_pin:PA15
```

### ptc配置

```
[heater_generic warehouse]
heater_pin:E_CS
sensor_type:ATC Semitec 104GT-2
sensor_pin:PA1
min_temp:-270
max_temp:600
control = pid
pid_kp = 16.804
pid_ki = 0.794
pid_kd = 88.854
```

### FAN配置

```
[fan_generic fan1]
pin: FAN1
```



```
[fan_generic fan2]
pin: FAN2
```

 

### 自定义Gcode

屏幕下拉后出现自定义Gcode，

一个按钮发送多个gcode格式：

例子：

```
G91 
G1 X10 F6000
G90
```

 

屏幕上输入格式:(从第二行开始，每个命令前面加入\n)

```
G91\nG1 X10 F6000\nG90
```



 # 使用对象排除

* 需要替换moonraker

* 请先连接SSH，并且保证可以正常上网

1. 备份moonraker文件

```
mv ~/moonraker ~/moonraker-bak
```

2. 停止moonraker服务

```
sudo systemctl restart moonraker
```

3. 拉取moonraker

```
git clone https://e.coding.net/g-ofpa1390/3D-Printers/moonraker-dev.git -b flylcd-dev moonraker
```

4. 在浏览器访问上位机找到`moonraker.conf`添加，然后重启系统

```
[network]
```

5. 然后在浏览器输入下方地址，其中IP需要替换成上位机的IP

```
http://ip:7125/server/network/wifi/scan
```

* 出现这步代表操作完成

![moonraker](../../images/boards/fly_WiScreen/moonraker.png)

 