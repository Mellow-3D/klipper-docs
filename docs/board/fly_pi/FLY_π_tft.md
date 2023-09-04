# 9. FLY -TFT 的使用

## 1. 修改配置

> [!TIP]
> 首先，请打开FLY_config配置文件，打开方式请参照[打开fly_Config](/board/fly_pi/FLY_π_description2?id=_11-打开-fly_config "点击即可跳转")

1. 启用 klipperscreen 将``KlipperScreen=false``修改为``KlipperScreen=true``

![kp](../../images/boards/fly_pi/kp.png)

2. 更改默认显示方式 将``Display=NONE``修改为``Display=FBTFT``。保存配置文件后弹出SD卡插到主板。如果为eMMC，则断电重新上电即可

![display](../../images/boards/fly_pi/display.png)

## 2. 屏幕接线

屏幕端子需要自己连接

* **Fly- π 接线图**

![v2](../../images/boards/fly_pi/v2.png)



## 3. 连接屏幕与上位机

* **FLY π**

  ![tft_flyπ](../../images/boards/fly_pi/tft_flyπ.png)

  * **Fly- π 一线通接线图**

    ![tft](../../images/boards/fly_pi/tft.jpg)

  如果屏幕只显示下图所示界面，请检查``FLY_CONFIG``中``Klipperscreen``的配置是否修改正确。

![no_display](../../images/boards/fly_pi/no_display.png)

5.上位机上电开机。

> [!TIP]
> 修改Display后首次开机时间较长，请耐心等待几分钟！如果遇到白屏等情况，请检查接线和配置是否正确！！！
