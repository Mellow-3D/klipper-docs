# 通过插件扩展驱动LED

需要通过ssh连接到上位机后按照下方链接进行安装与配置

```
https://github.com/julianschill/klipper-led_effect
```

## 安装

请使用**MobaXterm_Personal**等**SSH工具**连接通过**WIFI**到您的上位机，并且需要确定以下几点

1. **请确保上位机安装好了Klipper固件**
2. **请确保登录的用户必须是安装好Klipper的用户**
3. **请确保你的输入法是英文**
4. **请确保你的上位机可以正常搜索到设备**
5. **请确保以上注意事项都做到，否则无法进行下一步**

该模块可以使用安装脚本安装到现有的 Klipper 安装中。

```
cd ~
git clone https://github.com/julianschill/klipper-led_effect.git
cd klipper-led_effect
./install-led_effect.sh
```

## 参考配置

```
[neopixel TP_led]
pin: PB7
chain_count: 25
# Number of LEDs
# 灯珠数量
color_order: GRB
initial_RED: 0.4    
initial_GREEN: 0.8
initial_BLUE: 1
initial_WHITE: 0.0
#66CCFF 

[led_effect sb_nozzle_cooling]
autostart:              false
frame_rate:             24
leds:
    neopixel:TP_led (9,10)
layers:
        breathing  3 1 top (0.0, 0.0, 1.0, 0.1)

[led_effect rainbow]
leds:
    neopixel:TP_led
autostart:                          true
frame_rate:                         24
layers:
    gradient  0.3  1 add (0.3, 0.0, 0.0),(0.0, 0.3, 0.0),(0.0, 0.0, 0.3)

```

