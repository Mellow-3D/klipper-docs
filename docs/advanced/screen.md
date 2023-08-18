## Mini 12864 LCD

* 正确连接到EXP接口，将示例配置中的mini12864部分取消注释

下图为FLY的mini12864的接线方式，其他厂家的屏幕请咨询相应厂家。Mini12864屏幕接接反，接错可能会导致上位机连不上MCU。如果使用mini12864屏幕之前可以正常连上主板的MCU，而使用mini12864后就连不上MCU了，请尝试拔出mini12864的接线！！！

![flymini12864](../images/boards/fly_super8/flymini12864.png)



### Marlin 配置方法

只需要在配置里面添加即可使用

```
#if HAS_WIRED_LCD

  #define BEEPER_PIN                 EXP1_10_PIN
  #define BTN_ENC                    EXP1_09_PIN

  #if ENABLED(CR10_STOCKDISPLAY)

    #define LCD_PINS_RS              EXP1_07_PIN

    #define BTN_EN1                  EXP2_08_PIN
    #define BTN_EN2                  EXP2_06_PIN

    #define LCD_PINS_ENABLE          EXP1_08_PIN
    #define LCD_PINS_D4              EXP1_06_PIN

  #elif ENABLED(MKS_MINI_12864)

    #define DOGLCD_A0                EXP1_04_PIN
    #define DOGLCD_CS                EXP1_05_PIN
    #define BTN_EN1                  EXP2_08_PIN
    #define BTN_EN2                  EXP2_06_PIN

  #else

    #define LCD_PINS_RS              EXP1_07_PIN

    #define BTN_EN1                  EXP2_06_PIN
    #define BTN_EN2                  EXP2_08_PIN

    #define LCD_PINS_ENABLE          EXP1_08_PIN
    #define LCD_PINS_D4              EXP1_06_PIN

    #if ENABLED(FYSETC_MINI_12864)
      #define DOGLCD_CS              EXP1_08_PIN
      #define DOGLCD_A0              EXP1_07_PIN
      //#define LCD_BACKLIGHT_PIN           -1
      #define LCD_RESET_PIN          EXP1_06_PIN  // Must be high or open for LCD to operate normally.
      #if EITHER(FYSETC_MINI_12864_1_2, FYSETC_MINI_12864_2_0)
        #ifndef RGB_LED_R_PIN
          #define RGB_LED_R_PIN      EXP1_05_PIN
        #endif
        #ifndef RGB_LED_G_PIN
          #define RGB_LED_G_PIN      EXP1_04_PIN
        #endif
        #ifndef RGB_LED_B_PIN
          #define RGB_LED_B_PIN      EXP1_03_PIN
        #endif
      #elif ENABLED(FYSETC_MINI_12864_2_1)
        #define NEOPIXEL_PIN         EXP1_05_PIN
      #endif
    #endif // !FYSETC_MINI_12864

    #if IS_ULTIPANEL
      #define LCD_PINS_D5            EXP1_05_PIN
      #define LCD_PINS_D6            EXP1_04_PIN
      #define LCD_PINS_D7            EXP1_03_PIN

      #if ENABLED(REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER)
        #define BTN_ENC_EN           LCD_PINS_D7  // Detect the presence of the encoder
      #endif

    #endif

  #endif

#endif // HAS_WIRED_LCD
```



# FLY TFT屏幕配置

* 开始使用tft前确认已阅读并完成[系统镜像](../introduction/system.md)部分文档

1. 烧录完成后会出现 BOOT 盘（如果未出现，请重新拔下 sd 卡，再插入电脑）

![boot](../images/screen/boot.png)

2. 打开BOOT盘下的**FLY-Config.conf**

![boot2](../images/screen/boot2.png)

3. 启用 klipperscreen
将`KlipperScreen=false`修改为`KlipperScreen=true`

![kp](../images/screen/kp.png)

4. 更改默认显示方式
将`Display=NONE`修改为`Display=FBTFT`

![display](../images/screen/display.png)

保存配置文件后弹出SD卡插到主板

## FLY-TFT-V1屏幕接线

* Gemini-v1接线图

![v1](../images/screen/v1.png)

* Gemini-v1.1接线图

![v1-1](../images/screen/v1-1.png)

* Gemini-v2和Fly-Pi接线图

![v2](../images/screen/v2.png)

6. 连接主板与屏幕

* FLY-Gemini

![link](../images/screen/link.png)

* FLY-Pi

![link](../images/screen/link2.png)

1. 主板上电开机

> [!TIP]
> 修改Display后首次开机时间较长，请耐心等待几分钟！



## FLY TFT V1 FPC一线通版

![gemini3](../images/boards/fly_gemini_v3/10-2.jpg)

![pi](../images/boards/fly_pi/tft.jpg)

![pi-v2](../images/boards/fly_pi_v2/tft.jpg)



# FLY LCD43/50/70 

* 开始使用LCD屏幕前确认已阅读并完成[系统镜像](../introduction/system.md)部分文档

* LCD屏幕分HDMI和DSI两个版本

* HDMI是可以给其他设备使用，DSI是给树莓派使用

   

## 核心板安装方法

![link](../images/screen/lcd-link.png)

![link](../images/screen/lcd-link1.png)

## LCD HDMI

1. 烧录完成后会出现 BOOT 盘（如果未出现，请重新拔下 sd 卡，再插入电脑）

![boot](../images/screen/boot.png)



2. 打开BOOT盘下的**FLY-Config.conf**

![boot2](../images/screen/boot2.png)



3. 启用 klipperscreen
   将`KlipperScreen=false`修改为`KlipperScreen=true`

![kp](../images/screen/kp.png)



4. 更改默认显示方式
   将`Display=NONE`修改为`Display=HDMI

![link](../images/screen/lcdplay.png)

保存配置文件后弹出SD卡插到主板



### 屏幕接线

> [!NOTE]
> 请注意这需要占用上位机一个HDMI与USB

   type-c是触摸与供电请与HDMI接到上位机，购买FLY-LCD-HDMI时候会赠送一个HDMI转MINIHDMI

   

   ![LCD-HDMI](../images/screen/LCD-HDMI.png)

   ![LCD-HDMI](../images/screen/LCD-HDMI2.png)



### LCD HDMI直连FLY PI V2方法

![](C:/Users/74103/Documents/GitHub/klipper-docs/docs/images/boards/fly_pi_v2/hdmi.jpg)

   

## LCD DSI

> [!NOTE]
> 请注意金手指方向



> [!NOTE]
> 请注意这个需要设备支持DSI才可以使用

![DSI](../images/screen/dsi-link.png)



### 树莓派配置

> [!NOTE]
> 树莓派无法使用触摸时候可以按此方法修改配置

树莓派使用FLY LCD-DSI时需要使用**SSH连接树莓派**修改以下配置，否则可能无法使用触摸。

![display](../images/screen/pi.png)

```
sudo nano /boot/config.txt
```



![cfg](../images/screen/pi-1.png)



找到

```
dtoverlay=vc4-kms-v3d
```

修改

```
dtoverlay=vc4-kms-v3d,f
```

保存并且退出

```
CTRL+S
CTRL+X
```



