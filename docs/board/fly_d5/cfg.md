```cfg
####################################################################################
#                         3D MELLOW /（需要自行添加）                                #
####################################################################################
## Fly-D5资料网址：
## Fly-D5原理图网址：
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
serial: /dev/serial/by-id/usb-Klipper_stm32f072xb_390017000551324742333420-if00
#USB固件不需要查询ID
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
#                  X 轴步进电机      (B电机)                       #
#####################################################################
## DRIVER0电机位置
[stepper_x]
step_pin: PC15                       # X轴电机脉冲引脚设置
dir_pin: PC14                        # X轴电机运行引脚设置,方向按实际判断，加感叹号会让运行方向反转
enable_pin: !PC2                   # X轴电机使能引脚设置,使能引脚需要加感叹号，否者电机不工作
rotation_distance: 40               # 主动带轮周长mm（2GT-20T带轮40，2GT-16T带轮32）
microsteps: 16                      # 电机细分设置，细分越高，质量越高，但主控负荷越大
full_steps_per_rotation: 200        # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin: PB4                    # 限位开关PIN脚,建议常闭接常闭
#endstop_pin: tmc5160_stepper_x:virtual_endstop        # 限位开关接口
###接常闭后是触发状态，加感叹号可以反转这个状态，万一断线时候可以避免撞机
position_min: 0                     # 软限位最小行程
position_endstop: 300               # 软限位最大行程 (250mm-300mm-350mm)
position_max: 300                   # 机械限位最大行程 (250mm-300mm-350mm)
homing_speed: 200                   # 复位速度-最大 100
homing_retract_dist: 5              # 第一次触发复位开关之后的后退距离
homing_positive_dir: true           # 复位方向（一般不需要改动）
#--------------------------------------------------------------------
##  请确保驱动型号配置正确 (2208 or 2209)
[tmc2209 stepper_x]                 # x 驱动配置 -TMC2209
uart_pin: PC13                      # 通讯端口Pin脚定义
interpolate: False                  # 是否开启256微步插值（开启是True，关闭是False）
run_current: 0.8                    # 电机运行电流值（单位：mA）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 0            # 静音阀值（如果不需要静音，请将数值改为0）
#--------------------------------------------------------------------
# [tmc5160 stepper_x]                 # 挤出机驱动配置- TMC5160
# cs_pin: PC13                        # SPI 片选Pin脚定义
# spi_bus: spi2                       # SPI 通讯总线定义
# run_current: 1.0                    # 电机运行电流值
# interpolate: False                  # 是否开启256微步插值（开启是True，关闭是False）
# sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
# stealthchop_threshold: 0            # 静音阀值（如果不需要静音，请将数值改为0）

#####################################################################
#                  Y 轴步进电机      (A电机)                       #
#####################################################################
## DRIVER1电机位置
[stepper_y]
step_pin: PA1
dir_pin: PA0
enable_pin: !PA2
rotation_distance: 40
microsteps: 16                      # 电机细分设置，细分越高，质量越高，但主控负荷越大
full_steps_per_rotation: 200        # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin: !PB3                    # 限位开关PIN脚,建议常闭然后添加！反转状态
#endstop_pin: tmc5160_stepper_x:virtual_endstop        # 限位开关接口
###接常闭后是触发状态，加感叹号可以反转这个状态，万一断线时候可以避免撞机
position_min: 0
position_endstop: 300
position_max: 300
homing_speed: 200
homing_retract_dist: 5
homing_positive_dir: true
#--------------------------------------------------------------------
##  请确保驱动型号配置正确 (2209 or 5160)
[tmc2209 stepper_y]
uart_pin: PC3
interpolate: False                  # 是否开启256微步插值（开启是True，关闭是False）
run_current: 0.8                    # 电机运行电流值（单位：mA）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 0          # 静音阀值（如果不需要静音，请将数值改为0）
#--------------------------------------------------------------------
#[tmc5160 stepper_y]                 # 挤出机驱动配置- TMC5160
#cs_pin: PC3
#spi_bus: spi2                       # SPI 通讯总线定义
#run_current: 1.0                    # 电机运行电流值
#interpolate: False                  # 是否开启256微步插值（开启是True，关闭是False）
#sense_resistor: 0.075               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
#stealthchop_threshold: 0          # 静音阀值（如果不需要静音，请将数值改为0）

#####################################################################
#                     Z轴步进电机 （Z Stepper Settings）             #
#####################################################################
## DRIVER2电机位置
[stepper_z]
step_pin: PA5
dir_pin: !PA4
enable_pin: !PA6
rotation_distance: 40         # 主动轮周长mm （2GT-20T为 40mm  16T为 32mm）
gear_ratio: 80:16             # 减速比
microsteps: 32
endstop_pin: PD2             # 限位开关接口
position_max: 290             # 软限位最大行程 (240mm-290mm-340mm)
position_endstop: -0.5        
position_min: -5              # 软限位最小行程（配置喷嘴清洁需要-5左右）
homing_speed: 10              # 复位速度-最大 20
second_homing_speed: 3        # 二次复位速度-最大 10
homing_retract_dist: 3        # 后撤距离
#--------------------------------------------------------------------
[tmc2209 stepper_z]
uart_pin: PA3
interpolate: false
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0    # 静音阀值（如果不需要静音，请将数值改为0）
##--------------------------------------------------------------------
## DRIVER4电机位置
[stepper_z1]
step_pin: PC5
dir_pin:  PC4
enable_pin: !PB0
rotation_distance: 40
gear_ratio: 80:16
microsteps: 32
[tmc2209 stepper_z1]
uart_pin: PA7
interpolate: false
run_current: 1.0
sense_resistor: 0.110
stealthchop_threshold: 0    


#####################################################################
#                             挤出机配置
#####################################################################
## DRIVER7电机位置
[extruder]                          # 挤出机
step_pin:PB10
dir_pin:PB2
enable_pin: !PB11
microsteps: 16
full_steps_per_rotation: 200        # 单圈脉冲数 （200 为 1.8 度, 400 为 0.9 度）
rotation_distance: 22.52245         # 主动带轮周长mm
# 校准步进值: 23.1325301 = 旧值22.6789511*实际值102/目标值100
gear_ratio: 50:10                   # 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
nozzle_diameter: 0.400              # 喷嘴直径
filament_diameter: 1.750            # 耗材直径
heater_pin: PC6                     # 挤出头加热棒控制Pin脚设置(e0)
sensor_type: Generic 3950           # 传感器型号
sensor_pin: PC1                     # 挤出头传感器Pin脚（T_E0）
max_power: 1.0                      # 加热棒PWM最大输出功率
min_temp: -235                      # 挤出机最小温度
max_temp: 500                       # 挤出机最大温度
min_extrude_temp: 150               # 加热棒最低挤出温度（达到此温度挤出机才能有挤出动作）
pressure_advance: 0.04              # 挤出机压力提前参数
pressure_advance_smooth_time:0.040  # 平稳推进时间-默认值为0.040
#喷嘴温度PID校准命令：  "PID_CALIBRATE HEATER=extruder TARGET=245
control = pid
pid_kp = 26.213
pid_ki = 1.304
pid_kd = 131.721

[tmc2209 extruder]
uart_pin:PB1
interpolate: False
run_current: 0.6
sense_resistor: 0.110
stealthchop_threshold: 0            # 静音阀值（如果不需要静音，请将数值改为0）

#####################################################################
#                            热床配置
#####################################################################
[heater_bed]
heater_pin: PC7              # 热床接口
sensor_type: Generic 3950    # 热床传感器类型
sensor_pin: PC0              # 热床传感器接口
max_power: 1.0               # 热床功率
min_temp: -235               # 热床最小温度
max_temp: 500                # 热床最大温度
# 热床温度PID校准命令：  "PID_CALIBRATE HEATER=heater_bed TARGET=100"
control: pid
pid_kp: 58.437
pid_ki: 2.347
pid_kd: 363.769
#####################################################################
#                             风扇配置
#####################################################################
[fan]                        # 模型冷却风扇
pin:PC9
kick_start_time: 1.0         # 启动时间（勿动）
off_below: 0.10              # 勿动
max_power: 1.0
#--------------------------------------------------------------------
[heater_fan 喉管散热]         # 喉管冷却风扇
pin:PC8
max_power: 1.0
kick_start_time: 0.5         # 启动时间（勿动）
heater: extruder             # 关联的设备：挤出机
heater_temp: 50              # 挤出机达到多少度启动风扇
fan_speed: 1.0

#####################################################################
#                           闲置关闭热床                             #
#####################################################################
[idle_timeout]
timeout: 1800                # 空闲时间超过30分钟则关闭热床

#####################################################################
#                           调平传感器                               #
#####################################################################
#默认PL08N感应探头不低于喷嘴高度，仅用于调平,如果你的PL08N是NO（常开），请将更改pin添加到！
[probe]
pin: ^PB5                   # 限位开关PIN脚,建议常闭然后添加！反转状态,位置在io-2
x_offset: 0                  # X轴-传感器相对喷嘴偏移量
y_offset: 25.0               # Y轴-传感器相对喷嘴偏移量
z_offset: 0                  # Z轴-传感器相对喷嘴偏移量
speed: 10.0                  # 调平速度
samples: 3                   # 采样次数
samples_result: median       # 取值方式（默认median-中位数）
sample_retract_dist: 4.0     # 调平回缩距离
samples_tolerance: 0.007     # 采样公差（注意过小的值可能造成采样次数增加）
samples_tolerance_retries: 3 # 超公差重试次数
#--------------------------------------------------------------------
# [bltouch]
# sensor_pin: ^PB5             # 信号接口
# control_pin: PA8             # 舵机控制
# x_offset: 0                  # X轴-传感器相对喷嘴偏移量
# y_offset: 25.0               # Y轴-传感器相对喷嘴偏移量
# z_offset: 0                  # Z轴-传感器相对喷嘴偏移量

#####################################################################
#                               归位                                #
#####################################################################
[safe_z_home]                # Z轴限位坐标
home_xy_position:206,300     # Z轴限位位置定义（重要！！！自行进行调整）
speed:100                    # 归位速度
z_hop:10                     # 归位之前抬升高度
#--------------------------------------------------------------------
#[homing_override]
#axes: z
#set_position_z: 0
#gcode:
#   G90
#   G0 Z15 F600
#   G28 X Y
#    ## Z 限位开关的 XY 位置
#    ##通过后将X0和Y0更新为你的值（如X157、Y305）
#    ## Z 轴限位位置定义
#   G0 X185 Y250 F3600    #250mm   
#   G28 Z
#   G0 Z10 F1800


#####################################################################
#                            LED灯配置（需要时启用）
#####################################################################
[neopixel sb_leds]
pin: PD15                   # 信号接口
chain_count: 3              # 灯珠数量
color_order: GRBW           # 灯珠类型
initial_RED: 0.4            # 天
initial_GREEN: 0.8          # 依
initial_BLUE: 1             # 蓝
initial_WHITE: 0.0          
#--------------------------------------------------------------------
[board_pins]
aliases:
    EXP1_1=NC,   EXP1_3=PC11,  EXP1_5=PC10, EXP1_7=NC, EXP1_9=<GND>,
    EXP1_2=PA15, EXP1_4=PA14,  EXP1_6=PA13, EXP1_8=NC, EXP1_10=<5V>,
    # EXP2 header
    EXP2_1=PB14, EXP2_3=PC12, EXP2_5=PB6,   EXP2_7=NC,    EXP2_9=<GND>,
    EXP2_2=PB13, EXP2_4=PB12, EXP2_6=PB15,  EXP2_8=<RST>, EXP2_10=<NC>,
#--------------------------------------------------------------------    
[display]
lcd_type: uc1701                # 显示屏驱动类型
cs_pin: EXP1_3                  # 显示屏片选cs引脚设置
a0_pin: EXP1_4                  # 显示屏数据a0引脚设置
rst_pin: EXP1_5                 # 显示屏复位rst脚设置
contrast: 63                    # 对比度
encoder_pins: ^EXP2_5, ^!EXP2_3 # 旋转编码器（旋钮开关）引脚设置
click_pin: ^!EXP1_2             # 旋转编码器（旋钮开关）确认按键的引脚设置
# --------------------------------------------------------------------
####适用于FLY Mini12864
[neopixel fly_mini12864]
pin: EXP1_6                     # 显示屏背光灯控制引脚设置
chain_count: 3
initial_RED: 0.5                # 红色LED灯亮度控制（范围：0-1）
initial_GREEN: 0.5              # 绿色LED灯亮度控制（范围：0-1）
initial_BLUE: 0.5               # 蓝色LED灯亮度控制（范围：0-1）
color_order: RGB                # 颜色顺序

#####################################################################
#                           自定义gcode宏                            #
#####################################################################
[gcode_arcs]                       # 允许圆弧插补
resolution: 1.0                    # 启用圆弧插补G2，G3
#   一条弧线将被分割成若干段。每段的长度将
#   等于上面设置的分辨率（mm）。更低的值会产生一个
#   更细腻的弧线，但也会需要机器进行更多运算。小于
#   配置值的曲线会被视为直线。
#   默认为1毫米。

#--------------------------------------------------------------------
[gcode_macro PRINT_START]          # 将 PRINT_START 设置为开始打印时的宏，自定义打印前的动作
gcode:
    G92 E0                         # 重置挤出
    G28                            # 归位所有轴
    G1 Z20 F3000                   # 抬高龙门
    #SET_LED LED=LEDlight RED=0.2 GREEN=0.2 BLUE=0.5   # LED灯控制
    #M117 Printing                 # 向屏幕发送文本
    
#--------------------------------------------------------------------
[gcode_macro PRINT_HUAXIAN]        # 将 PRINT_HUAXIAN 设置为PRINT_START后的宏，自定义打印前的动作
gcode:
    G1 Z5 F3000 
    G92 E0;              # 重置挤出
    G90                  # 设置绝对坐标体系
    G0 X5 Y1 F6000       # 移动至x5 y1位置，速度100mm/s（F6000，意思为6000mm每分钟）
    G0 Z0.4              # 移动z轴高度至0.4
    G91                  # 设置坐标体系为相对坐标
    G1 X100 E20 F1200;   # 移动x轴100mm，并挤出，更改F可更改挤出率
    G1 Y1                # 移动y轴1mm
    G1 X-100 E20 F1200;  # 反方向移动x轴100mm，并挤出，更改F可更改挤出率
    G0 z5                # 抬高z轴5mm
    G1 E-5.0 F3600       # 缩回耗材丝
    G92 E0;              # 重置挤出
    G90                  # 设置绝对坐标体系 

#--------------------------------------------------------------------
[gcode_macro PRINT_END]            # 将 PRINT_END 设置为打印结束时的宏，自定义打印完成之后动作
gcode:
    #   Get Boundaries
    {% set max_x = printer.configfile.config["stepper_x"]["position_max"]|float %}
    {% set max_y = printer.configfile.config["stepper_y"]["position_max"]|float %}
    {% set max_z = printer.configfile.config["stepper_z"]["position_max"]|float %}
    
    #   Check end position to determine safe directions to move
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
    
    M400                              # 等待缓冲区清除
    G92 E0                            # 将挤出机归零
    G1 E-10.0 F3600                   # 缩回耗材丝
    G91                               # 相对定位
    G0 Z{z_safe} F3600               # 抬高龙门
    G0 X{x_safe} Y{y_safe} F20000    # 移动喷嘴以移除架线
    M104 S0                           # 关闭挤出头
    M140 S0                           # 关闭热床
    M106 S0                           # 关闭模型风扇
    G90                               # 设置绝对坐标体系
    G0 X{max_x / 2} Y{max_y} F3600   # 将喷嘴停在后部
    BED_MESH_CLEAR                   # 卸载网床


```

