```cfg
####################################################################################
#                         3D MELLOW /（需要自行添加）                                #
####################################################################################
## Fly-DP5资料网址：https://mellow.klipper.cn/#/board/fly_dp5/README
## Fly-DP5原理图网址：https://mellow.klipper.cn/#/board/fly_dp5/schematic
## FLY 官方淘宝店：https://shop126791347.taobao.com/shop/view_shop.htm?spm=a230r.1.14.4.1a4840a8hyvpPJ&user_number_id=2464680006
## 如需售后，请联系淘宝客服
## FLY 售后技术支持群：621032883
## FLY-RRF固件交流群：786561979

#####################################################################
#                               注意事项                             #
#####################################################################
##***需要更改/检查的事项：***
## MCU 路径                                [mcu] 
## 打印机活动范围                           xyz的position   
## 热敏电阻类型                             [extruder] 和 [heater_bed]
## Z轴限位开关停止位置                      [safe_z_home] 
## Z轴限位开关偏移位置                      [stepper_z] 
## PID 校准                                [extruder] 和 [heater_bed] 
## 微调挤出机电机步进值                     [extruder] 

#####################################################################
#                               文件调用                             #
#####################################################################
#[include fluidd.cfg]          # FLUIDD调用文件。
#[include mainsail.cfg]        # MAINSDIL调用文件。
#需要自行确定使用哪个文件

#####################################################################
#                               主板配置                             #
#####################################################################
[mcu]                           # FLY主板ID
serial: /dev/serial/by-id/usb-Klipper_stm32f072xb_************************
### 查询usb固件id是：ls /dev/serial/by-id/
### 把/dev/serial/by-id/usb-Klipper_stm32f072xb_************************替换查询到的id
#canbus_uuid: e51d5c71a901
### 查询can固件id是：~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
### can的id需要把serial替换成canbus_uuid: 后面添加id 

#####################################################################
#                            机型和加速度                            #
#####################################################################
[printer]                       # 打印机设置
kinematics: corexy               # 运动学结构分为：笛卡尔和corexy等等。笛卡尔：cartesian
max_velocity: 300               # 打印机最大速度   
max_accel: 3000                 # 最大加速度 最大3000
max_z_velocity: 15              # z轴最大速度
max_z_accel: 100                # z轴最大加速度
square_corner_velocity: 5.0     # 方形拐角速度，小一点可以有效避免平台重带来的惯性

#####################################################################
#                             温度监控                               #
#####################################################################
[temperature_sensor Fly-D5]       # FLY主板温度
sensor_type: temperature_mcu      # 关联mcu（默认）
#--------------------------------------------------------------------
[temperature_sensor FLY-π]        # 上位机温度
sensor_type: temperature_host     # 关联上位机

#####################################################################
#                              热床网格校准
#####################################################################
[bed_mesh]
speed: 50                    # 校准速度
horizontal_move_z: 5         # 探针前往下一个点之前Z需要抬升的高
mesh_min: 30,30              # 最小校准点坐标x，y
mesh_max: 270, 270           # 最大校准点坐标x，y
probe_count: 4,4             # 采样点数（4X4为16点）
mesh_pps: 2,2                # 补充采样点数
algorithm: bicubic           # 算法模型
bicubic_tension: 0.2         # 算法插值不要动

#####################################################################
#             X/Y步进电机设置 (X/Y Stepper Settings)                 # 
#####################################################################
#                       B__________A
#                            Z0
# 
#                          12864      

#####################################################################
#                            机型和加速度                            #
#####################################################################
[printer]
kinematics: corexy
max_velocity: 200
max_accel: 2000
max_z_velocity: 15
max_z_accel: 300
square_corner_velocity: 6.0

#####################################################################
#   X 轴步进电机     (B 电机)
#####################################################################
## [stepper x] = B电机
[stepper_x]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
rotation_distance: 40
microsteps: 32
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin:
position_endstop: 120
position_max: 120
homing_speed: 40                                  # 对于无传感器归位，建议不要超过40mm/s 
homing_retract_dist: 0
homing_positive_dir: true
#--------------------------------------------------------------------
[tmc2209 stepper_x]
uart_pin: 
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
#diag_pin: ^                         # 无限位引脚，这与主板其中一个限位相连
#driver_SGTHRS: 255  			     # 这个设置为255，是无传感器归位的最大灵敏度，你稍后需要调整这个值。
## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2
#--------------------------------------------------------------------
[tmc5160 stepper_z]                 # 挤出机驱动配置- TMC5160
cs_pin: PB0
spi_bus:spi3 
run_current: 1.0            
interpolate: False
sense_resistor: 0.033               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle


#####################################################################
#   Y 轴步进电机     (A 电机)
#####################################################################
## [stepper Y] = A电机
[stepper_y]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
rotation_distance: 40
microsteps: 32
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin:
position_endstop: 120
position_max: 120
homing_speed: 40                                  # 对于无传感器归位，建议不要超过40mm/s 
homing_retract_dist: 0
homing_positive_dir: true
#--------------------------------------------------------------------
[tmc2209 stepper_y]
uart_pin: 
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
#diag_pin: ^                         # 无限位引脚，这与主板其中一个限位相连
#driver_SGTHRS: 255  			     # 这个设置为255，是无传感器归位的最大灵敏度，你稍后需要调整这个值。
## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2
#--------------------------------------------------------------------
# [tmc5160 stepper_y]                 # 挤出机驱动配置- TMC5160
# cs_pin: 
# spi_bus:
# run_current: 0.0            
# # 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
# interpolate: False
# sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
# stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle
# #diag1_pin: ^!                      # 无限位引脚，这与主板其中一个限位相连
# #driver_SGT: -64                    # -64是最敏感的值，63是最不敏感的值
# ## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2

#####################################################################
#   Z 轴步进电机
#####################################################################
[stepper_z]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
rotation_distance: 8                              # 丝杆导程为 8
microsteps: 32
endstop_pin:
position_endstop: 120
position_max: 120
position_min: -1.5
homing_speed: 20
second_homing_speed: 3.0
homing_retract_dist: 3.0
#--------------------------------------------------------------------
[tmc2209 stepper_z]
uart_pin: 
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
#diag_pin: ^                         # 无限位引脚，这与主板其中一个限位相连
#driver_SGTHRS: 255  			     # 这个设置为255，是无传感器归位的最大灵敏度，你稍后需要调整这个值。
## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2
# --------------------------------------------------------------------
# [tmc5160 stepper_z]                 # 挤出机驱动配置- TMC5160
# cs_pin: 
# spi_bus:
# run_current: 0.0            
# # 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
# interpolate: False
# sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
# stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle
# #diag1_pin: ^!                      # 无限位引脚，这与主板其中一个限位相连
# #driver_SGT: -64                    # -64是最敏感的值，63是最不敏感的值
# ## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2

#####################################################################
#   挤出机
#####################################################################
[extruder]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）                                  
rotation_distance: 22.44
## 执行挤出机校准时，更新以下值
## 比如你要求100毫米的进料，但实际上是102：
## rotation_distance = <旧rotation_distance> * <实际挤出长度> / <请求的挤出长度>
## 校准步进值: 22.44=旧值22*实际值102/目标值100
gear_ratio: 50:10                                 # 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
microsteps: 32
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin:                                       # 加热棒引脚
#sensor_type:
## 检查你有哪些热敏电阻。参考 https://www.klipper3d.org/zh/Config_Reference.html#common-thermistors 以获取常见热敏电阻类型。
## 传感器型号一般是(generic 3950, ATC Semitec 104GT-2， PT1000)
sensor_pin:                                       # 热敏引脚
min_temp: -200                                    # 最小温度
max_temp: 300                                     # 最大温度
min_extrude_temp: 170                             # 最小挤出温度
max_extrude_only_distance: 150
max_extrude_cross_section: 0.8
pressure_advance: 0.0                             # 压力提前，需要手动调整
pressure_advance_smooth_time: 0.040
control = pid
pid_kp = 26.213
pid_ki = 1.304
pid_kd = 131.721
# 在初始检查后进行PID校准
# 喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
##--------------------------------------------------------------------
[tmc2209 extruder]
uart_pin: PB6
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
##--------------------------------------------------------------------
# [tmc5160 stepper_z]                 # 挤出机驱动配置- TMC5160
# cs_pin: 
# spi_bus:
# run_current: 0.0            
# # 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
# interpolate: False
# sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
# stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle

#####################################################################
#   热床配置
#####################################################################
[heater_bed]
heater_pin:                            # 加热棒引脚
#sensor_type:
## 检查你有哪些热敏电阻。参考 https://www.klipper3d.org/zh/Config_Reference.html#common-thermistors 以获取常见热敏电阻类型。
## 传感器型号一般是(generic 3950, ATC Semitec 104GT-2， PT1000)
smooth_time: 3.0
#max_power: 1.0                                                     # 热床输出功率
min_temp: 0
max_temp: 120
control: pid
pid_kp: 68.453
pid_ki: 2.749
pid_kd: 426.122
# 在初始检查后进行PID校准
# 热床温度PID校准命令：  "PID_CALIBRATE HEATER=heater_bed TARGET=60"

#####################################################################
#   风扇配置
#####################################################################
[heater_fan hotend_fan]      # 喉管冷却风扇
pin:
max_power: 1.0               # 最大转速
kick_start_time: 0.5         # 根据您使用的风扇，如果您的风扇无法启动，则可能需要增加此值
heater: extruder
heater_temp: 50
##--------------------------------------------------------------------
[fan]                        # 模型冷却风扇 
pin:
max_power: 1.0
kick_start_time: 0.5         # 根据您使用的风扇，如果您的风扇无法启动，则可能需要增加此值
off_below: 0.13
cycle_time: 0.010

#####################################################################
#   断料传感器
#####################################################################

#[filament_switch_sensor Filament_Runout_Sensor]
#pause_on_runout: True
#runout_gcode: PAUSE
#switch_pin: 

#####################################################################
#   归位和龙门调整程序
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


#[safe_z_home]                      # 仅当您使用V0.0或V0.1 Z端限位位置时需要。
#home_xy_position: 120,120
#speed: 50.0
#z_hop: 5

#####################################################################
# LED
#####################################################################

[neopixel board_rgb]
pin:PA8
chain_count: 1
color_order: GRB
initial_RED: 0.0
initial_GREEN: 0.1
initial_BLUE: 0.0

#####################################################################
#   V0 Display
#####################################################################
# [mcu display]
# serial: **PASTE YOUR SERIAL PORT HERE AND UNCOMMENT**
# restart_method: command

# [display]
# lcd_type: sh1106
# i2c_mcu: display
# i2c_bus: i2c1a
# # Set the direction of the encoder wheel
# #   Standard: Right (clockwise) scrolls down or increases values. Left (counter-clockwise scrolls up or decreases values.
# encoder_pins: ^display:PA3, ^display:PA4
# #   Reversed: Right (clockwise) scrolls up or decreases values. Left (counter-clockwise scrolls down or increases values.
# #encoder_pins: ^display:PA4, ^display:PA3
# click_pin: ^!display:PA1
# kill_pin: ^!display:PA5
# #x_offset: 2
# #   Use X offset to shift the display towards the right. Value can be 0 to 3
# #vcomh: 0
# #   Set the Vcomh value on SSD1306/SH1106 displays. This value is
# #   associated with a "smearing" effect on some OLED displays. The
# #   value may range from 0 to 63. Default is 0.
# #   Adjust this value if you get some vertical stripes on your display. (31 seems to be a good value)

# [neopixel displayStatus]
# pin: display:PA0
# chain_count: 1
# color_order: GRB
# initial_RED: 0.2
# initial_GREEN: 0.05
# initial_BLUE: 0

#####################################################################
# 自定义宏
#####################################################################
[gcode_macro PRINT_START]
# 将PRINT_START用于切片机启动脚本 - 请根据您的选择进行自定义。
gcode:
    G28                            ; home all axes
    G90                            ; absolute positioning    
    G1 Z20 F3000                   ; move nozzle away from bed
   
[gcode_macro PRINT_END]
# 将PRINT_END用于切片机结束脚本 - 请根据您的选择进行自定义。
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
   G1 E-40 F1800                  ; retract some, but not too much or it will jam
   M82                            ; set extruder to absolute

[gcode_macro _HOME_X]
gcode:
    # Always use consistent run_current on A/B steppers during sensorless homing
    {% set RUN_CURRENT_X = printer.configfile.settings['tmc2209 stepper_x'].run_current|float %}
    {% set RUN_CURRENT_Y = printer.configfile.settings['tmc2209 stepper_y'].run_current|float %}
    {% set HOME_CURRENT_RATIO = 0.7 %} adjust this value if you are having trouble with skipping while homing
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_X}# by default we are dropping the motor current during homing. you can 
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_Y}

    # Home
    G28 X
    # Move away
    G91
    G1 X-10 F1200
    
    # Wait just a second… (give StallGuard registers time to clear)
    G4 P1000
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
    G1 Y-10 F1200

    # Wait just a second… (give StallGuard registers time to clear)
    G4 P1000
    G90
    # Set current during print
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={RUN_CURRENT_X}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={RUN_CURRENT_Y}



[gcode_macro _HOME_Z]
gcode:
    G90
    G28 Z
    G1 Z30#####################################################################
#                            机型和加速度                            #
#####################################################################
[printer]
kinematics: corexy
max_velocity: 200
max_accel: 2000
max_z_velocity: 15
max_z_accel: 300
square_corner_velocity: 6.0

#####################################################################
#   X 轴步进电机     (B 电机)
#####################################################################
## [stepper x] = B电机
[stepper_x]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
rotation_distance: 40
microsteps: 32
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin:
position_endstop: 120
position_max: 120
homing_speed: 40                                  # 对于无传感器归位，建议不要超过40mm/s 
homing_retract_dist: 0
homing_positive_dir: true
#--------------------------------------------------------------------
[tmc2209 stepper_x]
uart_pin: 
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
#diag_pin: ^                         # 无限位引脚，这与主板其中一个限位相连
#driver_SGTHRS: 255  			     # 这个设置为255，是无传感器归位的最大灵敏度，你稍后需要调整这个值。
## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2
#--------------------------------------------------------------------
[tmc5160 stepper_z]                 # 挤出机驱动配置- TMC5160
cs_pin: PB0
spi_bus:spi3 
run_current: 1.0            
interpolate: False
sense_resistor: 0.033               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle


#####################################################################
#   Y 轴步进电机     (A 电机)
#####################################################################
## [stepper Y] = A电机
[stepper_y]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
rotation_distance: 40
microsteps: 32
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin:
position_endstop: 120
position_max: 120
homing_speed: 40                                  # 对于无传感器归位，建议不要超过40mm/s 
homing_retract_dist: 0
homing_positive_dir: true
#--------------------------------------------------------------------
[tmc2209 stepper_y]
uart_pin: 
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
#diag_pin: ^                         # 无限位引脚，这与主板其中一个限位相连
#driver_SGTHRS: 255  			     # 这个设置为255，是无传感器归位的最大灵敏度，你稍后需要调整这个值。
## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2
#--------------------------------------------------------------------
# [tmc5160 stepper_y]                 # 挤出机驱动配置- TMC5160
# cs_pin: 
# spi_bus:
# run_current: 0.0            
# # 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
# interpolate: False
# sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
# stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle
# #diag1_pin: ^!                      # 无限位引脚，这与主板其中一个限位相连
# #driver_SGT: -64                    # -64是最敏感的值，63是最不敏感的值
# ## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2

#####################################################################
#   Z 轴步进电机
#####################################################################
[stepper_z]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
rotation_distance: 8                              # 丝杆导程为 8
microsteps: 32
endstop_pin:
position_endstop: 120
position_max: 120
position_min: -1.5
homing_speed: 20
second_homing_speed: 3.0
homing_retract_dist: 3.0
#--------------------------------------------------------------------
[tmc2209 stepper_z]
uart_pin: 
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
#diag_pin: ^                         # 无限位引脚，这与主板其中一个限位相连
#driver_SGTHRS: 255  			     # 这个设置为255，是无传感器归位的最大灵敏度，你稍后需要调整这个值。
## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2
# --------------------------------------------------------------------
# [tmc5160 stepper_z]                 # 挤出机驱动配置- TMC5160
# cs_pin: 
# spi_bus:
# run_current: 0.0            
# # 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
# interpolate: False
# sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
# stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle
# #diag1_pin: ^!                      # 无限位引脚，这与主板其中一个限位相连
# #driver_SGT: -64                    # -64是最敏感的值，63是最不敏感的值
# ## https://www.klipper3d.org/zh/TMC_Drivers.html?h=%E9%99%90%E4%BD%8D#_2

#####################################################################
#   挤出机
#####################################################################
[extruder]
step_pin: 
dir_pin:                                          # 电机方向，如果需要反转则在dir_pin: 后面添加!
enable_pin: 
full_steps_per_rotation: 200                      # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）                                  
rotation_distance: 22.44
## 执行挤出机校准时，更新以下值
## 比如你要求100毫米的进料，但实际上是102：
## rotation_distance = <旧rotation_distance> * <实际挤出长度> / <请求的挤出长度>
## 校准步进值: 22.44=旧值22*实际值102/目标值100
gear_ratio: 50:10                                 # 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
microsteps: 32
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin:                                       # 加热棒引脚
#sensor_type:
## 检查你有哪些热敏电阻。参考 https://www.klipper3d.org/zh/Config_Reference.html#common-thermistors 以获取常见热敏电阻类型。
## 传感器型号一般是(generic 3950, ATC Semitec 104GT-2， PT1000)
sensor_pin:                                       # 热敏引脚
min_temp: -200                                    # 最小温度
max_temp: 300                                     # 最大温度
min_extrude_temp: 170                             # 最小挤出温度
max_extrude_only_distance: 150
max_extrude_cross_section: 0.8
pressure_advance: 0.0                             # 压力提前，需要手动调整
pressure_advance_smooth_time: 0.040
control = pid
pid_kp = 26.213
pid_ki = 1.304
pid_kd = 131.721
# 在初始检查后进行PID校准
# 喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
##--------------------------------------------------------------------
[tmc2209 extruder]
uart_pin: PB6
interpolate: False
#run_current: 0.0            
## 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
sense_resistor: 0.110
stealthchop_threshold: 0             # 设置为999999以启用隐形斩波，0则使用spreadcycle
##--------------------------------------------------------------------
# [tmc5160 stepper_z]                 # 挤出机驱动配置- TMC5160
# cs_pin: 
# spi_bus:
# run_current: 0.0            
# # 你需要使用公式（额定电机电流 * 0.707 = 最大运行电流）来计算运行电流值，起始值约为最大值的60%-70%
# interpolate: False
# sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
# stealthchop_threshold: 0            # 设置为999999以启用隐形斩波，0则使用spreadcycle

#####################################################################
#   热床配置
#####################################################################
[heater_bed]
heater_pin:                            # 加热棒引脚
#sensor_type:
## 检查你有哪些热敏电阻。参考 https://www.klipper3d.org/zh/Config_Reference.html#common-thermistors 以获取常见热敏电阻类型。
## 传感器型号一般是(generic 3950, ATC Semitec 104GT-2， PT1000)
smooth_time: 3.0
#max_power: 1.0                                                     # 热床输出功率
min_temp: 0
max_temp: 120
control: pid
pid_kp: 68.453
pid_ki: 2.749
pid_kd: 426.122
# 在初始检查后进行PID校准
# 热床温度PID校准命令：  "PID_CALIBRATE HEATER=heater_bed TARGET=60"

#####################################################################
#   风扇配置
#####################################################################
[heater_fan hotend_fan]      # 喉管冷却风扇
pin:
max_power: 1.0               # 最大转速
kick_start_time: 0.5         # 根据您使用的风扇，如果您的风扇无法启动，则可能需要增加此值
heater: extruder
heater_temp: 50
##--------------------------------------------------------------------
[fan]                        # 模型冷却风扇 
pin:
max_power: 1.0
kick_start_time: 0.5         # 根据您使用的风扇，如果您的风扇无法启动，则可能需要增加此值
off_below: 0.13
cycle_time: 0.010

#####################################################################
#   断料传感器
#####################################################################

#[filament_switch_sensor Filament_Runout_Sensor]
#pause_on_runout: True
#runout_gcode: PAUSE
#switch_pin: 

#####################################################################
#   归位和龙门调整程序
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


#[safe_z_home]                      # 仅当您使用V0.0或V0.1 Z端限位位置时需要。
#home_xy_position: 120,120
#speed: 50.0
#z_hop: 5

#####################################################################
# LED
#####################################################################

[neopixel tmc_rgb]
pin:PA8
pin: PA8                    # 信号接口
chain_count: 50             # 灯珠数量
color_order: GRB            # 灯珠类型
initial_RED: 0.0118
initial_GREEN: 0.0235
initial_BLUE: 0.0314
initial_WHITE: 0.0    

#####################################################################
#   V0 Display
#####################################################################
# [mcu display]
# serial: **PASTE YOUR SERIAL PORT HERE AND UNCOMMENT**
# restart_method: command

# [display]
# lcd_type: sh1106
# i2c_mcu: display
# i2c_bus: i2c1a
# # Set the direction of the encoder wheel
# #   Standard: Right (clockwise) scrolls down or increases values. Left (counter-clockwise scrolls up or decreases values.
# encoder_pins: ^display:PA3, ^display:PA4
# #   Reversed: Right (clockwise) scrolls up or decreases values. Left (counter-clockwise scrolls down or increases values.
# #encoder_pins: ^display:PA4, ^display:PA3
# click_pin: ^!display:PA1
# kill_pin: ^!display:PA5
# #x_offset: 2
# #   Use X offset to shift the display towards the right. Value can be 0 to 3
# #vcomh: 0
# #   Set the Vcomh value on SSD1306/SH1106 displays. This value is
# #   associated with a "smearing" effect on some OLED displays. The
# #   value may range from 0 to 63. Default is 0.
# #   Adjust this value if you get some vertical stripes on your display. (31 seems to be a good value)

# [neopixel displayStatus]
# pin: display:PA0
# chain_count: 1
# color_order: GRB
# initial_RED: 0.2
# initial_GREEN: 0.05
# initial_BLUE: 0

#####################################################################
# 自定义宏
#####################################################################
[gcode_macro PRINT_START]
# 将PRINT_START用于切片机启动脚本 - 请根据您的选择进行自定义。
gcode:
    G28                            ; home all axes
    G90                            ; absolute positioning    
    G1 Z20 F3000                   ; move nozzle away from bed
   
[gcode_macro PRINT_END]
# 将PRINT_END用于切片机结束脚本 - 请根据您的选择进行自定义。
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
   G1 E-40 F1800                  ; retract some, but not too much or it will jam
   M82                            ; set extruder to absolute

[gcode_macro _HOME_X]
gcode:
    # Always use consistent run_current on A/B steppers during sensorless homing
    {% set RUN_CURRENT_X = printer.configfile.settings['tmc2209 stepper_x'].run_current|float %}
    {% set RUN_CURRENT_Y = printer.configfile.settings['tmc2209 stepper_y'].run_current|float %}
    {% set HOME_CURRENT_RATIO = 0.7 %} adjust this value if you are having trouble with skipping while homing
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_X}# by default we are dropping the motor current during homing. you can 
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={HOME_CURRENT_RATIO * RUN_CURRENT_Y}

    # Home
    G28 X
    # Move away
    G91
    G1 X-10 F1200
    
    # Wait just a second… (give StallGuard registers time to clear)
    G4 P1000
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
    G1 Y-10 F1200

    # Wait just a second… (give StallGuard registers time to clear)
    G4 P1000
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

