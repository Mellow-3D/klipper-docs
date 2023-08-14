# 6. Example configuration

Here, taking Trident as an example, a configuration file is given. This configuration file is matched with [Super8](http://mellow.klipper.cn/#/board/fly_super8/Super8line.md) wiring.

## 6.1 Voron Trident example configuration

```cfg
####################################################################################
#                         3D MELLOW /FLY-Super8-Pro                                #
####################################################################################
## FLY-Super8-Pro Information URL： http://mellow.klipper.cn/#/board/fly_super8_pro/README
## FLY-Super8-Pro Schematic URL：https://github.com/Mellow-3D/Fly-Super8Pro
## FLY aliexpress：https://mellow.aliexpress.com/store/1100991286?spm=a2g0o.home.1000002.3.2e8910d03hpSga

#####################################################################
# 	                      File references                           #
#####################################################################
#[include fluidd.cfg]          # Use the fluidd file
#[include mainsail.cfg]        # Use the mainsail file
#You need to decide which file to use

#####################################################################
# 	                   Motherboard configuration                    #
#####################################################################
[mcu]                           # FLY motherboard ID
serial: /dev/serial/by-id/usb-Klipper_stm32f407xx_XXXXXXXXXXXXXXXXXXXXX
### How to query the USB firmware ID：ls -l /dev/serial/by-id/
### Replace /dev/serial/by-id/usb-Klipper_stm32f407xx_XXXXXXXXXXXXXXXXXXXXX with the queried id
#canbus_uuid: e51d5c71a901
### method of querying the CAN firmware ID：~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
### You need to remove the serial, then remove the # in front of canbus, and add the id

#####################################################################
#                       Model and Acceleration                      #
#####################################################################
[printer]
kinematics: corexy              # Kinematic structures are divided into Cartesian and CoreXY, etc.
max_velocity: 300  
max_accel: 3000
max_z_velocity: 15
max_z_accel: 100
square_corner_velocity: 5.0

#####################################################################
#                      Temperature monitoring                       #
#####################################################################
## When the temperature exceeds the set value, it will stop working.
[temperature_sensor Fly-Super8-PRO]   
sensor_type: temperature_mcu     # Associated MCU 
min_temp: 0                      # Minimum temperature 
max_temp: 200                    # Maximum temperature 
#--------------------------------------------------------------------
[temperature_sensor FLY-π]    # The temperature of the upper computer
sensor_type: temperature_host 
min_temp: 0
max_temp: 200
#--------------------------------------------------------------------
# [temperature_sensor Warehouse]         
## The temperature of the warehouse. （The temperature of the warehouse.）
# sensor_type: ATC Semitec 104GT-2  
# sensor_pin: PA4                   
## Analog input pin connected to the thermistor. This parameter must
# min_temp: 0 
# max_temp: 200

#####################################################################
#                               Bed_mes                             # 
#####################################################################
[bed_mesh]
speed: 50              # Calibration speed
horizontal_move_z: 5   # The height of the raised Z.
mesh_min: 30,30        # Minimum calibration point coordinates x, y
mesh_max: 270, 270     # Maximum calibration point coordinates x, y
probe_count: 4,4       # Number of sampling points (16 points for 4X4)
mesh_pps: 2,2          # Additional sampling points
algorithm: bicubic     # Algorithm model
bicubic_tension: 0.2  

#####################################################################
#                        (X/Y Stepper Settings)                     # 
#####################################################################
#   B Motor ---- Motor A 
#   |                  |
#   |-----extruder-----|
#   |                  |
#   |                  |
#      Straight ahead.   
#####################################################################
#                          X Motor  (B Motor)                       #
#####################################################################
[stepper_x]
step_pin: PE2
dir_pin: PC5                          # Motion direction control pin, adding an exclamation mark (!) will reverse the direction.
enable_pin: !PF11                   
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200
endstop_pin: !PG9                     # Limit switch pin, adding an exclamation mark (!) can detect its status.
position_min: 0
position_endstop: 300                 # The maximum travel (250mm-300mm-350mm) needs to be set according to your own machine.
position_max: 300                     # The maximum travel (250mm-300mm-350mm) needs to be set according to your own machine.
homing_speed: 50
homing_retract_dist: 5                # If using infinite positions, please change to 0
homing_positive_dir: true
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
## Please confirm the model of the driver you are using.
[tmc2209 stepper_x]
uart_pin: PC4
interpolate: False                   # Whether to enable 256 microstep interpolation (True for enable, False for disable).
run_current: 0.8                     # The operating current of the motor.
sense_resistor: 0.110
stealthchop_threshold: 0             # StealthChop mode will be enabled when the velocity is below the set value.
#--------------------------------------------------------------------
#[tmc5160 stepper_x]
#cs_pin: PC4
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False                    # Whether to enable 256 microstep interpolation (True for enable, False for disable).
#sense_resistor: 0.075                 # When using the 5160pro, it needs to be modified to 0.033.
#stealthchop_threshold: 0              # StealthChop mode will be enabled when the velocity is below the set value.
#####################################################################
#                          y Motor  (A Motor)                       #
#####################################################################
[stepper_y]
step_pin: PE3
dir_pin: !PF13
enable_pin: !PF14
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200
endstop_pin: !PG12
position_min: 0
position_endstop: 300
position_max: 300
homing_speed: 50
homing_retract_dist: 5
homing_positive_dir: true
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_y]
uart_pin: PF12
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
#[tmc5160 stepper_y]
#cs_pin: PF12
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False
#sense_resistor: 0.075
#stealthchop_threshold: 0 
#####################################################################
#                      Z Stepper Settings                           #
#####################################################################
#   |----- Z1 -----|
#   |              |
#   |              |
#   |              |
#   Z0----12864---Z2

#####################################################################
#                        Z Stepper Settings                         #
#####################################################################
[stepper_z]
step_pin: PE14
dir_pin: !PE8
enable_pin: !PE9
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
endstop_pin: !PG11
position_min: -15
position_max: 300
homing_speed: 5
second_homing_speed: 3
homing_retract_dist: 0
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_z]
uart_pin: PE7
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
#[tmc5160 stepper_z]
#cs_pin: PE7
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False
#sense_resistor: 0.075
#stealthchop_threshold: 0
#--------------------------------------------------------------------

[stepper_z1]
step_pin: PE15
dir_pin: !PE11
enable_pin: !PF2
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_z1]
uart_pin: PE10
interpolate: false
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
# [tmc5160 stepper_z1]
# cs_pin: PE10
# spi_bus: spi1a
# run_current: 1.0
# interpolate: False
# sense_resistor: 0.075
# stealthchop_threshold: 0
#--------------------------------------------------------------------

[stepper_z2]
step_pin: PE1
dir_pin: !PF0
enable_pin: !PC15
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_z2]
uart_pin: PF1
interpolate: false
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
# [tmc5160 stepper_z2]
# cs_pin: PF1
# spi_bus: spi1a
# run_current: 1.0
# interpolate: False
# sense_resistor: 0.075
# stealthchop_threshold: 0

#####################################################################
#                            （E0 Settings）                        # 
#####################################################################
#Driver2
[extruder]
step_pin: PE4
dir_pin: !PG0
enable_pin: !PG1
rotation_distance: 22.6789511
##Calibration: https://www.klipper3d.org/Rotation_Distance.html?h=distance#rotation_distance
gear_ratio: 50:17
microsteps: 16
full_steps_per_rotation: 200
nozzle_diameter: 0.400
filament_diameter: 1.75
heater_pin: PB0
sensor_type: ATC Semitec 104GT-2    # Sensor models (Generic 3950, ATC Semitec 104GT-2, PT1000)
sensor_pin: PF4 
min_temp: 10 
max_temp: 500 
max_power: 1.0
min_extrude_temp: 170               # Minimum extrusion temperature (the extruder can only work when it reaches at least this temperature)
pressure_advance: 0.05 
##Calibration method：https://www.klipper3d.org/Pressure_Advance.html
pressure_advance_smooth_time: 0.040
#max_extrude_only_distance: 200.0 
##Calibration command："PID_CALIBRATE HEATER=extruder TARGET=245"
control: pid              
pid_kp: 26.213              
pid_ki: 1.304               
pid_kd : 131.721            
##Calibration: https://www.klipper3d.org/G-Codes.html?h=calibrate#pid_calibrate_1
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 extruder]
uart_pin: PF15
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
#[tmc5160 extruder]
#cs_pin: PF15
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False
#sense_resistor: 0.075
#stealthchop_threshold: 0

#####################################################################
#                         heater_bed                                # 
#####################################################################
[heater_bed]
heater_pin: PE5
sensor_type: Generic 3950    # Sensor models (Generic 3950, ATC Semitec 104GT-2, PT1000)
sensor_pin:  PC1
max_power: 1.0
min_temp: 0
max_temp: 490
##Calibration command："PID_CALIBRATE HEATER=heater_bed TARGET=100"
control: pid
pid_kp: 58.437
pid_ki: 2.347
pid_kd: 363.769

#####################################################################
#                         Fan configuration                         # 
#####################################################################
[fan]                         # Print cooling fan
pin: PA0
kick_start_time: 0.5
off_below: 0.10
#--------------------------------------------------------------------
[heater_fan hotend_fan]      # hotend_fan
pin: PA1
max_power: 1.0
kick_start_time: 0.5
heater: extruder              # Associated device: Extruder
heater_temp: 50
fan_speed: 1.0
#--------------------------------------------------------------------
[heater_fan controller_fan]  # Electrical cabinet fan
pin: PA2
max_power: 1.0
kick_start_time: 0.5
heater: heater_bed            # Associated device: heater_bed
heater_temp: 50
fan_speed: 1.0
#--------------------------------------------------------------------
[heater_fan exhaust_fan]    # exhaust fan
pin: PA3
max_power: 1.0
kick_start_time: 0.5
heater: heater_bed
heater_temp: 70
fan_speed: 1.0

#####################################################################
#                  Idle and turn off the heated bed                 #
#####################################################################
[idle_timeout]
timeout: 1800                # Turn off the heated bed after 30 minutes of inactivity

#####################################################################
#                             PROBE                                 #
#####################################################################
[probe]
pin: ^PG10
x_offset: 0
y_offset: 25.0
z_offset: 0
speed: 10.0
samples: 3
samples_result: median
sample_retract_dist: 4.0
samples_tolerance: 0.006
samples_tolerance_retries: 3 

#####################################################################
#                             Zeroing                               #
#####################################################################
# [safe_z_home]                
# home_xy_position:206,300     # z endstop position
# speed:100 
# z_hop:10                     # Lift height before homing
#--------------------------------------------------------------------
[homing_override]            # Home Z-axis (if using Klicky, comment out this section)
axes: z
set_position_z: 0
gcode:
   G90
   G0 Z5 F600
   G28 X Y
   ## z endstop position
   ## Test a few times to ensure there are no issues, then update X and Y to your values (e.g. X157, Y305)
   G0 X-10 Y-10 F3600
   
   G28 Z
   G0 Z10 F1800
   
    ##  Remove the "#" in front of the corresponding configuration based on the size of your machine:
    ##  Roughly measure the center of your bed.
#--------------------------------------------------------------------
    ##  250mm model
    #G0 X125 Y125 Z30 F3600
#--------------------------------------------------------------------   
    ##  300mm model
    #G0 X150 Y150 Z30 F3600
#--------------------------------------------------------------------
    ##  350mm model
    #G0 X175 Y175 Z30 F3600
#--------------------------------------------------------------------

#####################################################################
#                         Motor Tilt Adjustment                     #
#####################################################################
##Multiple Z stepper tilt adjustment. This feature enables independent adjustment of multiple z
[z_tilt]
## Use the Z_TILT_ADJUST command to level the heated bed
## z_positions: The position of the print head

##--------------------------------------------------------------------
##  250mm model
#z_positions:
#   -50, 18
#   125, 298
#   300, 18
#points:
#   30, 5
#   125, 195
#   220, 5
##--------------------------------------------------------------------
##  300mm model
z_positions:
  -50, 18
  150, 348
  350, 18
points:
  30, 5
  150, 245
  270, 5
##--------------------------------------------------------------------
##  350mm model
#z_positions:
#   -50, 18
#   175, 398
#   400, 18
#points:
#   30, 5
#   175, 295
#   320, 5
#--------------------------------------------------------------------
speed: 100
horizontal_move_z: 10
retry_tolerance: 0.01
#   The maximum Z distance (in mm) that a sample may differ from other
#   samples. If this tolerance is exceeded then either an error is
#   reported or the attempt is restarted (see
#   samples_tolerance_retries). The default is 0.100mm.
retries: 5 

#####################################################################
#                      FLY-Mini 12864 LCD
#####################################################################
##Please remove the "#" at the beginning when using 12864.
[board_pins]
aliases:
    EXP1_1=PE12, EXP1_3=PB2,  EXP1_5=PC14,   EXP1_7=PG14,  EXP1_9=<GND>,
    EXP1_2=PE13, EXP1_4=PG8,  EXP1_6=PC13,   EXP1_8=PG13,  EXP1_10=<5V>,
    # EXP2 header
    EXP2_1=PA6, EXP2_3=PB7,  EXP2_5=PB6,  EXP2_7=PG15,   EXP2_9=<GND>,
    EXP2_2=PA5, EXP2_4=PA4,  EXP2_6=PA7,  EXP2_8=<RST>,  EXP2_10=<NC>,
#--------------------------------------------------------------------    
#[display]
#lcd_type: uc1701
#cs_pin: EXP1_3
#a0_pin: EXP1_4
#rst_pin: EXP1_5
#contrast: 63
#encoder_pins: ^EXP2_5, ^!EXP2_3
#click_pin: ^!EXP1_2
#spi_bus: spi1
#--------------------------------------------------------------------
#[neopixel fly_mini12864]
#pin: EXP1_6
#chain_count: 3
#initial_RED: 0.5
#initial_GREEN: 0.5
#initial_BLUE: 0.5
#color_order: RGB

#####################################################################
#                 Turn off the heated bed when idle                 #
#####################################################################
[idle_timeout]
timeout: 1800
# Turn off the heated bed after 30 minutes of inactivity
#####################################################################
#                          Custom G-code                            #
#####################################################################
[gcode_arcs]
resolution: 1.0

#--------------------------------------------------------------------
[gcode_macro PRINT_START]          # G-code executed before printing
gcode:
    G92 E0
    BED_MESH_CLEAR                # Uninstalling the net bed
    G28
    Z_TILT_ADJUST                 # Leveling the gantry crane
    G28
    G1 Z20 F3000                   #  Lowering the Z-axis
    BED_MESH_PROFILE LOAD=default  # Loading the "default" bed of mesh.
#--------------------------------------------------------------------
[gcode_macro PRINT_HUAXIAN]
# To draw a line before printing, it needs to be added to the slicing software
gcode:
    G1 Z5 F3000 
    G92 E0;
    G90
    G0 X5 Y1 F6000
    G0 Z0.4
    G91
    G1 X100 E20 F1200;
    G1 Y1
    G1 X-100 E20 F1200;
    G0 z5
    G1 E-5.0 F3600
    G92 E0;
    G90

#--------------------------------------------------------------------
[gcode_macro PRINT_END]            # Set PRINT_END as the macro executed at the end of printing, customize the action after printing is completed.
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
 
    M400
    G92 E0
    G1 E-10.0 F3600
    G91
    G0 Z{z_safe} F3600
    G0 X{x_safe} Y{y_safe} F20000
    M104 S0
    M140 S0
    M106 S0
    G90
    G0 X{max_x / 2} Y{max_y} F3600
    BED_MESH_CLEAR

```

## 6.2 Voron 2.4 Example Configuration

```position_endstop: 300         # 软限位最大行程 (250mm-300mm-350mm)
####################################################################################
#                         3D MELLOW /FLY-Super8-Pro                                #
####################################################################################
## FLY-Super8-Pro Information URL： http://mellow.klipper.cn/#/board/fly_super8_pro/README
## FLY-Super8-Pro Schematic URL：https://github.com/Mellow-3D/Fly-Super8Pro
## FLY aliexpress：https://mellow.aliexpress.com/store/1100991286?spm=a2g0o.home.1000002.3.2e8910d03hpSga

#####################################################################
# 	                      File references                           #
#####################################################################
#[include fluidd.cfg]          # Use the fluidd file
#[include mainsail.cfg]        # Use the mainsail file
#You need to decide which file to use

#####################################################################
# 	                   Motherboard configuration                    #
#####################################################################
[mcu]                           # FLY motherboard ID
serial: /dev/serial/by-id/usb-Klipper_stm32f407xx_XXXXXXXXXXXXXXXXXXXXX
### How to query the USB firmware ID：ls -l /dev/serial/by-id/
### Replace /dev/serial/by-id/usb-Klipper_stm32f407xx_XXXXXXXXXXXXXXXXXXXXX with the queried id
#canbus_uuid: e51d5c71a901
### method of querying the CAN firmware ID：~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
### You need to remove the serial, then remove the # in front of canbus, and add the id

#####################################################################
#                       Model and Acceleration                      #
#####################################################################
[printer]
kinematics: corexy              # Kinematic structures are divided into Cartesian and CoreXY, etc.
max_velocity: 300  
max_accel: 3000
max_z_velocity: 15
max_z_accel: 100
square_corner_velocity: 5.0

#####################################################################
#                      Temperature monitoring                       #
#####################################################################
## When the temperature exceeds the set value, it will stop working.
[temperature_sensor Fly-Super8-PRO]   
sensor_type: temperature_mcu     # Associated MCU 
min_temp: 0                      # Minimum temperature 
max_temp: 200                    # Maximum temperature 
#--------------------------------------------------------------------
[temperature_sensor FLY-π]    # The temperature of the upper computer
sensor_type: temperature_host 
min_temp: 0
max_temp: 200
#--------------------------------------------------------------------
# [temperature_sensor Warehouse]         
## The temperature of the warehouse. （The temperature of the warehouse.）
# sensor_type: ATC Semitec 104GT-2  
# sensor_pin: PA4                   
## Analog input pin connected to the thermistor. This parameter must
# min_temp: 0 
# max_temp: 200

#####################################################################
#                               Bed_mes                             # 
#####################################################################
[bed_mesh]
speed: 50              # Calibration speed
horizontal_move_z: 5   # The height of the raised Z.
mesh_min: 30,30        # Minimum calibration point coordinates x, y
mesh_max: 270, 270     # Maximum calibration point coordinates x, y
probe_count: 4,4       # Number of sampling points (16 points for 4X4)
mesh_pps: 2,2          # Additional sampling points
algorithm: bicubic     # Algorithm model
bicubic_tension: 0.2  

#####################################################################
#                        (X/Y Stepper Settings)                     # 
#####################################################################
#   B Motor ---- Motor A 
#   |                  |
#   |-----extruder-----|
#   |                  |
#   |                  |
#      Straight ahead.   
#####################################################################
#                          X Motor  (B Motor)                       #
#####################################################################
[stepper_x]
step_pin: PE2
dir_pin: PC5                          # Motion direction control pin, adding an exclamation mark (!) will reverse the direction.
enable_pin: !PF11                   
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200
endstop_pin: !PG9                     # Limit switch pin, adding an exclamation mark (!) can detect its status.
position_min: 0
position_endstop: 300                 # The maximum travel (250mm-300mm-350mm) needs to be set according to your own machine.
position_max: 300                     # The maximum travel (250mm-300mm-350mm) needs to be set according to your own machine.
homing_speed: 50
homing_retract_dist: 5                # If using infinite positions, please change to 0
homing_positive_dir: true
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
## Please confirm the model of the driver you are using.
[tmc2209 stepper_x]
uart_pin: PC4
interpolate: False                   # Whether to enable 256 microstep interpolation (True for enable, False for disable).
run_current: 0.8                     # The operating current of the motor.
sense_resistor: 0.110
stealthchop_threshold: 0             # StealthChop mode will be enabled when the velocity is below the set value.
#--------------------------------------------------------------------
#[tmc5160 stepper_x]
#cs_pin: PC4
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False                    # Whether to enable 256 microstep interpolation (True for enable, False for disable).
#sense_resistor: 0.075                 # When using the 5160pro, it needs to be modified to 0.033.
#stealthchop_threshold: 0              # StealthChop mode will be enabled when the velocity is below the set value.
#####################################################################
#                          y Motor  (A Motor)                       #
#####################################################################
[stepper_y]
step_pin: PE3
dir_pin: !PF13
enable_pin: !PF14
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200
endstop_pin: !PG12
position_min: 0
position_endstop: 300
position_max: 300
homing_speed: 50
homing_retract_dist: 5
homing_positive_dir: true
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_y]
uart_pin: PF12
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
#[tmc5160 stepper_y]
#cs_pin: PF12
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False
#sense_resistor: 0.075
#stealthchop_threshold: 0 
#####################################################################
#                      Z Stepper Settings                           #
#####################################################################
#   |----- Z1 -----|
#   |              |
#   |              |
#   |              |
#   Z0----12864---Z2

#####################################################################
#                        Z Stepper Settings                         #
#####################################################################
[stepper_z]
step_pin: PE14
dir_pin: !PE8
enable_pin: !PE9
rotation_distance: 40
gear_ratio: 80:16
full_steps_per_rotation: 200
microsteps: 16
endstop_pin: !PG11
position_min: -15
homing_speed: 5
second_homing_speed: 3
homing_retract_dist: 0
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_z]
uart_pin: PE7
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
#[tmc5160 stepper_z]
#cs_pin: PE7
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False
#sense_resistor: 0.075
#stealthchop_threshold: 0
#--------------------------------------------------------------------

[stepper_z1]
step_pin: PE15
dir_pin: !PE11
enable_pin: !PF2
rotation_distance: 40
gear_ratio: 80:16
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_z1]
uart_pin: PE10
interpolate: false
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
# [tmc5160 stepper_z1]
# cs_pin: PE10
# spi_bus: spi1a
# run_current: 1.0
# interpolate: False
# sense_resistor: 0.075
# stealthchop_threshold: 0
#--------------------------------------------------------------------

[stepper_z2]
step_pin: PE1
dir_pin: !PF0
enable_pin: !PC15
rotation_distance: 40
gear_ratio: 80:16
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_z2]
uart_pin: PF1
interpolate: false
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
# [tmc5160 stepper_z2]
# cs_pin: PF1
# spi_bus: spi1a
# run_current: 1.0
# interpolate: False
# sense_resistor: 0.075
# stealthchop_threshold: 0

#--------------------------------------------------------------------
[stepper_z3]
step_pin: PE0
dir_pin: PG3
enable_pin: !PG4
rotation_distance: 40
gear_ratio: 80:16
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 stepper_z3]
uart_pin: PG2
interpolate: false
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
# [tmc5160 stepper_z3]
# cs_pin: PG2
# spi_bus: spi1a
# run_current: 1.0
# interpolate: False
# sense_resistor: 0.075
# stealthchop_threshold: 0

#####################################################################
#                            （E0 Settings）                        # 
#####################################################################
#Driver2
[extruder]
step_pin: PE4
dir_pin: !PG0
enable_pin: !PG1
rotation_distance: 22.6789511
##Calibration: https://www.klipper3d.org/Rotation_Distance.html?h=distance#rotation_distance
gear_ratio: 50:17
microsteps: 16
full_steps_per_rotation: 200
nozzle_diameter: 0.400
filament_diameter: 1.75
heater_pin: PB0
sensor_type: ATC Semitec 104GT-2    # Sensor models (Generic 3950, ATC Semitec 104GT-2, PT1000)
sensor_pin: PF4 
min_temp: 10 
max_temp: 500 
max_power: 1.0
min_extrude_temp: 170               # Minimum extrusion temperature (the extruder can only work when it reaches at least this temperature)
pressure_advance: 0.05 
##Calibration method：https://www.klipper3d.org/Pressure_Advance.html
pressure_advance_smooth_time: 0.040
#max_extrude_only_distance: 200.0 
##Calibration command："PID_CALIBRATE HEATER=extruder TARGET=245"
control: pid              
pid_kp: 26.213              
pid_ki: 1.304               
pid_kd : 131.721            
##Calibration: https://www.klipper3d.org/G-Codes.html?h=calibrate#pid_calibrate_1
step_pulse_duration: 0.000004
#--------------------------------------------------------------------
[tmc2209 extruder]
uart_pin: PF15
interpolate: False
run_current: 0.8
sense_resistor: 0.110
stealthchop_threshold: 0
#--------------------------------------------------------------------
#[tmc5160 extruder]
#cs_pin: PF15
#spi_bus: spi1a
#run_current: 1.0
#interpolate: False
#sense_resistor: 0.075
#stealthchop_threshold: 0

#####################################################################
#                         heater_bed                                # 
#####################################################################
[heater_bed]
heater_pin: PE5
sensor_type: Generic 3950    # Sensor models (Generic 3950, ATC Semitec 104GT-2, PT1000)
sensor_pin:  PC1
max_power: 1.0
min_temp: 0
max_temp: 490
##Calibration command："PID_CALIBRATE HEATER=heater_bed TARGET=100"
control: pid
pid_kp: 58.437
pid_ki: 2.347
pid_kd: 363.769

#####################################################################
#                         Fan configuration                         # 
#####################################################################
[fan]                         # Print cooling fan
pin: PA0
kick_start_time: 0.5
off_below: 0.10
#--------------------------------------------------------------------
[heater_fan hotend_fan]      # hotend_fan
pin: PA1
max_power: 1.0
kick_start_time: 0.5
heater: extruder              # Associated device: Extruder
heater_temp: 50
fan_speed: 1.0
#--------------------------------------------------------------------
[heater_fan controller_fan]  # Electrical cabinet fan
pin: PA2
max_power: 1.0
kick_start_time: 0.5
heater: heater_bed            # Associated device: heater_bed
heater_temp: 50
fan_speed: 1.0
#--------------------------------------------------------------------
[heater_fan exhaust_fan]    # exhaust fan
pin: PA3
max_power: 1.0
kick_start_time: 0.5
heater: heater_bed
heater_temp: 70
fan_speed: 1.0

#####################################################################
#                  Idle and turn off the heated bed                 #
#####################################################################
[idle_timeout]
timeout: 1800                # Turn off the heated bed after 30 minutes of inactivity

#####################################################################
#                             PROBE                                 #
#####################################################################
[probe]
pin: ^PG10
x_offset: 0
y_offset: 25.0
z_offset: 0
speed: 10.0
samples: 3
samples_result: median
sample_retract_dist: 4.0
samples_tolerance: 0.006
samples_tolerance_retries: 3 

#####################################################################
#                             Zeroing                               #
#####################################################################
# [safe_z_home]                
# home_xy_position:206,300     # z endstop position
# speed:100 
# z_hop:10                     # Lift height before homing
#--------------------------------------------------------------------
[homing_override]            # Home Z-axis (if using Klicky, comment out this section)
axes: z
set_position_z: 0
gcode:
   G90
   G0 Z5 F600
   G28 X Y
   ## z endstop position
   ## Test a few times to ensure there are no issues, then update X and Y to your values (e.g. X157, Y305)
   G0 X-10 Y-10 F3600
   
   G28 Z
   G0 Z10 F1800
   
    ##  Remove the "#" in front of the corresponding configuration based on the size of your machine:
    ##  Roughly measure the center of your bed.
#--------------------------------------------------------------------
    ##  250mm model
    #G0 X125 Y125 Z30 F3600
#--------------------------------------------------------------------   
    ##  300mm model
    #G0 X150 Y150 Z30 F3600
#--------------------------------------------------------------------
    ##  350mm model
    #G0 X175 Y175 Z30 F3600
#--------------------------------------------------------------------

#####################################################################
#                        quad_gantry_level                          #
#####################################################################
[quad_gantry_level]
#gantry_corners:
#	-60,-10
#	310,320
#points:                     # 250mm model
#	50,25
#	50,175
#	200,175
#	200,25
#--------------------------------------------------------------------
gantry_corners:             # 300mm model
	-60,-10
	360,370
points:
	50,25
	50,225
	250,225
	250,25
#--------------------------------------------------------------------
#gantry_corners:            # 350mm model
#	-60,-10
#	410,420
#points:
#	50,25
#	50,275
#	300,275
#	300,25
#--------------------------------------------------------------------
speed: 100
horizontal_move_z: 10
retry_tolerance: 0.01
#   The maximum Z distance (in mm) that a sample may differ from other
#   samples. If this tolerance is exceeded then either an error is
#   reported or the attempt is restarted (see
#   samples_tolerance_retries). The default is 0.100mm.
retries: 5
max_adjust: 10

#####################################################################
#                      FLY-Mini 12864 LCD
#####################################################################
##Please remove the "#" at the beginning when using 12864.
[board_pins]
aliases:
    EXP1_1=PE12, EXP1_3=PB2,  EXP1_5=PC14,   EXP1_7=PG14,  EXP1_9=<GND>,
    EXP1_2=PE13, EXP1_4=PG8,  EXP1_6=PC13,   EXP1_8=PG13,  EXP1_10=<5V>,
    # EXP2 header
    EXP2_1=PA6, EXP2_3=PB7,  EXP2_5=PB6,  EXP2_7=PG15,   EXP2_9=<GND>,
    EXP2_2=PA5, EXP2_4=PA4,  EXP2_6=PA7,  EXP2_8=<RST>,  EXP2_10=<NC>,
#--------------------------------------------------------------------    
#[display]
#lcd_type: uc1701
#cs_pin: EXP1_3
#a0_pin: EXP1_4
#rst_pin: EXP1_5
#contrast: 63
#encoder_pins: ^EXP2_5, ^!EXP2_3
#click_pin: ^!EXP1_2
#spi_bus: spi1
#--------------------------------------------------------------------
#[neopixel fly_mini12864]
#pin: EXP1_6
#chain_count: 3
#initial_RED: 0.5
#initial_GREEN: 0.5
#initial_BLUE: 0.5
#color_order: RGB

#####################################################################
#                 Turn off the heated bed when idle                 #
#####################################################################
[idle_timeout]
timeout: 1800
# Turn off the heated bed after 30 minutes of inactivity
#####################################################################
#                          Custom G-code                            #
#####################################################################
[gcode_arcs]
resolution: 1.0

#--------------------------------------------------------------------
[gcode_macro PRINT_START]          # G-code executed before printing
gcode:
    G92 E0
    BED_MESH_CLEAR                # Uninstalling the net bed
    G28
    quad_gantry_level                 # Leveling the gantry crane
    G28
    G1 Z20 F3000                   #  Lowering the Z-axis
    BED_MESH_PROFILE LOAD=default  # Loading the "default" bed of mesh.
#--------------------------------------------------------------------
[gcode_macro PRINT_HUAXIAN]
# To draw a line before printing, it needs to be added to the slicing software
gcode:
    G1 Z5 F3000 
    G92 E0;
    G90
    G0 X5 Y1 F6000
    G0 Z0.4
    G91
    G1 X100 E20 F1200;
    G1 Y1
    G1 X-100 E20 F1200;
    G0 z5
    G1 E-5.0 F3600
    G92 E0;
    G90

#--------------------------------------------------------------------
[gcode_macro PRINT_END]            # Set PRINT_END as the macro executed at the end of printing, customize the action after printing is completed.
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
 
    M400
    G92 E0
    G1 E-10.0 F3600
    G91
    G0 Z{z_safe} F3600
    G0 X{x_safe} Y{y_safe} F20000
    M104 S0
    M140 S0
    M106 S0
    G90
    G0 X{max_x / 2} Y{max_y} F3600
    BED_MESH_CLEAR

```

## 6.3 VZBOT Example_configuration

```
### For Fly Super PRO 8 ####
### And Mellow Kit  ####
### For Fly Super non pro, the SPI bus is spi3
[include mainsail.cfg]
[include timelapse.cfg]
#[include PIS.cfg] this is the fysetc accelerometer
#[include crampon.cfg] This is the Annex Crampon accelerometer

##### VzBoT############
#######################

[printer]
kinematics: corexy
max_velocity: 2500
max_accel: 10000
#max_accel_to_decel: 5000
max_z_velocity: 20
max_z_accel: 1500
square_corner_velocity: 10

########################
########################


[mcu]
serial:/dev/serial/by-id/[replace with your own board ID] 
#restart_method: command

[mcu rpi]
serial: /tmp/klipper_host_mcu

#[adxl345] (if you run sensor connected to Pi)
#cs_pin: rpi:None

#[resonance_tester] This is for accel sensor connected to Pi
#accel_chip: adxl345
#probe_points:
#    155,155,20  # an example

########################
########################

[stepper_x]
##	in M3 position
step_pin: PE14
dir_pin: PE8
enable_pin: !PE9
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200  
endstop_pin: ^PG11
position_endstop: -19
position_min: -19
position_max: 315
homing_speed: 35  
homing_retract_dist: 0
[tmc5160 stepper_x] 
spi_bus: spi1a 
#spi_software_mosi_pin: PB5
#spi_software_miso_pin: PB4
#spi_software_sclk_pin: PB3
cs_pin: PE7
interpolate: false
run_current: 1.75
sense_resistor: 0.033
driver_TBL: 0
driver_TOFF: 1


[stepper_x1]
##	in M5 position
step_pin: PE1
dir_pin: PF0
enable_pin: !PC15
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200
[tmc5160 stepper_x1] 
spi_bus: spi1a
#spi_software_mosi_pin: PB5
#spi_software_miso_pin: PB4
#spi_software_sclk_pin: PB3
cs_pin: PF1
interpolate: false
run_current: 1.75
sense_resistor: 0.033
driver_TBL: 0
driver_TOFF: 1


[stepper_y]
##	in M4 position
step_pin: PE15
dir_pin: PE11
enable_pin: !PF2
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200  
endstop_pin: ^PG12
position_endstop: -0
position_min: -0
position_max: 310
homing_speed: 35  
homing_retract_dist: 0
[tmc5160 stepper_y] 
spi_bus: spi1a
#spi_software_mosi_pin: PB5
#spi_software_miso_pin: PB4
#spi_software_sclk_pin: PB3
cs_pin: PE10
interpolate: false
run_current: 1.75
sense_resistor: 0.033
driver_TBL: 0
driver_TOFF: 1




[stepper_y1]
##	in M6 position
step_pin: PE0
dir_pin: PG3
enable_pin: !PG4
rotation_distance: 40
microsteps: 16
full_steps_per_rotation: 200 
[tmc5160 stepper_y1] 
spi_bus: spi1a
#spi_software_mosi_pin: PB5
#spi_software_miso_pin: PB4
#spi_software_sclk_pin: PB3
cs_pin: PG2
interpolate: false
run_current: 1.75
sense_resistor: 0.033
driver_TBL: 0
driver_TOFF: 1

#########################

[stepper_z]
## In M0 position
step_pin: PE2
dir_pin: !PC5
enable_pin: !PF11
microsteps: 32
rotation_distance: 4
endstop_pin: ^PG10
position_endstop: 0.0
position_max: 400
full_steps_per_rotation: 200
homing_retract_dist: 5.0
homing_positive_dir: false
homing_speed: 5.0
second_homing_speed: 2.5
[tmc2209 stepper_z]
interpolate: false
uart_pin: PC4
run_current: 1
sense_resistor: 0.110


#########################

[extruder]
## In M1 position
### Vz-HextrudORT
step_pin: PE3
dir_pin: PF13
microsteps: 16
enable_pin: !PF14
rotation_distance: 22 
gear_ratio: 50:10 
nozzle_diameter: 0.5
filament_diameter: 1.750
heater_pin: PB0
sensor_type: PT1000
sensor_pin: PF4
###
control: pid
pid_Kp=28.737 
pid_Ki=1.935 
pid_Kd=106.684
min_temp: 0
max_temp: 400
full_steps_per_rotation: 200
max_extrude_only_distance: 1000.0
max_extrude_cross_section: 500
max_extrude_only_velocity: 200
max_extrude_only_accel: 10000
min_extrude_temp: 0
pressure_advance: 0.02
pressure_advance_smooth_time: 0.03
[tmc2209 extruder]
interpolate: false
uart_pin: PF12
run_current: 0.7
sense_resistor: 0.110



########################
########################

[heater_bed]
heater_pin: PE5
sensor_type: Generic 3950
sensor_pin: PC1
control: pid
pid_Kp: 66.746
pid_Ki: 3.504
pid_Kd: 317.878
min_temp: 0
max_temp: 130


########################
#### FANS ##############
########################

[fan]
##	Print Cooling Fan 
pin: PF8
max_power: 0.9
cycle_time: 0.002
hardware_pwm: false
shutdown_speed: 0

[heater_fan hotend_fan]
##	Hotend Fan - FAN0 Connector (or watercooling pump+fan on radiator)
pin: PA0
max_power: 1.0
kick_start_time: 0.5
heater: extruder
heater_temp: 50.0

[fan_generic Exhaust_fan]
##  exhaust fan - In FAN4
pin: PA15
max_power: 1
shutdown_speed: 0
kick_start_time: 0.1
off_below: 0.10

[fan_generic chamber_fan]
##  chamber fan - In FAN9 Positon
pin: PD15
max_power: 1
shutdown_speed: 0
kick_start_time: 0.1
off_below: 0.10

[fan_generic RSCS]
##  RSCS Fans - In FAN1 Positon
pin: PA1
max_power: 1
shutdown_speed: 0
kick_start_time: 0.1
off_below: 0.10

#[controller_fan driver_fan] 
# This is if you connect your driver fan to Super8 
#or if you want to add fan to the Super8. Other wise connect them in the driver fan ports
#stepper: stepper_x
#pin: PB11
#max_power: 1
#shutdown_speed: 0
#kick_start_time: 0.1
#off_below: 0.10

########################
########################
[temperature_sensor FLY-Super8]
sensor_type: temperature_mcu

#[temperature_sensor chamber]  optional for chamber temp
#sensor_type: NTC 100K MGB18-104F39050L32
#pullup_resistor: 4700
#sensor_pin: PF9
#min_temp: 0
#max_temp: 60
#gcode_id: C: C


[temperature_sensor raspberry_pi]
sensor_type: temperature_host
min_temp: 10
max_temp: 100



########################
########################

[pause_resume]
recover_velocity: 350

########################
########################

[filament_switch_sensor sentinel]
pause_on_runout: true
switch_pin: PA8
runout_gcode:
	G91
    G1 E-30 F2500
  	G90
	G1 X0 Y0 F30000
  	M104 S0

########################
########################

#[homing_override]
#set_position_z: 0
#axes: xy
#gcode:
# G0 Z3 F200
# G28 y0 
# G28 x0
# G28 Z0

########################
########################

[firmware_retraction]
retract_length: 0.5
retract_speed: 60
unretract_extra_length: 0.00
unretract_speed: 60

###########################################
#########Custom PINs Definition ############
###########################################


[output_pin LED]
#In FAN8 position
pin: PD14
pwm: false
value: 1
shutdown_value:1
### gcode command: SET_PIN PIN=LED value=0 to 1



################################################################################################
################################################################################################
#####				MACROS					

##################
[gcode_macro RETRACTION_UP]
gcode:
    {% set CRLEN = printer.firmware_retraction.retract_length|float %}
    {% set NRLEN = CRLEN|float + 0.1 %}
    { action_respond_info("current retract_length %.2f, new retract_length %.2f" % (CRLEN, NRLEN))  }
    SET_RETRACTION RETRACT_LENGTH={NRLEN}    

[gcode_macro RETRACTION_DOWN]
gcode:
    {% set CRLEN = printer.firmware_retraction.retract_length|float %}
    {% set NRLEN = CRLEN|float - 0.1 %}
    { action_respond_info("current retract_length %.2f, new retract_length %.2f" % (CRLEN, NRLEN))  }
    SET_RETRACTION RETRACT_LENGTH={NRLEN}   


#[gcode_macro SET_RETRACTIONLENGTH]
#gcode:
#  SET_RETRACTION RETRACT_LENGTH={params.LENGTH|float}
#  GET_RETRACTION

########################	
[gcode_macro exhaustfan_on]
gcode: 
	SET_FAN_SPEED FAN=Exhaust_fan SPEED=1
###	
	
[gcode_macro exhaustfan_off]
gcode: 
	SET_FAN_SPEED FAN=Exhaust_fan SPEED=0
	
	
###		
	
[gcode_macro enclosurefan_on]
gcode: 
	SET_FAN_SPEED FAN=chamber_fan SPEED=1

###			
	
[gcode_macro enclosurefan_off]
gcode: 
	SET_FAN_SPEED FAN=chamber_fan SPEED=0


[gcode_macro RSCS_on]
gcode: 
	SET_FAN_SPEED FAN=RSCS SPEED=1
###	
	

[gcode_macro RSCS_off]
gcode: 
	SET_FAN_SPEED FAN=RSCS SPEED=0
		
###

[gcode_macro LED_on]
gcode:
	SET_PIN PIN=LED value=1   


[gcode_macro LED_off]
gcode:
	SET_PIN PIN=LED value=0  

###	
	
[gcode_macro PA_tunning]
gcode: 
	SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500
	TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE PARAMETER=ADVANCE START=0 FACTOR=.005


#####

[gcode_macro POWER_OFF]
gcode:
  {action_call_remote_method("set_device_power",
                             device="tplink",
                             state="off")}
#####	

[gcode_macro TEST_RESONNANCES_X]
gcode:
 TEST_RESONANCES AXIS=X


[gcode_macro TEST_RESONNANCES_Y]
gcode:
 TEST_RESONANCES AXIS=Y

[gcode_macro DUMP_WARNINGS]
description: Debug: Print all warning messages from klipper
gcode:
  {% set parameters = ["printer.configfile.warnings:"] %}
  {% for warning in printer.configfile.warnings %}
      {% set parameters = parameters.append("%s -> %s -> %s\n%s" % (warning.type, warning.section, warning.option, warning.message)) %}
  {% endfor %}
  {action_respond_info(parameters|join("\n"))}


[gcode_macro ACCELL_TEST_X]
gcode:

    {% set steps = params.STEPS|default(100)|int %}
    {% set speed = params.VELOCITY|default(1000)|float * 60 %}

    {% set inset = 10.0|float %}
    {% set accel = 10000|int %}
    {% set maxX = printer.configfile.settings.stepper_x.position_max|float - inset %}
    {% set maxY = printer.configfile.settings.stepper_y.position_max|float - inset %}
    {% set minX = printer.configfile.settings.stepper_x.position_min|float + inset %}
    {% set minY = printer.configfile.settings.stepper_y.position_min|float + inset %}

    SAVE_GCODE_STATE NAME=accelltest_state

    SET_VELOCITY_LIMIT ACCEL={accel} 
    SET_VELOCITY_LIMIT ACCEL_TO_DECEL={accel}
    G28
	G1 Z5
    G1 X{minX} Y{minY} F{speed} 

    {% for INTERVAL in range(steps) %}
        {% set eff = accel + (INTERVAL * 1000) %} 
        SET_VELOCITY_LIMIT ACCEL={eff} 
        SET_VELOCITY_LIMIT ACCEL_TO_DECEL={eff}
        G1 X{minX} Y{minY} F{speed}  
        G1 X{maxX} Y{maxY} F{speed}  

    {% endfor %}    

    RESTORE_GCODE_STATE NAME=accelltest_state 
	
	
	
[gcode_macro ACCELL_TEST_Y]
gcode:

    {% set steps = params.STEPS|default(100)|int %}
    {% set speed = params.VELOCITY|default(1000)|float * 60 %}

    {% set inset = 10.0|float %}
    {% set accel = 10000|int %}
    {% set maxX = printer.configfile.settings.stepper_x.position_max|float - inset %}
    {% set maxY = printer.configfile.settings.stepper_y.position_max|float - inset %}
    {% set minX = printer.configfile.settings.stepper_x.position_min|float + inset %}
    {% set minY = printer.configfile.settings.stepper_y.position_min|float + inset %}

    SAVE_GCODE_STATE NAME=accelltest_state

    SET_VELOCITY_LIMIT ACCEL={accel} 
    SET_VELOCITY_LIMIT ACCEL_TO_DECEL={accel}
    G28
	G1 Z5
    G1 X{minX} Y{minY} F{speed} 

    {% for INTERVAL in range(steps) %}
        {% set eff = accel + (INTERVAL * 1000) %} 
        SET_VELOCITY_LIMIT ACCEL={eff} 
        SET_VELOCITY_LIMIT ACCEL_TO_DECEL={eff}
        G1 X{maxX} Y{minY} F{speed}  
        G1 X{minX} Y{maxY} F{speed}  

    {% endfor %}    

    RESTORE_GCODE_STATE NAME=accelltest_state 


[gcode_macro enable_stepper]
gcode:
 SET_STEPPER_ENABLE STEPPER=stepper_x ENABLE=1
 SET_STEPPER_ENABLE STEPPER=stepper_x1 ENABLE=1
 SET_STEPPER_ENABLE STEPPER=stepper_y ENABLE=1
 SET_STEPPER_ENABLE STEPPER=stepper_y1 ENABLE=1

################################################################################################
################################################################################################



[virtual_sdcard]
path: ~/gcode_files

########################
########################

[display_status]

########################
########################

[bed_screws]
screw1: 20,20
screw2: 20,290
screw3: 290,290
screw4: 290,20


########################
########################

[input_shaper]
shaper_freq_x: 118
shaper_type_x: mzv
shaper_freq_y: 81
shaper_type_y: mzv

```

