# 7. FLY-SB2040 v3配置参考

> [!TIP]
>
> 请将[include SB2040.cfg]添加到printer.cfg下

[下载链接](https://cdn.mellow.klipper.cn/FLY_Config/SB2040.cfg)

```cfg

#####################################################################
# 	 Notes
#####################################################################
## 请将[include SB2040.cfg]添加到printer.cfg下
## Please add [include SB2040.cfg] under printer.cfg
## 工具板将使用以下几种配置，如果其他配置中使用到下面的配置可能会冲突
## The tool plate will use the following configurations, 
## and if the following configurations are used in other configurations, conflicts may occur.
## [resonance_tester] && [extruder] && [tmc2209 extruder] && [fan] && [heater_fan my_hotend_fan]
## [probe] && [bltouch] && [stepper_x]

#####################################################################
# 	 Master ID Configuration
#####################################################################
[mcu SB2040]  # 工具主板序列号
## CAN ID
## ~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
canbus_uuid: 
#--------------------------------------------------------------------
# # RS232 ID
## 请根据固件配置填写波特率
## Please fill in the baud rate according to the firmware configuration.
# serial: /dev/serial/by-path/platform-1c1c000.usb-usb-0:1.2:1.0-port0
# baud: 250000
# restart_method:command

#####################################################################
# 	 Temperature monitoring
#####################################################################
[temperature_sensor SB2040]
sensor_type: temperature_mcu
sensor_mcu: SB2040

#####################################################################
# 	 Accelerometer
#####################################################################
## https://www.klipper3d.org/Measuring_Resonances.html?h=adxl#adxl345
[lis2dw]
cs_pin: SB2040:gpio12
spi_software_sclk_pin: SB2040:gpio2
spi_software_mosi_pin: SB2040:gpio3
spi_software_miso_pin: SB2040:gpio4
#--------------------------------------------------------------------
[resonance_tester]
accel_chip: lis2dw
probe_points: 150, 150, 20
# Somewhere slightly above the middle of your print bed
# 在打印床的中间稍微偏上的位置
min_freq: 5
max_freq: 133
accel_per_hz: 75
hz_per_sec: 1 

#####################################################################
# 	 Stealthburner LED
#####################################################################
## https://github.com/VoronDesign/Voron-Stealthburner/tree/main
[neopixel sb_leds]
pin: SB2040:gpio26
chain_count: 16
# Number of LEDs
# 灯珠数量
color_order: GRB
initial_RED: 0.4    #66CCFF
initial_GREEN: 0.8
initial_BLUE: 1
initial_WHITE: 0.0

#####################################################################
# 	 Extruder thermal sensitivity
#####################################################################
## Please select the type of thermocouple you want to use.
## 请根据你想要使用的热敏选择
[extruder]
## Type of sensor - common thermistors are (Generic 3950, ATC Semitec 104GT-2)
## 传感器类型-常见的热敏电阻器是 (Generic 3950, ATC Semitec 104GT-2)
sensor_type:ATC Semitec 104GT-2
sensor_pin:SB2040:gpio27
###------------------------------------------------------------------
## If using PT1000, please connect the jumper next to the thermal sensitivity.
## 如果使用PT1000请将热敏旁边跳线接上
# sensor_type:PT1000
# sensor_pin:SB2040:gpio27
# pullup_resistor: 1000
###------------------------------------------------------------------
## Using MAX31865 to connect PT100 or PT1000
## 使用MAX31865接PT100或者PT1000
# sensor_type: MAX31865
# sensor_pin: SB2040:gpio17
# spi_software_sclk_pin: SB2040:gpio2
# spi_software_mosi_pin: SB2040:gpio3
# spi_software_miso_pin: SB2040:gpio4
# rtd_reference_r: 430

#####################################################################
# 	 extruder
#####################################################################
## https://www.klipper3d.org/Config_Reference.html#extruder
[extruder]
step_pin:SB2040:gpio14
dir_pin:SB2040:gpio13
enable_pin: !SB2040:gpio16
rotation_distance: 21.84
## rotation_distance = The original rotation_distance multiplied by the actual extrusion length divided by the requested extrusion length.
## 校准步进值: 22.44=旧值22*实际值102/目标值100
gear_ratio:50:10
## 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
microsteps:16
full_steps_per_rotation: 200   
nozzle_diameter:0.400
filament_diameter:1.75
heater_pin:SB2040:gpio23
min_temp:-200
max_temp:99999999999999999999
max_power:1.0
min_extrude_temp:10
pressure_advance: 0.05
pressure_advance_smooth_time: 0.040
#max_extrude_only_distance: 200.0   # 挤出流量报错可以注释这个，但是建议重新切片
#喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
control: pid
pid_kp: 26.213
pid_ki:1.304
pid_kd: 131.721
step_pulse_duration: 0.000004
###------------------------------------------------------------------
[tmc2209 extruder]
uart_pin:SB2040:gpio15
interpolate:False
run_current: 0.8
sense_resistor:0.110
stealthchop_threshold:0
##------------------------------------------------------------------
# [tmc2240 extruder]
# uart_pin:SB2040:gpio15
# interpolate:False
# run_current: 0.65
# interpolate: False
# rref: 12300
# stealthchop_threshold: 0 

###------------------------------------------------------------------
[verify_heater extruder]
max_error: 20
check_gain_time:120
hysteresis: 50
heating_gain: 2


#####################################################################
# 	 FAN
#####################################################################
[fan]
pin:SB2040:gpio24
###------------------------------------------------------------------
[heater_fan my_hotend_fan]
pin: SB2040:gpio19
heater: extruder
heater_temp: 50.0

#####################################################################
# 	 TAP && PL08N && BLTOUCH 
#####################################################################
# [stepper_x]
# endstop_pin: ^!SB2040:gpio16

# #####################################################################
# # 	 TAP && PL08N && BLTOUCH 
# #####################################################################
# ## https://www.klipper3d.org/Config_Reference.html?h=probe#probe
# [probe]
# pin: ^SB2040:gpio22          #gpio22
# x_offset: 0
# y_offset: 25.0
# z_offset: 0
# speed: 10.0
# samples: 3
# samples_result: median
# sample_retract_dist: 4.0
# samples_tolerance: 0.010
# samples_tolerance_retries: 3
