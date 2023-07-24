# Fly_sensor 配置

## 1. 添加基础配置

Fly_senso安装脚本链接：[GitHub](https://github.com/kluoyun/Fly-Sensor) 

建议使用**MobaXterm_Personal**等**SSH**工具安装脚本

更新klipper

```
cd ~/klipper
git checkout .
git pull
```
安装脚本
```
cd ~/
git clone https://github.com/kluoyun/Fly-Sensor
sudo chmod +x ./Fly-Sensor/scripts/install.sh
sudo ./Fly-Sensor/scripts/install.sh

```

?>**使用前需要更新安装的主板固件**

?>**使用前需要更新安装的主板固件**

?>**使用前需要更新安装的主板固件**

## 2. Klipper配置

```cfg
[fly_probe]
calibration_pin:sht36:PB1    # 舵机信号口
probe_pwm_pin:sht36:PC15     # pwm
zstop_pin:sht36:PB13         # zstop
x_offset: -23.2
y_offset: -13
z_offset: 0.0
speed: 150
samples:5    #每个点采样次数
probe_mode:1 #0 当做接近开关使用  1：Z轴不升降采样距离 

[bed_mesh]
speed: 100                   # 校准速度
mesh_min: 20,20              # 最小校准点坐标x，y
mesh_max: 195, 200           # 最大校准点坐标x，y
probe_count: 6,6             # 采样点数（6X6为36点）
horizontal_move_z: 1.2
algorithm: bicubic           # 算法模型
bicubic_tension: 0.2         
```

```
[fly_probe]
calibration_pin:sht36:PB1    # Servo signal port
probe_pwm_pin:sht36:PC15     # pwm
zstop_pin:sht36:PB13         # zstop
x_offset: -23.2
y_offset: -13
z_offset: 0.0
speed: 150
samples:5                    # Number of single samples
probe_mode:1                 
# 0 Used as a proximity switch 1: The Z axis does not raise or lower the sampling distance 

[bed_mesh]
speed: 100                   # Calibration speed
mesh_min: 20,20              # Minimum calibration point coordinates x, y
mesh_max: 195, 200           # Maximum calibration point coordinates x, y
probe_count: 6,6             # Number of sampling points (36 points for 6X6)
horizontal_move_z: 1.2
algorithm: bicubic           # Algorithm model
bicubic_tension: 0.2         
```

