# 归位与调平

## Z_TILT_ADJUST

该命令可以在调平的时候自动调整打印机的Z抬升高度

请注意此配置会在第一次调平后将Z轴抬高变成1

```
[gcode_macro Z_TILT_ADJUST] 
rename_existing: _Z_TILT_ADJUST
gcode: SAVE_GCODE_STATE NAME=STATE_Z_TILT 
       BED_MESH_CLEAR 
       {% if not printer.z_tilt.applied %} 
         _Z_TILT_ADJUST horizontal_move_z=10 retry_tolerance=1 
       {% endif %} 
       _Z_TILT_ADJUST horizontal_move_z=2 
       G28 Z 
       RESTORE_GCODE_STATE NAME=STATE_Z_TILT
```



## QUAD_GANTRY_LEVEL

该命令可以在调平的时候自动调整打印机的Z抬升高度

请注意此配置会在第一次调平后将Z轴抬高变成1

```
[gcode_macro QUAD_GANTRY_LEVEL]
rename_existing: _QUAD_GANTRY_LEVEL
gcode:
    SAVE_GCODE_STATE NAME=STATE_QGL
    BED_MESH_CLEAR
    {% if not printer.quad_gantry_level.applied %}
      _QUAD_GANTRY_LEVEL horizontal_move_z=10 retry_tolerance=0.5
    {% endif %}
    _QUAD_GANTRY_LEVEL horizontal_move_z=2
    G28 Z
    RESTORE_GCODE_STATE NAME=STATE_QGL
```



## G28 Z

该命令可以在判断Z轴是否抬升过，如果有将不抬升Z轴

```
[respond]
# 使用方法：M118 <message>
# 或者 RESPOND TYPE=error MSG="<message>"，TYPE不填则使用默认值
default_type: echo            # 默认输出类型
#  可以选择的输出类型
#       echo: "echo: " (默认)
#       command: "// "
#       error: "!! "
#default_prefix:echo:       # 控制台输出前缀，修改后替换输出前缀
#--------------------------------------------------------------------
[gcode_macro _CG28]
description: 如果各轴未归零则执行归零操作，否则不执行归零
gcode:
	{% if "xyz" not in printer.toolhead.homed_axes %}
	STATUS_HOMING
	G28
	{% endif %}
#--------------------------------------------------------------------
[gcode_macro _LIFT_Z]
variable_status: False
gcode:
    {% set LIFTED = printer['gcode_macro _LIFT_Z'].status|int %}
    RESPOND TYPE=error MSG=<message>
    # M118 LIFT_Status: {LIFTED}
    {% if LIFTED == False %}
        SET_GCODE_VARIABLE MACRO=_LIFT_Z VARIABLE=status VALUE=True
    {% endif %}
```



# 风扇宏

## 侧边辅助散热宏

这个宏的作用是控制一个名为Aux_Fan的风扇。它有两个子命令：M106和M107。

M106命令用于设置风扇的速度。它接受两个参数：P和S。如果P被定义并且等于2，那么它将根据S的值来设置风扇的速度。如果S被定义，那么它将使用S的值作为风扇的速度；否则，它将使用默认速度1（即全速）。

M107命令用于关闭风扇。它也接受一个参数P，如果P被定义并且等于2，那么它将关闭风扇。

```
[fan_generic Aux_Fan] 
pin: PA6
max_power: 1.0
shutdown_speed: 0
#cycle_time:
#hardware_pwm:
kick_start_time: 0.2
off_below: 0.25
#tachometer_pin:
#tachometer_ppr:
#tachometer_poll_interval:
#enable_pin:

# Replacement-Macro to control the Fan with M106 P2 and M107 for BambuStudio
# Macro inspired by klipper-github issue https://github.com/Klipper3d/klipper/issues/2174
[gcode_macro M106]
rename_existing: G106
gcode:
    {% if params.P is defined %}
        {% if params.P|int == 2 %}
            {% if params.S is defined %}
                {% if params.S|int == 255 %}
                    {% set realspeed = 1 %}
                {% else %}
                    {% if params.S|int == 0 %}
                        {% set realspeed = 0 %}
                    {% else %}
                        {% set realspeed = params.S|float/255 %}
                    {% endif %}
                {% endif %}
            {% else %}
                {% set realspeed = 1 %}
            {% endif %}

            SET_FAN_SPEED FAN=Aux_Fan SPEED={realspeed}
        {% endif %}
    {% else %}
        {% if params.S is defined %}
          G106 S{params.S}
        {% else %}
          G106 S255
        {% endif %}
    {% endif %}

[gcode_macro M107]
rename_existing: G107
gcode:
    {% if params.P is defined %}
      {% if params.P|int == 2 %}
        SET_FAN_SPEED FAN=Aux_Fan SPEED=0
      {% endif %}      
    {% else %}
      SET_FAN_SPEED FAN=Aux_Fan SPEED=0  
      G107
    {% endif %}

```

