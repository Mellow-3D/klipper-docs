## 1 内存卡镜像烧录

1. 先安装好软件“balenaEtcher”，也可以用其他的(Win32DiskImager)等工具
2. SD卡插入读卡器，将读卡器插到电脑USB接口
3. 打开软件，点击“**Flash from file**”选择前面下载的系统镜像文件

<img src="../../images/boards/fly_pi/etcher.png" alt="etcher" style="zoom:80%;" />

4. 点击**“Select target**”选择SD卡，大小和SD卡容量差不多的就是，或进入资源管理器查看SD卡盘符

   <img src="../../images/boards/fly_pi/etcher2.png" alt="etcher2" style="zoom:80%;" />

   5. 点击 “**Falsh**” ,出现进度条及“**Falshing…**”时开始写入系统镜像到SD卡。等待大约十多分钟，等待写入完成。

   5. 镜像烧录完成后，请配置 [FLY_Config](/board/fly_pi/FLY_π_fly_config.md "点击即可跳转")
   
   5. 如果烧录失败需要格式化SD卡后在烧录
   
      
   
      
   

## 1.2 SD卡系统烧录到M2WE

FLY-M2WE提供了16G的eMMC和5G WiFi，能够提供更稳定的系统运行和更快的网络传输。（建议使用2.4GWiFi，虽然速度稍慢，但是距离远，连接也更稳定）

> [!TIP]
> FLY-M2WE只适用于FLY-π和FLY-Gemini v2,FLY-Gemini v3 不要带电插拔模块，此模块不支持热插拔

> [!TIP]
> FLY-M2WE只适用于FLY-π和FLY-Gemini v2,FLY-Gemini v3

> [!TIP]
> **使用SD卡烧录给M2WE镜像需要提前把镜像烧录到SD卡中**

**[FLY_M2WE eMMC购买地址](https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-23066022675.38.25636b45lpxmgF&id=685372879431 "点击即可跳转")**

  1. FLYOS v2.9.6开始已经完全支持M2WE
  2. WiFi驱动已经预装，直接插上并固定好即可



> [!TIP]
> 如果同时有SD卡和emmc，并且两个都有系统，会优先启动SD卡系统

   首先请安装好M2WE模块及天线，准备烧录系统。烧录镜像系统有两种方法，一种是将现有的SD卡系统迁移至eMMC模块，下面将对着两种使用方法做介绍。

  1. 给FLY-C8安装好M2WE模块并上电启动
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

## 1.3 如何重新格式化SD卡

  如果写入失败或者需要重新刷写镜像时，请按如下操作：

  1. 点击“**此电脑**” 

  ![格式化1](../../images/boards/fly_pi/format1.png)

  2. 再点击“**磁盘管理**”，找到刚刚插入的内存卡（可移动磁盘），选中后单击右键，点击“**删除卷**”，

  <img src="../../images/boards/fly_pi/format2.png" alt="format2" style="zoom: 80%;" />

  3. 单击右键再单击右键**“新建简单卷**”，新建分区请注意选择文件系统格式为**FAT32**，一直点下一步，直至完成，便将内存卡格式化为只有一个盘。
   
     当然也可以借助第三方工具来格式化内存卡和eMMC。

  ![格式化1](../../images/boards/fly_pi/format3.png)

  <img src="../../images/boards/fly_pi/format4.png" alt="format4" style="zoom:80%;" />

  ![format](../../images/boards/fly_pi/format5.png)

  4. 现在可以打开文件资源管理器，多出一个14.5G的U盘（16G eMMC显示大小为14.5G）
   
  5. 这样就可以直接用Win32diskimager或balenaEtcher来烧录系统镜像，盘符选择为这个14.5GU盘的盘符
   
  6. 镜像烧录完成后，请配置 [FLY_Config](/board/fly_pi/FLY_π_fly_config.md "点击即可跳转")


​      
