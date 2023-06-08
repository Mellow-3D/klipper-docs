# 7 FLY-SHT36-PRO参考配置

## 7.1 TMC5160配置参考

?> 此文档是TMC5160版本的参考配置

```
#####################################################################
#                               主板配置
#####################################################################
[mcu SHT36] # 工具主板序列号
canbus_uuid: eeb4f40a0b9b
### 查询can固件id是：~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
### can的id需要把serial替换成canbus_uuid: 后面添加id 

#####################################################################
#                             温度监控
#####################################################################
[temperature_sensor SHT36]        # 工具板主板温度
sensor_type: temperature_mcu      # 关联mcu
sensor_mcu: SHT36                 # 关联mcu是SHT36
min_temp: 0                       # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 490                     # 最大温度（注意：测量温度超过设定值会触发紧急停止）
#--------------------------------------------------------------------
[temperature_sensor Box]          # 工具板热敏温度 
sensor_type: ATC Semitec 104GT-2  # 传感器型号
sensor_pin: SHT36:gpio27          # 信号接口
min_temp: 0                       # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 490                     # 最大温度（注意：测量温度超过设定值会触发紧急停止）

#####################################################################
#                       adxl345加速度计配置（需要时启用即可）
#####################################################################
## ADXL345加速度计
[adxl345]
cs_pin: SHT36:gpio9
spi_software_sclk_pin: SHT36:gpio10
spi_software_mosi_pin: SHT36:gpio11
spi_software_miso_pin: SHT36:gpio12
#--------------------------------------------------------------------
[resonance_tester]
accel_chip: adxl345         # 加速度芯片型号
probe_points: 150,150,10    # 坐标配置为热床的中间

#####################################################################
#                            E 挤出机设置                            # 
#####################################################################
#注：接完线需测试运行方向
step_pin: SHT36:gpio23              # 挤出电机方脉冲引脚
dir_pin: SHT36:gpio24               # 挤出电机方向引脚设置
enable_pin: !SHT36:gpio25           # 挤出电机方使能引脚设置
## 执行挤出机校准时，更新以下值
## 比如你要求100毫米的进料，但实际上是98毫米：
## 新值=旧值 x（实际挤出长度/目标长度）
## 校准步进值: 23.1325301 = 旧值22.6789511*（实际值102/目标值100）
rotation_distance: 22.6789511       # 步进值-Bondtech 5mm 驱动齿轮
gear_ratio: 50:17                   # 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
microsteps: 16                      # 电机细分设置,细分越高，质量越高，但主控负荷越大
full_steps_per_rotation: 200        # 单圈脉冲数 （200 为 1.8 度, 400 为 0.9 度）
nozzle_diameter: 0.400              # 喷嘴直径
filament_diameter: 1.75             # 耗材直径
heater_pin: SHT36:gpio8           # 加热棒引脚,接到HETA0
#--------------------------------------------------------------------
##普通热敏配置
sensor_type: ATC Semitec 104GT-2    # 传感器型号  (Generic 3950, ATC Semitec 104GT-2， PT1000)
sensor_pin: SHT36:gpio26          # 传感器引脚  
#--------------------------------------------------------------------
##pt1000配置
#sensor_type: PT1000                 # 传感器型号  (Generic 3950, ATC Semitec 104GT-2， PT1000)
#pullup_resistor: 1100               # 热敏上拉电阻为1100，如果温度为负-180需要更换跳线
#sensor_pin: SHT36:gpio26          # 传感器引脚  
#--------------------------------------------------------------------
min_temp: -200                      # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 500                       # 最大温度（注意：测量温度超过设定值会触发紧急停止）
max_power: 1.0                      # 最大功率
min_extrude_temp: 50                # 最小挤出温度（至少需要达到这个温度，挤出机才能挤出）
pressure_advance: 0.05              # 推进压力-尽量将压力保持在1.0以下(压力提前是调整这个)
pressure_advance_smooth_time: 0.040 # 平稳推进时间-默认值为0.040
#压力提前调整方法:https://www.klipper3d.org/zh/Pressure_Advance.html
pressure_advance_smooth_time: 0.040 # 平稳推进时间-默认值为0.040
#max_extrude_only_distance: 200.0   # 挤出流量报错可以注释这个，但是建议重新切片
#喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
control = pid                # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
pid_kp = 26.213              # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
pid_ki = 1.304               # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
pid_kd = 131.721             # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc5160 extruder]                  # 挤出机驱动配置- TMC2209
cs_pin: SHT36:gpio20              # 通讯端口Pin脚定义
spi_software_sclk_pin: SHT36:gpio10       
spi_software_mosi_pin: SHT36:gpio11
spi_software_miso_pin: SHT36:gpio12
interpolate: False                  # 是否开启256微步插值（开启是True，关闭是False）
run_current: 0.8                    # 电机运行电流值
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 500          # 静音阀值（如果不需要静音，请将数值改为0）

#####################################################################
#                             风扇配置
#####################################################################
[fan]                        # 模型冷却风扇
pin: SHT36:gpio15            # 信号接口
kick_start_time: 0.5         # 启动时间（勿动）
off_below: 0.10              # 勿动
#--------------------------------------------------------------------
[heater_fan hotend_fan]      # 喉管冷却风扇
pin: SHT36:gpio14            # 信号接口
max_power: 1.0               # 最大转速
kick_start_time: 0.5         # 启动时间（勿动）
heater: extruder             # 关联的设备：挤出机
heater_temp: 50              # 挤出机达到多少度启动风扇
fan_speed: 1.0               # 风扇转速

#####################################################################
#                            X限位配置
#####################################################################
[stepper_x]
endstop_pin: !SHT36:gpio21
## SHT36板有gpio2,gpio21两个限位引脚可用，按照实际接线修改配置
## gpio21引脚默认支持高压输入，可用于12v的接近传感器等。可通过跳线帽配置gpio21为普通限位引脚
#####################################################################
#                           SB头led配置
#####################################################################
[neopixel sb_leds]
pin: SHT36:gpio6            # 信号接口
chain_count: 3              # 灯珠数量
color_order: GRBW           # 灯珠类型
initial_RED: 0.4            # 
initial_GREEN: 0.8          # 
initial_BLUE: 1             # 
initial_WHITE: 0.0          # 连接后会亮起来

#####################################################################
#                           PL08N感应探头
#####################################################################
# PL08N感应探头不低于喷嘴高度，仅用于调平,如果你的PL08N是NO（常开），请将更改pin添加到！ 
[probe]
pin: ^SHT36:gpio3            # 信号接口
x_offset: 0                  # X轴-传感器相对喷嘴偏移量
y_offset: 25.0               # Y轴-传感器相对喷嘴偏移量
z_offset: 0                  # Z轴-传感器相对喷嘴偏移量
speed: 10.0                  # 调平速度
samples: 3                   # 采样次数
samples_result: median       # 取值方式（默认median-中位数）
sample_retract_dist: 4.0     # 调平回缩距离
samples_tolerance: 0.006     # 采样公差（注意过小的值可能造成采样次数增加）
samples_tolerance_retries: 3 # 超公差重试次数

#--------------------------------------------------------------------
#[bltoch]
#sensor_pin: ^SHT36:gpio3     # 信号接口
#control_pin: SHT36:gpio7     # 舵机控制
#x_offset: -26.1              # X轴-传感器相对喷嘴偏移量，需要自行确定偏移量
#y_offset: -15.3              # Y轴-传感器相对喷嘴偏移量，需要自行确定偏移量
#z_offset: 2.1                # Z轴-传感器相对喷嘴偏移量，需要自行确定偏移量

#####################################################################
#                          磁角度传感器
#####################################################################
## 磁角度传感器
## 相关说明请参考https://www.klipper3d.org/API_Server.html#angledump_angle 
## https://www.klipper3d.org/Debugging.html#motion-analysis-and-data-logging
# [angle my_angle_sensor]
# sensor_type: as5047d
# #sample_period: 0.000400
# stepper: stepper_x
# cs_pin: SHT36:gpio17
# spi_bus: spi1
# # spi_software_sclk_pin: SHT36:PA5
# # spi_software_mosi_pin: SHT36:PA7
# # spi_software_miso_pin: SHT36:PA6
```