# 打印宏

## 打印前画线

1. 切片修改

```
## 打印开始前执行的宏
# 在切片软件的开始G-CODE填入
# CURA 5.0：
# PRINT_START EXTRUDER={material_print_temperature_layer_0} BED={material_bed_temperature_layer_0} CHAMBER={build_volume_temperature} NOZZLE={machine_nozzle_size} FILAMENT={material_type} PRINT_MIN=%MINX%,%MINY% PRINT_MAX=%MAXX%,%MAXY%

# SuperSlicer：
# M190 S0
# M109 S0 ; uncomment to remove set&wait temp gcode added automatically after this start gcode
# PRINT_START EXTRUDER={first_layer_temperature[initial_extruder] + extruder_temperature_offset[initial_extruder]} BED=[first_layer_bed_temperature] CHAMBER=[chamber_temperature] NOZZLE=[nozzle_diameter] FILAMENT=[filament_type] PRINT_MIN={first_layer_print_min[0]},{first_layer_print_min[1]} PRINT_MAX={first_layer_print_max[0]},{first_layer_print_max[1]}

# OrcaSlicer:
# M190 S0
# M109 S0
# PRINT_START EXTRUDER=[nozzle_temperature_initial_layer] BED=[bed_temperature_initial_layer_single] CHAMBER=[chamber_temperature] NOZZLE={nozzle_diameter[0]} FILAMENT=[filament_type] PRINT_MIN={first_layer_print_min[0]},{first_layer_print_min[1]} PRINT_MAX={first_layer_print_max[0]},{first_layer_print_max[1]}
```

2. 打印机CFG添加

```
## 根据区域床尺寸自适应打印测试线，切片时尽量保证左测至少留空大于10
[gcode_macro _PURGE_LINE]
description: 在打印区域的左边打印一条线，让挤出机做好准备
gcode:
    {% set extruder_temp = params.EXTRUDER_TEMP %}
    {% set print_min_x = params.PRINT_MIN.split(",")[0]|int %}
    {% set print_min_y = params.PRINT_MIN.split(",")[1]|int %}
    _MESSAGE TEXT="参考最小坐标点：({print_min_x},{print_min_y})"                 # 将打印的最小坐标点信息输出到控制台
    {% if print_min_x > 25 %}                                                 # 如果最小坐标的X轴左边还有大于25mm的空间，则在打印区域的左边画线
        {% set line_start_x = print_min_x - 22 %}
        {% set line_end_x = print_min_x - 22 %}
        {% set line_start_y = print_min_y %}
        {% set line_end_y = print_min_y + 50 %}
    {% elif print_min_x < 25 and print_min_y > 25 %}                          # 如果最小坐标的X轴左边空间小于25mm，但是Y轴的下边有大于25mm的空间，则在打印区域的下边画线
        {% set line_start_x = print_min_x %}
        {% set line_end_x = print_min_x + 50 %}
        {% set line_start_y = print_min_y - 22 %}
        {% set line_end_y = print_min_y - 22 %}
    {% else %}                                                                # 如果两边空间都不足，强制在打印区域左边的床边缘画线
        {% set line_start_x = 5 %}
        {% set line_end_x = 5 %}
        {% set line_start_y = 5 %}
        {% set line_end_y = 55 %}
    {% endif %}
    _MESSAGE TEXT="移动到({line_start_x},{line_start_y})，加热热端，准备画线"      # 将打印头将要移动的目的坐标输出到控制台
    G90                                                                       # 切换到相对于原点的坐标系
    G1 X{line_start_x} Y{line_start_y} Z3 F6000                               # 移动到准备位置
    STATUS_HEATING                                                            # 设置SB灯颜色
    M109 S{extruder_temp}                                                     # 等待热端到达指定温度
    G1 Z1 F1500                                                               # 下移喷嘴
    _RESET_EXTRUDER                                                           # 重置挤出机
    G1 E10 F150                                                               # 在原地挤出10mm耗材，黏住喷嘴上面的料
    _RESET_EXTRUDER                                                           # 重置挤出机
    G1 X{line_end_x} Y{line_end_y} Z0.25 F1500 E10                            # 画一条直线
    _RESET_EXTRUDER                                                           # 重置挤出机
    G1 Z2 F3000                                                               # 抬高喷嘴

```

