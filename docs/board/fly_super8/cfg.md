# 示例配置

这里以三叉戟为例，给出了一份配置文件，本配置文件与[Super8](/board/fly_super8/Super8&Voron1 "点击即可跳转")接线配套

?> 示例配置文档中的内容，请按照自己的实际情况修改


## printer.cfg

```cfg

####################################################################################
#                         3D MELLOW /FLY Super8                                    #
####################################################################################
## Super8 资料网址：https://mellow.klipper.cn/#/
## Super8 原理图网址：https://github.com/Mellow-3D/Fly-Super8
## FLY 官方淘宝店：https://shop126791347.taobao.com/shop/view_shop.htm?spm=a230r.1.14.4.1a4840a8hyvpPJ&user_number_id=2464680006
## 如需售后，请联系淘宝客服
## FLY 售后技术支持群：621032883
## FLY-RRF固件交流群：786561979
## 配置文件最后附有 Super8 的pin定义，如有需要，请跳转到配置文件最后


[include fly_macros.cfg]       # FLY 上位机专属文件，非FLY上位机请删除

#[include klicky-probe.cfg]         # 如果使用klicky，用删除 “#” 以启用配置，klicky使用方法，请上哔哩哔哩自行查找教程

#Mainsail support
[pause_resume]
[display_status]

[virtual_sdcard]
path: ~/gcode_files

[printer]                       # 打印机设置
kinematics: corexy              # 运动学结构 分为笛卡尔和corexy等等，Voron Trident是corexy
max_velocity: 300               # 最大速度   
max_accel: 3000                 # 最大加速度 最大3000
max_z_velocity: 15              # z轴最大速度
max_z_accel: 100                # z轴最大加速度
square_corner_velocity: 5.0     # 方形拐角速度，小一点可以有效避免平台重带来的惯性

[mcu]                           # 主板 ID
###更改为使用 “ls /dev/serial/by-id/” 命令找到的设备，只有一个这个MCU连接到π
serial: /dev/serial/by-id/usb-Klipper_stm32f407xx_XXXXXXXXXXXXXXXXXXXXX


#####################################################################
#             X/Y步进电机设置 (X/Y Stepper Settings)
#####################################################################
#   B Motor ---- Motor A 
#   |                  |
#   |------挤出机------|
#   |                  |
#   |                  |
#          正前方   

##--------------------------------------------------------------------
######
# 连接到 X 电机 (B 电机), Driver0
###############
[stepper_x]
step_pin: PE2                       # X轴电机脉冲引脚设置
dir_pin: PC5                        # X轴电机方向引脚设置
enable_pin: !PF11                   # X轴电机使能引脚设置
rotation_distance: 40               # 主动带轮周长mm（2GT-20T带轮40，2GT-16T带轮32）
microsteps: 16                      # 电机细分设置
full_steps_per_rotation: 200        # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin: PG12                   # 限位开关PIN脚设置（X-），连接到 IO_0
position_min: 0                     # X轴最小行程--软件限位

##--------------------------------------
##  如果为 250mm 机型，请删掉下面两行前面的 “#” 以启用对应的配置
#position_endstop: 250              # X轴的机械复位点坐标
#position_max: 250                  # X轴最大行程--软件限位

##  如果为 300mm 机型，请删掉下面两行前面的 “#” 以启用对应的配置
#position_endstop: 300              # X轴的机械复位点坐标
#position_max: 300                  # X轴最大行程--软件限位

##  如果为 350mm 机型，请删掉下面两行前面的 “#” 以启用对应的配置
#position_endstop: 350              # X轴的机械复位点坐标
#position_max: 350                  # X轴最大行程--软件限位

##----------------------------------------
homing_speed: 25                    # 复位速度，最大为100
homing_retract_dist: 5              # 第一次触发复位开关之后的后退距离
homing_positive_dir: true           # 复位方向（一般不需要改动）

##  请确保驱动型号配置正确 (2208 or 2209)
[tmc2209 stepper_x]                 # X 驱动配置 -TMC2209
uart_pin: PC4                       # 通讯端口Pin脚定义
interpolate: False                  # 是否开启256微步插值（不建议开启）
run_current: 0.8                    # 电机运行电流值（单位：mA）
#hold_current: 0.7                   # 电机静态力矩保持电流值（不建议开启）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 200          # 静音阀值（如果不需要静音，请将数值改为0）

#[tmc5160 stepper_x]                # X 驱动配置 -TMC5160
#cs_pin: PC4                        # SPI 片选Pin脚定义
#spi_bus: spi3                      # SPI 通讯总线定义
#run_current: 1.0                   # 电机运行电流值
#interpolate: False                 # 是否开启256微步插值（不建议开启）
#sense_resistor: 0.110               # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
#stealthchop_threshold: 0           # 静音阀值（如果需要开启静音模式，请将数值改为200）
##--------------------------------------------------------------------


##--------------------------------------------------------------------
######
# 连接到 Y 电机， (A 电机), Driver1
###############
[stepper_y]
step_pin: PE3                       # Y轴电机脉冲引脚设置
dir_pin: PF13                       # Y轴电机方向引脚设置
enable_pin: !PF14                   # Y轴电机使能引脚设置
rotation_distance: 40               # 主动带轮周长mm（2GT-20T带轮40，2GT-16T带轮32）
microsteps: 16                      # 电机细分设置
full_steps_per_rotation: 200        # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400）
endstop_pin: PG11                   # 限位开关PIN脚设置（Y-），连接到 IO_1
position_min: 0                     # Y轴最小行程--软件限位

##--------------------------------------
##  如果为 250mm 机型，请删掉下面两行前面的 “#” 以启用对应的配置
#position_endstop: 250              # Y轴的机械复位点坐标
#position_max: 250                  # Y轴最大行程--软件限位

##  如果为 300mm 机型，请删掉下面两行前面的 “#” 以启用对应的配置
#position_endstop: 300              # Y轴的机械复位点坐标
#position_max: 300                  # Y轴最大行程--软件限位

##  如果为 350mm 机型，请删掉下面两行前面的 “#” 以启用对应的配置
#position_endstop: 350              # Y轴的机械复位点坐标
#position_max: 350                  # Y轴最大行程--软件限位

##----------------------------------------
homing_speed: 25                    # 复位速度，最大为100
homing_retract_dist: 5              # 第一次触发复位开关之后的后退距离
homing_positive_dir: true           # 复位方向（一般不需要改动）

##  请确保驱动型号配置正确 (2208 or 2209)
[tmc2209 stepper_y]                 # Y 驱动配置 -TMC2209
uart_pin: PF12                      # 通讯端口Pin脚定义
interpolate: False                  # 是否开启256微步插值（不建议开启）
run_current: 0.8                    # 电机运行电流值
#hold_current: 0.7                   # 电机静态力矩保持电流值（不建议开启）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 200          # 静音阀值（如果不需要静音，请将数值改为0）

#[tmc5160 stepper_y]                # Y 驱动配置 -TMC5160
#cs_pin: PF12                       # SPI 片选Pin脚定义
#spi_bus: spi3                      # SPI 通讯总线定义
#run_current: 1.0                   # 电机运行电流值
#interpolate: False                 # 是否开启256微步插值（不建议开启）
#sense_resistor: 0.110              # 驱动采样电阻不要改（如果使用5160 Pro，请将数值修改为0.033）
#stealthchop_threshold: 0           # 静音阀值（如果需要开启静音模式，请将数值改为200）
##--------------------------------------------------------------------


#####################################################################
#   Z轴步进电机 （Z Stepper Settings）
#####################################################################
#   |----- Z1 -----|
#   |              |
#   |              |
#   |              |
#  Z0 ---显示屏--- Z2

##--------------------------------------------------------------------
######
# Z0 步进电机 - 左前, Driver3
###############
[stepper_z]                         # Z 步进电机
step_pin: PE14                      # Z 电机脉冲引脚
dir_pin: !PE8                       # Z 方向设置
enable_pin: !PE9                    # Z 使能引脚
### T8x4丝杠。旋转一圈，热床床可移动4毫米 
## 请根据购买的丝杆参数进行修改
rotation_distance: 4                # 丝杆导程为 4
full_steps_per_rotation: 200        # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400
microsteps: 16                      # 电机细分设置
# Z Max Connector on Z(main) Board
endstop_pin: PG10                  # 限位开关PIN脚设置（Z+），连接到 IO_3
## position_endstop 是喷嘴相对于打印表面(Z0)到Z限位停止触发点的位置(单位:mm)
## 正数值 = 高于平台的终止点，负数值 = 低于平台的的终止点
## 增加position_ endstop的数值会使喷嘴更靠近床
## 在运行Z_ENDSTOP_CALIBRATE之后，position_endstop将存储在CFG配置的最后
position_endstop: -0.5
## 250/300/350机型的最大Z轴高度均相同
position_max: 250                   # Z轴最大打印高度

##----------------------------------
position_min: -5                    # 软限位最小行程
homing_speed: 8                     # 丝杠速度低于2.4，建议最大值为10。
second_homing_speed: 3.0            # 二次复位速度-最大 10
homing_retract_dist: 3.0            # 后退距离

##  请确保驱动型号配置正确 (2208 or 2209)
[tmc2209 stepper_z]                 # Z 驱动配置 -TMC2209
uart_pin: PE7                       # 通讯端口Pin脚定义
interpolate: False                  # 是否开启256微步插值（不建议开启）
run_current: 0.8                    # 电机运行电流值
#hold_current: 0.7                   # 电机静态力矩保持电流值（不建议开启）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 200          # 静音阀值（如果不需要静音，请将数值改为0）
##--------------------------------------------------------------------


##--------------------------------------------------------------------
######
# Z 步进电机 - 后中间, Driver4
###############
[stepper_z1]
step_pin: PE15                      # Z1 步进电机
dir_pin: !PE11                      # Z1 电机脉冲引脚
enable_pin: !PF2                    # Z1 方向设置
### T8x4丝杠。旋转一圈，热床床可移动4毫米 
## 请根据购买的丝杆参数进行修改
rotation_distance: 4                # 丝杆导程为 4
full_steps_per_rotation: 200        # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400
microsteps: 16                      # 电机细分设置

##  请确保驱动型号配置正确 (2208 or 2209)
[tmc2209 stepper_z1]                # Z1 驱动配置 -TMC2209
uart_pin: PE10                      # 通讯端口Pin脚定义
interpolate: False                  # 是否开启256微步插值（不建议开启）
run_current: 0.8                    # 电机运行电流值
#hold_current: 0.7                   # 电机静态力矩保持电流值（不建议开启）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 200          # 静音阀值（如果不需要静音，请将数值改为0）
##--------------------------------------------------------------------


##--------------------------------------------------------------------
######
#Z 步进电机 - 右前, Driver5
###############
[stepper_z2]
step_pin: PE1                       # Z2 步进电机
dir_pin: !PF0                       # Z2 电机脉冲引脚
enable_pin: !PC15                    # Z2 方向设置
### T8x4丝杠。旋转一圈，热床床可移动4毫米 
##请根据购买的丝杆参数进行修改
rotation_distance: 4                # 丝杆导程为 4
full_steps_per_rotation: 200        # 电机单圈所需脉冲数（1.8度电机:200，0.9度电机:400
microsteps: 16                      # 电机细分设置

##  请确保驱动型号配置正确 (2208 or 2209)
[tmc2209 stepper_z2]                # Z2 驱动配置 -TMC2209
uart_pin: PF1                       # 通讯端口Pin脚定义
interpolate: False                  # 是否开启256微步插值（不建议开启）
run_current: 0.8                    # 电机运行电流值
#hold_current: 0.7                   # 电机静态力矩保持电流值（不建议开启）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 200          # 静音阀值（如果不需要静音，请将数值改为0）
##--------------------------------------------------------------------



#####################################################################
#   E0 挤出机设置 （E0  Settings）
#####################################################################
# 连接到 Driver2
[extruder]                          # 挤出机
step_pin: PE4                       # E0电机脉冲引脚
dir_pin: PG0                        # 方向引脚设置
enable_pin: !PG1                    # 使能引脚设置
##	执行挤出机校准时，更新以下值
##	比如你要求100毫米的进料，但实际上是98毫米：
##	新值=旧值 x（实际挤出长度/目标长度）
##  22.6789511是我们推荐的一个数值
rotation_distance: 22.6789511       # 步进值-Bondtech 5mm 驱动齿轮
# 调整传动比
gear_ratio: 50:17                   # BMG 传动比
microsteps: 16                      # 细分
full_steps_per_rotation: 200        # 单圈脉冲数 （200 为 1.8 度, 400 为 0.9 度）
nozzle_diameter: 0.400              # 喷嘴直径
filament_diameter: 1.75             # 耗材直径

heater_pin: PB0                     # 加热棒引脚，连接到 HEAT0
## Check what thermistor type you have. See https://www.klipper3d.org/Config_Reference.html#common-thermistors for common thermistor types.
## Use "Generic 3950" for NTC 100k 3950 thermistors
sensor_type: ATC Semitec 104GT-2    # 传感器型号  (generic 3950, ATC Semitec 104GT-2， PT1000)
sensor_pin: PF4                     # 传感器引脚,连接到 ADC_0   
min_temp: 10                        # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 270                       # 最大温度（注意：测量温度超过设定值会触发紧急停止）
max_power: 1.0                      # 最大功率
min_extrude_temp: 170               # 最小挤出温度（至少需要达到这个温度，挤出机才能挤出）

control = pid                       # PID喷嘴温度自动校准项（校准后将被系统自动注释）
pid_kp = 26.213                     # PID喷嘴温度自动校准项（校准后将被系统自动注释
pid_ki = 1.304                      # PID喷嘴温度自动校准项（校准后将被系统自动注释
pid_kd = 131.721                    # PID喷嘴温度自动校准项（校准后将被系统自动注释

pressure_advance: 0.05              # 推进压力-尽量将压力保持在1.0以下
pressure_advance_smooth_time: 0.040 # 平稳推进时间-默认值为0.040
#max_extrude_only_distance: 200.0

##  请确保驱动型号配置正确 (2208 or 2209)
[tmc2209 extruder]                  # 挤出机驱动配置- TMC2209
uart_pin: PF15                       # 通讯端口Pin脚定义
interpolate: False                  # 是否开启256微步插值（不建议开启）
run_current: 0.8                    # 电机运行电流值
#hold_current: 0.7                   # 电机静态力矩保持电流值（不建议开启）
sense_resistor: 0.110               # 驱动采样电阻不要改
stealthchop_threshold: 200          # 静音阀值（如果不需要静音，请将数值改为0）
##--------------------------------------------------------------------



#####################################################################
#   热床配置 （Bed Heater Sstting）
#####################################################################
[heater_bed]
heater_pin: PE5                      # 热床接口，连接到 BED_OUT
sensor_type: Generic 3950            # 热床传感器类型
sensor_pin: PF5                      # 热床传感器引脚,连接到 ADC_1  
##调整最大功率，这样你的硅胶热床不会扭曲你的铝板
max_power: 0.6                       # 热床功率
min_temp: 0                          # 最小温度（注意：测量温度超过设定值会触发紧急停止）
max_temp: 120                        # 最大温度（注意：测量温度超过设定值会触发紧急停止）

control: pid                         # PID喷嘴温度自动校准项（校准后将被系统自动注释）
pid_kp: 58.437                       # PID喷嘴温度自动校准项（校准后将被系统自动注释）
pid_ki: 2.347                        # PID喷嘴温度自动校准项（校准后将被系统自动注释）
pid_kd: 363.769                      # PID喷嘴温度自动校准项（校准后将被系统自动注释）

#####################################################################
#   调平传感器设置 （Probe Setting）
#####################################################################

######
## 这个探头不用于Z高度，只用于Z倾斜调整
###############
[probe]
##  如果你的探头是常开，（NO）而不是常闭（NC），添加改变引脚 !z:P1.24
pin: PF3                            # 探头信号引脚（默认为PL08的配置），如需使用klicky等其他传感器请修改此引脚，连接到 HV_IN
x_offset: 0                         # X轴-传感器相对喷嘴偏移量（默认为PL08的配置）
y_offset: 25                        # Y轴-传感器相对喷嘴偏移量（默认为PL08的配置）
z_offset: 0                         # Z轴-传感器相对喷嘴偏移量（默认为PL08的配置）
speed: 10.0                         # 调平速度
samples: 3                          # 采样次数
samples_result: median              # 取值方式（默认median-中位数）
sample_retract_dist: 3              # 调平回缩距离
samples_tolerance: 0.006            # 采样公差（注意过小的值可能造成采样次数增加）
samples_tolerance_retries: 3        # 超公差重试次数（超过这个次数还未调平系统将会报错）



#####################################################################
#   风扇配置 （Fan Control）
#####################################################################

[heater_fan extruder_fan]    # 喉管冷却风扇
pin: PA1                     # 风扇控制引脚,连接到 FAN1
heater: extruder             # 关联的设备：挤出机  
heater_temp: 50.0            # 挤出机达到多少度启动风扇
##	If you are experiencing back flow, you can reduce fan_speed
fan_speed: 1.0               # 风扇转速


[fan]                       # 模型冷却风扇
pin: PA0                    # 风扇控制引脚，连接到 FAN0
cycle_time: .08
##  Depending on your fan, you may need to increase this value
##  if your fan will not start. Can change cycle_time (increase)
##  if your fan is not able to slow down effectively
kick_start_time: .25        # 启动时间（勿动）

[heater_fan controller_fan_1]         # 电器仓风扇 1
pin: PA2                            # 信号接口,连接到 FAN2  
kick_start_time: 0.5                # 启动时间（勿动）
heater: heater_bed                  # 关联的设备：热床
heater_temp: 45.0                   # 热床达到多少度启动风扇

[heater_fan controller_fan_1]         # 电器仓风扇 2
pin: PA3                            # 信号接口,连接到 FAN3  
kick_start_time: 0.5                # 启动时间（勿动）
heater: heater_bed                  # 关联的设备：热床
heater_temp: 45.0                   # 热床达到多少度启动风扇

#[heater_fan exhaust_fan]            # 打印仓排风扇
##  Exhaust fan - In E2 OUT Positon
#pin: PB3                            # 信号接口
#max_power: 1.0                      # 最大转速
#shutdown_speed: 0.0                 # 关闭速度（勿动）
#kick_start_time: 5.0                # 开启时间（勿动）
#heater: heater_bed                  # 关联的设备：热床
#heater_temp: 60                     # 热床达到多少度启动风扇
#fan_speed: 1.0                      # 风扇转速

#####################################################################
#   归位和热床调平 （Homing and Gantry Adjustment Routines）
#####################################################################

[idle_timeout]
timeout: 1800                       # 空闲时间超过30分钟则关闭热床

[homing_override]                   # Z 轴归位宏（如果使用Klicky，请注释掉这部分）
axes: z
set_position_z: 0
gcode:
   G90
   G0 Z5 F600
   G28 X Y
## Z限位开关位置
   ## 在测试几遍，确保没有问题之后更新X和Y到您的值(如X157, Y305)
   ## 结束引脚位置定义步骤。
   G0 X-10 Y-10 F3600               # 更新此处的 X 和 Y 数值
   
   G28 Z
   G0 Z10 F1800
   
    ##  根据你的机型尺寸删除掉对应的配置前的 “#”:
    ##  粗略的测量是你的床的中间.
#--------------------------------------------------------------------
    ##  250mm 机型请删掉下面一行配置前的 “#” 以启用配置
    #G0 X125 Y125 Z30 F3600
   
    ##  300mm 机型请删掉下面一行配置前的 “#” 以启用配置
    #G0 X150 Y150 Z30 F3600

    ##  350mm 机型请删掉下面一行配置前的 “#” 以启用配置
    #G0 X175 Y175 Z30 F3600
#--------------------------------------------------------------------


[board_pins]
aliases:
    # EXP1 header
    EXP1_1=PE12, EXP1_3=PB2, EXP1_5=PC14, EXP1_7=PG14, EXP1_9=<GND>,
    EXP1_2=PE13, EXP1_4=PG8, EXP1_6=PC13, EXP1_8=PG13, EXP1_10=<5V>,
    # EXP2 header
    EXP2_1=PA6, EXP2_3=PB7, EXP2_5=PB6, EXP2_7=PG15,  EXP2_9=<GND>,
    EXP2_2=PA4, EXP2_4=PA4, EXP2_6=PA7, EXP2_8=<RST>, EXP2_10=<5V>

########################################
 #Mini 12864 LCD
########################################
#[display]
#lcd_type: uc1701
#cs_pin: EXP1_3
#a0_pin: EXP1_4
#rst_pin: EXP1_5
#contrast: 63
#encoder_pins: ^EXP2_5, ^!EXP2_3
#click_pin: ^!EXP1_2
#spi_bus: spi1

#####适用于FLY Mini12864
#[neopixel fly_mini12864]
#pin: EXP1_6
#chain_count: 3
#initial_RED: 0.1
#initial_GREEN: 0.5
#initial_BLUE: 0.0
#color_order: RGB

#--------------------------------------------------------------------

#####################################################################
#   3Z调平 Macros
#####################################################################
[z_tilt]
##  使用 Z_TILT_ADJUST 命令来调平热床 
##  z_positions: 打印头的位置

##--------------------------------------------------------------------
##  250mm 机型请删掉下面配置前的 “#” 以启用配置
#z_positions:
#   -50, 18
#   125, 298
#   300, 18
#points:
#   30, 5
#   125, 195
#   220, 5

##  300mm 机型请删掉下面配置前的 “#” 以启用配置
#z_positions:
#   -50, 18
#   150, 348
#   350, 18
#points:
#   30, 5
#   150, 245
#   270, 5

##  350mm 机型请删掉下面配置前的 “#” 以启用配置
#z_positions:
#   -50, 18
#   175, 398
#   400, 18
#points:
#   30, 5
#   175, 295
#   320, 5


##--------------------------------------------------------------------

speed: 100                      # 调平速度
horizontal_move_z: 15           # 开始调平时Z轴起始高度（高度过低，在热床倾斜角度过大时可能导致喷头刮擦热床，造成喷头或者其他地方的损坏）
retries: 5                      # 超公差重试次数
retry_tolerance: 0.0075         # 采样公差
max_adjust: 10                  # 调平最大调整行程

[gcode_macro PRINT_START]
#   Use PRINT_START for the slicer starting script - PLEASE CUSTOMISE THE SCRIPT
gcode:
    M117 Homing...                 # display message
    G28 Y0 X0 Z0                    # X Y Z归位
    Z_TILT_ADJUST                   # 3Z 调平
    G28 Y0 X0 Z0                    # 再次归位
    
    ##Purge Line Gcode              # 打印前划线，以清洁喷嘴，删除下面配置前的 “#” 以启用配置
    #G92 E0;
    #G90
    #G0 X5 Y5 F6000
    #G0 Z0.4
    #G91
    #G1 X120 E30 F1200;
    #G1 Y1
    #G1 X-120 E30 F1200;
    #G92 E0;
    #G90
    
    G1 Z15.0 F600               # 热床平台下降15mm
    G1 X125 Y125 F3000          # 喷头移动到热床中间
    G92 E0                      # zero the extruded length again
    G1 F9000
    M117 Printing...

[gcode_macro PRINT_END]
#   Use PRINT_END for the slicer ending script
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
    
    #  Commence PRINT_END
    M400                             ; wait for buffer to clear
    G92 E0                           ; zero the extruder
    G1 E-4.0 F3600                   ; retract
    G91                              ; relative positioning
    G0 Z{z_safe} F3600               ; move nozzle up
    G0 X{x_safe} Y{y_safe} F20000    ; move nozzle to remove stringing
    
    M104 S0                          ; turn off hotend
    M140 S0                          ; turn off bed
    M106 S0                          ; turn off fan
    G90                              ; absolute positioning
    G0 X{max_x / 2} Y{max_y} F3600   ; park nozzle at rear
    M117 Finished!
    
    ##========================== Pin Definitions ========================
## X
## Drive0_STEP_PIN         PE2
## Drive0_DIR_PIN          PC5
## Drive0_ENABLE_PIN       PF11
## Drive0_STOP_PIN         PG12 #IO0
## Drive0_UART_PIN         PC4

## Y
## Drive1_STEP_PIN         PE3
## Drive1_DIR_PIN          PF13
## Drive1_ENABLE_PIN       PF14
## Drive1_STOP_PIN         PG11 #IO1
## Drive1_UART_PIN         PF12

## E
## Drive2_STEP_PIN         PE4
## Drive2_DIR_PIN          PG0
## Drive2_ENABLE_PIN       PG1
## Drive2_STOP_PIN         PG10 #IO2
## Drive2_UART_PIN         PF15

## Z
## Drive3_STEP_PIN         PE14
## Drive3_DIR_PIN          PE8
## Drive3_ENABLE_PIN       PE9
## Drive3_UART_PIN         PE7

## Z1
## Drive4_STEP_PIN         PE15
## Drive4_DIR_PIN          PE11
## Drive4_ENABLE_PIN       PF2
## Drive4_UART_PIN         PE10

## Z2
## Drive5_STEP_PIN         PE1
## Drive5_DIR_PIN          PF0
## Drive5_ENABLE_PIN       PC15
## Drive5_UART_PIN         PF1

## Z3
## Drive6_STEP_PIN         PE0
## Drive6_DIR_PIN          PG3
## Drive6_ENABLE_PIN       PG4
## Drive6_UART_PIN         PG2

## Drive7_STEP_PIN         PE6
## Drive7_DIR_PIN          PG6
## Drive7_ENABLE_PIN       PG7
## Drive7_UART_PIN         PG5

##   TMC SPI MODE
## TMC MOSI           PB4
## TMC MISO           PB5
## TMC SCK            PB3

## HEAT0              PB0
## HEAT1              PB1
## HEAT2              PC7
## HEAT3              PF7
## HEAT4              PF6

## BED                PE5

## TH0 (H0 Temp)      PF4    #ADC0
## TH1 (H1 Temp)      PF5    #ADC1
## TH2 (H2 Temp)      PF9    #ADC2
## TH3 (H3 Temp)      PF10   #ADC3
## TH4 (H4 Temp)      PC0    #ADC4
## TB  (Bed Temp)     PC1    #ADC5

## FAN0               PA0
## FAN1               PA1
## FAN2               PA2
## FAN3               PA3
## FAN4               PA15
## FAN5               PB11
## FAN6               PB10
## FAN7               PD12
## FAN8               PD14
## FAN9               PD15

## SERVO              PC6   #BLTOUCH
## PROBE			  PC3   #BLTOUCH

##加速度计
##########################################
# 5V # GND # PD0 # PD1 # PD3 # PD4 # PD5 #
##########################################

```