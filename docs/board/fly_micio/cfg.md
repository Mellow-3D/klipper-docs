## Voron 0.2 参考配置

```cfg
####################################################################################
#                                         3D MELLOW                                #
####################################################################################
## Fly#C8资料网址：http://mellow.klipper.cn/#/board/fly_micio/README
## Fly#C8原理图网址：http://mellow.klipper.cn/#/board/fly_micio/schematic
## FLY 官方淘宝店：https://shop126791347.taobao.com/shop/view_shop.htm?spm=a230r.1.14.4.1a4840a8hyvpPJ&user_number_id=2464680006
## 如需售后，请联系淘宝客服
## FLY 售后技术支持群：621032883
## FLY#RRF固件交流群：786561979

#####################################################################
#      Notes
#####################################################################
##***需要更改/检查的事项：***
## MCU 路径                                [mcu] 
## 打印机活动范围                           xyz的position   
## 热敏电阻类型                             [extruder] 和 [heater_bed]
## Z轴限位开关停止位置                      [safe_z_home] 
## Z轴限位开关偏移位置                      [stepper_z] 
## PID 校准                               [extruder] 和 [heater_bed] 
## 微调挤出机电机步进值                     [extruder] 

#####################################################################
#      file invocation
#####################################################################
[include fluidd.cfg]          # FLUIDD调用文件。
#[include mainsail.cfg]        # MAINSDIL调用文件。
#需要自行确定使用哪个文件

#####################################################################
#      Master ID Configuration
#####################################################################
[mcu]
serial: /dev/serial/by-id/usb-Klipper_rp2040_MELLOW-if00
### 查询usb固件id是：ls /dev/serial/by-id/*
### 把/dev/serial/by-id/usb-Klipper_rp2040_MELLOW-if00替换查询到的id
#canbus_uuid: 114514114514
### 查询can固件id是：~/klippy#env/bin/python ~/klipper/scripts/canbus_query.py can0
### can的id需要把serial替换成canbus_uuid: 后面添加id 

#####################################################################
#      Temperature monitoring
#####################################################################
[temperature_sensor Micio4]        #显示主板的温度
sensor_type: temperature_mcu
#####################################################################
# [temperature_sensor lite2]       #上位机温度
# sensor_type: temperature_host

#####################################################################
#      Tmodel and acceleration
#####################################################################
[printer]
kinematics: corexy
max_velocity: 200
max_accel: 2000
max_z_velocity: 15
max_z_accel: 300
square_corner_velocity: 6.0

#####################################################################
#      X/Y Stepper Settings
#####################################################################

[stepper_x]
## Refer to https://docs.vorondesign.com/build/startup/#v0
step_pin: gpio6
dir_pin:gpio3                                    # Check motor direction in link above. If inverted, add a ! before gpio3 
enable_pin:!gpio7
rotation_distance: 40
microsteps: 32
full_steps_per_rotation: 200                    # Set to 400 for 0.9° degree stepper motor, 200 is for 1.8° stepper motors
endstop_pin: tmc2209_stepper_x:virtual_endstop
position_endstop: 120
position_max: 120
homing_speed: 40                                # for sensorless homing it is recommended not to go above 40mm/s   
homing_retract_dist: 0
homing_positive_dir: true

[tmc2209 stepper_x]
uart_pin:gpio9
uart_address:0
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0                        # Set to 999999 to turn stealthchop on, and 0 to use spreadcycle
diag_pin: ^gpio13
driver_SGTHRS: 80

[stepper_y]
## Refer to https://docs.vorondesign.com/build/startup/#v0
step_pin:gpio1
dir_pin:gpio0                                    # Check motor direction in link above. If inverted, add a ! before gpio0
enable_pin:!gpio2
rotation_distance: 40
microsteps: 32
full_steps_per_rotation: 200
endstop_pin: tmc2209_stepper_y:virtual_endstop
position_endstop: 120
position_max: 120
homing_speed: 40 
homing_retract_dist: 0
homing_positive_dir: true

[tmc2209 stepper_y]
uart_pin:gpio9
uart_address:1
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
diag_pin: ^gpio14
driver_SGTHRS: 80

#####################################################################
#   Z Stepper Settings
#####################################################################
[stepper_z]
## Refer to https://docs.vorondesign.com/build/startup/#v0
step_pin: gpio26
dir_pin:!gpio25                                    # Check motor direction in link above. If inverted, add a ! before gpio25
enable_pin: !gpio27
rotation_distance: 8
microsteps: 32
endstop_pin: ^gpio12
position_endstop: 105
position_max: 105
position_min: -1.5
homing_speed: 20
second_homing_speed: 3.0
homing_retract_dist: 3.0

[tmc2209 stepper_z]
uart_pin:gpio9
uart_address:2
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0

#####################################################################
#   Extruder
#####################################################################
[extruder]
## Type of sensor # common thermistors are (Generic 3950, ATC Semitec 104GT#2)
## 传感器类型#常见的热敏电阻器是 (Generic 3950, ATC Semitec 104GT#2)
sensor_type: ATC Semitec 104GT-2
sensor_pin: gpio28
#####################################################################
## If using PT1000, please connect the jumper next to the thermal sensitivity.
## 如果使用PT1000请将热敏旁边跳线接上
# sensor_type:PT1000
#pullup_resistor: 1100
#sensor_pin: gpio28

#####################################################################
#      extruder
#####################################################################
## https://www.klipper3d.org/Config_Reference.html#extruder
[extruder]
step_pin: gpio23
dir_pin: gpio22
enable_pin: !gpio24
rotation_distance: 21.84
## rotation_distance = The original rotation_distance multiplied by the actual extrusion length divided by the requested extrusion length.
## 校准步进值: 22.44=旧值22*实际值102/目标值100
gear_ratio:50:10
## 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
microsteps:16
full_steps_per_rotation: 200    
nozzle_diameter:0.400
filament_diameter:1.75
heater_pin: gpio20
min_temp: -50
max_temp: 300
max_power: 1.0
min_extrude_temp: 150
pressure_advance: 0.05
##Pressure in advance
##压力提前
##https://www.klipper3d.org/zh/Pressure_Advance.html
pressure_advance_smooth_time: 0.040
#max_extrude_only_distance: 200.0   # 挤出流量报错可以注释这个，但是建议重新切片
#喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
control: pid
pid_kp: 26.213
pid_ki:1.304
pid_kd: 131.721
step_pulse_duration: 0.000004

[tmc2209 extruder]
uart_pin:gpio9
uart_address:3
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0


#####################################################################
#   Bed Heater
#####################################################################
[heater_bed]
heater_pin: gpio21
## Check what thermistor type you have. See https://www.klipper3d.org/Config_Reference.html#common#thermistors for common thermistor types.
## Use "Generic 3950" for Keenovo heaters
sensor_type:Generic 3950
sensor_pin: gpio29
smooth_time: 3.0
#max_power: 0.6                                                     # Only needed for 100w pads
min_temp: -50
max_temp: 120
control: pid                                                        # Do PID calibration after initial checks
pid_kp: 68.453
pid_ki: 2.749
pid_kd: 426.122

#####################################################################
# Fan Control
#####################################################################
[fan]
pin: gpio16
max_power: 1.0
kick_start_time: 0.5                                                # Depending on your fan, you may need to increase this value if your fan will not start
off_below: 0.13
cycle_time: 0.010
#####################################################################
[heater_fan hotend_fan]
pin: gpio17
max_power: 1.0
kick_start_time: 0.5
heater: extruder
heater_temp: 50.0

#####################################################################
#   Filament Runout Sensor
#####################################################################
#[filament_switch_sensor Filament_Runout_Sensor]
#pause_on_runout: True
#runout_gcode: PAUSE
#switch_pin: gpio11


#####################################################################
# Homing and Gantry Adjustment Routines
#####################################################################

[idle_timeout]
timeout: 1800

[homing_override]
axes: xyz
set_position_z: 0
gcode:
   G90
   G0 Z5 F600
  {% set home_all = 'X' not in params and 'Y' not in params and 'Z' not in params %}

  {% if home_all or 'X' in params %}
    _HOME_X
  {% endif %}
  
  {% if home_all or 'Y' in params %}
    _HOME_Y
  {% endif %}
  
  {% if home_all or 'Z' in params %}
    _HOME_Z
  {% endif %}


#[safe_z_home]                      Only needed if you are using V0.0 or V0.1 Z endstop location
#home_xy_position: 120,120
#speed: 50.0
#z_hop: 5

## To be used with BED_SCREWS_ADJUST
[bed_screws]
screw1: 60,5
screw1_name: front screw
screw2: 5,115
screw2_name: back left
screw3: 115,115
screw3_name: back right
Probe_height: 0.1

#####################################################################
# Macros
#####################################################################

[gcode_macro PRINT_START]
#   Use PRINT_START for the slicer starting script # please customize for your slicer of choice
gcode:
    G28                            ; home all axes
    G90                            ; absolute positioning    
    G1 Z20 F3000                   ; move nozzle away from bed
   
[gcode_macro PRINT_END]
#   Use PRINT_END for the slicer ending script - please customize for your slicer of choice
gcode:
    M400                           ; wait for buffer to clear
    G92 E0                         ; zero the extruder
    G1 E-4.0 F3600                 ; retract filament
    G91                            ; relative positioning

    #   Get Boundaries
    {% set max_x = printer.configfile.config["stepper_x"]["position_max"]|float %}
    {% set max_y = printer.configfile.config["stepper_y"]["position_max"]|float %}
    {% set max_z = printer.configfile.config["stepper_z"]["position_max"]|float %}

    #   Check end position to determine safe direction to move
    {% if printer.toolhead.position.x < (max_x - 20) %}
        {% set x_safe = 20.0 %}
    {% else %}
        {% set x_safe = -20.0 %}
    {% endif %}

    {% if printer.toolhead.position.y < (max_y - 20) %}
        {% set y_safe = 20.0 %}
    {% else %}
        {% set y_safe = -20.0 %}
    {% endif %}

    {% if printer.toolhead.position.z < (max_z - 2) %}
        {% set z_safe = 2.0 %}
    {% else %}
        {% set z_safe = max_z - printer.toolhead.position.z %}
    {% endif %}

    G0 Z{z_safe} F3600             ; move nozzle up
    G0 X{x_safe} Y{y_safe} F20000  ; move nozzle to remove stringing
    TURN_OFF_HEATERS
    M107                           ; turn off fan
    G90                            ; absolute positioning
    G0 X60 Y{max_y-10} F3600          ; park nozzle at rear
  
[gcode_macro LOAD_FILAMENT]
gcode:
   M83                            ; set extruder to relative
   G1 E30 F300                    ; load
   G1 E15 F150                    ; prime nozzle with filament
   M82                            ; set extruder to absolute
    
[gcode_macro UNLOAD_FILAMENT]
gcode:
   M83                            ; set extruder to relative
   G1 E10 F300                    ; extrude a little to soften tip
   G1 E#40 F1800                  ; retract some, but not too much or it will jam
   M82                            ; set extruder to absolute

[gcode_macro _HOME_X]
gcode:
    # Always use consistent run_current on A/B steppers during sensorless homing
    {% set RUN_CURRENT_X = printer.configfile.settings['tmc2209 stepper_x'].run_current|float %}
    {% set RUN_CURRENT_Y = printer.configfile.settings['tmc2209 stepper_y'].run_current|float %}
    {% set HOME_CURRENT_RATIO = 0.7 %} # by default we are dropping the motor current during homing. you can adjust this value if you are having trouble with skipping while homing
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_X}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_Y}

    # Home
    G28 X
    # Move away
    G91
    G1 X#10 F1200
    
    # Wait for StallGuard registers to clear
    M400
    G90
    # Set current during print
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={RUN_CURRENT_X}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={RUN_CURRENT_Y}

[gcode_macro _HOME_Y]
gcode:
    # Set current for sensorless homing
    {% set RUN_CURRENT_X = printer.configfile.settings['tmc2209 stepper_x'].run_current|float %}
    {% set RUN_CURRENT_Y = printer.configfile.settings['tmc2209 stepper_y'].run_current|float %}
    {% set HOME_CURRENT_RATIO = 0.7 %} # by default we are dropping the motor current during homing. you can adjust this value if you are having trouble with skipping while homing
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_X}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_Y}

    # Home
    G28 Y
    # Move away
    G91
    G1 Y#10 F1200

    # Wait for StallGuard registers to clear
    M400
    G90
    # Set current during print
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={RUN_CURRENT_X}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={RUN_CURRENT_Y}

[gcode_macro _HOME_Z]
gcode:
    G90
    G28 Z
    G1 Z30
```









