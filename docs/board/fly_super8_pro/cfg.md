# FLY-Super8-Pro 参考配置

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


## printer.cfg

```cfg
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

[mcu]
serial: */dev/serial/by-id/usb-Klipper_stm32_00000-if00*

[printer]
kinematics: corexy
max_velocity: 300  
max_accel: 3000
max_z_velocity: 15
max_z_accel: 350
square_corner_velocity: 5.0

[temperature_sensor FLY-Super8]
sensor_type: temperature_mcu

########################################
# Drives
########################################

[stepper_x]
step_pin: PE2
dir_pin: !PC5
enable_pin: !PF11
rotation_distance: 32
microsteps: 16
step_pulse_duration: 0.000004
full_steps_per_rotation:200  #set to 400 for 0.9 degree stepper
endstop_pin: 36:PA0
position_endstop: 0
position_min: 0
position_max: 330
homing_retract_dist: 10.0
homing_speed: 60

[stepper_y]
step_pin: PE3
dir_pin: !PF13
enable_pin: !PF14
rotation_distance: 32
microsteps: 16
step_pulse_duration: 0.000004
full_steps_per_rotation:200  #set to 400 for 0.9 degree stepper
endstop_pin: PG12
position_endstop: 300
position_min: 0
position_max: 300
homing_retract_dist: 10.0
homing_speed: 60

[stepper_z]
step_pin: PE14
dir_pin: !PE8
enable_pin: !PE9
microsteps: 16
rotation_distance: 4
step_pulse_duration: 0.000004
endstop_pin: probe:z_virtual_endstop
position_max: 350

[stepper_z1]
step_pin: PE1
dir_pin: !PF0
enable_pin: !PC15
microsteps: 16
rotation_distance: 4
step_pulse_duration: 0.000004

[extruder]
step_pin: PE4
dir_pin: !PG0
enable_pin: !PG1
microsteps = 16
step_pulse_duration: 0.000004
rotation_distance: 22.23                                            # See calibrating rotation_distance on extruders doc
gear_ratio: 50:10                                                   # For Mini Afterburner
microsteps: 16
nozzle_diameter = 0.400
filament_diameter = 1.750
heater_pin: PB0
sensor_pin: PF4
sensor_type: EPCOS 100K B57560G104F
pullup_resistor: 2200 ####
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114
min_temp: -50
max_temp: 350
min_extrude_temp: 10

[heater_bed]
heater_pin: PE5
sensor_pin: PC1
sensor_type: EPCOS 100K B57560G104F
control: watermark
min_temp: -50
max_temp: 200

[fan]
pin: PA0 #FAN0
#cycle_time: 0.50

[tmc5160 stepper_x]
cs_pin: PC4
spi_bus: spi3
run_current: 1.0
interpolate: False
#stealthchop_threshold: 999999
#driver_TOFF: 0

[tmc5160 stepper_y]
cs_pin: PF12
spi_bus: spi3
run_current: 1.50
interpolate: False
#stealthchop_threshold: 999999
#driver_TOFF: 0

[tmc2209 stepper_z]
uart_pin: PE7
run_current: 0.800
stealthchop_threshold: 999999

[tmc2209 stepper_z1]
uart_pin: PF1
run_current: 0.800
stealthchop_threshold: 999999

[tmc2209 extruder]
uart_pin: PF15
run_current: 0.5
stealthchop_threshold: 999999


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
```