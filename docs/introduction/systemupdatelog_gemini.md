# FLY-GEMINI & FLY-π系统镜像更新日志


## v2

* 2022-1
* 更换发行版本为Bullseye
* 更新内核到5.10.85
* 预装Klipper，Moonraker，Fluidd，Mainsail，KlipperScreen
* Klipper使用Python3环境，解决中文文件名问题
* 修改boot分区为fat，可直接在windows系统下修改配置文件
* 增加FLY-Config，一个全新的配置系统
* 增加CatSerial，访问```http://ip:9999```可直接查看所有连接的串口设备

### v2.1

* 修复CatSerial没有连接设备出错

### v2.2

* 新增Gemini系列主板BL固件，烧录文档见[BL烧录](/advanced/flashbl.md)

### v2.4

* 修复Klipper缺少部分烧录环境问题
* 修改配置模板
* 新增mJpg支持摄像头
* 新增V1,V1.1主板引脚配置。在FLY_Config切换

### v2.9

* 支持Gemini v2
* 完善CAN支持
* CAN设备的即插即用
* gs_usb内核模块修改
* 修复apt update/apt upgrade内核更新导致无法开机的问题

### v2.9.3

* 适配FLY-Π
* 预装内核源及头文件
* 更新环境
* 添加私有APT库公钥
* 安装Moonraker的PolicyKit规则
* 修复udev规则冲突问题
* 修复缺少libusb库导致klipper的flash报错问题
* 修复FLY-Tools静态资源无法加载的问题
* 修改默认主板型号为Gemini v2
* 修改printer.cfg中默认serial为/dev/ttyACM0
* 修改CAN发送缓冲区大小为1024

### v2.9.4

* 取消预装内核源及头文件(后续以deb包分发)
* 修复RTL88XXau驱动无法挂载的问题

### v2.9.5

* 增加KlipperScreen的WiFi网络管理
* 修复其他问题

### v2.9.6

* 支持EMMC及WIFI模块
* 弃用mjpg-streamer,使用crowsnest
* 修复其他问题

### v2.9.7

* 修复KlipperScreen无法启动的问题
* 优化WIFI驱动（不会出现类似友商的wifi无法连接，断联，连接断开，不稳定等问题）
* 优化文件系统