## 7.2 TMC2209配置参考

?> 此文档是TMC2209版本的参考配置



```
#####################################################################
#                               主板配置
#####################################################################
[mcu SHT36] # 工具主板序列号
canbus_uuid: eeb4f40a0b9b
### 查询can固件id是：~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
### can的id需要把serial替换成canbus_uuid: 后面添加id 

#####################################################################
#                             温度监控
#####################################################################
[temperature_sensor SHT36]        # 工具板主板温度
sensor_type: temperature_mcu      # 关联mcu
sensor_mcu: SHT36                 # 关联mcu是SHT36
min_temp: 0                       # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 490                     # 最大温度（注意：测量温度超过设定值会触发紧急停止）
#--------------------------------------------------------------------
[temperature_sensor Box]          # 工具板热敏温度 
sensor_type: ATC Semitec 104GT-2  # 传感器型号
sensor_pin: SHT36:gpio27          # 信号接口
min_temp: 0                       # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 490                     # 最大温度（注意：测量温度超过设定值会触发紧急停止）

#####################################################################
#                       adxl345加速度计配置（需要时启用即可）
#####################################################################
## ADXL345加速度计
[adxl345]
cs_pin: SHT36:gpio9
spi_software_sclk_pin: SHT36:gpio10
spi_software_mosi_pin: SHT36:gpio11
spi_software_miso_pin: SHT36:gpio12
#--------------------------------------------------------------------
[resonance_tester]
accel_chip: adxl345         # 加速度芯片型号
probe_points: 150,150,10    # 坐标配置为热床的中间

#####################################################################
#                            E 挤出机设置                            # 
#####################################################################
#注：接完线需测试运行方向
[extruder]                          # 挤出机
step_pin: SHT36:gpio24              # 挤出电机方脉冲引脚
dir_pin: SHT36:gpio23               # 挤出电机方向引脚设置
enable_pin: !SHT36:gpio25           # 挤出电机方使能引脚设置
## 执行挤出机校准时，更新以下值
## 比如你要求100毫米的进料，但实际上是98毫米：
## 新值=旧值 x（实际挤出长度/目标长度）
## 校准步进值: 23.1325301 = 旧值22.6789511*（实际值102/目标值100）
rotation_distance: 22.6789511       # 步进值-Bondtech 5mm 驱动齿轮
gear_ratio: 50:17                   # 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
microsteps: 16                      # 电机细分设置,细分越高，质量越高，但主控负荷越大
full_steps_per_rotation: 200        # 单圈脉冲数 （200 为 1.8 度, 400 为 0.9 度）
nozzle_diameter: 0.400              # 喷嘴直径
filament_diameter: 1.75             # 耗材直径
heater_pin: SHT36:gpio8             # 加热棒引脚,接到HETA0
#--------------------------------------------------------------------
##普通热敏配置
sensor_type: ATC Semitec 104GT-2    # 传感器型号  (Generic 3950, ATC Semitec 104GT-2， PT1000)
sensor_pin: SHT36:gpio26            # 传感器引脚  
#--------------------------------------------------------------------
##pt1000配置
#sensor_type: PT1000                 # 传感器型号  (Generic 3950, ATC Semitec 104GT-2， PT1000)
#pullup_resistor: 1100               # 热敏上拉电阻为1100，如果温度为负-180需要更换跳线
#sensor_pin: SHT36:gpio26            # 传感器引脚  
#--------------------------------------------------------------------
min_temp: -200                      # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 500                       # 最大温度（注意：测量温度超过设定值会触发紧急停止）
max_power: 1.0                      # 最大功率
min_extrude_temp: 170               # 最小挤出温度（至少需要达到这个温度，挤出机才能挤出）
pressure_advance: 0.05              # 推进压力-尽量将压力保持在1.0以下(压力提前是调整这个)
pressure_advance_smooth_time: 0.040 # 平稳推进时间-默认值为0.040
#压力提前调整方法:https://www.klipper3d.org/zh/Pressure_Advance.html
pressure_advance_smooth_time: 0.040 # 平稳推进时间-默认值为0.040
#max_extrude_only_distance: 200.0   # 挤出流量报错可以注释这个，但是建议重新切片
#喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
control = pid                # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
pid_kp = 26.213              # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
pid_ki = 1.304               # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
pid_kd = 131.721             # PID喷嘴温度自动校准项（pid校准完成后，会被注释）
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 extruder]                  # 挤出机驱动配置- TMC2209
uart_pin: SHT36:gpio1               # 通讯端口Pin脚定义
tx_pin: SHT36:gpio0
interpolate: False                  # 是否开启256微步插值（开启是True，关闭是False）
run_current: 0.8                    # 电机运行电流值
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 500          # 静音阀值（如果不需要静音，请将数值改为0）

#####################################################################
#                             风扇配置
#####################################################################
[fan]                        # 模型冷却风扇
pin: SHT36:gpio15            # 信号接口
kick_start_time: 0.5         # 启动时间（勿动）
off_below: 0.10              # 勿动
#--------------------------------------------------------------------
[heater_fan hotend_fan]      # 喉管冷却风扇
pin: SHT36:gpio14            # 信号接口
max_power: 1.0               # 最大转速
kick_start_time: 0.5         # 启动时间（勿动）
heater: extruder             # 关联的设备：挤出机
heater_temp: 50              # 挤出机达到多少度启动风扇
fan_speed: 1.0               # 风扇转速

#####################################################################
#                            X限位配置
#####################################################################
[stepper_x]
endstop_pin: !SHT36:gpio21
## SHT36板有gpio2,gpio21两个限位引脚可用，按照实际接线修改配置
## gpio21引脚默认支持高压输入，可用于12v的接近传感器等。可通过跳线帽配置gpio21为普通限位引脚
#####################################################################
#                           SB头led配置
#####################################################################
[neopixel sb_leds]
pin: SHT36:gpio6            # 信号接口
chain_count: 3              # 灯珠数量
color_order: GRBW           # 灯珠类型
initial_RED: 0.4            # 
initial_GREEN: 0.8          # 
initial_BLUE: 1             # 
initial_WHITE: 0.0          # 连接后会亮起来

#####################################################################
#                           PL08N感应探头
#####################################################################
# PL08N感应探头不低于喷嘴高度，仅用于调平,如果你的PL08N是NO（常开），请将更改pin添加到！ 
[probe]
pin: ^SHT36:gpio3            # 信号接口
x_offset: 0                  # X轴-传感器相对喷嘴偏移量
y_offset: 25.0               # Y轴-传感器相对喷嘴偏移量
z_offset: 0                  # Z轴-传感器相对喷嘴偏移量
speed: 10.0                  # 调平速度
samples: 3                   # 采样次数
samples_result: median       # 取值方式（默认median-中位数）
sample_retract_dist: 4.0     # 调平回缩距离
samples_tolerance: 0.006     # 采样公差（注意过小的值可能造成采样次数增加）
samples_tolerance_retries: 3 # 超公差重试次数

#--------------------------------------------------------------------
#[bltoch]
#sensor_pin: ^SHT36:gpio3     # 信号接口
#control_pin: SHT36:gpio7     # 舵机控制
#x_offset: -26.1              # X轴-传感器相对喷嘴偏移量，需要自行确定偏移量
#y_offset: -15.3              # Y轴-传感器相对喷嘴偏移量，需要自行确定偏移量
#z_offset: 2.1                # Z轴-传感器相对喷嘴偏移量，需要自行确定偏移量

#####################################################################
#                          磁角度传感器
#####################################################################
## 磁角度传感器
## 相关说明请参考https://www.klipper3d.org/API_Server.html#angledump_angle 
## https://www.klipper3d.org/Debugging.html#motion-analysis-and-data-logging
# [angle my_angle_sensor]
# sensor_type: as5047d
# #sample_period: 0.000400
# stepper: stepper_x
# cs_pin: SHT36:gpio17
# spi_bus: spi1
# # spi_software_sclk_pin: SHT36:PA5
# # spi_software_mosi_pin: SHT36:PA7
# # spi_software_miso_pin: SHT36:PA6

```

