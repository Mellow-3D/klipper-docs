# 5. SD卡系统迁移至M2WE

>[!WARNING]
>SD卡烧录与M2WE烧录只需要使用其中一种烧录即可，如果SD卡和M2WE中同时安装有镜像，系统会优先启动SD卡系统！

>[!WARNING]
>如果M2WE已经写入了系统镜像，则无需再执行本章节的操作！

FLY-M2WE提供了16G的eMMC和5G WiFi，能够提供更稳定的系统运行和更快的网络传输。（建议使用2.4GWiFi，虽然速度稍慢，但是距离远，连接也更稳定）

> [!TIP]
> FLY-M2WE只适用于FLY-π、FLY Pi v2、FLY-Gemini v2/v3、FLY-C8。 不要带电插拔模块，此模块不支持热插拔！！！

> [!TIP]
> **系统迁移可完整的将SD卡中原有的镜像迁移至M2WE中，此时M2WE中的内容与原来SD卡中的内容保持一致**

**[FLY_M2WE eMMC购买地址](https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-23066022675.38.25636b45lpxmgF&id=685372879431 "点击即可跳转")**

* FLYOS v2.9.6开始已经完全支持M2WE

* WiFi驱动已经预装，直接插上并固定好即可

  

首先请安装好M2WE模块及天线，准备迁移系统镜像至M2WE。

  1. 给FLY-Pi-V2安装好M2WE模块并上电启动
  2. 连接到SSH
  3. 执行下面的命令, 可能会提示输入密码，输入``mellow``回车

   ```bash
  sudo nand-sata-install
   ```

![emmc-install](../../images/boards/fly_pi/emmc_install_1.png ":size=50%")

   4. 选择``Boot from eMMC - system on eMMC``选项后按回车键（一般默认选项就是，直接按回车键）

      ![emmc-install](../../images/boards/fly_pi/emmc_install_2.png ":size=50%")

   5. 出现``This script will erase your eMMC. Continue?``时选择``Yes``按回车键（一般默认选项就是，直接按回车键）

      ![emmc-install](../../images/boards/fly_pi/emmc_install_3.png ":size=50%")

   6. 选择文件系统类型为``ext4``按回车键（一般默认选项就是，直接按回车键）

   7. 耐心等待直到出现进度条（如果等待超过2分钟仍未出现下图进度条请按``CTRL+C``来终止操作，然后重启设备后重试）

      ![emmc-install](../../images/boards/fly_pi/emmc_install_4.png ":size=50%")

   8. 系统迁移过程中请勿断电及进行其他操作，直到迁移完成

      ![emmc-install](../../images/boards/fly_pi/emmc_install_5.png ":size=50%")

   9. 迁移完成，直接按回车键，等待设备完全关机

   10. 关机后取下SD卡，重新上电开机，此时已经可以通过eMMC中的系统来启动
