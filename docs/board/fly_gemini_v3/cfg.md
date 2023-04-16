# 14. FLY-Gemini v3参考配置

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改

## 14.1 FLY_GEMINI_V3.cfg
```cfg
[board_pins]
aliases:
    # Stepper drivers
    X_EN=PA3,   X_STEP=PC13,  X_DIR=PC1,  X_CS=PB11,  # X
    Y_EN=PD2,   Y_STEP=PC14,  Y_DIR=PC4,  Y_CS=PC10,  # Y
    Z_EN=PC12,  Z_STEP=PC15,  Z_DIR=PC5,  Z_CS=PB7,   # Z
    E_EN=PC11,  E_STEP=PC3,   E_DIR=PC8,  E_CS=PB6,   # E

    # Motor SPI
    SCK=PA5,
    MISO=PA6,
    MOSI=PA7,

    # Heaters
    BED_OUT=PA2,
    HEAT=PA0,

    # Thermisors
    BED_TEMP=PC2,
    HEAT_TEMP=PC0,

    # Fans
    FAN0=PC6, FAN1=PC7,

    # End stops
    X_STOP=PA4,  Y_STOP=PA5,  Z_STOP=PA6, E0_STOP=PB1,

    # EXP1 header
    EXP1_1=PC9,  EXP1_3=PA13,  EXP1_5=PA9,   EXP1_7=<NC>,  EXP1_9=<GND>,
    EXP1_2=PB10,  EXP1_4=PA10,  EXP1_6=PA8,   EXP1_8=<NC>,  EXP1_10=<5V>,
    # EXP2 header
    EXP2_1=PB14, EXP2_3=PA15,  EXP2_5=PA14,  EXP2_7=PA7,   EXP2_9=<GND>,
    EXP2_2=PB13, EXP2_4=PB12,  EXP2_6=PB15,  EXP2_8=<RST>, EXP2_10=<NC>,


    # BL Touch
    SERVO=PB0,   # BL Touch servo pin
    PROBE=PA1  # BL Touch end stop pin
```

## 14.2 printer.cfg

```cfg
[include FLY_GEMINI_V3.cfg]

[mcu]
serial: /dev/Gemini_MCU

[mcu host]
serial: /tmp/klipper_host_mcu

[virtual_sdcard]
path: ~/gcode_files

[printer]
kinematics: corexy
max_velocity: 300
max_accel: 3000
max_z_velocity: 5
max_z_accel: 100


########################################
# Temp
########################################
[temperature_sensor FLY-Gemini]
sensor_type: temperature_host

[temperature_sensor FLY-MCU]
sensor_type: temperature_mcu

########################################
# Drives
########################################
[stepper_x]
step_pin: X_STEP
dir_pin: !X_DIR
enable_pin: !X_EN
microsteps: 16
rotation_distance: 40
endstop_pin: !X_STOP
position_endstop: 120
position_max: 120
homing_speed: 40

[stepper_y]
step_pin: Y_STEP
dir_pin: Y_DIR
enable_pin: !Y_EN
microsteps: 16
rotation_distance: 40
endstop_pin: !Y_STOP
position_endstop: 120
position_max: 120
homing_speed: 40

[stepper_z]
step_pin: Z_STEP
dir_pin: !Z_DIR
enable_pin: !Z_EN
microsteps: 16
rotation_distance: 8
endstop_pin: Z_STOP
position_endstop: 0.5
position_max: 120

[extruder]
step_pin: E_STEP
dir_pin: E_DIR
enable_pin: !E_EN
microsteps: 16
rotation_distance: 33.5
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: HEAT
sensor_pin: HEAT_TEMP
sensor_type: ATC Semitec 104GT-2
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114
min_temp: 0
max_temp: 350


########################################
# BED
########################################
[heater_bed]
heater_pin: BED_OUT
sensor_pin: BED_TEMP
sensor_type: ATC Semitec 104GT-2
control: watermark
min_temp: 0
max_temp: 200


########################################
# FANs
########################################
[fan]
pin: FAN0
#cycle_time: 0.50

#[fan_generic fan1]
#pin: FAN1



########################################
# TMC2208 configuration./2209/2225
########################################
[tmc2208 stepper_x]
uart_pin: X_CS
run_current: 0.800
interpolate: False

[tmc2208 stepper_y]
uart_pin: Y_CS
run_current: 0.800
interpolate: False

[tmc2208 stepper_z]
uart_pin: Z_CS
run_current: 0.800
interpolate: False

[tmc2208 extruder]
uart_pin: E_CS
run_current: 0.800
interpolate: False



########################################
# TMC5160 configuration
########################################
#[tmc5160 stepper_x]
#cs_pin: X_CS
##spi_bus: spi3  ##Gemini v1.1
##diag1_pin: X_STOP
#run_current: 0.800
#interpolate: False

#[tmc5160 stepper_y]
#cs_pin: Y_CS
#spi_bus: spi3  ##Gemini v1.1
##diag1_pin: Y_STOP
#run_current: 0.800
#interpolate: False

#[tmc5160 stepper_z]
#cs_pin: Z_CS
##spi_bus: spi3  ##Gemini v1.1
##diag1_pin: Z_STOP
#run_current: 0.650
#interpolate: False

#[tmc5160 extruder]
#cs_pin: E_CS
##spi_bus: spi3  ##Gemini v1.1
#run_current: 0.800
#interpolate: False



########################################
 #BLTouch
########################################
#[bltouch]
#sensor_pin: ^PROBE
#control_pin: SERVO
#pin_move_time: 0.680
#x_offset: 0.0
#y_offset: 2.3
#z_offset: 2.2
#speed: 70

#[safe_z_home]
#home_xy_position: 105,105



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
##spi_bus: spi1

#####适用于FLY Mini12864
#[neopixel fly_mini12864]
#pin: EXP1_6
#chain_count: 3
#initial_RED: 0.1
#initial_GREEN: 0.5
#initial_BLUE: 0.0
#color_order: RGB
```