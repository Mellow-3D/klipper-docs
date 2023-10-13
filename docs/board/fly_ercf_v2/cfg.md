# FLY-ERCF 参考配置

> [!TIP]
> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


## 驱动可用引脚

```cfg
step_pin: PE14
dir_pin:  PE13
enable_pin: !PE12

cs_pin: PE11
spi_bus: spi1a
DIAG:PE10
#--------------------------------------------------------------------
step_pin: PC5
dir_pin: !PB1
enable_pin: !PB0

cs_pin: PE7
spi_bus: spi1a
DIAG:PE8
#--------------------------------------------------------------------
step_pin: PC4
dir_pin: PA6
enable_pin: !PA7

cs_pin: PA5
spi_bus: spi1a
DIAG:PA4
#--------------------------------------------------------------------
step_pin: PE4
dir_pin: PE6
enable_pin: !PE5 

cs_pin: PC13  
spi_bus: spi1a
DIAG:PC14
#####################################################################
#                             驱动LED                               #
#####################################################################
#请不要将下方led数值修改过大，会很刺眼
[neopixel TMC_leds]
pin: PA8                     # 信号接口
chain_count: 25              # 灯珠数量
color_order: GRB             # 灯珠类型
initial_RED: 0.0118          # 天
initial_GREEN: 0.0235        # 依
initial_BLUE: 0.0314         # 蓝
initial_WHITE: 0.0       

```

## 限位可用引脚

```
PD3
PD4
PD5
PD6
PD7
PC0
PC1
PC2
PC3
PE2
PE3
```

## 舵机可用引脚

```
PA0
PA1
PA2
PA3
```

## LED可用引脚

```
PE10
```

