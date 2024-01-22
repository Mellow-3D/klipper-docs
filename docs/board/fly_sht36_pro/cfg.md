# 7 FLY-SHT36-PRO参考配置

> [!TIP]
>
> 请将[include sht36v2.cfg]添加到printer.cfg下

[下载链接](https://cdn.mellow.klipper.cn/FLY_Config/SHT36PRO.cfg)

```cfg
#####################################################################
#      Notes
#####################################################################
## 请将[include SHT36PRO.cfg]添加到printer.cfg下
## Please add [include SHT36PRO.cfg] under printer.cfg
## 工具板将使用以下几种配置，如果其他配置中使用到下面的配置可能会冲突
## The tool plate will use the following configurations, 
## and if the following configurations are used in other configurations, conflicts may occur.
## [resonance_tester] && [extruder] && [tmc2209 extruder] && [fan] && [heater_fan my_hotend_fan]
## [probe] && [bltouch] && [stepper_x]

#####################################################################
#      Master ID Configuration
#####################################################################
[mcu SHT36PRO]
canbus_uuid: e51d5c71a901
### 查询can固件id是：~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
### can的id需要把serial替换成canbus_uuid: 后面添加id 

#####################################################################
#      Temperature monitoring
#####################################################################
[temperature_sensor SHT36-PRO]
sensor_type: temperature_mcu
sensor_mcu: SHT36PRO
#--------------------------------------------------------------------
[temperature_sensor Box]
sensor_type: ATC Semitec 104GT-2
sensor_pin: SHT36PRO:gpio27
#####################################################################
#      Accelerometer
#####################################################################
## https://www.klipper3d.org/Measuring_Resonances.html?h=adxl#adxl345
[adxl345]
cs_pin: SHT36PRO:gpio9
spi_software_sclk_pin: SHT36PRO:gpio10
spi_software_mosi_pin: SHT36PRO:gpio11
spi_software_miso_pin: SHT36PRO:gpio12
#--------------------------------------------------------------------
[resonance_tester]
accel_chip: adxl345
probe_points: 150, 150, 20
# Somewhere slightly above the middle of your print bed
# 在打印床的中间稍微偏上的位置
min_freq: 5
max_freq: 133
accel_per_hz: 75
hz_per_sec: 1 

#####################################################################
#      Extruder thermal sensitivity
#####################################################################
## Please select the type of thermocouple you want to use.
## 请根据你想要使用的热敏选择
[extruder]
## Type of sensor - common thermistors are (Generic 3950, ATC Semitec 104GT-2)
## 传感器类型-常见的热敏电阻器是 (Generic 3950, ATC Semitec 104GT-2)
sensor_type: ATC Semitec 104GT-2
sensor_pin: SHT36PRO:gpio26
###------------------------------------------------------------------
## If using PT1000, please connect the jumper next to the thermal sensitivity.
## 如果使用PT1000请将热敏旁边跳线接上
# sensor_type:PT1000
#pullup_resistor: 1000
#sensor_pin: SHT36PRO:gpio26
###------------------------------------------------------------------
## Using MAX31865 to connect PT100 or PT1000
## 使用MAX31865接PT100或者PT1000
#sensor_type: MAX31865
#sensor_pin: SHT36PRO:gpio1
#spi_software_sclk_pin: SHT36PRO:gpio10       
#spi_software_mosi_pin: SHT36PRO:gpio11
#spi_software_miso_pin: SHT36PRO:gpio12
#rtd_reference_r: 430

#####################################################################
#      extruder
#####################################################################
## https://www.klipper3d.org/Config_Reference.html#extruder
[extruder]
step_pin: SHT36PRO:gpio23
dir_pin: SHT36PRO:gpio24               # 挤出电机方向引脚设置
enable_pin: !SHT36PRO:gpio25
rotation_distance: 22.44
## rotation_distance = The original rotation_distance multiplied by the actual extrusion length divided by the requested extrusion length.
## 校准步进值: 22.44=旧值22*实际值102/目标值100
gear_ratio:50:17
## 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
microsteps:16
full_steps_per_rotation: 200   
nozzle_diameter:0.400
filament_diameter:1.75
heater_pin: SHT36PRO:gpio8
min_temp: -230
max_temp: 500
max_power: 1.0
min_extrude_temp: 150
pressure_advance: 0.05
##Pressure in advance
##压力提前
##https://www.klipper3d.org/zh/Pressure_Advance.html
pressure_advance_smooth_time: 0.040
#max_extrude_only_distance: 200.0   # 挤出流量报错可以注释这个，但是建议重新切片
#喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
control = pid
pid_kp = 26.213
pid_ki = 1.304
pid_kd = 131.721
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc5160 extruder] 
cs_pin: SHT36PRO:gpio20
spi_software_sclk_pin: SHT36PRO:gpio10       
spi_software_mosi_pin: SHT36PRO:gpio11
spi_software_miso_pin: SHT36PRO:gpio12
interpolate: False
run_current: 0.8
sense_resistor: 0.075
stealthchop_threshold: 0

#####################################################################
#      FAN
#####################################################################
[fan]
pin: SHT36PRO:gpio15 
#--------------------------------------------------------------------
[heater_fan hotend_fan]
pin: SHT36PRO:gpio14
heater: extruder
heater_temp: 50.0

#####################################################################
#      X STOP
#####################################################################
# [stepper_x]
# endstop_pin: !SHT36PRO:gpio21
## SHT V2板有PA1,PA2两个限位引脚可用，按照实际接线修改配置
## PA1引脚默认支持高压输入，可用于12v的接近传感器等。可通过跳线帽配置PA1为普通限位引脚

#####################################################################
#      Stealthburner LED
#####################################################################
## https://github.com/VoronDesign/Voron-Stealthburner/tree/main
[neopixel sb_leds]
pin: SHT36PRO:gpio6
chain_count: 3
# Number of LEDs
# 灯珠数量
color_order: GRB
initial_RED: 0.4    
initial_GREEN: 0.8
initial_BLUE: 1
initial_WHITE: 0.0
#66CCFF 

#####################################################################
#      TAP && PL08N && BLTOUCH 
#####################################################################
## https://www.klipper3d.org/Config_Reference.html?h=probe#probe
# [probe]
# pin: ^SHT36PRO:gpio3
# x_offset: 0
# y_offset: 25.0
# z_offset: 0 
# speed: 10.0
# samples: 3
# samples_result: median
# sample_retract_dist: 4.0
# samples_tolerance: 0.010
# samples_tolerance_retries: 3 

#--------------------------------------------------------------------
## https://www.klipper3d.org/Config_Reference.html?h=probe#bltouch
# [bltouch]
# sensor_pin: ^SHT36PRO:gpio3
# control_pin: SHT36PRO:gpio7 
# x_offset: -26.1
# y_offset: -15.3
# z_offset: 2.1

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
# cs_pin: SHT36PRO:gpio17
# spi_bus: spi1
# #spi_software_sclk_pin: SHT36PRO:gpio10
# #spi_software_mosi_pin: SHT36PRO:gpio11
# #spi_software_miso_pin: SHT36PRO:gpio12

```





